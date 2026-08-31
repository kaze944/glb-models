#!/usr/bin/env node
/**
 * Headless screenshot driver for visual QA. No dependencies: it talks to
 * Chrome over the DevTools Protocol using Node's built-in WebSocket.
 *
 *   node scripts/screenshot.mjs <url> <output.png> [options]
 *
 * Options:
 *   --width=1440      viewport width      (default 1440)
 *   --height=900      viewport height     (default 900)
 *   --dpr=1           device pixel ratio  (default 1)
 *   --mobile          emulate a touch device
 *   --full            capture the entire page instead of the viewport
 *   --wait=1200       extra settle time in ms after load (default 1200)
 *   --no-scroll       skip the scroll pass
 *   --click=SELECTOR  click an element before capturing (repeatable)
 *   --eval=JS         run JavaScript before capturing (repeatable)
 *
 * The scroll pass matters: sections use IntersectionObserver reveals, so a
 * naive screenshot of a long page would show empty space below the fold.
 *
 * Examples:
 *   node scripts/screenshot.mjs http://localhost:3000 /tmp/d.png --full
 *   node scripts/screenshot.mjs http://localhost:3000 /tmp/m.png \
 *     --width=390 --height=844 --mobile --full
 */

import { spawn } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import { writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const args = process.argv.slice(2);
const positional = args.filter((a) => !a.startsWith("--"));
const flags = new Map();
const repeated = { click: [], eval: [] };

for (const arg of args.filter((a) => a.startsWith("--"))) {
  const [rawKey, ...rest] = arg.slice(2).split("=");
  const value = rest.join("=");
  if (rawKey === "click" || rawKey === "eval") repeated[rawKey].push(value);
  else flags.set(rawKey, value === "" ? true : value);
}

const url = positional[0] ?? "http://localhost:3000";
const out = positional[1] ?? "/tmp/shot.png";
const width = Number(flags.get("width") ?? 1440);
const height = Number(flags.get("height") ?? 900);
const dpr = Number(flags.get("dpr") ?? 1);
const mobile = Boolean(flags.get("mobile"));
const fullPage = Boolean(flags.get("full"));
const settle = Number(flags.get("wait") ?? 1200);
const doScroll = !flags.get("no-scroll");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function findChrome() {
  for (const bin of ["google-chrome", "google-chrome-stable", "chromium"]) {
    const found = await new Promise((resolve) => {
      const p = spawn("which", [bin]);
      let buf = "";
      p.stdout.on("data", (d) => (buf += d));
      p.on("close", (code) => resolve(code === 0 ? buf.trim() : null));
      p.on("error", () => resolve(null));
    });
    if (found) return found;
  }
  throw new Error("No Chrome binary found.");
}

async function waitForEndpoint(port, timeoutMs = 20000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (res.ok) return (await res.json()).webSocketDebuggerUrl;
    } catch {
      // Chrome is not listening yet.
    }
    await sleep(150);
  }
  throw new Error("Chrome DevTools endpoint never came up.");
}

class Cdp {
  constructor(ws) {
    this.ws = ws;
    this.id = 0;
    this.pending = new Map();
    this.listeners = new Map();
    ws.addEventListener("message", (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id !== undefined) {
        const entry = this.pending.get(msg.id);
        if (!entry) return;
        this.pending.delete(msg.id);
        if (msg.error) entry.reject(new Error(msg.error.message));
        else entry.resolve(msg.result);
        return;
      }
      this.listeners.get(msg.method)?.forEach((fn) => fn(msg.params));
    });
  }

  send(method, params = {}, sessionId) {
    const id = ++this.id;
    const payload = { id, method, params };
    if (sessionId) payload.sessionId = sessionId;
    this.ws.send(JSON.stringify(payload));
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      setTimeout(() => {
        if (this.pending.delete(id)) reject(new Error(`${method} timed out`));
      }, 30000);
    });
  }

  on(method, fn) {
    if (!this.listeners.has(method)) this.listeners.set(method, []);
    this.listeners.get(method).push(fn);
  }
}

async function main() {
  const chrome = await findChrome();
  const profile = await mkdtemp(join(tmpdir(), "chrome-shot-"));
  const port = 9000 + Math.floor(Math.random() * 900);

  const proc = spawn(
    chrome,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-dev-shm-usage",
      "--hide-scrollbars",
      "--force-color-profile=srgb",
      `--user-data-dir=${profile}`,
      `--remote-debugging-port=${port}`,
      "about:blank",
    ],
    { stdio: "ignore", detached: false },
  );

  const cleanup = async () => {
    try {
      proc.kill("SIGKILL");
    } catch {
      // Already gone.
    }
    // Chrome keeps flushing its profile for a moment after SIGKILL.
    await sleep(300);
    await rm(profile, { recursive: true, force: true }).catch(() => {});
  };

  try {
    const browserWsUrl = await waitForEndpoint(port);
    const ws = new WebSocket(browserWsUrl);
    await new Promise((resolve, reject) => {
      ws.addEventListener("open", resolve, { once: true });
      ws.addEventListener("error", reject, { once: true });
    });

    const cdp = new Cdp(ws);
    const { targetId } = await cdp.send("Target.createTarget", {
      url: "about:blank",
    });
    const { sessionId } = await cdp.send("Target.attachToTarget", {
      targetId,
      flatten: true,
    });

    const call = (method, params) => cdp.send(method, params, sessionId);

    await call("Page.enable");
    await call("Runtime.enable");
    await call("Emulation.setDeviceMetricsOverride", {
      width,
      height,
      deviceScaleFactor: dpr,
      mobile,
      screenWidth: width,
      screenHeight: height,
    });
    if (mobile) {
      await call("Emulation.setTouchEmulationEnabled", {
        enabled: true,
        maxTouchPoints: 5,
      });
      await call("Emulation.setUserAgentOverride", {
        userAgent:
          "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
      });
    }

    const loaded = new Promise((resolve) => {
      cdp.on("Page.loadEventFired", resolve);
      setTimeout(resolve, 25000);
    });
    await call("Page.navigate", { url });
    await loaded;
    await sleep(settle);

    if (doScroll) {
      // Walk the page so IntersectionObserver reveals fire, then return to top.
      await call("Runtime.evaluate", {
        awaitPromise: true,
        expression: `(async () => {
          const step = window.innerHeight * 0.75;
          const total = document.body.scrollHeight;
          for (let y = 0; y < total; y += step) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 90));
          }
          window.scrollTo(0, 0);
          await new Promise((r) => setTimeout(r, 500));
        })()`,
      });
    }

    for (const expression of repeated.eval) {
      await call("Runtime.evaluate", { expression, awaitPromise: true });
      await sleep(400);
    }

    for (const selector of repeated.click) {
      await call("Runtime.evaluate", {
        expression: `document.querySelector(${JSON.stringify(selector)})?.click()`,
      });
      await sleep(500);
    }

    // Disable animations so repeated captures are pixel-stable.
    await call("Runtime.evaluate", {
      expression: `(() => {
        const s = document.createElement("style");
        s.textContent = "*,*::before,*::after{animation-play-state:paused !important}";
        document.head.appendChild(s);
      })()`,
    });
    await sleep(150);

    const { data } = await call("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: fullPage,
      ...(fullPage ? { clip: await fullPageClip(call) } : {}),
    });

    writeFileSync(out, Buffer.from(data, "base64"));
    const shape = fullPage ? "full page" : `${width}x${height}`;
    console.log(`Saved ${out} (${shape}, dpr ${dpr}${mobile ? ", mobile" : ""})`);
  } finally {
    await cleanup();
  }
}

async function fullPageClip(call) {
  const { result } = await call("Runtime.evaluate", {
    expression: `JSON.stringify({
      w: document.documentElement.scrollWidth,
      h: Math.min(document.documentElement.scrollHeight, 16000)
    })`,
    returnByValue: true,
  });
  const { w, h } = JSON.parse(result.value);
  return { x: 0, y: 0, width: w, height: h, scale: 1 };
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});

import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Pure-CSS iPhone frame holding a miniature landing page.
 *
 * No bitmap, no JS, no layout shift: the frame is sized from an aspect ratio
 * so it reserves its box on the first paint. This is the default — and, on
 * anything but a wide pointer-driven screen, the only — hero visual.
 */
export function DeviceShowcase({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full", className)}>
      {/* Soft plinth: keeps the device from floating in a vacuum. */}
      <div
        aria-hidden
        className="absolute inset-x-[8%] bottom-[2%] h-[42%] rounded-[50%] bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--ink)_18%,transparent),transparent_70%)] blur-2xl"
      />

      <div className="relative mx-auto w-[min(300px,74vw)]">
        {/* Side buttons */}
        <span
          aria-hidden
          className="absolute top-[14%] -left-[2px] h-[3.2%] w-[2px] rounded-l-sm bg-[#8e94a1]"
        />
        <span
          aria-hidden
          className="absolute top-[20%] -left-[2px] h-[6%] w-[2px] rounded-l-sm bg-[#8e94a1]"
        />
        <span
          aria-hidden
          className="absolute top-[28%] -left-[2px] h-[6%] w-[2px] rounded-l-sm bg-[#8e94a1]"
        />
        <span
          aria-hidden
          className="absolute top-[22%] -right-[2px] h-[9%] w-[2px] rounded-r-sm bg-[#8e94a1]"
        />

        {/* Titanium band */}
        <div
          className="relative rounded-[2.7rem] p-[3px] lift-lg"
          style={{
            background:
              "linear-gradient(150deg,#f4f6fa 0%,#a8aeba 18%,#eef1f6 34%,#8f95a3 58%,#e8ebf1 78%,#9ba1ad 100%)",
          }}
        >
          {/* Bezel */}
          <div className="relative rounded-[2.55rem] bg-[#08090c] p-[7px]">
            {/* Screen */}
            <div className="relative aspect-[71.5/146.7] overflow-hidden rounded-[2.1rem] bg-white">
              <MiniSite />

              {/* Dynamic Island */}
              <span
                aria-hidden
                className="absolute top-[10px] left-1/2 z-20 h-[24px] w-[80px] -translate-x-1/2 rounded-full bg-black"
              >
                <span className="absolute top-1/2 right-[9px] size-[7px] -translate-y-1/2 rounded-full bg-[#12141a] ring-[0.5px] ring-[#2b2f3a]" />
              </span>

              {/* Glass reflection */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 z-30 rounded-[2.1rem]"
                style={{
                  background:
                    "linear-gradient(118deg,rgba(255,255,255,0) 26%,rgba(255,255,255,0.42) 39%,rgba(255,255,255,0.06) 47%,rgba(255,255,255,0) 62%)",
                }}
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 z-30 rounded-[2.1rem] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5),inset_0_1px_10px_rgba(255,255,255,0.35)]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Miniature of a conversion page, drawn entirely with boxes. */
function MiniSite() {
  return (
    <div aria-hidden className="flex h-full flex-col px-4 pt-[42px] pb-3">
      {/* Status bar */}
      <div className="absolute inset-x-0 top-[15px] z-10 flex items-center justify-between px-6">
        <span className="text-ink font-mono text-[8px] font-medium tracking-tight">
          9:41
        </span>
        <span className="flex items-center gap-[3px]">
          <span className="flex items-end gap-[1.5px]">
            <span className="bg-ink h-[3px] w-[2px] rounded-[0.5px]" />
            <span className="bg-ink h-[4.5px] w-[2px] rounded-[0.5px]" />
            <span className="bg-ink h-[6px] w-[2px] rounded-[0.5px]" />
            <span className="bg-ink/25 h-[7.5px] w-[2px] rounded-[0.5px]" />
          </span>
          <span className="border-ink/45 ml-[2px] flex h-[7px] w-[13px] items-center rounded-[2px] border p-[1px]">
            <span className="bg-ink h-full w-[62%] rounded-[1px]" />
          </span>
        </span>
      </div>

      {/* Site header */}
      <div className="flex items-center justify-between">
        <span className="text-ink text-[8.5px] font-medium tracking-[-0.04em]">
          {site.name}
          <span className="bg-brand ml-[2px] inline-block size-[2.5px] rounded-[0.5px] align-middle" />
        </span>
        <span className="flex flex-col gap-[2.5px]">
          <span className="bg-ink/70 h-px w-[11px]" />
          <span className="bg-ink/70 h-px w-[11px]" />
        </span>
      </div>

      <div className="bg-hairline mt-3 h-px" />

      {/* Hero block */}
      <span className="bg-brand/70 mt-5 block h-[4px] w-[38px] rounded-full" />
      <div className="mt-3 flex flex-col gap-[6px]">
        <span className="bg-ink/85 block h-[8px] w-[95%] rounded-full" />
        <span className="bg-ink/85 block h-[8px] w-[80%] rounded-full" />
        <span className="block h-[8px] w-[52%] rounded-full bg-[color-mix(in_oklab,var(--brand)_80%,transparent)]" />
      </div>
      <div className="mt-3 flex flex-col gap-[4px]">
        <span className="bg-ink/16 block h-[3.5px] w-full rounded-full" />
        <span className="bg-ink/16 block h-[3.5px] w-[88%] rounded-full" />
      </div>

      {/* CTA */}
      <div className="mt-4 flex items-center gap-[6px]">
        <span className="bg-brand-strong flex h-[22px] flex-1 items-center justify-center rounded-full">
          <span className="h-[3.5px] w-[52%] rounded-full bg-white/85" />
        </span>
        <span className="border-hairline flex h-[22px] w-[30%] items-center justify-center rounded-full border">
          <span className="bg-ink/28 h-[3.5px] w-[56%] rounded-full" />
        </span>
      </div>

      {/* Result card with a rising bar chart */}
      <div className="border-hairline mt-4 rounded-[10px] border bg-[color-mix(in_oklab,var(--surface-raised)_70%,white)] p-3">
        <div className="flex items-center justify-between">
          <span className="bg-ink/22 block h-[3px] w-[34px] rounded-full" />
          <span className="bg-accent-warm/80 block size-[4px] rounded-full" />
        </div>
        <div className="mt-3 flex h-[46px] items-end gap-[5px]">
          {[26, 34, 30, 46, 58, 76, 100].map((h, i, arr) => (
            <span
              key={h}
              style={{ height: `${h}%` }}
              className={cn(
                "flex-1 rounded-[2px]",
                i === arr.length - 1
                  ? "bg-brand"
                  : "bg-[color-mix(in_oklab,var(--brand)_22%,transparent)]",
              )}
            />
          ))}
        </div>
      </div>

      {/* Trailing rows */}
      <div className="mt-auto flex flex-col gap-[7px] pt-4">
        {[1, 2].map((row) => (
          <div key={row} className="flex items-center gap-[7px]">
            <span className="bg-ink/8 size-[16px] shrink-0 rounded-full" />
            <span className="flex flex-1 flex-col gap-[3px]">
              <span className="bg-ink/18 block h-[3px] w-[70%] rounded-full" />
              <span className="bg-ink/10 block h-[3px] w-[46%] rounded-full" />
            </span>
          </div>
        ))}
      </div>

      {/* Home indicator */}
      <span className="bg-ink/70 mx-auto mt-3 block h-[3px] w-[34%] rounded-full" />
    </div>
  );
}

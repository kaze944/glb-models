/**
 * Vendor-agnostic event bridge.
 *
 * Pushes to `dataLayer` (Google Tag Manager / Google Ads) and to Plausible or
 * Umami when present. Nothing is loaded by this module: it only forwards to
 * whatever tag the site owner installs, so it stays free of network weight.
 */

export type AnalyticsEvent =
  | "cta_click"
  | "form_start"
  | "form_step_complete"
  | "form_submit"
  | "form_error"
  | "phone_click"
  | "showcase_3d_loaded";

type Payload = Record<string, string | number | boolean | undefined>;

type WindowWithTags = Window & {
  dataLayer?: unknown[];
  plausible?: (event: string, options?: { props: Payload }) => void;
  umami?: { track: (event: string, data?: Payload) => void };
};

export function track(event: AnalyticsEvent, payload: Payload = {}) {
  if (typeof window === "undefined") return;

  const w = window as WindowWithTags;

  try {
    w.dataLayer?.push({ event, ...payload });
    w.plausible?.(event, { props: payload });
    w.umami?.track(event, payload);
  } catch {
    // Analytics must never break the conversion path.
  }
}

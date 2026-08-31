import { DeviceShowcase } from "@/components/visual/device-showcase";

/**
 * Hero visual slot. Renders the CSS device on the server; the optional 3D
 * island is attached here later as progressive enhancement.
 */
export function ShowcaseStage() {
  return (
    <div className="relative">
      <DeviceShowcase />
    </div>
  );
}

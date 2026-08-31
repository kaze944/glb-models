import type { Ref } from "react";

type StepHeadingProps = {
  id: string;
  title: string;
  help: string;
  /**
   * Focus lands here on every step change: screen-reader users hear the new
   * question instead of being left on a button that no longer exists.
   */
  ref?: Ref<HTMLHeadingElement>;
};

export function StepHeading({ id, title, help, ref }: StepHeadingProps) {
  return (
    <>
      <h3
        id={id}
        ref={ref}
        tabIndex={-1}
        className="text-ink text-[1.25rem] leading-[1.18] tracking-[-0.03em] text-balance outline-none sm:text-[1.45rem]"
      >
        {title}
      </h3>
      <p className="text-ink-muted mt-2.5 text-[0.875rem] leading-relaxed text-pretty">
        {help}
      </p>
    </>
  );
}

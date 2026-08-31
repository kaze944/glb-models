import { copy } from "@/content/copy";

export function ProofBar() {
  const { intro, clients } = copy.proofBar;
  const loop = [...clients, ...clients];

  return (
    <section
      aria-label={intro}
      className="border-hairline bg-surface-raised/60 border-y"
    >
      <div className="container-page flex flex-col gap-4 py-6 lg:flex-row lg:items-center lg:gap-10 lg:py-5">
        <p className="eyebrow text-ink-muted shrink-0 lg:max-w-[22ch]">
          {intro}
        </p>

        <div className="mask-fade-x relative min-w-0 flex-1 overflow-hidden">
          <ul
            className="motion-safe:animate-marquee flex w-max items-center hover:[animation-play-state:paused]"
            style={{ animationDuration: "42s" }}
          >
            {loop.map((client, i) => (
              <li
                key={`${client}-${i}`}
                aria-hidden={i >= clients.length}
                className="text-ink-soft flex shrink-0 items-center gap-10 pe-10 text-[1rem] tracking-[-0.025em] whitespace-nowrap sm:gap-14 sm:pe-14 sm:text-[1.08rem]"
              >
                {client}
                <span
                  aria-hidden
                  className="bg-hairline size-[5px] shrink-0 rotate-45"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

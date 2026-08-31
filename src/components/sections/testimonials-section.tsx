import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/sections/section-intro";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { copy } from "@/content/copy";
import { cn } from "@/lib/utils";

/**
 * Deliberately uneven: the first quote gets a wide, quiet panel and the
 * others stack beside it, so this does not read as a three-card grid.
 */
export function TestimonialsSection() {
  const { testimonials } = copy;
  const [lead, ...rest] = testimonials.items;

  if (!lead) return null;

  return (
    <section className="container-page py-20 sm:py-28">
      <Reveal>
        <Eyebrow>{testimonials.eyebrow}</Eyebrow>
        <h2 className="display-section mt-5 max-w-[20ch]">
          {testimonials.headline}
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:mt-16 lg:grid-cols-12">
        <Reveal className="h-full lg:col-span-7">
          <QuoteCard item={lead} size="lead" />
        </Reveal>

        <div className="grid gap-5 lg:col-span-5">
          {rest.map((item, i) => (
            <Reveal key={item.author} delay={(i + 1) * 90} className="h-full">
              <QuoteCard item={item} size="compact" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

type Item = (typeof copy.testimonials.items)[number];

function QuoteCard({ item, size }: { item: Item; size: "lead" | "compact" }) {
  const lead = size === "lead";

  return (
    <figure
      className={cn(
        "border-hairline flex h-full flex-col rounded-2xl border bg-white p-6 sm:p-8",
        lead && "lift bg-[linear-gradient(180deg,white,var(--surface-raised))]",
      )}
    >
      {item.result ? (
        <p className="text-brand mb-6 inline-flex w-fit items-center gap-2 font-mono text-[0.68rem] tracking-[0.11em] uppercase">
          <span aria-hidden className="bg-brand/60 h-px w-4" />
          {item.result}
        </p>
      ) : null}

      <blockquote
        className={cn(
          "text-ink flex-1 tracking-[-0.028em]",
          lead
            ? "text-[1.25rem] leading-[1.45] sm:text-[1.55rem]"
            : "text-[1.02rem] leading-[1.5]",
        )}
      >
        <span aria-hidden className="text-ink-muted/50 mr-1 select-none">
          &laquo;
        </span>
        {item.quote}
        <span aria-hidden className="text-ink-muted/50 ml-1 select-none">
          &raquo;
        </span>
      </blockquote>

      <figcaption
        className={cn(
          "border-hairline mt-7 flex items-center gap-3 border-t pt-5",
          lead && "mt-8",
        )}
      >
        <Avatar size={lead ? "lg" : "default"}>
          <AvatarFallback className="bg-brand-soft text-brand font-mono text-[0.72rem] tracking-[0.04em]">
            {item.initials}
          </AvatarFallback>
        </Avatar>
        <span className="flex min-w-0 flex-col">
          <span className="text-ink text-[0.9rem] font-medium tracking-[-0.015em]">
            {item.author}
          </span>
          <span className="text-ink-muted truncate text-[0.82rem]">
            {item.role}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

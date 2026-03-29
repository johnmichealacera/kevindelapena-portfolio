import { FadeIn } from "@/components/motion/fade-in";
import { siteConfig } from "@/lib/site-config";

export function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-20 border-t border-border/40 py-20 sm:py-24"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          <FadeIn>
            <h2
              id="about-heading"
              className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            >
              About me
            </h2>
            <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
              I&apos;m {siteConfig.name}, a virtual assistant focused on{" "}
              <strong className="text-foreground font-medium">
                AI automation and n8n
              </strong>
              . I help founders and operators replace fragile spreadsheets and
              busywork with workflows that run on schedule, recover from errors,
              and document themselves.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <ul className="space-y-6 text-base leading-relaxed">
              <li className="flex gap-4">
                <span
                  className="from-primary/25 to-highlight/20 text-primary mt-1 flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-sm font-semibold ring-1 ring-primary/20"
                  aria-hidden
                >
                  1
                </span>
                <div>
                  <p className="font-medium text-foreground">Reliability first</p>
                  <p className="text-muted-foreground mt-1">
                    Automations fail quietly without good design. I build in
                    logging, retries, and alerts so you are never guessing what
                    happened overnight.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span
                  className="from-primary/25 to-highlight/20 text-primary mt-1 flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-sm font-semibold ring-1 ring-primary/20"
                  aria-hidden
                >
                  2
                </span>
                <div>
                  <p className="font-medium text-foreground">
                    Continuous learning
                  </p>
                  <p className="text-muted-foreground mt-1">
                    Tools evolve fast—n8n, LLMs, and APIs change monthly. I stay
                    current so your stack stays maintainable, not a museum of
                    one-off hacks.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span
                  className="from-primary/25 to-highlight/20 text-primary mt-1 flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-sm font-semibold ring-1 ring-primary/20"
                  aria-hidden
                >
                  3
                </span>
                <div>
                  <p className="font-medium text-foreground">
                    Genuine enthusiasm for automation
                  </p>
                  <p className="text-muted-foreground mt-1">
                    I enjoy turning messy processes into clear diagrams and
                    working nodes. When your team saves time, that is the win I
                    optimize for.
                  </p>
                </div>
              </li>
            </ul>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

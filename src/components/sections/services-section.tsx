import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

export function ServicesSection() {
  return (
    <section
      id="services"
      className="from-secondary/40 via-accent/25 to-secondary/30 scroll-mt-20 bg-gradient-to-br py-20 sm:py-24"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2
            id="services-heading"
            className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            Services
          </h2>
          <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
            Virtual assistant automation focused on outcomes: less manual work,
            clearer handoffs, and systems you can trust day to day.
          </p>
        </div>
        <StaggerContainer className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {services.map((service) => (
            <StaggerItem key={service.id}>
              <article
                className={cn(
                  "border-border/70 from-card via-card to-primary/5 h-full rounded-xl border bg-gradient-to-br p-6 shadow-sm transition-all duration-300",
                  "hover:border-primary/30 hover:shadow-md hover:shadow-primary/5"
                )}
              >
                <h3 className="font-heading text-base font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                  {service.description}
                </p>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

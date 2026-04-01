import { FadeIn } from "@/components/motion/fade-in";
import { ProjectsWorkflowGrid } from "@/components/sections/projects-workflow-grid";

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="from-background via-secondary/15 to-background scroll-mt-20 border-t border-border/50 bg-gradient-to-b py-20 sm:py-24"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2
            id="projects-heading"
            className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            Selected workflows
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl text-lg leading-relaxed">
            Real-world n8n automation and AI orchestration, with screenshots and
            video walkthroughs for each project.
          </p>
        </FadeIn>
        <ProjectsWorkflowGrid />
      </div>
    </section>
  );
}

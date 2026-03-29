"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronRightIcon, ClapperboardIcon, ImageIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FadeIn } from "@/components/motion/fade-in";
import {
  projects,
  type AutomationProject,
  type WorkflowMedia,
} from "@/data/projects";
import { cn } from "@/lib/utils";

function WorkflowMediaDisplay({ media }: { media: WorkflowMedia }) {
  if (media.type === "video") {
    return (
      <video
        controls
        playsInline
        className="w-full rounded-xl border border-border/50 bg-black/90 shadow-lg ring-1 ring-black/10"
        poster={media.poster}
        aria-label={media.alt}
      >
        <source src={media.src} type="video/mp4" />
        Your browser does not support embedded video.
      </video>
    );
  }
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border/50 bg-muted shadow-lg ring-1 ring-black/5">
      <Image
        src={media.src}
        alt={media.alt}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, 896px"
      />
    </div>
  );
}

export function ProjectsWorkflowGrid() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<AutomationProject | null>(null);
  const [mediaIndex, setMediaIndex] = useState(0);

  function openProject(project: AutomationProject) {
    setMediaIndex(0);
    setActive(project);
    setOpen(true);
  }

  const currentMedia = active?.demonstration[mediaIndex];

  return (
    <>
      <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:gap-8">
        {projects.map((project, index) => (
          <li key={project.id}>
            <FadeIn delay={index * 0.06}>
              <button
                type="button"
                onClick={() => openProject(project)}
                className={cn(
                  "group text-left focus-visible:ring-ring w-full rounded-xl transition-all duration-300",
                  "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
                  "hover:-translate-y-0.5"
                )}
              >
                <Card
                  className={cn(
                    "border-border/70 from-card via-card to-secondary/25 h-full cursor-pointer border bg-gradient-to-br shadow-sm",
                    "transition-all duration-300",
                    "group-hover:border-primary/35 group-hover:shadow-lg group-hover:shadow-primary/10",
                    "group-hover:ring-primary/20 group-hover:ring-2",
                    "group-focus-visible:border-primary/35 group-focus-visible:ring-primary/25 group-focus-visible:ring-2"
                  )}
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border/40">
                    {project.demonstration[0]?.type === "image" ? (
                      <Image
                        src={project.demonstration[0].src}
                        alt=""
                        fill
                        aria-hidden
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    ) : (
                      <Image
                        src={
                          project.demonstration[0]?.poster ||
                          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
                        }
                        alt=""
                        fill
                        aria-hidden
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    )}
                    <div className="from-background/20 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
                    <span
                      className={cn(
                        "absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/45 px-3 py-1.5 text-xs font-medium text-white shadow-md backdrop-blur-md",
                        "transition-transform duration-300 group-hover:translate-x-0.5"
                      )}
                    >
                      View workflow
                      <ChevronRightIcon className="size-3.5 opacity-90" />
                    </span>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg sm:text-xl">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-base font-medium text-foreground/90">
                      Problem
                    </CardDescription>
                    <CardDescription>{project.problem}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm font-medium text-foreground">
                      Solution
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.solution}
                    </p>
                  </CardContent>
                  <CardFooter className="flex flex-wrap gap-2 border-t border-border/50">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="border-primary/15 from-primary/12 to-highlight/12 text-foreground/85 rounded-md border bg-gradient-to-br px-2.5 py-1 text-xs font-medium"
                      >
                        {tool}
                      </span>
                    ))}
                  </CardFooter>
                </Card>
              </button>
            </FadeIn>
          </li>
        ))}
      </ul>

      <Dialog
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (!next) setActive(null);
        }}
      >
        <DialogContent
          showCloseButton
          className="max-h-[min(92vh,900px)] max-w-[calc(100%-1.5rem)] gap-0 overflow-y-auto p-0 sm:max-w-3xl"
        >
          {active ? (
            <>
              <DialogHeader className="border-border/60 space-y-2 border-b px-5 py-4 sm:px-6">
                <DialogTitle className="text-lg sm:text-xl">
                  {active.title}
                </DialogTitle>
                <DialogDescription className="text-base leading-relaxed">
                  Workflow in action—replace these assets with your own n8n
                  screenshots or Loom-style recordings anytime.
                </DialogDescription>
                {active.demonstration.length > 1 ? (
                  <div
                    className="flex flex-wrap gap-2 pt-2"
                    role="tablist"
                    aria-label="Demo media"
                  >
                    {active.demonstration.map((m, i) => (
                      <button
                        key={`${active.id}-media-${i}`}
                        type="button"
                        role="tab"
                        aria-selected={i === mediaIndex}
                        onClick={() => setMediaIndex(i)}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                          i === mediaIndex
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground border border-border/60"
                        )}
                      >
                        {m.type === "video" ? (
                          <ClapperboardIcon className="size-3.5" />
                        ) : (
                          <ImageIcon className="size-3.5" />
                        )}
                        {m.type === "video" ? "Video" : `Screen ${i + 1}`}
                      </button>
                    ))}
                  </div>
                ) : null}
              </DialogHeader>
              <div className="px-5 py-5 sm:px-6 sm:py-6">
                {currentMedia ? (
                  <div className="space-y-3">
                    <WorkflowMediaDisplay media={currentMedia} />
                    <p className="text-muted-foreground text-center text-xs leading-relaxed sm:text-sm">
                      {currentMedia.alt}
                    </p>
                  </div>
                ) : null}
                <div className="border-border/50 mt-6 flex flex-wrap gap-2 border-t pt-5">
                  {active.tools.map((tool) => (
                    <span
                      key={tool}
                      className="border-primary/12 from-secondary/80 to-accent/30 text-foreground/80 rounded-md border bg-gradient-to-br px-2.5 py-1 text-xs font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}

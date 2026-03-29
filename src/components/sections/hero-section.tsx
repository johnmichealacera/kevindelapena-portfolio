"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section
      id="hero"
      tabIndex={-1}
      className="relative overflow-hidden outline-none"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      >
        <div className="bg-primary/25 absolute -top-32 right-1/4 h-[28rem] w-[28rem] rounded-full blur-3xl" />
        <div className="bg-highlight/20 absolute top-1/3 -left-32 h-80 w-80 rounded-full blur-3xl" />
        <div className="bg-surface-glow/30 absolute bottom-0 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full blur-3xl" />
      </div>
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-24 sm:px-6 sm:pt-20 sm:pb-28 lg:px-8 lg:pt-28 lg:pb-32">
        <motion.p
          className="from-primary to-highlight bg-gradient-to-r bg-clip-text text-transparent mb-4 text-xs font-semibold tracking-[0.2em] uppercase sm:text-sm"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          AI Automation VA · n8n · Workflow automation
        </motion.p>
        <motion.h1
          id="hero-heading"
          className="font-heading max-w-4xl text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
        >
          I Automate Your Business Workflows Using AI &amp; n8n
        </motion.h1>
        <motion.p
          className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed text-pretty sm:text-xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.12 }}
        >
          Stop losing hours to manual handoffs. I build reliable n8n workflows
          and AI-powered automations so your team focuses on work that actually
          moves revenue—not copy-paste and inbox chaos.
        </motion.p>
        <motion.div
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.18 }}
        >
          <Link
            href="/#projects"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "h-11 px-6 text-base"
            )}
          >
            View Projects
          </Link>
          <Link
            href="/#contact"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 border-border/80 px-6 text-base"
            )}
          >
            Book a Free Consultation
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

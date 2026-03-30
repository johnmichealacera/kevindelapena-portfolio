"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import {
  bookingConsultationHref,
  hasCalendlyBooking,
} from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function CtaSection() {
  return (
    <section
      id="cta"
      className="scroll-mt-20 border-t border-border/40 bg-muted/30 py-20 sm:py-24"
      aria-labelledby="cta-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="border-primary/25 from-primary/12 via-highlight/10 to-primary/8 relative overflow-hidden rounded-2xl border bg-gradient-to-br px-6 py-14 text-center shadow-lg shadow-primary/5 sm:px-12 sm:py-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            aria-hidden
          >
            <div className="from-primary/35 to-highlight/25 absolute -top-20 left-1/2 h-48 w-[120%] -translate-x-1/2 bg-gradient-to-r blur-3xl" />
          </div>
          <h2
            id="cta-heading"
            className="font-heading relative text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            Ready to reclaim your week?
          </h2>
          <p className="text-muted-foreground relative mx-auto mt-4 max-w-xl text-lg leading-relaxed">
            Share where time leaks today—email, CRM, lead follow-up, or
            reporting—and I&apos;ll map an automation path that fits your
            tools and budget.
          </p>
          <div className="relative mt-8">
            <Link
              href={bookingConsultationHref()}
              target={hasCalendlyBooking() ? "_blank" : undefined}
              rel={hasCalendlyBooking() ? "noopener noreferrer" : undefined}
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "h-11 px-8 text-base"
              )}
            >
              Let&apos;s Automate Your Workflow
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

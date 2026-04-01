"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import {
  bookingConsultationHref,
  hasCalendlyBooking,
  siteConfig,
  siteImageUrl,
} from "@/lib/site-config";
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

      <div className="mx-auto max-w-6xl px-4 pt-16 pb-20 sm:px-6 sm:pt-20 sm:pb-24 lg:px-8 lg:pt-24 lg:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          {/* Copy column */}
          <div className="order-2 flex min-w-0 flex-col lg:order-1">
            <motion.p
              className="from-primary to-highlight mb-4 bg-gradient-to-r bg-clip-text text-xs font-semibold tracking-[0.2em] text-transparent uppercase sm:text-sm"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              AI Automation VA · n8n · Workflow automation
            </motion.p>
            <motion.h1
              id="hero-heading"
              className="font-heading text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl lg:text-[2.75rem] lg:leading-[1.12] xl:text-[3.1rem]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
            >
              I Automate Your Business Workflows Using AI &amp; n8n
            </motion.h1>
            <motion.p
              className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed text-pretty sm:text-xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.12 }}
            >
              Stop losing hours to manual handoffs. I build reliable n8n
              workflows and AI-powered automations so your team focuses on work
              that actually moves revenue—not copy-paste and inbox chaos.
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
                href={bookingConsultationHref()}
                target={hasCalendlyBooking() ? "_blank" : undefined}
                rel={
                  hasCalendlyBooking() ? "noopener noreferrer" : undefined
                }
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 border-border/80 px-6 text-base"
                )}
              >
                Book a Free Consultation
              </Link>
            </motion.div>
          </div>

          {/* Visual column — spotlight frame + subtle motion */}
          <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
            <motion.div
              className="relative w-full max-w-[min(100%,420px)] lg:max-w-none"
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="relative"
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div
                  className="from-primary/35 via-highlight/25 to-primary/20 absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br opacity-90 blur-2xl"
                  aria-hidden
                />
                <div
                  className="shadow-primary/25 relative rounded-[1.35rem] bg-gradient-to-br from-primary via-highlight to-primary p-[2px] shadow-2xl"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.28rem] bg-card ring-1 ring-black/5 dark:ring-white/10">
                    <Image
                      src={siteImageUrl}
                      alt={`${siteConfig.name}, virtual assistant specializing in AI automation and n8n workflows`}
                      fill
                      priority
                      sizes="(max-width: 1024px) min(420px, 100vw), (max-width: 1280px) 45vw, 480px"
                      className="object-cover object-top"
                    />
                    <div
                      className="from-background/85 via-transparent to-transparent pointer-events-none absolute inset-0 bg-gradient-to-t"
                      aria-hidden
                    />
                    <div
                      className="border-border/50 bg-card/80 absolute right-3 bottom-3 left-3 flex items-center justify-between gap-3 rounded-xl border px-3.5 py-2 text-xs shadow-md backdrop-blur-md sm:right-4 sm:bottom-4 sm:left-4 sm:px-4 sm:py-2.5 sm:text-sm"
                      aria-hidden
                    >
                      <span className="text-muted-foreground font-medium">
                        Your automation partner
                      </span>
                      <span className="from-primary/15 to-highlight/15 text-primary rounded-md bg-gradient-to-r px-2.5 py-1 font-semibold">
                        n8n · AI
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

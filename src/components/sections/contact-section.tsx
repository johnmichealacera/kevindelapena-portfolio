"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FadeIn } from "@/components/motion/fade-in";
import { CalendlyInlineEmbed } from "@/components/calendly-inline-embed";
import { siteConfig } from "@/lib/site-config";

export function ContactSection() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setMessage("");
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      message: String(data.get("message") || "").trim(),
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) {
        setStatus("error");
        setMessage(json.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      setMessage("Thanks—I'll get back to you shortly.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Network error. Check your connection and try again.");
    }
  }

  return (
    <section
      id="contact"
      className="scroll-mt-20 border-t border-border/40 py-20 sm:py-24"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2
            id="contact-heading"
            className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            Contact
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl text-lg leading-relaxed">
            Tell me about your tools, volume, and the outcome you want. I reply
            within one business day—or pick a time on my calendar below.
          </p>
        </FadeIn>
        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
          <FadeIn delay={0.06} className="min-w-0">
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
              noValidate
            >
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={120}
                  placeholder="Your name"
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  placeholder="you@company.com"
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  maxLength={5000}
                  rows={5}
                  placeholder="What should we automate first?"
                  className="min-h-[140px] resize-y"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="h-11 w-full sm:w-auto"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Sending…" : "Send message"}
              </Button>
              {message ? (
                <p
                  className={
                    status === "success"
                      ? "text-primary text-sm font-medium"
                      : "text-destructive text-sm"
                  }
                  role="status"
                >
                  {message}
                </p>
              ) : null}
            </form>
          </FadeIn>
          <FadeIn delay={0.12} className="min-w-0">
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="font-heading text-sm font-semibold text-foreground">
                  Direct email
                </h3>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-primary mt-2 inline-block text-sm font-medium hover:underline"
                >
                  {siteConfig.email}
                </a>
              </div>
              {siteConfig.calendlyUrl ? (
                <div className="flex min-w-0 flex-col gap-2">
                  <div>
                    <h3 className="font-heading text-sm font-semibold text-foreground">
                      Schedule a call
                    </h3>
                    <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                      Scroll inside the calendar if needed—the confirmation
                      controls stay within this panel.
                    </p>
                  </div>
                  <CalendlyInlineEmbed
                    schedulingUrl={siteConfig.calendlyUrl}
                    layout="sidebar"
                  />
                </div>
              ) : (
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Prefer a live call? Add your Calendly URL to the site
                  configuration to embed your calendar here.
                </p>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

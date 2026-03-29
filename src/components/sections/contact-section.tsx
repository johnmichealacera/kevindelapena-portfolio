"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FadeIn } from "@/components/motion/fade-in";
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
            within one business day—or book a slot directly if you use Calendly.
          </p>
        </FadeIn>
        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn delay={0.06}>
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
          <FadeIn delay={0.12}>
            <div className="space-y-6">
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
                <div className="space-y-3">
                  <h3 className="font-heading text-sm font-semibold text-foreground">
                    Schedule a call
                  </h3>
                  <div className="border-border/80 aspect-[4/3] w-full overflow-hidden rounded-xl border bg-muted/30">
                    <iframe
                      title="Calendly scheduling"
                      src={siteConfig.calendlyUrl}
                      className="size-full min-h-[520px]"
                      loading="lazy"
                    />
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Prefer a live call? I can embed your Calendly schedule here—
                  configure the public embed URL in your site environment when
                  you are ready.
                </p>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

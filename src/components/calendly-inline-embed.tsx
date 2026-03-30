"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";
import { buildCalendlyInlineEmbedUrl } from "@/lib/site-config";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (opts: {
        url: string;
        parentElement: HTMLElement;
      }) => void;
    };
  }
}

/** Calendly sends this when the iframe content height changes */
const PAGE_HEIGHT_EVENT = "calendly.page_height";

interface CalendlyInlineEmbedProps {
  schedulingUrl: string;
  /** Right column under email vs wide block */
  layout?: "sidebar" | "full";
  className?: string;
}

export function CalendlyInlineEmbed({
  schedulingUrl,
  layout = "sidebar",
  className,
}: CalendlyInlineEmbedProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const getEmbedUrl = useCallback(() => {
    if (!schedulingUrl) return null;
    const host =
      typeof window !== "undefined" ? window.location.hostname : "localhost";
    return buildCalendlyInlineEmbedUrl(schedulingUrl, host);
  }, [schedulingUrl]);

  const mountWidget = useCallback(() => {
    const el = parentRef.current;
    const api = window.Calendly;
    const url = getEmbedUrl();
    if (!el || !api || !url) return;
    el.innerHTML = "";
    api.initInlineWidget({
      url,
      parentElement: el,
    });
  }, [getEmbedUrl]);

  useEffect(() => {
    if (!getEmbedUrl()) return;
    if (window.Calendly) {
      mountWidget();
    }
  }, [getEmbedUrl, mountWidget]);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.origin !== "https://calendly.com") return;
      const data = e.data as { event?: string; payload?: { height?: number } };
      if (data?.event !== PAGE_HEIGHT_EVENT) return;
      const height = data.payload?.height;
      if (typeof height !== "number" || height < 400) return;
      const root = parentRef.current;
      if (!root) return;
      const widget = root.querySelector<HTMLElement>(".calendly-inline-widget");
      const iframe = root.querySelector<HTMLIFrameElement>("iframe");
      if (widget) {
        widget.style.height = `${height}px`;
        widget.style.minHeight = `${Math.min(height, 1200)}px`;
      }
      if (iframe) {
        iframe.style.height = `${height}px`;
        iframe.style.minHeight = `${height}px`;
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  if (!schedulingUrl) return null;

  return (
    <>
      <div
        className={cn(
          "border-border/80 bg-card/40 relative w-full min-w-0 rounded-xl border shadow-sm",
          layout === "sidebar" && "calendly-embed-sidebar",
          className
        )}
      >
        <div
          ref={parentRef}
          className={cn(
            "calendly-inline-widget-root w-full min-w-0 rounded-[inherit]",
            layout === "sidebar" && "calendly-inline-widget-root--sidebar"
          )}
        />
      </div>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onLoad={mountWidget}
      />
    </>
  );
}

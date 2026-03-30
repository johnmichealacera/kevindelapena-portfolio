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

/** Used only before Calendly posts `page_height` */
const SIDEBAR_FALLBACK_MIN_PX = 620;
const FULL_FALLBACK_MIN_PX = 640;
const SIDEBAR_MAX_PX = 920;
const FULL_MAX_PX = 1020;
/**
 * Calendly’s reported height often includes a few px of empty band at the
 * bottom of the iframe; trim slightly so the frame hugs the UI (not 620px min).
 */
const REPORTED_HEIGHT_BOTTOM_TRIM_PX = 16;
const REPORTED_HEIGHT_FLOOR_PX = 380;

function readLayout(root: HTMLElement): "sidebar" | "full" {
  const v = root.getAttribute("data-calendly-layout");
  return v === "full" ? "full" : "sidebar";
}

function applyEmbedShellHeight(root: HTMLElement, calendlyContentHeight?: number) {
  const layout = readLayout(root);
  const fallbackMin =
    layout === "sidebar" ? SIDEBAR_FALLBACK_MIN_PX : FULL_FALLBACK_MIN_PX;
  const maxPx = layout === "sidebar" ? SIDEBAR_MAX_PX : FULL_MAX_PX;
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;

  let px: number;
  if (typeof calendlyContentHeight === "number" && calendlyContentHeight > 350) {
    px = Math.round(calendlyContentHeight) - REPORTED_HEIGHT_BOTTOM_TRIM_PX;
    px = Math.min(maxPx, Math.max(REPORTED_HEIGHT_FLOOR_PX, px));
  } else {
    px = Math.round(vh * 0.62);
    px = Math.min(maxPx, Math.max(fallbackMin, px));
  }

  /*
    Newer Calendly initInlineWidget often injects iframe + spinner directly into
    parentElement with NO .calendly-inline-widget wrapper — only targeting that
    class caused an early return and no heights applied.
  */
  const legacyWidget = root.querySelector<HTMLElement>(".calendly-inline-widget");
  const shell = legacyWidget ?? root;
  shell.style.setProperty("min-height", `${px}px`, "important");
  shell.style.setProperty("height", `${px}px`, "important");
  shell.style.setProperty("display", "block", "important");
  shell.style.setProperty("padding", "0", "important");
  shell.style.setProperty("margin", "0", "important");

  const iframe = root.querySelector<HTMLIFrameElement>("iframe");
  if (iframe) {
    iframe.style.setProperty("min-height", `${px}px`, "important");
    iframe.style.setProperty("height", `${px}px`, "important");
    iframe.style.setProperty("width", "100%", "important");
    iframe.style.setProperty("display", "block", "important");
    iframe.style.setProperty("margin", "0", "important");
    iframe.style.setProperty("padding", "0", "important");
    iframe.style.setProperty("vertical-align", "top", "important");
  }
}

interface CalendlyInlineEmbedProps {
  schedulingUrl: string;
  layout?: "sidebar" | "full";
  className?: string;
}

export function CalendlyInlineEmbed({
  schedulingUrl,
  layout = "sidebar",
  className,
}: CalendlyInlineEmbedProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  /** Reuse on resize / delayed resizes so we don’t fall back to min 620px */
  const lastReportedHeightRef = useRef<number | undefined>(undefined);

  const getEmbedUrl = useCallback(() => {
    if (!schedulingUrl) return null;
    const host =
      typeof window !== "undefined" ? window.location.hostname : "localhost";
    return buildCalendlyInlineEmbedUrl(schedulingUrl, host);
  }, [schedulingUrl]);

  const applyHeightToRoot = useCallback(
    (calendlyContentHeight?: number) => {
      const root = parentRef.current;
      if (!root) return;
      const h =
        typeof calendlyContentHeight === "number"
          ? calendlyContentHeight
          : lastReportedHeightRef.current;
      applyEmbedShellHeight(
        root,
        typeof h === "number" ? h : undefined
      );
    },
    []
  );

  const scheduleShellResize = useCallback(() => {
    applyHeightToRoot();
    window.setTimeout(() => applyHeightToRoot(), 400);
    window.setTimeout(() => applyHeightToRoot(), 1200);
  }, [applyHeightToRoot]);

  const mountWidget = useCallback(() => {
    const el = parentRef.current;
    const api = window.Calendly;
    const url = getEmbedUrl();
    if (!el || !api || !url) return;
    lastReportedHeightRef.current = undefined;
    el.innerHTML = "";
    api.initInlineWidget({
      url,
      parentElement: el,
    });
    requestAnimationFrame(() => applyHeightToRoot());
    scheduleShellResize();
  }, [applyHeightToRoot, getEmbedUrl, scheduleShellResize]);

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
      const reported = data.payload?.height;
      if (!parentRef.current) return;
      if (typeof reported === "number") {
        lastReportedHeightRef.current = reported;
      }
      applyHeightToRoot(
        typeof reported === "number" ? reported : undefined
      );
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [applyHeightToRoot]);

  useEffect(() => {
    function onResize() {
      applyHeightToRoot();
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [applyHeightToRoot]);

  /** Calendly mounts iframe asynchronously; observe until it appears */
  useEffect(() => {
    if (!schedulingUrl) return;
    const root = parentRef.current;
    if (!root) return;
    let t: ReturnType<typeof setTimeout> | undefined;
    const run = () => {
      applyHeightToRoot();
    };
    const obs = new MutationObserver(() => {
      if (root.querySelector("iframe")) {
        run();
        if (t) clearTimeout(t);
        t = setTimeout(run, 100);
      }
    });
    obs.observe(root, { childList: true, subtree: true });
    return () => {
      obs.disconnect();
      if (t) clearTimeout(t);
    };
  }, [applyHeightToRoot, schedulingUrl]);

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
          data-calendly-layout={layout}
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

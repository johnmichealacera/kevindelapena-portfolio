"use client";

import { useSyncExternalStore } from "react";
import { navLinks } from "@/lib/site-config";

/** Section ids in scroll order — derived from primary nav targets */
const SECTION_IDS = navLinks.map((link) =>
  link.href.replace(/^#\/?/, "")
) as readonly string[];

/** Pixels from top of viewport; aligns with sticky header + breathing room */
const ACTIVATION_OFFSET_PX = 96;

function readActiveSectionId(): string {
  if (typeof window === "undefined") return "";
  const y = window.scrollY + ACTIVATION_OFFSET_PX;
  let active = "";
  for (const id of SECTION_IDS) {
    const el = document.getElementById(id);
    if (!el) continue;
    const top = el.getBoundingClientRect().top + window.scrollY;
    if (top <= y) active = id;
  }
  return active;
}

function subscribe(onStoreChange: () => void) {
  let raf = 0;
  const schedule = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => onStoreChange());
  };
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
  window.addEventListener("hashchange", schedule);
  window.addEventListener("load", schedule, { once: true });
  queueMicrotask(schedule);
  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
    window.removeEventListener("hashchange", schedule);
    window.removeEventListener("load", schedule);
  };
}

function getServerSnapshot() {
  return "";
}

/**
 * Returns the id of the nav section currently in view (e.g. `projects`), or
 * `""` when above the first section (e.g. hero).
 */
export function useActiveSection(): string {
  return useSyncExternalStore(subscribe, readActiveSectionId, getServerSnapshot);
}

export function navHrefToSectionId(href: string): string {
  return href.replace(/^#\/?/, "").replace(/^\//, "");
}

export const siteConfig = {
  name: "Kevin Dela Peña",
  title: "AI Automation VA | n8n Workflow Automation",
  tagline: "Virtual assistant for AI automation, n8n, and workflow automation.",
  description:
    "AI Automation VA specializing in n8n automation, workflow automation, and virtual assistant automation. I design reliable systems that save time and scale your business.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://example.com",
  keywords: [
    "AI Automation VA",
    "n8n automation",
    "workflow automation",
    "virtual assistant automation",
    "n8n workflows",
    "business process automation",
  ],
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@example.com",
  /** Full Calendly scheduling URL, e.g. https://calendly.com/yourname/discovery-call */
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL?.trim() || "",
} as const;

/** Opens Calendly in a new tab when configured; otherwise scrolls to #contact */
export function bookingConsultationHref(): string {
  return siteConfig.calendlyUrl || "/#contact";
}

export function hasCalendlyBooking(): boolean {
  return Boolean(siteConfig.calendlyUrl);
}

/**
 * Scheduling URL without query/hash — required for Calendly’s inline embed API
 * (`initInlineWidget`). Iframe-style `?embed=true` URLs break layout and scrolling.
 */
export function calendlyCleanSchedulingUrl(raw?: string): string {
  const urlStr = raw ?? siteConfig.calendlyUrl;
  if (!urlStr) return "";
  try {
    const u = new URL(urlStr);
    u.search = "";
    u.hash = "";
    return u.toString();
  } catch {
    return urlStr.replace(/\?.*$/, "").replace(/#.*$/, "");
  }
}

/**
 * Inline embed URL with params Calendly expects for resizing + postMessage
 * (`calendly.page_height`). Without `embed_domain`, the iframe stays ~630px tall.
 */
export function buildCalendlyInlineEmbedUrl(
  rawSchedulingUrl: string,
  embedHost: string
): string {
  const base = calendlyCleanSchedulingUrl(rawSchedulingUrl);
  if (!base) return "";
  try {
    const u = new URL(base);
    u.searchParams.set("embed_type", "Inline");
    u.searchParams.set("embed_domain", embedHost || "1");
    return u.toString();
  } catch {
    return base;
  }
}

export const navLinks = [
  { href: "#projects", label: "Projects" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

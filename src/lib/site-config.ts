const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://example.com";

function envUrl(key: string): string | undefined {
  const v = process.env[key]?.trim();
  if (!v) return undefined;
  try {
    new URL(v);
    return v;
  } catch {
    return undefined;
  }
}

/** Hero + Open Graph / Twitter / JSON-LD (Cloudinary) */
export const siteImageUrl =
  "https://res.cloudinary.com/dofpspduc/image/upload/f_auto,q_auto/v1775010841/kevindelapena_enhance_rhmbhh.jpg";

export const linkedInProfileUrl =
  envUrl("NEXT_PUBLIC_LINKEDIN_URL") ??
  "https://www.linkedin.com/in/kevin-dela-pena/";

export const jobStreetProfileUrl =
  "https://ph.jobstreet.com/profiles/kevin-delapea-2xM8Y9XZGJ";

export const onlineJobsProfileUrl =
  "https://www.onlinejobs.ph/jobseekers/info/4879117";

export type HiringProfileBrand = "linkedin" | "jobstreet" | "onlinejobs";

/** Footer + structured data — hiring / professional profiles */
export const hiringProfileLinks: {
  brand: HiringProfileBrand;
  label: string;
  href: string;
}[] = [
  { brand: "linkedin", label: "LinkedIn", href: linkedInProfileUrl },
  { brand: "jobstreet", label: "JobStreet", href: jobStreetProfileUrl },
  { brand: "onlinejobs", label: "OnlineJobs.ph", href: onlineJobsProfileUrl },
];

export const siteConfig = {
  name: "Kevin Dela Peña",
  /** Page title & primary SEO title */
  title: "Kevin Dela Peña | AI Automation Specialist & n8n Expert",
  /** Used where a shorter label fits (e.g. some templates) */
  shortTitle: "AI Automation VA | n8n Workflow Automation",
  tagline: "Virtual assistant for AI automation, n8n, and workflow automation.",
  /** ~155 chars — good for Google snippets; also used for OG/Twitter unless overridden */
  description:
    "Kevin Dela Peña — AI automation specialist and VA building n8n workflows, integrations, and reliable business automation. Hire an n8n expert to save time and scale operations.",
  url: rawSiteUrl,
  keywords: [
    "Kevin Dela Peña",
    "Kevin Dela Pena",
    "AI automation specialist",
    "n8n expert",
    "n8n developer",
    "n8n automation",
    "n8n workflows",
    "workflow automation",
    "business process automation",
    "AI Automation VA",
    "virtual assistant automation",
    "automation consultant",
    "no-code automation",
    "Philippines VA",
  ],
  get ogImageUrl() {
    return siteImageUrl;
  },
  ogImageAlt:
    "Kevin Dela Peña — AI automation specialist and n8n workflow expert",
  openGraphLocale: "en_US",
  /** Optional profile URLs — set in .env for Google Knowledge Panel–style sameAs hints */
  socialProfiles: {
    linkedin: linkedInProfileUrl,
    twitter: envUrl("NEXT_PUBLIC_TWITTER_URL"),
    facebook: envUrl("NEXT_PUBLIC_FACEBOOK_URL"),
    instagram: envUrl("NEXT_PUBLIC_INSTAGRAM_URL"),
  },
  twitterSite: process.env.NEXT_PUBLIC_TWITTER_SITE?.trim() || undefined,
  twitterCreator: process.env.NEXT_PUBLIC_TWITTER_CREATOR?.trim() || undefined,
  /** Meta `fb:app_id` (developers.facebook.com app — not profile). */
  facebookAppId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID?.trim() || undefined,
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@example.com",
  /** Full Calendly scheduling URL, e.g. https://calendly.com/yourname/discovery-call */
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL?.trim() || "",
};

export function siteJsonLdSameAs(): string[] {
  const { linkedin, twitter, facebook, instagram } = siteConfig.socialProfiles;
  return [
    linkedin,
    twitter,
    facebook,
    instagram,
    jobStreetProfileUrl,
    onlineJobsProfileUrl,
  ].filter((u): u is string => Boolean(u));
}

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

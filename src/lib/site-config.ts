export const siteConfig = {
  name: "Kevin de la Peña",
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
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL || "",
} as const;

export const navLinks = [
  { href: "#projects", label: "Projects" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

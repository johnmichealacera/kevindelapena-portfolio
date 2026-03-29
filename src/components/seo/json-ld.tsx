import { siteConfig } from "@/lib/site-config";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    email: siteConfig.email,
    serviceType: [
      "AI Automation VA",
      "n8n automation",
      "Workflow automation",
      "Virtual assistant automation",
    ],
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    provider: {
      "@type": "Person",
      name: siteConfig.name,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

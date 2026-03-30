import { siteConfig, siteJsonLdSameAs } from "@/lib/site-config";

export function JsonLd() {
  const { url, name, title, description, shortTitle, email, ogImageUrl, ogImageAlt } =
    siteConfig;
  const sameAs = siteJsonLdSameAs();

  const personId = `${url}/#person`;
  const websiteId = `${url}/#website`;
  const webpageId = `${url}/#webpage`;
  const imageId = `${url}/#primaryimage`;
  const businessId = `${url}/#professional-service`;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebSite",
      "@id": websiteId,
      url,
      name: title,
      description,
      inLanguage: "en",
      publisher: { "@id": personId },
    },
    {
      "@type": "WebPage",
      "@id": webpageId,
      url,
      name: title,
      description,
      isPartOf: { "@id": websiteId },
      about: { "@id": personId },
      primaryImageOfPage: { "@id": imageId },
    },
    {
      "@type": "ImageObject",
      "@id": imageId,
      url: ogImageUrl,
      contentUrl: ogImageUrl,
      caption: ogImageAlt,
    },
    {
      "@type": "Person",
      "@id": personId,
      name,
      jobTitle: "AI Automation Specialist",
      description,
      url,
      image: { "@id": imageId },
      email,
      knowsAbout: [
        "n8n",
        "workflow automation",
        "AI automation",
        "business process automation",
        "virtual assistant services",
      ],
      ...(sameAs.length ? { sameAs } : {}),
    },
    {
      "@type": "ProfessionalService",
      "@id": businessId,
      name: shortTitle,
      description,
      url,
      image: ogImageUrl,
      email,
      serviceType: [
        "n8n workflow automation",
        "AI automation consulting",
        "Virtual assistant — automation & integrations",
      ],
      areaServed: { "@type": "Place", name: "Worldwide" },
      provider: { "@id": personId },
    },
  ];

  const data = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

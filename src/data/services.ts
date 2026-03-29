export interface Service {
  id: string;
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    id: "email",
    title: "AI Email Automation",
    description:
      "Smart triage, tagging, and draft responses for support and sales inboxes—so your team focuses on conversations that need a human touch.",
  },
  {
    id: "leads",
    title: "Lead Generation Automation",
    description:
      "Capture, enrich, score, and route leads from ads, forms, and social into your CRM with n8n and AI—faster follow-up, fewer dropped opportunities.",
  },
  {
    id: "crm",
    title: "CRM Workflow Automation",
    description:
      "Sync data across tools, trigger tasks on pipeline changes, and keep records clean without manual copy-paste between systems.",
  },
  {
    id: "custom-n8n",
    title: "Custom n8n Solutions",
    description:
      "Bespoke workflows, error handling, and documentation tailored to your stack—built for reliability and easy handoff to your team.",
  },
];

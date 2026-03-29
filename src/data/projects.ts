export type WorkflowMedia =
  | {
      type: "image";
      src: string;
      alt: string;
    }
  | {
      type: "video";
      src: string;
      alt: string;
      poster?: string;
    };

export interface AutomationProject {
  id: string;
  title: string;
  problem: string;
  solution: string;
  tools: string[];
  /** Screenshots or screen recordings shown in the workflow demo modal */
  demonstration: WorkflowMedia[];
}

export const projects: AutomationProject[] = [
  {
    id: "lead-routing",
    title: "AI Lead Qualification & CRM Routing",
    problem:
      "Inbound leads from forms and ads sat in spreadsheets. Sales wasted hours sorting and assigning manually.",
    solution:
      "Built an n8n workflow that scores leads with an AI model, enriches records via API, and routes hot prospects to the right rep in the CRM within minutes.",
    tools: ["n8n", "OpenAI API", "HubSpot API", "Slack", "Google Sheets"],
    demonstration: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=85",
        alt: "CRM dashboard and analytics representing automated lead routing",
      },
      {
        type: "video",
        src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        alt: "Screen recording walkthrough of the n8n lead scoring and routing workflow",
        poster:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=85",
      },
    ],
  },
  {
    id: "email-ops",
    title: "Support Inbox Triage & Auto-Responses",
    problem:
      "A growing support queue meant delayed replies and duplicate work across Gmail and a help desk.",
    solution:
      "Automated classification, tagging, and draft replies using AI, with human approval for sensitive threads—cutting first-response time while keeping quality high.",
    tools: ["n8n", "Gmail API", "Zendesk", "Anthropic API", "Vector DB"],
    demonstration: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1600&q=85",
        alt: "Email and messaging interface concept for automated inbox triage",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=1600&q=85",
        alt: "Customer support workspace showing ticket workflow automation",
      },
    ],
  },
  {
    id: "content-pipeline",
    title: "Content Repurposing Pipeline",
    problem:
      "Long-form webinars and podcasts were underused; clips and posts required a full day each week.",
    solution:
      "End-to-end pipeline: transcribe, summarize, generate social posts and newsletter blurbs, then schedule via Buffer—triggered when a new file lands in Drive.",
    tools: ["n8n", "Google Drive", "Whisper API", "Notion API", "Buffer"],
    demonstration: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1600&q=85",
        alt: "Video production and social content workflow",
      },
    ],
  },
  {
    id: "invoice-sync",
    title: "Invoice & Payment Status Sync",
    problem:
      "Finance tracked invoices in one tool while ops lived in another, causing missed follow-ups.",
    solution:
      "Bi-directional sync between accounting software and project tools with exception alerts and a weekly digest to stakeholders.",
    tools: ["n8n", "QuickBooks API", "Airtable", "Stripe webhooks", "Email"],
    demonstration: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=85",
        alt: "Financial documents and invoice management on a desk",
      },
    ],
  },
  {
    id: "onboarding",
    title: "Client Onboarding Automation",
    problem:
      "New clients received inconsistent welcome packs and calendar invites slipped through the cracks.",
    solution:
      "Single n8n master flow: contract signed → create folders, send sequences, book kickoff, and notify the team—with checkpoints if anything fails.",
    tools: ["n8n", "DocuSign", "Google Calendar", "Notion", "SendGrid"],
    demonstration: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=85",
        alt: "Team collaboration and client onboarding meeting",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1600&q=85",
        alt: "Business handshake and onboarding checklist workflow",
      },
    ],
  },
];

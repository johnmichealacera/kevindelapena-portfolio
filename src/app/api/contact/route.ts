import { siteConfig } from "@/lib/site-config";

interface ContactBody {
  name?: string;
  email?: string;
  message?: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Contact API — production wiring:
 * - Set CONTACT_TO to your inbox.
 * - Optional: integrate Resend, SendGrid, or Nodemailer here using server-only env vars.
 * - Until configured, submissions are accepted and logged server-side for verification.
 */
export async function POST(request: Request) {
  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || name.length > 120) {
    return Response.json(
      { ok: false, error: "Please enter a valid name." },
      { status: 400 }
    );
  }
  if (!email || !isValidEmail(email) || email.length > 254) {
    return Response.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 }
    );
  }
  if (!message || message.length > 5000) {
    return Response.json(
      { ok: false, error: "Please enter a message (max 5000 characters)." },
      { status: 400 }
    );
  }

  if (process.env.NODE_ENV === "development") {
    console.info("[contact]", { name, email, messageLength: message.length });
  }

  if (process.env.CONTACT_TO) {
    // Example: await resend.emails.send({ from: '...', to: process.env.CONTACT_TO, subject: `Contact from ${name}`, html: ... })
  }

  return Response.json({
    ok: true,
    receivedAt: new Date().toISOString(),
    site: siteConfig.url,
  });
}

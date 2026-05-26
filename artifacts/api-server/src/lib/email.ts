import nodemailer from "nodemailer";
import { logger } from "./logger";

const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL ?? "zakwanzulkifli0770@gmail.com";

function createTransport() {
  if (!SMTP_USER || !SMTP_PASS) {
    return null;
  }
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

export async function sendContactNotification(contact: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<void> {
  const transport = createTransport();

  if (!transport) {
    logger.warn("Email not configured — skipping notification. Set SMTP_USER and SMTP_PASS to enable.");
    return;
  }

  try {
    await transport.sendMail({
      from: `"Portfolio Contact" <${SMTP_USER}>`,
      to: NOTIFY_EMAIL,
      subject: `New message: ${contact.subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0d0d1a; color: #e2e8f0; padding: 32px; border-radius: 12px; border: 1px solid #1e3a5f;">
          <h2 style="color: #00d4ff; margin-top: 0;">New Contact Message</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #94a3b8; width: 100px;"><strong>From</strong></td>
              <td style="padding: 8px 0;">${contact.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #94a3b8;"><strong>Email</strong></td>
              <td style="padding: 8px 0;"><a href="mailto:${contact.email}" style="color: #00d4ff;">${contact.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #94a3b8;"><strong>Subject</strong></td>
              <td style="padding: 8px 0;">${contact.subject}</td>
            </tr>
          </table>
          <hr style="border-color: #1e3a5f; margin: 24px 0;" />
          <h3 style="color: #00d4ff; margin-top: 0;">Message</h3>
          <p style="line-height: 1.7; white-space: pre-wrap;">${contact.message}</p>
          <hr style="border-color: #1e3a5f; margin: 24px 0;" />
          <p style="color: #64748b; font-size: 12px; margin: 0;">Sent from your portfolio contact form.</p>
        </div>
      `,
      text: `New contact message\n\nFrom: ${contact.name} <${contact.email}>\nSubject: ${contact.subject}\n\n${contact.message}`,
    });
    logger.info({ to: NOTIFY_EMAIL, from: contact.email }, "Contact notification email sent");
  } catch (err) {
    logger.error({ err }, "Failed to send contact notification email");
  }
}

/// <reference types="node" />
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, email, message } = req.body ?? {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: "RESEND_API_KEY is not configured" });
  }

  try {
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["faseehj11@gmail.com"],
      replyTo: email,
      subject: `New portfolio inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
  <h2 style="margin-bottom: 12px;">New portfolio inquiry</h2>
  <p><strong>Name:</strong> ${escapeHtml(String(name))}</p>
  <p><strong>Email:</strong> ${escapeHtml(String(email))}</p>
  <p style="margin: 16px 0 8px 0;"><strong>Project details:</strong></p>
  <p>${escapeHtml(String(message)).replace(/\n/g, "<br/>")}</p>
</div>`,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Failed to send email", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}

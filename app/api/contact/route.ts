import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

// Ensure Node.js runtime (nodemailer won't run on Edge)
export const runtime = "nodejs";

// 1) Validate incoming JSON
const ContactSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  message: z.string().min(10, "Message is too short"),
  hp: z.string().optional(), // honeypot
});

export async function POST(req: Request) {
  try {
    const parsed = ContactSchema.safeParse(await req.json());
    if (!parsed.success) {
      // ⛔ Use .issues (not .errors)
      const msg = parsed.error.issues[0]?.message || "Invalid input";
      return NextResponse.json({ ok: false, error: msg }, { status: 400 });
    }

    const { name, email, message, hp } = parsed.data;

    // 2) Spam trap: if honeypot is filled, pretend success
    if (hp && hp.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    // 3) Read env
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to = process.env.CONTACT_TO;

    if (!host || !user || !pass || !to) {
      console.error("Missing SMTP env variables");
      return NextResponse.json(
        { ok: false, error: "Server not configured for email." },
        { status: 500 }
      );
    }

    // 4) Send the email
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true only for 465
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${user}>`,
      to,
      subject: `New message from ${name}`,
      replyTo: email,
      html: `
        <h3>New Portfolio Inquiry</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p style="white-space:pre-wrap">${message}</p>
      `,
    });

    // 5) Success
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { ok: false, error: "Validation or mail failed" },
      { status: 400 }
    );
  }
}

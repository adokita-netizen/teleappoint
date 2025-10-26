import nodemailer from "nodemailer";
export const config = { runtime: "nodejs" }; // nodemailerはNodeランタイム

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");
  const body = req.body ?? (await req.json?.());
  const { to, subject, html } = body;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST!,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: { user: process.env.SMTP_USERNAME!, pass: process.env.SMTP_PASSWORD! },
  });

  await transporter.sendMail({ from: process.env.SMTP_USERNAME!, to, subject, html });
  res.status(200).json({ ok: true });
}

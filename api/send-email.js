import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "Missing required fields (name, email, or message)" });
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("ENVIRONMENT ERROR: EMAIL_USER or EMAIL_PASS is not set in Vercel Environment Variables.");
    return res.status(500).json({
      success: false,
      error: "Server configuration error: Email credentials are not set on Vercel."
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "devkumarsingh0090@gmail.com",
      subject: `New Contact Form Message from ${name}`,
      text: `
            Name: ${name}
            Email: ${email}
            Message: ${message}
        `
    });

    return res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (err) {
    console.error("MAIL ERROR:", err);
    return res.status(500).json({
      success: false,
      error: `Failed to send email: ${err.message}. Please check if Gmail 'App Password' is correct.`
    });
  }
}

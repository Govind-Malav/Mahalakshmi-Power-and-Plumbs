import { transporter } from "./emailService.js";

export const sendSupportEmail = async ({ name, email, subject, message }) => {
  try {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Support Message</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #2563eb;">New Support Message Received 📩</h2>
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <h3 style="color: #4b5563;">Message:</h3>
          <p style="background-color: #f9fafb; padding: 15px; border-radius: 4px; border-left: 4px solid #2563eb;">
            ${message}
          </p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 12px; color: #6b7280; text-align: center;">
            Sent from Vendor Portal Contact Form
          </p>
        </div>
      </body>
      </html>
    `;

    const info = await transporter.sendMail({
      from: `"VendorMart Support" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      replyTo: email,
      subject: `📢 Support: ${subject}`,
      html: htmlContent,
    });

    console.log("✅ Support Email sent via Nodemailer:", info.messageId);
    return info;

  } catch (error) {
    console.error("❌ Failed to send support email:", error);
  }
};

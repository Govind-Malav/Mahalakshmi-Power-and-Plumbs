import { resend } from "./emailService.js";

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

        const { data, error } = await resend.emails.send({
            from: "VendorMart Support <onboarding@resend.dev>",
            to: [process.env.ADMIN_EMAIL],
            reply_to: email, // Allow replying directly to the user
            subject: `📢 Support: ${subject}`,
            html: htmlContent,
        });

        if (error) {
            console.error("❌ Resend Support Email Error:", error);
            return;
        }

        console.log("✅ Support Email sent:", data.id);
        return data;

    } catch (error) {
        console.error("❌ Failed to send support email:", error);
    }
};

import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_EMAIL_PASSWORD, // App Password
  },
});

export const sendSupportEmail = async ({ name, email, subject, message }) => {
  const mailOptions = {
    from: `"${name}" <${email}>`, // Sender address (shows as name but sent via auth user)
    to: process.env.ADMIN_EMAIL, // Send TO the support email (same as sender in this case)
    replyTo: email,
    subject: `Support Request: ${subject}`,
    html: `
      <div style="
        background:#0f172a;
        color:#e5e7eb;
        font-family:Segoe UI,Roboto,Arial,sans-serif;
        padding:20px;
      ">
        <div style="
          max-width:720px;
          margin:auto;
          background:#020617;
          border-radius:12px;
          padding:24px;
          box-shadow:0 10px 30px rgba(0,0,0,0.4);
        ">

          <h1 style="color:#facc15;margin-bottom:10px;">
            📞 New Support Request
          </h1>

          <p style="margin:0;color:#94a3b8;">
            <strong>Received at:</strong> ${new Date().toLocaleString()}
          </p>

          <hr style="border:1px solid #1e293b;margin:20px 0;" />

          <h2 style="color:#38bdf8;">👤 User Details</h2>
          <p>
            <strong>Name:</strong> ${name}<br/>
            <strong>Email:</strong> ${email}
          </p>

          <h2 style="color:#38bdf8;">📝 Subject</h2>
          <p style="font-size:18px; font-weight:bold; color:#e5e7eb;">${subject}</p>

          <h2 style="color:#38bdf8;margin-top:20px;">💬 Message</h2>
          <div style="
            margin-top:10px;
            padding:15px;
            background:#1e293b;
            border-left:4px solid #facc15;
            color:#e5e7eb;
            border-radius:4px;
            white-space: pre-wrap;
          ">
            ${message}
          </div>

          <hr style="border:1px solid #1e293b;margin:20px 0;" />

          <p style="font-size:12px;color:#64748b;text-align:center;">
            VendorMart • Support Notification
          </p>

        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Support Email sent: " + info.response);
    return info;
  } catch (error) {
    console.error("Error sending support email:", error);
    throw error;
  }
};

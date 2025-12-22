import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

if (!emailUser || !emailPass) {
    console.warn("⚠️ WARNING: EMAIL_USER or EMAIL_PASS is missing. Email sending will fail.");
}

// Use explicit SMTP configuration for better reliability on cloud platforms
export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, // SSL Port (more reliable than 587 on cloud)
    secure: true, // Use SSL
    auth: {
        user: emailUser,
        pass: emailPass,
    },
});

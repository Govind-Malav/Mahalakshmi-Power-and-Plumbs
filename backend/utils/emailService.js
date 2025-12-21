import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER || process.env.ADMIN_EMAIL,
        pass: process.env.SMTP_PASS || process.env.ADMIN_EMAIL_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false
    }
});

export default transporter;

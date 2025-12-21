import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

console.log("📧 Email Service Configured:");
console.log(`   - Host: ${process.env.SMTP_HOST}`);
console.log(`   - Port: ${process.env.SMTP_PORT}`);
console.log(`   - User: ${process.env.SMTP_USER || "Not Set"}`);

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // No fallback, must be set
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    tls: {
        rejectUnauthorized: false
    }
});

export default transporter;

import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    logger: true,
    debug: true,
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASSWORD,
    },
    family: 4, // Force IPv4
    connectionTimeout: 60000,
    tls: {
        rejectUnauthorized: false
    }
});

export default transporter;

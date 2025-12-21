import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
    console.warn("⚠️ WARNING: RESEND_API_KEY is missing. Email sending will fail.");
}

// Pass a placeholder if missing to prevent startup crash
export const resend = new Resend(apiKey || "re_missing_key");

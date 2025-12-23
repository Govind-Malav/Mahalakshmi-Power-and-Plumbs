import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

async function testEmail() {
    console.log("🚀 Testing Resend Email System...");
    console.log(`🔑 API Key present: ${!!process.env.RESEND_API_KEY}`);
    console.log(`📧 Sending to: ${process.env.ADMIN_EMAIL}`);

    try {
        const data = await resend.emails.send({
            from: 'onboarding@resend.dev', // Default testing domain
            to: process.env.ADMIN_EMAIL || 'delivered@resend.dev',
            subject: 'Test Email from Mahalakshmi Vendor Portal',
            html: '<h1>It Works!</h1><p>Your email system is correctly configured with Resend.</p>'
        });

        console.log("✅ Email sent successfully!");
        console.log("Response:", data);
    } catch (error) {
        console.error("❌ Email failed to send:");
        console.error(error);
    }
}

testEmail();

import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Sends a notification message to the configured Telegram Chat.
 * @param {string} message - The message text to send.
 * @returns {Promise<boolean>} - True if successful, false otherwise.
 */
export const sendTelegramNotification = async (message) => {
    try {
        const token = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (!token || !chatId) {
            console.warn('Telegram credentials not found. Notification skipped.');
            return false;
        }

        const url = `https://api.telegram.org/bot${token}/sendMessage`;

        await axios.post(url, {
            chat_id: chatId,
            text: message,
            parse_mode: 'Markdown', // Optional: allows for bold/italic text
        });

        console.log('Telegram notification sent successfully.');
        return true;
    } catch (error) {
        console.error('Failed to send Telegram notification:', error.message);
        // Don't throw error to prevent blocking main flow
        return false;
    }
};



export const submitContactForm = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Email functionality removed as per user request
        // await sendSupportEmail({ name, email, subject, message });

        res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
        console.error("Contact Form Error:", error);
        res.status(500).json({ message: "Failed to send message" });
    }
};

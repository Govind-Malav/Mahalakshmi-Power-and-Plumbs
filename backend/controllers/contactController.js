
export const submitContactForm = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Log to console instead of sending email
        console.log("Contact Form Submission Received:");
        console.log(`From: ${name} <${email}>`);
        console.log(`Subject: ${subject}`);
        console.log(`Message: ${message}`);

        res.status(200).json({ message: "Message received successfully" });
    } catch (error) {
        console.error("Contact Form Error:", error);
        res.status(500).json({ message: "Failed to send message" });
    }
};

import crypto from "crypto";

// Create Fake UPI Payment Order
export const createPaymentOrder = async (req, res) => {
    try {
        const { amount, currency = "INR" } = req.body;

        // Generate fake order
        const orderId = `UPI_${Date.now()}_${Math.random().toString(36).substring(7).toUpperCase()}`;
        const paymentId = `PAY_${Math.random().toString(36).substring(2, 11).toUpperCase()}`;

        const order = {
            id: orderId,
            amount: amount * 100, // Amount in paise
            currency,
            receipt: `receipt_${Date.now()}`,
            created_at: Date.now(),
            paymentId: paymentId,
            status: "created"
        };

        res.json({
            success: true,
            order,
        });
    } catch (error) {
        console.error("Payment Order Error:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong during payment initialization",
        });
    }
};

// Verify Fake Payment
export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        // Fake verification - always succeed for demo
        if (razorpay_order_id && razorpay_payment_id) {
            res.json({
                success: true,
                message: "Payment verified successfully",
                orderId: razorpay_order_id,
                paymentId: razorpay_payment_id
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Invalid payment details",
            });
        }
    } catch (error) {
        console.error("Verification Error:", error);
        res.status(500).json({ success: false, message: "Verification failed" });
    }
};

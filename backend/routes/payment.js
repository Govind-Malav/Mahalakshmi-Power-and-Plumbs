import express from "express";
import crypto from "crypto";

const router = express.Router();

// CREATE FAKE ORDER
router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const order = {
      id: `UPI_${Date.now()}_${Math.random().toString(36).substring(7).toUpperCase()}`,
      amount: amount * 100, // INR → paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
      status: "created"
    };

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// VERIFY FAKE PAYMENT
router.post("/verify", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  // Fake verification - always success
  if (razorpay_order_id && razorpay_payment_id) {
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false });
  }
});

export default router;

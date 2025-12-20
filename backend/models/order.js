import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true },
    userName: String,

    items: [
      {
        productId: String,
        name: String,
        qty: Number,
        price: Number
      }
    ],

    totalAmount: { type: Number, required: true },
    paymentMethod: String,
    paymentStatus: String,
    status: { type: String, default: "Pending" },

    shippingAddress: String
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);

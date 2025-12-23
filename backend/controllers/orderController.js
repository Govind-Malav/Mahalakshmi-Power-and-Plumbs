import Order from "../models/order.js";
import { sendTelegramNotification } from "../utils/sendTelegramNotification.js";

import PDFDocument from "pdfkit";

// ================================
// CREATE ORDER
// ================================
export const createOrder = async (req, res) => {
  try {
    const {
      items,
      totalAmount,
      paymentMethod,
      shippingAddress,
      userEmail,
      userName
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No items in order"
      });
    }

    if (!userEmail) {
      return res.status(400).json({
        success: false,
        message: "User email required"
      });
    }

    const order = await Order.create({
      items,
      totalAmount,
      paymentMethod,
      paymentStatus: paymentMethod === "cod" ? "Pending" : "Paid",
      shippingAddress,
      userEmail,
      userName: userName || "Customer"
    });

    // Send Telegram Notification (Admin)
    const itemDetails = order.items
      .map(item => `- *${item.name}* (x${item.qty}) - ₹${item.price}`)
      .join('\n');

    const adminMessage = `
📦 *New Order Received!*

*Order ID:* \`${order._id}\`
*Customer:* ${order.userName}
*Email:* ${order.userEmail}
*Phone:* ${order.shippingAddress?.phone || "N/A"}
*Total Amount:* ₹${order.totalAmount}
*Payment Method:* ${order.paymentMethod}

*Items:*
${itemDetails}

*Address:*
${order.shippingAddress?.address}, ${order.shippingAddress?.city}, ${order.shippingAddress?.postalCode}
`;

    sendTelegramNotification(adminMessage);

    res.status(201).json({
      success: true,
      order
    });
  } catch (error) {
    console.error("Order error:", error);
    res.status(500).json({
      success: false,
      message: "Order failed"
    });
  }
};

// ================================
// GET USER ORDERS
// ================================
export const getMyOrders = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email required"
      });
    }

    const orders = await Order.find({ userEmail: email }).sort({
      createdAt: -1
    });

    res.json({
      success: true,
      orders
    });
  } catch (error) {
    console.error("Fetch orders error:", error);
    res.status(500).json({
      success: false,
      message: "Fetch failed"
    });
  }
};

// ================================
// GET ALL ORDERS (ADMIN)
// ================================
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json({
      success: true,
      totalOrders: orders.length,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Fetch all orders failed"
    });
  }
};

// ================================
// DOWNLOAD INVOICE (PDF - FINAL FIX)
// ================================
export const downloadInvoice = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    const doc = new PDFDocument({ margin: 40 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice-${order._id}.pdf`
    );

    doc.pipe(res);

    // ================= HEADER =================
    doc.fontSize(22).text(
      "MAHALAKSHMI ELECTRICAL & SANITARY",
      { align: "center" }
    );
    doc.fontSize(12).text("INVOICE", { align: "center" });
    doc.moveDown();

    // ================= ORDER INFO =================
    doc.fontSize(11);
    doc.text(`Order ID: ${order._id}`);
    doc.text(`Customer Name: ${order.userName}`);
    doc.text(`Email: ${order.userEmail}`);
    doc.text(`Order Date: ${new Date(order.createdAt).toLocaleString()}`);
    doc.text(`Payment Status: ${order.paymentStatus}`);
    doc.moveDown();

    // ================= TABLE HEADER =================
    doc.fontSize(12).text("Order Details", { underline: true });
    doc.moveDown(0.5);

    doc.fontSize(11);
    doc.text("Product", 40, doc.y, { continued: true });
    doc.text("Qty", 260, doc.y, { continued: true });
    doc.text("Price", 320, doc.y, { continued: true });
    doc.text("Total", 400, doc.y);
    doc.moveDown(0.5);

    let grandTotal = 0;

    // ================= ITEMS (FINAL & CORRECT) =================
    order.items.forEach((item) => {
      const productName = item.name || "Product";
      const qty = Number(item.qty || 1);
      const price = Number(item.price || 0);
      const lineTotal = qty * price;

      grandTotal += lineTotal;

      doc.text(productName, 40, doc.y, { continued: true });
      doc.text(qty.toString(), 260, doc.y, { continued: true });
      doc.text(`₹${price}`, 320, doc.y, { continued: true });
      doc.text(`₹${lineTotal}`, 400, doc.y);
    });

    doc.moveDown();

    // ================= GRAND TOTAL =================
    doc.fontSize(13).text(
      `Grand Total: ₹${grandTotal}`,
      { align: "right", underline: true }
    );

    doc.moveDown(2);

    // ================= FOOTER =================
    doc.fontSize(10).text(
      "Thank you for shopping with Mahalakshmi Electrical & Sanitary.\nFor support, please contact us.",
      { align: "center" }
    );

    doc.end();
  } catch (error) {
    console.error("Invoice error:", error);
    res.status(500).json({
      success: false,
      message: "Invoice generation failed"
    });
  }
};

// ================================
// UPDATE ORDER STATUS
// ================================
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, message: "Status is required" });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // normalize status to lowercase for consistency
    order.status = String(status).toLowerCase();
    await order.save();

    return res.json({ success: true, order });
  } catch (error) {
    console.error("Update order status error:", error);
    return res.status(500).json({ success: false, message: "Failed to update order status" });
  }
};



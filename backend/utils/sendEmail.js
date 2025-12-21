import nodemailer from "nodemailer";

export const sendOrderEmail = async (order) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASSWORD
      }
    });

    const itemsHtml = order.items
      .map(
        (item) => `
          <tr>
            <td style="padding:10px;border-bottom:1px solid #333;color:#e5e7eb;">
              ${item.name}
            </td>
            <td style="padding:10px;border-bottom:1px solid #333;text-align:center;color:#e5e7eb;">
              ${item.quantity}
            </td>
            <td style="padding:10px;border-bottom:1px solid #333;text-align:right;color:#e5e7eb;">
              ₹${item.price}
            </td>
            <td style="padding:10px;border-bottom:1px solid #333;text-align:right;color:#22c55e;">
              ₹${item.price * item.quantity}
            </td>
          </tr>
        `
      )
      .join("");

    const html = `
      <div style="
        background:#0f172a;
        color:#e5e7eb;
        font-family:Segoe UI,Roboto,Arial,sans-serif;
        padding:20px;
      ">
        <div style="
          max-width:720px;
          margin:auto;
          background:#020617;
          border-radius:12px;
          padding:24px;
          box-shadow:0 10px 30px rgba(0,0,0,0.4);
        ">

          <h1 style="color:#60a5fa;margin-bottom:10px;">
            🛒 New Order Received – VendorMart
          </h1>

          <p style="margin:0;color:#94a3b8;">
            <strong>Order ID:</strong> ${order.orderId}<br/>
            <strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleString()}
          </p>

          <hr style="border:1px solid #1e293b;margin:20px 0;" />

          <h2 style="color:#38bdf8;">👤 Customer Details</h2>
          <p>
            <strong>Name:</strong> ${order.userName}<br/>
            <strong>Email:</strong> ${order.userEmail}
          </p>

          <h2 style="color:#38bdf8;">📦 Shipping Address</h2>
          <p>${order.shippingAddress}</p>

          <h2 style="color:#38bdf8;">💳 Payment Info</h2>
          <p>
            <strong>Method:</strong> ${order.paymentMethod.toUpperCase()}<br/>
            <strong>Status:</strong> 
            <span style="color:#22c55e;font-weight:bold;">
              ${order.paymentStatus}
            </span>
          </p>

          <h2 style="color:#38bdf8;margin-top:20px;">🧾 Order Items</h2>

          <table style="
            width:100%;
            border-collapse:collapse;
            margin-top:10px;
            background:#020617;
            border-radius:8px;
            overflow:hidden;
          ">
            <thead>
              <tr style="background:#020617;">
                <th style="padding:10px;text-align:left;color:#93c5fd;">Product</th>
                <th style="padding:10px;text-align:center;color:#93c5fd;">Qty</th>
                <th style="padding:10px;text-align:right;color:#93c5fd;">Price</th>
                <th style="padding:10px;text-align:right;color:#93c5fd;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <h2 style="
            margin-top:20px;
            color:#22c55e;
            text-align:right;
          ">
            💰 Total Amount: ₹${order.totalAmount}
          </h2>

          <p style="
            margin-top:20px;
            color:#94a3b8;
            font-size:14px;
          ">
            Please login to the admin dashboard to manage this order.
          </p>

          <hr style="border:1px solid #1e293b;margin:20px 0;" />

          <p style="font-size:12px;color:#64748b;text-align:center;">
            VendorMart • Admin Order Notification
          </p>

        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"VendorMart Orders" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `🛒 New Order | #${order.orderId}`,
      html
    });

    console.log("✅Order email sent to admin");

  } catch (error) {
    console.error("❌ Failed to send order email:", error.message);
  }
};

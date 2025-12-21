import { resend } from "./emailService.js";

export const sendOrderEmail = async (order) => {
  try {
    const itemsHtml = order.items
      .map(
        (item) => `
        <tr style="border-bottom: 1px solid #334155;">
          <td style="padding: 16px; color: #e2e8f0; font-weight: 500;">${item.name}</td>
          <td style="padding: 16px; text-align: center; color: #94a3b8;">${item.quantity}</td>
          <td style="padding: 16px; text-align: right; color: #e2e8f0;">₹${item.price.toLocaleString()}</td>
          <td style="padding: 16px; text-align: right; color: #38bdf8; font-weight: 600;">₹${(item.price * item.quantity).toLocaleString()}</td>
        </tr>
      `
      )
      .join("");

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Order Notification</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #0f172a; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; -webkit-font-smoothing: antialiased;">
        
        <div style="max-width: 600px; margin: 0 auto; background-color: #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); margin-top: 40px; margin-bottom: 40px;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 40px 30px; text-align: center;">
            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">New Order Received! 🚀</h1>
            <p style="margin: 10px 0 0; color: #dbeafe; font-size: 16px;">Order #${order.orderId}</p>
          </div>

          <!-- Content -->
          <div style="padding: 40px 30px;">
            
            <!-- Customer Card -->
            <div style="background-color: #0f172a; border-radius: 12px; padding: 20px; margin-bottom: 30px; border: 1px solid #334155;">
              <h3 style="margin: 0 0 15px; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Customer Details</h3>
              <p style="margin: 0; color: #f1f5f9; font-size: 16px; font-weight: 500;">${order.userName}</p>
              <p style="margin: 5px 0 0; color: #64748b; font-size: 14px;">${order.userEmail}</p>
              <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #1e293b;">
                <p style="margin: 0; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Shipping Address</p>
                <p style="margin: 5px 0 0; color: #cbd5e1; font-size: 14px; line-height: 1.5;">${order.shippingAddress}</p>
              </div>
            </div>

            <!-- Payment Status -->
            <div style="display: flex; justify-content: space-between; margin-bottom: 30px; flex-wrap: wrap; gap: 10px;">
              <div style="background-color: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 15px; flex: 1; min-width: 120px;">
                <p style="margin: 0; color: #94a3b8; font-size: 12px; font-weight: 600;">Payment Method</p>
                <p style="margin: 5px 0 0; color: #f1f5f9; font-weight: 600;">${order.paymentMethod.toUpperCase()}</p>
              </div>
              <div style="background-color: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 15px; flex: 1; min-width: 120px;">
                <p style="margin: 0; color: #94a3b8; font-size: 12px; font-weight: 600;">Status</p>
                <p style="margin: 5px 0 0; color: #22c55e; font-weight: 600;">${order.paymentStatus}</p>
              </div>
            </div>

            <!-- Order Items Table -->
            <h3 style="margin: 0 0 20px; color: #f1f5f9; font-size: 18px; font-weight: 600;">Order Summary</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
              <thead>
                <tr style="border-bottom: 2px solid #334155;">
                  <th style="text-align: left; padding: 12px; color: #94a3b8; font-size: 12px; font-weight: 600; text-transform: uppercase;">Item</th>
                  <th style="text-align: center; padding: 12px; color: #94a3b8; font-size: 12px; font-weight: 600; text-transform: uppercase;">Qty</th>
                  <th style="text-align: right; padding: 12px; color: #94a3b8; font-size: 12px; font-weight: 600; text-transform: uppercase;">Price</th>
                  <th style="text-align: right; padding: 12px; color: #94a3b8; font-size: 12px; font-weight: 600; text-transform: uppercase;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>

            <!-- Total -->
            <div style="background-color: #0f172a; border-radius: 12px; padding: 25px; text-align: right; border: 1px solid #334155;">
              <p style="margin: 0; color: #94a3b8; font-size: 14px; margin-bottom: 5px;">Total Amount</p>
              <h2 style="margin: 0; color: #38bdf8; font-size: 32px; font-weight: 700;">₹${order.totalAmount.toLocaleString()}</h2>
            </div>
            
            <p style="margin-top: 30px; font-size: 14px; color: #64748b; text-align: center;">
              Login to your <a href="#" style="color: #3b82f6; text-decoration: none;">Vendor Dashboard</a> to process this order.
            </p>

          </div>

          <!-- Footer -->
          <div style="background-color: #0f172a; padding: 20px; text-align: center; border-top: 1px solid #334155;">
            <p style="margin: 0; color: #475569; font-size: 13px;">
              &copy; ${new Date().getFullYear()} VendorMart Admin Portal. All rights reserved.
            </p>
          </div>

        </div>
      </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: "VendorMart <onboarding@resend.dev>", // Default testing domain
      to: [process.env.ADMIN_EMAIL],
      subject: `🛒 Order #${order.orderId} Received - ${order.userName}`,
      html: htmlContent,
    });

    if (error) {
      console.error("❌ Resend Error:", error);
      return;
    }

    console.log("✅ Attractive Order Email sent via Resend:", data.id);
    return data;

  } catch (error) {
    console.error("❌ Failed to send attractive order email:", error);
    // Do not throw error to avoid blocking order creation
  }
};


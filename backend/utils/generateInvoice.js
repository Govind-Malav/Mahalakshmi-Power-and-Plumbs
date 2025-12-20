import PDFDocument from "pdfkit";

export const generateInvoice = (res, order) => {
  const doc = new PDFDocument({ margin: 40 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=invoice-${order._id}.pdf`
  );

  doc.pipe(res);

  doc.fontSize(20).text("INVOICE", { align: "center" });
  doc.moveDown();

  doc.fontSize(12).text(`Order ID: ${order._id}`);
  doc.text(`Order Date: ${new Date(order.createdAt).toLocaleString()}`);
  doc.text(`Status: ${order.status}`);
  doc.moveDown();

  doc.text("Products:", { underline: true });
  doc.moveDown(0.5);

  let total = 0;

  order.items.forEach((item, i) => {
    const price = item.price * item.quantity;
    total += price;

    doc.text(
      `${i + 1}. ${item.productId.name}  |  Qty: ${
        item.quantity
      }  |  ₹${price}`
    );
  });

  doc.moveDown();
  doc.fontSize(14).text(`Total Amount: ₹${total}`, { bold: true });

  doc.end();
};

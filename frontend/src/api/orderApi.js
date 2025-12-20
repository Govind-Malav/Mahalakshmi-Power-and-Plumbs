export const downloadInvoiceRequest = (orderId) => {
  window.open(
    `${import.meta.env.VITE_API_URL}/orders/invoice/${orderId}`,
    "_blank"
  );
};

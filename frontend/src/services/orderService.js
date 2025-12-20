import api from "./apiClient";

/**
 * CREATE ORDER
 * @param {Object} orderData
 */
export const createOrderRequest = async (orderData) => {
  try {
    const res = await api.post("/orders", orderData);
    return res.data;
  } catch (error) {
    console.error("Create order failed:", error);
    throw error;
  }
};

/**
 * GET LOGGED-IN USER ORDERS
 * @param {string} email
 */
export const getMyOrdersRequest = async (email) => {
  if (!email) {
    throw new Error("Email is required to fetch orders");
  }

  try {
    const res = await api.get("/orders/my", {
      params: { email }
    });

    // normalize response
    return {
      success: res.data?.success ?? true,
      orders: res.data?.orders ?? []
    };
  } catch (error) {
    console.error("Fetch my orders failed:", error);
    return {
      success: false,
      orders: []
    };
  }
};

/**
 * GET ALL ORDERS (ADMIN)
 */
export const getAllOrdersRequest = async () => {
  try {
    const res = await api.get("/orders");
    return res.data;
  } catch (error) {
    console.error("Fetch all orders failed:", error);
    throw error;
  }
};

/**
 * CREATE RAZORPAY ORDER
 */
export const createPaymentOrderRequest = async (amount) => {
  try {
    const res = await api.post("/payment/order", { amount });
    return res.data;
  } catch (error) {
    console.error("Create payment order failed:", error);
    throw error;
  }
};

/**
 * VERIFY RAZORPAY PAYMENT
 */
export const verifyPaymentRequest = async (paymentData) => {
  try {
    const res = await api.post("/payment/verify", paymentData);
    return res.data;
  } catch (error) {
    console.error("Verify payment failed:", error);
    throw error;
  }
};



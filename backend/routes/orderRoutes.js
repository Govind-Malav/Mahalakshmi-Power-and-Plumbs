import express from "express";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  downloadInvoice,
  updateOrderStatus
} from "../controllers/orderController.js";

const router = express.Router();

/**
 * @route   POST /api/orders
 * @desc    Create new order
 * @access  Public (can be protected later)
 */
router.post("/", createOrder);

/**
 * @route   GET /api/orders/my?email=user@email.com
 * @desc    Get logged-in user's orders
 * @access  Public (email-based for now)
 */
router.get("/my", getMyOrders);

/**
 * @route   GET /api/orders/invoice/:id
 * @desc    Download order invoice (PDF)
 * @access  Public (can be protected later)
 */
router.get("/invoice/:id", downloadInvoice);

/**
 * @route   GET /api/orders
 * @desc    Get all orders (Admin use)
 * @access  Public (can add admin middleware later)
 */
router.get("/", getAllOrders);

/**
 * @route   PUT /api/orders/:id
 * @desc    Update order status (Admin)
 * @access  Public (should be protected by admin middleware)
 */
router.put("/:id", updateOrderStatus);



export default router;

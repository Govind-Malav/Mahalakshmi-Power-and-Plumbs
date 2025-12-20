import Product from "../models/product.js";
import Order from "../models/order.js";
import User from "../models/user.js"; // Import User model directly for efficiency
import { getAllUsers } from "./authController.js";

export const getStats = async (req, res) => {
  try {
    const productsCount = await Product.countDocuments();
    const ordersCount = await Order.countDocuments();
    const usersCount = await User.countDocuments(); // Direct DB count is cleaner

    res.json({
      success: true,
      stats: {
        products: productsCount,
        orders: ordersCount,
        users: usersCount
      }
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    res.status(500).json({ success: false, message: "Failed to get stats" });
  }
};

// ================================
// GET ALL USERS (ADMIN)
// ================================
export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers(); // Await the promise
    // return a safe copy without passwords
    const safe = users.map(u => ({
      id: u._id, // Map _id to id
      name: u.name,
      email: u.email,
      role: u.role
    }));
    res.json({ success: true, users: safe });
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ success: false, message: "Failed to get users" });
  }
};

// ================================
// GET SINGLE USER (ADMIN)
// ================================
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    // Direct DB query is much better than fetching all
    const user = await User.findById(id);

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const safe = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    res.json({ success: true, user: safe });
  } catch (error) {
    console.error("Get user by id error:", error);
    res.status(500).json({ success: false, message: "Failed to get user" });
  }
};

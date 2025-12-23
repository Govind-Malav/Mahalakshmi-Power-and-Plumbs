import jwt from "jsonwebtoken";
import User from "../models/user.js";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "7d" }
  );
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, contact } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password, // Storing plain text as requested for now to match previous behavior
      contact,
      role: "user"
    });

    if (user) {
      res.status(201).json({
        token: generateToken(user),
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          contact: user.contact,
          role: user.role
        }
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};



export const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email?.trim();
    password = password?.trim();

    // 1. Check for Super Admin (Env Variables)
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_LOGIN_PASSWORD
    ) {
      const superAdmin = {
        _id: "superadmin",
        name: "Super Admin",
        email: email,
        contact: "9999999999",
        role: "admin"
      };

      return res.json({
        token: generateToken(superAdmin),
        user: {
          id: superAdmin._id,
          name: superAdmin.name,
          email: superAdmin.email,
          contact: superAdmin.contact,
          role: superAdmin.role
        }
      });
    }

    // 2. Normal Database User Login
    const user = await User.findOne({ email });

    if (user && user.password === password) {
      res.json({
        token: generateToken(user),
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          contact: user.contact,
          role: user.role
        }
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Expose users for admin stats
export const getAllUsers = async () => {
  // Check if called via API request (has req/res) or internal helper
  // This seems to be used as an internal helper or generic export based on previous code
  // If used as controller:
  // export const getAllUsers = async (req, res) => { ... }
  // But previous code was `export const getAllUsers = () => users;`
  // We'll return the promise
  return await User.find({});
};


import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/user.js";

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected for Seeding");

        const adminEmail = "govindmalav2004@gmail.com";

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: adminEmail });
        if (existingAdmin) {
            console.log("⚠️ Admin user already exists. Skipping.");
        } else {
            await User.create({
                name: "Govind",
                email: adminEmail,
                password: "Gaurav@2308",
                role: "admin"
            });
            console.log("🎉 Admin user created successfully!");
        }

        mongoose.disconnect();
        console.log("✅ Seeding complete. Disconnected.");
    } catch (error) {
        console.error("❌ Seeding failed:", error);
        process.exit(1);
    }
};

seedAdmin();

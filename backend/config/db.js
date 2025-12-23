import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connString = process.env.MONGO_URI;

    if (!connString || connString.includes("localhost") || connString.includes("127.0.0.1")) {
      throw new Error("❌ Local MongoDB connections are blocked. Please use an Atlas URI.");
    }

    await mongoose.connect(connString);
    console.log("✅ MongoDB connected to Atlas");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;

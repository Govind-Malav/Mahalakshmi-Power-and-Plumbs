import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      enum: ["electrical", "sanitary", "lighting", "plumbing", "accessories"],
    },
    subcategory: {
      type: String,
      enum: ["products", "appliances", "essentials", "fittings", "pipes"],
      default: "products"
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    stock: {
      type: Number,
      required: true,
      default: 0
    },
    description: {
      type: String,
      trim: true
    },
    image: {
      type: String,
      default: "/images/product-placeholder.png"
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    reviews: {
      type: Number,
      default: 0
    },
    sku: {
      type: String,
      unique: true,
      sparse: true
    },
    section: {
      type: String,
      enum: ["deals", "best-sellers", "new-arrivals"],
      default: null
    }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);

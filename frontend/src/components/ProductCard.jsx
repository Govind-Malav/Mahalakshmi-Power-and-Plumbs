import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import React from "react";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      whileHover={{ scale: 1.02, rotateX: 3, rotateY: -3 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 220 }}
      className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-1 group overflow-hidden perspective-1000"
    >
      {/* IMAGE */}
      <div className="h-48 flex items-center justify-center p-4 relative">
        <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition duration-500 p-2"
          />
        </div>

        {/* QUICK VIEW OVERLAY */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
          <button className="bg-white text-slate-800 px-4 py-2 rounded-full font-semibold shadow">Quick View</button>
        </div>

        {/* IMAGE PRICE BADGE */}
        <div className="absolute bottom-3 left-3 bg-white/90 text-green-700 px-3 py-1 rounded-full font-bold shadow-sm text-sm">
          ₹{product.price}
        </div>

        {/* CATEGORY BADGE */}
        <span className="absolute top-3 left-3 text-xs px-2 py-1 bg-black/75 text-white rounded-full shadow">
          {product.category}
        </span>

        {/* SUBCATEGORY CHIP */}
        {product.subcategory && (
          <span className="absolute top-3 right-3 text-xs px-2 py-1 bg-white/90 text-slate-800 rounded-full shadow">{product.subcategory}</span>
        )}

        {/* SECTION BADGE */}
        {product.section && (
          <span className="absolute top-10 left-3 text-xs px-2 py-1 bg-amber-400 text-white rounded-full shadow">
            {product.section}
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-sm line-clamp-2 min-h-[48px] text-slate-800">
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-green-600 font-bold text-lg">₹{product.price}</div>
            <div className="text-xs text-slate-500">Inclusive of taxes</div>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-md text-sm font-semibold transition active:scale-95 shadow-md"
          >
            Add
          </button>
        </div>

        <Link
          to={`/products/${product.id}`}
          className="inline-block text-blue-600 text-sm hover:underline mt-2"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;

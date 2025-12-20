import React from "react";
import { motion } from "framer-motion";

const OrderTrackingBar = ({ status = "Pending" }) => {

  if (status === "Cancelled") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-4 backdrop-blur-sm"
      >
        <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 text-xl font-bold">
          ✕
        </div>
        <div>
          <p className="font-bold text-red-500 text-lg">Order Cancelled</p>
          <p className="text-sm text-red-400/80">This order has been cancelled and will not be delivered.</p>
        </div>
      </motion.div>
    );
  }

  const steps = ["Pending", "Packed", "Shipped", "Delivered"];
  const current = steps.findIndex(
    (s) => s.toLowerCase() === (status || "").toLowerCase()
  );

  return (
    <div className="w-full mb-6 mt-2">
      <div className="relative flex justify-between items-center w-full">
        {/* Background Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 rounded-full -z-10 transform -translate-y-1/2" />

        {/* Animated Progress Line */}
        <motion.div
          className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full -z-10 transform -translate-y-1/2 origin-left"
          initial={{ width: "0%" }}
          animate={{ width: `${(current / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
        />

        {steps.map((s, idx) => {
          const isCompleted = idx <= current;
          const isCurrent = idx === current;

          return (
            <div key={s} className="flex flex-col items-center gap-2 relative">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.1 + 0.1 }}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 z-10
                  ${isCompleted
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 border-transparent text-white shadow-lg shadow-purple-500/30"
                    : "bg-white border-gray-300 text-gray-400"
                  } ${isCurrent ? "ring-4 ring-purple-100 scale-110" : ""}`}
              >
                {isCompleted ? "✓" : idx + 1}
              </motion.div>
              <span
                className={`text-[11px] font-semibold tracking-wide uppercase transition-colors duration-300 ${isCompleted ? "text-blue-600" : "text-gray-400"
                  }`}
              >
                {s}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTrackingBar;

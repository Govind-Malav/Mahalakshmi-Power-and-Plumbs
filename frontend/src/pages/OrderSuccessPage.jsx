import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

const OrderSuccessPage = () => {
  const [animate, setAnimate] = useState(false);
  const [orderNumber] = useState(`ORD-${Date.now().toString().slice(-8)}`);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-100 py-12 px-4">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-2xl mx-auto relative z-10">

        {/* Success Container */}
        <div className={`transform transition-all duration-1000 ${animate ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}>

          {/* Checkmark Animation */}
          <div className="flex justify-center mb-8">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse opacity-50"></div>
              <div className="relative bg-gradient-to-r from-green-400 to-emerald-500 rounded-full w-32 h-32 flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform">
                <svg
                  className="w-16 h-16 text-white animate-bounce"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8 backdrop-blur-sm border border-white/20">

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">
              Order Placed Successfully! 🎉
            </h1>

            {/* Order Number */}
            <div className="text-center mb-8">
              <p className="text-slate-600 text-sm mb-2">Your Order Number</p>
              <p className="text-2xl font-bold text-slate-900 font-mono bg-slate-100 inline-block px-6 py-2 rounded-lg">
                {orderNumber}
              </p>
            </div>

            {/* Message */}
            <p className="text-slate-600 text-lg text-center mb-8 leading-relaxed">
              Thank you for choosing us! Your order has been confirmed and is being processed.
              You'll receive email updates with tracking information.
            </p>

            {/* Status Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-2xl border-2 border-green-200">
                <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-slate-900">Order Confirmed</p>
                  <p className="text-xs text-slate-600">Just now</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-2xl border-2 border-blue-200">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.414l4 4V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-slate-900">Processing</p>
                  <p className="text-xs text-slate-600">2-3 hours</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-indigo-50 rounded-2xl border-2 border-indigo-200">
                <div className="flex-shrink-0 w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-slate-900">On the Way</p>
                  <p className="text-xs text-slate-600">1-2 days</p>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border-2 border-amber-200 mb-8">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">📧</span>
                <div>
                  <p className="font-bold text-slate-900 mb-1">Check Your Email</p>
                  <p className="text-slate-600 text-sm">
                    We've sent your order confirmation and tracking details to your email address.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Link
              to="/my-orders"
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 rounded-2xl text-center transition-all transform hover:scale-105 shadow-lg"
            >
              <span className="inline-flex items-center">
                <span className="text-xl mr-2">📋</span>
                Order Details
              </span>
            </Link>

            <Link
              to="/products"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-4 rounded-2xl text-center transition-all transform hover:scale-105 shadow-lg"
            >
              <span className="inline-flex items-center">
                <span className="text-xl mr-2">🛍️</span>
                Continue Shopping
              </span>
            </Link>
          </div>

          {/* Home Link */}
          <Link
            to="/"
            className="block text-center text-slate-600 hover:text-slate-900 font-semibold transition"
          >
            ← Back to Home
          </Link>

        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default OrderSuccessPage;


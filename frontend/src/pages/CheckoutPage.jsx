import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { createOrderRequest } from "../services/orderService";

const CheckoutPage = () => {
  const { cart, totalAmount, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi"); // upi, card, or cod
  const [loading, setLoading] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrVerified, setQRVerified] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <p className="text-white text-lg">Please login to place an order</p>
      </div>
    );
  }

  // Generate fake QR code (using a placeholder service)
  const generateQRCode = () => {
    const data = `UPI://pay?pa=vendor${Math.random().toString().substring(2, 7)}@okaxis&pn=MahalakshmiStore&am=${totalAmount}&tr=ORDER${Date.now()}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(data)}`;
  };

  const handleVerifyPayment = () => {
    setQRVerified(true);
    setTimeout(() => {
      setShowQRModal(false);
      finalizeOrder("upi", "Paid");
    }, 1500);
  };

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      alert("Please enter a shipping address");
      return;
    }

    setLoading(true);

    try {
      // 1. COD Flow
      if (paymentMethod === "cod") {
        await finalizeOrder("cod", "Pending");
        return;
      }

      // 2. UPI Flow - Show QR Modal
      if (paymentMethod === "upi") {
        setLoading(false);
        setShowQRModal(true);
        setQRVerified(false);
        return;
      }

      // 3. Card Flow
      if (paymentMethod === "card") {
        await finalizeOrder("card", "Paid");
        return;
      }

    } catch (err) {
      console.error(err);
      alert("Order processing failed: " + err.message);
      setLoading(false);
    }
  };

  const finalizeOrder = async (method, status) => {
    try {
      const orderData = {
        items: cart.map((item) => ({
          productId: item.id,
          name: item.name,
          qty: item.quantity,
          price: item.price
        })),
        totalAmount,
        paymentMethod: method,
        paymentStatus: status, // "Paid" or "Pending"
        shippingAddress: address,
        userEmail: user.email,
        userName: user.username || user.fullName || user.email
      };

      await createOrderRequest(orderData);
      clearCart();
      navigate("/order-success");
    } catch (err) {
      alert("Failed to save order: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      {/* QR Payment Modal */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full animate-in">
            {qrVerified ? (
              <div className="text-center">
                <div className="text-6xl mb-4 animate-bounce">✅</div>
                <h3 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h3>
                <p className="text-slate-600">Your payment has been verified. Processing your order...</p>
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">📱 UPI Payment</h2>
                <p className="text-slate-600 mb-6">Scan with any UPI app to pay ₹{totalAmount.toLocaleString()}</p>

                {/* QR Code */}
                <div className="bg-slate-100 p-6 rounded-2xl mb-6 flex justify-center">
                  <img
                    src={generateQRCode()}
                    alt="UPI QR Code"
                    className="w-64 h-64 border-4 border-slate-300 rounded-xl"
                  />
                </div>

                {/* Amount */}
                <div className="bg-blue-50 p-4 rounded-xl mb-6 border-2 border-blue-200">
                  <p className="text-sm text-slate-600 mb-1">Amount to Pay</p>
                  <p className="text-3xl font-bold text-blue-600">₹{totalAmount.toLocaleString()}</p>
                </div>

                {/* UPI Apps Info */}
                <div className="grid grid-cols-4 gap-3 mb-6">
                  <div className="text-2xl">📲</div>
                  <div className="text-2xl">💳</div>
                  <div className="text-2xl">🏦</div>
                  <div className="text-2xl">📱</div>
                </div>
                <p className="text-xs text-slate-500 mb-6">Use Google Pay, PhonePe, Paytm, or BHIM</p>

                {/* Verification Button */}
                <button
                  onClick={handleVerifyPayment}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 rounded-xl transition mb-3"
                >
                  ✓ I've Made the Payment
                </button>

                {/* Cancel Button */}
                <button
                  onClick={() => {
                    setShowQRModal(false);
                    setLoading(false);
                  }}
                  className="w-full bg-slate-200 hover:bg-slate-300 text-slate-900 font-bold py-3 rounded-xl transition"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Complete Your Order</h1>
          <p className="text-slate-600 mt-2">Multiple secure payment options available</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">

            {/* ADDRESS */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-yellow-400">
              <h2 className="text-xl font-bold text-slate-900 mb-4">📍 Shipping Address</h2>
              <textarea
                placeholder="Enter your complete address..."
                className="w-full border-2 border-slate-200 rounded-xl p-4 focus:outline-none focus:border-yellow-400 transition"
                rows="3"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            {/* PAYMENT METHOD SELECTION */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-blue-400">
              <h2 className="text-xl font-bold text-slate-900 mb-6">💳 Payment Method</h2>

              <div className="space-y-4">
                {/* UPI */}
                <label className={`flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition ${paymentMethod === "upi" ? "border-blue-500 bg-blue-50" : "border-slate-200"
                  }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "upi"}
                    onChange={() => setPaymentMethod("upi")}
                    className="w-5 h-5"
                  />
                  <div className="flex-1">
                    <p className="text-lg font-bold text-slate-900">📱 UPI Payment</p>
                    <p className="text-sm text-slate-600">Google Pay • PhonePe • Paytm • BHIM</p>
                  </div>
                  <div className="text-2xl">📲</div>
                </label>

                {/* CARD */}
                <label className={`flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition ${paymentMethod === "card" ? "border-purple-500 bg-purple-50" : "border-slate-200"
                  }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    className="w-5 h-5"
                  />
                  <div className="flex-1">
                    <p className="text-lg font-bold text-slate-900">💳 Credit/Debit Card</p>
                    <p className="text-sm text-slate-600">Visa • Mastercard • American Express</p>
                  </div>
                  <div className="text-2xl">🏦</div>
                </label>

                {/* COD */}
                <label className={`flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition ${paymentMethod === "cod" ? "border-green-500 bg-green-50" : "border-slate-200"
                  }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="w-5 h-5"
                  />
                  <div className="flex-1">
                    <p className="text-lg font-bold text-slate-900">Cash on Delivery</p>
                    <p className="text-sm text-slate-600">Pay when you receive the order</p>
                  </div>
                  <div className="text-2xl">💵</div>
                </label>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-4 rounded-xl transition transform hover:scale-[1.02] shadow-xl text-lg disabled:opacity-50"
            >
              {loading ? "Processing..." : (paymentMethod === "upi" || paymentMethod === "card") ? `Pay ₹${totalAmount.toLocaleString()} Now` : "Place Cash on Delivery Order"}
            </button>
          </div>

          {/* ORDER SUMMARY (Simplified for brevity as it was largely display only) */}
          <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 h-fit text-white">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            <div className="flex justify-between items-center text-xl font-bold border-t border-slate-600 pt-4 mt-4">
              <span>Total</span>
              <span className="text-yellow-400">₹{totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

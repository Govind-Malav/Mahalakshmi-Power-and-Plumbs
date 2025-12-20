import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, totalAmount } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // DECORATIVE ELEMENTS COMPONENT
  const Decorations = () => (
    <>
      {/* Hanging Lamp (Top Left) */}
      <div className="absolute top-[-20px] left-[10%] z-20 animate-swing pointer-events-none hidden xl:block">
        <div className="w-[2px] h-[150px] bg-slate-800 mx-auto"></div>
        <div className="w-16 h-16 bg-white rounded-full border-4 border-slate-800 shadow-[0_0_60px_rgba(255,255,100,0.6)] flex items-center justify-center relative">
          {/* Filament */}
          <div className="w-8 h-8 border-t-2 border-l-2 border-yellow-500 rounded-full rotate-45 transform mt-2"></div>
          {/* Glow */}
          <div className="absolute inset-0 bg-yellow-200 rounded-full blur-xl opacity-40 animate-pulse"></div>
        </div>
      </div>

      {/* Floating 3D Cube (Top Right) */}
      <div className="absolute top-[10%] right-[5%] z-0 animate-float-3d hidden lg:block opacity-60">
        <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-xl shadow-2xl transform rotate-12 backdrop-blur-sm border border-white/30"></div>
      </div>

      {/* Floating Sphere (Bottom Left) */}
      <div className="absolute bottom-[10%] left-[5%] z-0 animate-float-3d hidden lg:block opacity-60" style={{ animationDelay: '2s', animationDuration: '10s' }}>
        <div className="w-32 h-32 bg-gradient-to-tr from-pink-300 to-rose-500 rounded-full shadow-2xl backdrop-blur-sm border border-white/30"></div>
      </div>
    </>
  );

  // EMPTY CART STATE
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center p-6 text-center animate-gradient-x relative overflow-hidden">
        <Decorations />

        {/* Abstract shapes */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: "2s" }}></div>

        <div className="glass-panel p-12 rounded-[3rem] shadow-2xl mb-8 relative z-10 animate-slide-in">
          <div className="text-8xl mb-4 animate-bounce">🛒</div>
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            Oops! Your cart is empty
          </h2>
          <p className="text-slate-600 mb-8 text-lg">
            Time to add some style to your life.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="bg-zinc-900 text-white px-10 py-4 rounded-full font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-out"
          >
            Start Exploring
          </button>
        </div>
      </div>
    );
  }

  const handleCheckout = () => {
    if (!user) {
      alert("Please login to continue checkout");
      navigate("/login");
      return;
    }
    navigate("/checkout");
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <Decorations />

      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "3s" }}></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 animate-slide-in">
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-purple-800 to-slate-900 drop-shadow-sm">
            Your Collection
          </h1>
          <span className="mt-4 md:mt-0 px-6 py-2 bg-white/50 backdrop-blur-md rounded-full text-slate-600 border border-white/60 shadow-sm font-medium">
            {cart.length} {cart.length === 1 ? "Item" : "Items"}
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">

          {/* LEFT: CART ITEMS */}
          <div className="lg:col-span-8 space-y-6">
            {cart.map((item, index) => (
              <div
                key={item.id}
                style={{ animationDelay: `${index * 100}ms` }}
                className="group relative glass-panel rounded-[2rem] p-6 hover:shadow-2xl transition-all duration-500 ease-out animate-slide-in overflow-hidden border border-white/40"
              >
                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-purple-500/5 group-hover:via-purple-500/10 transition-all duration-700"></div>

                <div className="relative flex flex-col sm:flex-row items-center gap-8">
                  {/* IMAGE */}
                  <div className="w-full sm:w-40 h-40 bg-white rounded-2xl flex items-center justify-center p-4 shadow-inner group-hover:scale-105 group-hover:rotate-3 transition-transform duration-500">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain drop-shadow-xl"
                    />
                  </div>

                  {/* INFO */}
                  <div className="flex-1 w-full text-center sm:text-left z-10">
                    <h3 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-purple-700 transition-colors">{item.name}</h3>
                    <p className="text-3xl font-black text-slate-900 tracking-tight">
                      ₹{item.price.toLocaleString()}
                    </p>
                  </div>

                  {/* CONTROLS */}
                  <div className="flex flex-col items-center gap-6 z-10 w-full sm:w-auto">
                    <div className="flex items-center gap-2 bg-white/60 backdrop-blur rounded-2xl p-1.5 shadow-sm border border-white/50">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm text-slate-600 font-bold hover:bg-slate-50 hover:text-purple-600 disabled:opacity-50 transition-all active:scale-95"
                      >
                        −
                      </button>
                      <span className="text-xl font-bold text-slate-800 w-10 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm text-slate-600 font-bold hover:bg-slate-50 hover:text-purple-600 transition-all active:scale-95"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="group/btn flex items-center gap-2 text-slate-400 hover:text-red-500 transition-colors text-sm font-medium px-4 py-2 rounded-full hover:bg-red-50"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover/btn:animate-bounce">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <div className="lg:col-span-4 animate-slide-in" style={{ animationDelay: "200ms" }}>
            <div className="sticky top-6 glass-panel rounded-[2.5rem] p-8 shadow-2xl border border-white/60">
              <h2 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Order Summary</h2>

              <div className="space-y-6 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Subtotal</span>
                  <span className="text-xl font-bold text-slate-800">₹{totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Shipping</span>
                  <span className="text-emerald-500 font-bold bg-emerald-50 px-3 py-1 rounded-full text-sm">Free</span>
                </div>
                <div className="h-px bg-slate-200 my-2"></div>
                <div className="flex justify-between items-end">
                  <span className="text-lg font-bold text-slate-700">Total</span>
                  <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                    ₹{totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full relative group overflow-hidden bg-slate-900 text-white text-lg font-bold py-5 rounded-2xl shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 flex items-center justify-center gap-2">
                  Proceed to Checkout
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </button>

              {!user && (
                <div className="mt-4 p-4 bg-yellow-50 rounded-2xl border border-yellow-100 flex items-center gap-3 text-sm text-yellow-800">
                  <span className="text-xl">🔒</span>
                  <span>Login required to checkout</span>
                </div>
              )}

              {/* Trust Indicators */}
              <div className="mt-8 pt-6 border-t border-slate-200/60 grid grid-cols-3 gap-2 text-center">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center text-sm">🛡️</div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Secure</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center text-sm">⚡</div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Fast</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-full bg-green-50 text-green-500 flex items-center justify-center text-sm">❤️</div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Loved</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CartPage;

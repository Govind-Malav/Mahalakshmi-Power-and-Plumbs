import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import HeroSlider from "../components/HeroSlider";
import Hero3D from "../components/Hero3D";
import CategoryTiles from "../components/CategoryTiles";
import WhyChooseUs from "../components/WhyChooseUs";
import ReviewsSlider from "../components/ReviewsSlider";
import { motion } from "framer-motion";

export default function HomePage() {
  const featuredProducts = [
    {
      id: 1,
      name: "Modular Electrical Switch",
      category: "Electrical",
      price: 120,
      image: "/images/switch.jpg"
    },
    {
      id: 2,
      name: "LED Ceiling Light",
      category: "Electrical",
      price: 850,
      image: "/images/led.jpg"
    },
    {
      id: 3,
      name: "PVC Pipe",
      category: "Sanitary",
      price: 180,
      image: "/images/pipe.jpg"
    },
    {
      id: 4,
      name: "Water Tap",
      category: "Sanitary",
      price: 260,
      image: "/images/tap.jpg"
    }
  ];

  const moreElectricalProducts = [
    {
      id: 5,
      name: "Power Bank",
      category: "Electrical",
      price: 1200,
      image: "/images/powerbank.jpg"
    },
    {
      id: 6,
      name: "LED Post Top Fitting",
      category: "Electrical",
      price: 1500,
      image: "/images/led-fitting.jpg"
    }
  ];

  const electricalProducts = [
    ...featuredProducts.filter((p) => p.category === "Electrical"),
    ...moreElectricalProducts
  ];

  const moreSanitaryProducts = [
    {
      id: 7,
      name: "Lotion Dispenser",
      category: "Sanitary",
      price: 229,
      image: "/images/lotion-dispenser.png"
    },
    {
      id: 8,
      name: "Hand Shower",
      category: "Sanitary",
      price: 1349,
      image: "/images/hand-shower.png"
    }
  ];

  const sanitaryProducts = [
    ...featuredProducts.filter((p) => p.category === "Sanitary"),
    ...moreSanitaryProducts
  ];

  return (
    <section className="bg-gray-50">

      {/* HERO */}
      <div className="relative bg-gradient-to-r from-slate-900 via-gray-900 to-black text-white">
        {/* 3D layered background (mouse-parallax) */}
        <div className="hidden md:block absolute inset-0">
          <Hero3D />
        </div>
        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                Mahalakshmi Power <br />
                <span className="text-yellow-400">& Plumb</span>
              </h1>

              <p className="text-gray-300 max-w-md mb-8 text-lg">
                Trusted local store for electrical & sanitary essentials.
                Fast delivery • Genuine products • Best prices.
              </p>

              <div className="flex gap-4">
                <Link
                  to="/products?category=electrical"
                  className="bg-yellow-400 text-black px-7 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
                >
                  Shop Electrical
                </Link>

                <Link
                  to="/products?category=sanitary"
                  className="bg-green-600 text-white px-7 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Shop Sanitary
                </Link>
              </div>
            </motion.div>

            {/* RIGHT */}
            <div className="hidden md:block">
              <HeroSlider />
            </div>

          </div>
        </div>
      </div>

      {/* TRUST BADGES (moved to bottom, above footer) */}

      {/* FEATURED */}
      <div className="relative bg-gray-50 overflow-hidden">
        {/* DECORATIONS */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Spotlight Effect */}
          <div className="absolute top-[-20%] left-[20%] w-[60%] h-[100%] bg-gradient-to-b from-white/80 via-white/20 to-transparent transform -skew-x-12 blur-2xl opacity-40 mix-blend-overlay"></div>

          {/* Hanging Vintage Lamp (Top Left) */}
          <div className="absolute top-[-40px] left-[5%] z-20 animate-swing hidden xl:block origin-top">
            <div className="w-[3px] h-[180px] bg-slate-800 mx-auto shadow-sm"></div>
            <div className="w-20 h-20 bg-gradient-to-b from-slate-700 to-slate-900 rounded-t-full rounded-b-lg border-b-8 border-yellow-500 shadow-2xl relative flex items-center justify-center">
              {/* Bulb */}
              <div className="absolute -bottom-6 w-12 h-12 bg-yellow-100 rounded-full border-2 border-yellow-300 shadow-[0_0_50px_rgba(253,224,71,0.8)] animate-pulse"></div>
            </div>
          </div>

          {/* Floating Tools / Cubes (Right) */}
          <div className="absolute top-[15%] right-[2%] z-0 animate-float-3d hidden lg:block opacity-60">
            <div className="w-28 h-28 bg-metal-gradient rounded-xl shadow-2xl transform rotate-12 border border-slate-300/50 backdrop-blur-sm flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-slate-400 rounded-full opacity-50"></div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-14 relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-10 bg-gradient-to-b from-yellow-400 to-amber-500 rounded-md" />
              <div>
                <h2 className="text-3xl font-extrabold mb-1">Featured Products</h2>
                <p className="text-slate-500">Handpicked essentials — trending now</p>
              </div>
            </div>
            <Link to="/products" className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition">See all products →</Link>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-700">Why customers love these</h3>
                <p className="text-sm text-slate-400">Top-rated essentials chosen by professionals</p>
              </div>
              <Link to="/products" className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition">View all</Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {featuredProducts.map((product, idx) => (
                <motion.div key={product.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.06 }}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ELECTRICAL */}
      <div className="bg-gray-50 relative overflow-hidden">
        {/* ELECTRICAL DECORATIONS */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Background Circuit Pattern */}
          <div className="absolute inset-0 bg-circuit-pattern opacity-20 transform rotate-6 scale-150"></div>

          {/* 3D Rotating Gear (Big) */}
          <div className="absolute top-[-10%] right-[-5%] animate-spin-slow opacity-20 hidden lg:block">
            <div className="relative w-64 h-64 bg-slate-900 rounded-full border-8 border-slate-700 flex items-center justify-center shadow-2xl">
              {/* Teeth */}
              {[...Array(8)].map((_, i) => (
                <div key={i} className="absolute w-12 h-16 bg-slate-800 -top-8 origin-bottom rounded-sm" style={{ transform: `rotate(${i * 45}deg) translateY(-50%)`, top: '50%', left: '42%' }}></div>
              ))}
              <div className="w-32 h-32 bg-slate-800 rounded-full border-4 border-slate-600 shadow-inner"></div>
            </div>
          </div>

          {/* Floating 3D Plug */}
          <div className="absolute bottom-[20%] left-[5%] animate-float-3d hidden lg:block opacity-60">
            <div className="relative w-32 h-20 bg-slate-800 rounded-lg shadow-2xl transform -rotate-12 flex items-center justify-end pr-2 border-r-4 border-slate-600">
              {/* Pins */}
              <div className="absolute -right-6 top-4 w-8 h-3 bg-yellow-500 rounded-sm shadow-md"></div>
              <div className="absolute -right-6 bottom-4 w-8 h-3 bg-yellow-500 rounded-sm shadow-md"></div>
              {/* Cord */}
              <div className="absolute -left-20 top-8 w-24 h-4 bg-slate-900 rounded-full -z-10 transform -rotate-6"></div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-14 relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-8 bg-gradient-to-b from-yellow-400 to-amber-500 rounded-md" />
              <div>
                <h2 className="text-3xl font-bold mb-1">Electrical Essentials</h2>
                <p className="text-slate-500">Professional-grade products for your needs</p>
              </div>
            </div>

            <Link
              to="/products?category=electrical&type=appliances"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition"
            >
              View All →
            </Link>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {electricalProducts.map((product, idx) => (
                <motion.div key={product.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.06 }}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SANITARY */}
      <div className="bg-white relative overflow-hidden">
        {/* SANITARY DECORATIONS */}
        <div className="absolute inset-0 pointer-events-none">
          {/* 3D Pipe Network */}
          <div className="absolute top-[-5%] left-[2%] animate-float-up hidden lg:block opacity-40">
            <div className="relative">
              <div className="w-16 h-48 bg-pipe-gradient rounded-full shadow-xl relative z-10 border border-slate-300"></div>
              <div className="absolute top-12 left-10 w-32 h-16 bg-pipe-gradient rounded-full shadow-xl -z-10 transform -rotate-12 border border-slate-300"></div>
              {/* Joint */}
              <div className="absolute top-32 left-[-10px] w-20 h-10 bg-slate-300 rounded-lg shadow-md"></div>
            </div>
          </div>

          {/* Dynamic Water Splash */}
          <div className="absolute bottom-[10%] right-[5%] animate-float-3d hidden lg:block opacity-50">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-30 scale-150 animate-pulse"></div>
              <div className="w-24 h-24 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-br-[80%] rounded-tl-[80%] rounded-tr-[50%] rounded-bl-[50%] rotate-45 shadow-2xl border-t border-l border-white/50"></div>
              {/* Droplets */}
              <div className="absolute -top-10 left-10 w-6 h-6 bg-blue-500 rounded-full animate-bounce delay-100"></div>
              <div className="absolute -top-4 right-[-10px] w-4 h-4 bg-cyan-400 rounded-full animate-bounce delay-300"></div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-14 relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-8 bg-gradient-to-b from-cyan-400 to-sky-500 rounded-md" />
              <div>
                <h2 className="text-3xl font-bold mb-1">Sanitary Essentials</h2>
                <p className="text-slate-500">Quality plumbing & sanitary solutions</p>
              </div>
            </div>

            <Link
              to="/products?category=sanitary&type=essentials"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition"
            >
              View All →
            </Link>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {sanitaryProducts.map((product, idx) => (
                <motion.div key={product.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.06 }}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TRUST BADGES (placed above footer) */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: "⚡", title: "Quality Products" },
            { icon: "🚚", title: "Fast Delivery" },
            { icon: "💳", title: "Secure Payments" },
            { icon: "🏪", title: "Trusted Vendor" }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className="p-6 rounded-xl bg-gray-50 shadow-sm hover:shadow-md transition"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <p className="font-semibold">{item.title}</p>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}

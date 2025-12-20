import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    title: "Electrical Essentials",
    subtitle: "Switches, wires & lighting solutions",
    image: "/images/hero-1.jpg",
    link: "/products?category=electrical"
  },
  {
    title: "Sanitary & Plumbing",
    subtitle: "Modern fittings & durable pipes",
    image: "/images/hero-2.jpg",
    link: "/products?category=sanitary"
  },
  {
    title: "Fast & Reliable Delivery",
    subtitle: "Trusted local vendor service",
    image: "/images/hero-3.jpg",
    link: "/products"
  }
];

const HeroSlider = () => {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const navigate = useNavigate();
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // AUTO SLIDE
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimate(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % slides.length);
        setAnimate(true);
      }, 150);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setAnimate(false);
    setTimeout(() => {
      setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      setAnimate(true);
    }, 150);
  };

  const nextSlide = () => {
    setAnimate(false);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % slides.length);
      setAnimate(true);
    }, 150);
  };

  // MOBILE SWIPE
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    if (touchStartX.current - touchEndX.current > 50) nextSlide();
    if (touchEndX.current - touchStartX.current > 50) prevSlide();
  };

  const slide = slides[index];

  return (
    <div
      className="relative w-full h-[340px] rounded-xl overflow-hidden shadow-xl bg-black"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* IMAGE */}
      <img
        src={slide.image}
        alt={slide.title}
        className="w-full h-full object-cover transition-opacity duration-700"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center">
        <div
          className={`px-6 md:px-10 max-w-xl transition-all duration-700 ${
            animate
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {slide.title}
          </h2>

          <p className="text-white/90 mb-6">
            {slide.subtitle}
          </p>

          {/* CTA */}
          <button
            onClick={() => navigate(slide.link)}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg transition"
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* LEFT ARROW */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white text-2xl px-3 py-1 rounded-full hidden md:block"
      >
        ‹
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white text-2xl px-3 py-1 rounded-full hidden md:block"
      >
        ›
      </button>

      {/* DOTS */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition ${
              i === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;

import React, { useEffect, useRef } from "react";

// Lightweight layered SVG blobs with mouse parallax for a 3D feel.
const Hero3D = () => {
  const containerRef = useRef(null);
  const layersRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      layersRef.current.forEach((el, i) => {
        if (!el) return;
        const depth = (i + 1) * 6; // larger index = more movement
        const tx = x * depth;
        const ty = y * depth;
        el.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotate(${x * 6}deg)`;
      });
    };

    const handleLeave = () => {
      layersRef.current.forEach((el) => {
        if (!el) return;
        el.style.transform = "translate3d(0,0,0) rotate(0deg)";
      });
    };

    container.addEventListener("mousemove", handleMove);
    container.addEventListener("mouseleave", handleLeave);

    return () => {
      container.removeEventListener("mousemove", handleMove);
      container.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
      aria-hidden
    >
      {/* Layer 1 - distant */}
      <div
        ref={(el) => (layersRef.current[0] = el)}
        className="absolute -right-32 -top-20 w-96 h-96 opacity-30 transform transition-transform duration-300"
        style={{ filter: "blur(28px)" }}
      >
        <svg viewBox="0 0 600 600" className="w-full h-full">
          <defs>
            <linearGradient id="g1" x1="0" x2="1">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          <g fill="url(#g1)">
            <path d="M421.6,312.3Q384,374,321,397.5Q258,421,197.2,390.4Q136.5,359.7,95.4,303.2Q54.4,246.8,85.3,190.2Q116.2,133.6,175.2,108.1Q234.2,82.6,292.9,100.7Q351.6,118.9,403.1,157.6Q454.6,196.3,421.6,312.3Z" />
          </g>
        </svg>
      </div>

      {/* Layer 2 - mid */}
      <div
        ref={(el) => (layersRef.current[1] = el)}
        className="absolute -left-40 -bottom-10 w-80 h-80 opacity-40 transform transition-transform duration-300"
        style={{ filter: "blur(20px)" }}
      >
        <svg viewBox="0 0 600 600" className="w-full h-full">
          <defs>
            <linearGradient id="g2" x1="0" x2="1">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
          </defs>
          <g fill="url(#g2)">
            <path d="M436.7,308.3Q393,370.5,333.6,387.6Q274.2,404.7,205.8,385.8Q137.5,366.8,93.8,314.8Q50.1,262.8,78.4,202.2Q106.7,141.7,163.4,106.1Q220.1,70.5,280.1,82.8Q340,95.1,389.4,132.3Q438.9,169.6,436.7,308.3Z" />
          </g>
        </svg>
      </div>

      {/* Layer 3 - near */}
      <div
        ref={(el) => (layersRef.current[2] = el)}
        className="absolute right-8 top-12 w-72 h-72 opacity-70 transform transition-transform duration-300"
        style={{ filter: "blur(6px)" }}
      >
        <svg viewBox="0 0 600 600" className="w-full h-full">
          <defs>
            <linearGradient id="g3" x1="0" x2="1">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
          <g fill="url(#g3)">
            <path d="M394.6,291.6Q357,353.4,298.6,374.9Q240.2,396.4,177.1,374.4Q114,352.3,79.5,305.1Q44.9,257.9,71.8,200.8Q98.7,143.7,153.6,119.8Q208.6,95.9,266.9,112Q325.1,128.1,373.4,159.9Q421.6,191.8,394.6,291.6Z" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Hero3D;

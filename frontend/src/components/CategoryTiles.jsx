import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Electrical",
    image: "/images/electrical.jpg",
    link: "/products?category=electrical"
  },
  {
    name: "Sanitary",
    image: "/images/sanitary.jpg",
    link: "/products?category=sanitary"
  },
  {
    name: "Lighting",
    image: "/images/lighting.jpg",
    link: "/products?category=lighting"
  }
];

export default function CategoryTiles() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {categories.map((c, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.05 }}
          className="relative rounded-xl overflow-hidden shadow-lg"
        >
          <img src={c.image} className="h-56 w-full object-cover" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <Link
              to={c.link}
              className="text-white text-xl font-bold bg-black/50 px-6 py-3 rounded-lg"
            >
              {c.name}
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

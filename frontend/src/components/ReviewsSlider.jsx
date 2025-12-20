import { motion } from "framer-motion";

const reviews = [
  {
    name: "Ramesh Kumar",
    text: "Very good quality products. Fast delivery!"
  },
  {
    name: "Anita Sharma",
    text: "Best electrical shop online. Trusted seller."
  },
  {
    name: "Suresh Verma",
    text: "Affordable prices and genuine items."
  }
];

export default function ReviewsSlider() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {reviews.map((r, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-xl shadow"
        >
          <p className="text-gray-600 italic">“{r.text}”</p>
          <p className="mt-4 font-semibold">{r.name}</p>
        </motion.div>
      ))}
    </div>
  );
}

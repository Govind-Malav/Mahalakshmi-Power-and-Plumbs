import { motion } from "framer-motion";

const points = [
  { icon: "⚡", title: "Quality Products", desc: "Genuine branded items" },
  { icon: "🚚", title: "Fast Delivery", desc: "Quick local delivery" },
  { icon: "💳", title: "Secure Payments", desc: "Safe checkout" },
  { icon: "🏪", title: "Trusted Vendor", desc: "Local & reliable store" }
];

export default function WhyChooseUs() {
  return (
    <div className="grid md:grid-cols-4 gap-6">
      {points.map((p, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -6 }}
          className="bg-white rounded-xl p-6 shadow text-center"
        >
          <div className="text-4xl mb-3">{p.icon}</div>
          <h3 className="font-semibold">{p.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{p.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}

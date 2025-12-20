import React, { useState } from "react";
import { motion } from "framer-motion";

import { sendContactMessage } from "../services/contactService";

const SupportPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendContactMessage(formData);
      alert("Thank you for contacting us! We will get back to you shortly.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Failed to send message", error);
      alert("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-screen filter blur-[100px] opacity-10 animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-screen filter blur-[100px] opacity-10 animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 mb-4">
            How Can We Help You?
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Our dedicated support team is here to assist you with any questions or issues.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">

          {/* CONTACT FORM */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
          >
            <h2 className="text-2xl font-bold mb-6 text-yellow-400">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-slate-400 text-sm mb-2 ml-1">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 text-sm mb-2 ml-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 text-sm mb-2 ml-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                  placeholder="Order Inquiry"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 text-sm mb-2 ml-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all resize-none"
                  placeholder="How can we help you today?"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-3.5 rounded-xl hover:shadow-lg hover:shadow-yellow-500/30 transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>

          {/* CONTACT INFO */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* INFO CARDS */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex items-start gap-4">
              <div className="bg-blue-500/20 p-3 rounded-xl text-blue-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">Phone Support</h3>
                <p className="text-slate-400 mb-2">Mon-Sat from 9am to 6pm</p>
                <a href="tel:+918905337634" className="text-yellow-400 hover:text-yellow-300 font-medium">+91 89053 37634</a>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex items-start gap-4">
              <div className="bg-purple-500/20 p-3 rounded-xl text-purple-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">Email Us</h3>
                <p className="text-slate-400 mb-2">We'll respond within 24 hours</p>
                <a href="mailto:mahalakshmivendors@gmail.com" className="text-yellow-400 hover:text-yellow-300 font-medium">mahalakshmivendors@gmail.com</a>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex items-start gap-4">
              <div className="bg-green-500/20 p-3 rounded-xl text-green-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">Office Address</h3>
                <p className="text-slate-400">
                  kankapura sathy road, Madukkari, <br />
                  Othakalmandapam, Tamil Nadu , 641032
                </p>
              </div>
            </div>

            {/* FAQ SECTION */}
            <div className="bg-slate-800/30 rounded-2xl p-6 border border-white/5">
              <h3 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h3>
              <div className="space-y-3">
                {[
                  {
                    q: "How can I track my order?",
                    a: "You can track your order status in real-time by visiting the 'Track Order' page and entering your order ID."
                  },
                  {
                    q: "What is your return policy?",
                    a: "We accept returns within 7 days of delivery for damaged or incorrect items. Please contact support to initiate a return."
                  },
                  {
                    q: "What payment methods do you accept?",
                    a: "We accept all major credit/debit cards, UPI, and Cash on Delivery (COD) for most locations."
                  },
                  {
                    q: "Do you ship internationally?",
                    a: "Currently, we only ship within India. We are working on expanding our delivery network soon."
                  }
                ].map((item, index) => (
                  <FAQItem key={index} question={item.q} answer={item.a} />
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-white/10 rounded-xl overflow-hidden bg-white/5 transition-all hover:bg-white/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
      >
        <span className="font-medium text-slate-200">{question}</span>
        <svg
          className={`w-5 h-5 text-yellow-500 transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="p-4 pt-0 text-slate-400 text-sm border-t border-white/5">
          {answer}
        </div>
      </motion.div>
    </div>
  );
};

export default SupportPage;

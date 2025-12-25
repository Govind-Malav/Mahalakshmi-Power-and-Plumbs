// import React, { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { getMyOrdersRequest } from "../services/orderService";
// import OrderTrackingBar from "../components/OrderTrackingBar";


// const ProfilePage = () => {
//   const { user, logout } = useAuth();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       if (!user?.email) return;
//       const res = await getMyOrdersRequest(user.email);
//       if (res?.success) setOrders(res.orders || []);
//       setLoading(false);
//     };
//     fetchOrders();
//   }, [user]);

//   if (!user) return <div className="p-6">Please login</div>;

//   return (
//     <div className="min-h-screen bg-gray-100 py-8 px-4">
//       <div className="max-w-7xl mx-auto grid lg:grid-cols-4 gap-6">

//         {/* PROFILE CARD */}
//         <div className="lg:col-span-1">
//           <div className="bg-white rounded-2xl shadow-sm p-6">
//             <h2 className="text-lg font-semibold mb-6">My Profile</h2>

//             <div className="space-y-4 text-sm">
//               <div className="flex items-center gap-3">
//                 <span className="text-xl">📧</span>
//                 <div>
//                   <p className="text-gray-500 text-xs">Email</p>
//                   <p className="font-medium">{user.email}</p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3">
//                 <span className="text-xl">👤</span>
//                 <div>
//                   <p className="text-gray-500 text-xs">Role</p>
//                   <p className="font-medium">User</p>
//                 </div>
//               </div>
//             </div>

//             <button
//               onClick={logout}
//               className="mt-8 w-full bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl font-medium"
//             >
//               Logout
//             </button>
//           </div>
//         </div>

//         {/* ORDERS */}
//         <div className="lg:col-span-3">
//           <div className="bg-white rounded-2xl shadow-sm p-6">
//             <h2 className="text-lg font-semibold mb-4">My Orders</h2>

//             {loading ? (
//               <p>Loading...</p>
//             ) : orders.length === 0 ? (
//               <p className="text-gray-500">No orders found.</p>
//             ) : (
//               <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-2">
//                 {orders.map((o) => (
//                   <div
//                     key={o._id}
//                     className="border rounded-xl p-4 hover:shadow transition bg-gray-50"
//                   >
//                     {/* TOP ROW */}
//                     <div className="flex justify-between items-start mb-2">
//                       <div>
//                         <p className="text-sm font-medium">
//                           Order ID:{" "}
//                           <span className="text-gray-600">{o._id}</span>
//                         </p>
//                         <p className="text-xs text-gray-500">
//                           {new Date(o.createdAt).toLocaleString()}
//                         </p>
//                       </div>

//                       <span
//                         className={`text-xs px-3 py-1 rounded-full font-medium
//                           ${
//                             o.paymentStatus === "Paid"
//                               ? "bg-green-100 text-green-700"
//                               : "bg-yellow-100 text-yellow-700"
//                           }`}
//                       >
//                         {o.paymentStatus}
//                       </span>
//                     </div>

//                     {/* ITEMS */}
//                     <div className="mt-3 space-y-1 text-sm">
//                       {o.items.map((item, idx) => (
//                         <div
//                           key={idx}
//                           className="flex justify-between text-gray-700"
//                         >
//                           <span>
//                             {item.name} × {item.qty}
//                           </span>
//                           <span>₹{item.price * item.qty}</span>
//                         </div>
//                       ))}
//                     </div>

//                     {/* FOOTER */}
//                     <div className="mt-4 flex justify-between items-center border-t pt-3">
//                       <p className="font-semibold text-base">
//                         Total: ₹{o.totalAmount}
//                       </p>

//                       <a
//                         href={`${import.meta.env.VITE_API_URL}/orders/invoice/${o._id}`}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="text-sm px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
//                       >
//                         Download Invoice
//                       </a>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default ProfilePage;


import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getMyOrdersRequest } from "../services/orderService";
import OrderTrackingBar from "../components/OrderTrackingBar";
import { motion, AnimatePresence } from "framer-motion";

// Storage keys for contact and email
const storageKey = (type, email) => `user${type}:${email || "guest"}`;

// Contact & Email field display component
function ContactField({ user }) {
  const [contact, setContact] = useState("");
  const [altEmail, setAltEmail] = useState("");

  useEffect(() => {
    const fromUserContact = user?.phone || user?.contact || "";
    const fromStorageContact = localStorage.getItem(storageKey("Contact", user?.email));
    setContact(fromStorageContact ?? fromUserContact ?? "");

    const fromStorageEmail = localStorage.getItem(storageKey("Email", user?.email));
    setAltEmail(fromStorageEmail ?? "");
  }, [user]);

  useEffect(() => {
    const handler = () => {
      const updated = localStorage.getItem(storageKey("Contact", user?.email)) || "";
      const updatedEmail = localStorage.getItem(storageKey("Email", user?.email)) || "";
      setContact(updated);
      setAltEmail(updatedEmail);
    };
    window.addEventListener("profile:contact:updated", handler);
    return () => window.removeEventListener("profile:contact:updated", handler);
  }, [user]);

  return (
    <div className="mb-6 space-y-4">
      <div className="group p-3 rounded-xl hover:bg-white/5 transition-colors">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
            📞
          </div>
          <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Contact</p>
        </div>
        <p className="pl-11 font-medium text-slate-200 text-lg">{contact || "Not provided"}</p>
      </div>

      <div className="group p-3 rounded-xl hover:bg-white/5 transition-colors">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
            ✉️
          </div>
          <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Email</p>
        </div>
        <p className="pl-11 font-medium text-slate-200 text-lg">{altEmail || user?.email || "Not provided"}</p>
      </div>
    </div>
  );
}

// Edit button component
function ContactEditToggle() {
  const onClick = () => {
    window.dispatchEvent(new CustomEvent("profile:contact:edit"));
  };

  return (
    <button
      onClick={onClick}
      className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all"
      title="Edit Contact Info"
    >
      ✏️
    </button>
  );
}

// Contact editor modal component
function ContactEditor({ user }) {
  const [open, setOpen] = useState(false);
  const [contact, setContact] = useState("");
  const [altEmail, setAltEmail] = useState("");

  useEffect(() => {
    const handler = () => {
      const initContact = localStorage.getItem(storageKey("Contact", user?.email)) || user?.phone || "";
      const initEmail = localStorage.getItem(storageKey("Email", user?.email)) || "";
      setContact(initContact);
      setAltEmail(initEmail);
      setOpen(true);
    };
    window.addEventListener("profile:contact:edit", handler);
    return () => window.removeEventListener("profile:contact:edit", handler);
  }, [user]);

  if (!open) return null;

  const save = () => {
    const contactOk = /^[0-9+\s-]{6,20}$/.test(contact) || contact === "";
    if (!contactOk) {
      alert("Please enter a valid contact number");
      return;
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(altEmail) || altEmail === "";
    if (!emailOk) {
      alert("Please enter a valid email address");
      return;
    }

    localStorage.setItem(storageKey("Contact", user?.email), contact);
    localStorage.setItem(storageKey("Email", user?.email), altEmail);
    setOpen(false);
    window.dispatchEvent(new CustomEvent("profile:contact:updated"));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-slate-900 border border-white/10 rounded-3xl shadow-2xl p-8 w-96 relative overflow-hidden"
        >
          {/* Abstract Background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <h3 className="text-2xl font-bold text-white mb-6 relative z-10">Edit info</h3>

          <div className="space-y-5 relative z-10">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Contact Number</label>
              <input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="+91 99999 99999"
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
              <input
                value={altEmail}
                onChange={(e) => setAltEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="flex gap-4 justify-end mt-8 relative z-10">
            <button
              onClick={() => setOpen(false)}
              className="px-5 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={save}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all font-medium"
            >
              Save Changes
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Main ProfilePage component
const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.email) return;
      const res = await getMyOrdersRequest(user.email);
      if (res?.success) setOrders(res.orders || []);
      setLoading(false);
    };
    fetchOrders();
  }, [user]);

  if (!user) return <div className="p-6 text-white text-center">Please login</div>;

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 relative z-10">

        {/* ================= LEFT : PROFIlE CARD (4 cols) ================= */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="lg:col-span-4"
        >
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden sticky top-24 shadow-2xl">
            {/* Header Gradient */}
            <div className="h-32 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 relative">
              <div className="absolute inset-0 bg-black/10" />
            </div>

            <div className="px-8 pb-8 -mt-16 relative">
              <div className="flex justify-between items-end mb-6">
                <div className="w-32 h-32 rounded-3xl bg-slate-900 border-4 border-slate-800 flex items-center justify-center overflow-hidden shadow-xl relative group">
                  <img
                    src="/images/profile-user.png"
                    alt="Profile"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <ContactEditToggle />
              </div>

              <h2 className="text-3xl font-bold text-white mb-1">
                {user?.name || "User"}
              </h2>
              <p className="text-slate-400 mb-8 font-medium">@{user?.email?.split("@")[0]}</p>

              <ContactField user={user} />

              <div className="grid grid-cols-2 gap-4 mt-8 mb-8">
                <div className="bg-white/5 rounded-2xl p-4 text-center border border-white/5 hover:border-white/20 transition-colors">
                  <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Total Orders</p>
                  <p className="text-2xl font-bold text-white">{orders?.length || 0}</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 text-center border border-white/5 hover:border-white/20 transition-colors">
                  <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Spent</p>
                  <p className="text-2xl font-bold text-emerald-400">₹{(orders || []).reduce((sum, o) => sum + (o.totalAmount || 0), 0).toLocaleString()}</p>
                </div>
              </div>

              <button
                onClick={logout}
                className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 group"
              >
                <span>Sign Out</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* ================= RIGHT : ORDERS LIST (8 cols) ================= */}
        <div className="lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-between mb-8"
          >
            <h2 className="text-3xl font-bold text-white">Order History</h2>
            <div className="bg-white/5 px-4 py-2 rounded-full border border-white/10 text-sm text-slate-300">
              Showing {orders.length} orders
            </div>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center">
              <p className="text-slate-400 text-lg">No orders found yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((o, index) => {
                const expectedDate = new Date(o.createdAt);
                expectedDate.setDate(expectedDate.getDate() + 5);

                return (
                  <motion.div
                    key={o._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-white/20 hover:bg-white/[0.07] transition-all group shadow-lg"
                  >
                    {/* Header */}
                    <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-slate-400 text-sm">Order ID</span>
                          <span className="font-mono text-blue-300 bg-blue-500/10 px-2 py-0.5 rounded text-sm">{o._id}</span>
                        </div>
                        <p className="text-slate-500 text-sm">
                          Placed on {new Date(o.createdAt).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${o.paymentStatus === "Paid"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                          }`}>
                          {o.paymentStatus}
                        </div>
                      </div>
                    </div>

                    {/* Tracking */}
                    <div className="mb-8">
                      <OrderTrackingBar status={o.status || "Pending"} />
                    </div>

                    {/* Items Grid */}
                    <div className="bg-black/20 rounded-2xl p-4 mb-6 space-y-3">
                      {o.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-slate-300">
                              📦
                            </div>
                            <span className="text-slate-200 font-medium">
                              {item.name} <span className="text-slate-500">× {item.qty}</span>
                            </span>
                          </div>
                          <span className="text-slate-300 font-mono">₹{(item.price * item.qty).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-end border-t border-white/5 pt-6">
                      <div>
                        <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Total Amount</p>
                        <p className="text-2xl font-bold text-white">₹{o.totalAmount.toLocaleString()}</p>
                      </div>

                      <a
                        href={`${import.meta.env.VITE_API_URL}/orders/invoice/${o._id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-200 transition-colors shadow-lg shadow-white/5"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                        </svg>
                        Invoice
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

      </div>
      <ContactEditor user={user} />
    </div>
  );
};

export default ProfilePage;


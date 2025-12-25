// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { useCart } from "../context/CartContext";
// import React, { useState } from "react";

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const { cart } = useCart();
//   const navigate = useNavigate();

//   const [searchTerm, setSearchTerm] = useState("");

//   const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchTerm.trim()) {
//       navigate(`/products?search=${searchTerm}`);
//       setSearchTerm("");
//     }
//   };

//   return (
//     <nav className="sticky top-0 z-50">

//       {/* ===================== TOP BAR ===================== */}
//       <div className="bg-slate-900 text-white shadow-md">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex items-center justify-between h-16">

//             {/* LOGO */}
//             <Link to="/home" className="text-2xl font-bold text-yellow-400">
//               Mahalakshmi
//             </Link>

//             {/* MAIN CATEGORIES */}
//             <div className="hidden md:flex gap-6 ml-8">
//               <Link
//                 to="/category/electrical"
//                 className="hover:text-yellow-400 transition font-semibold"
//               >
//                 Electrical
//               </Link>
//               <Link
//                 to="/category/sanitary"
//                 className="hover:text-yellow-400 transition font-semibold"
//               >
//                 Sanitary
//               </Link>
//             </div>

//             {/* SEARCH */}
//             <form
//               onSubmit={handleSearch}
//               className="flex-1 mx-6 hidden md:flex"
//             >
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 className="w-full px-4 py-2 rounded-l-md text-black focus:outline-none"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <button
//                 type="submit"
//                 className="bg-yellow-400 px-5 rounded-r-md text-black font-semibold hover:bg-yellow-500"
//               >
//                 Search
//               </button>
//             </form>

//             {/* RIGHT SIDE */}
//             <div className="flex items-center gap-6">

//               {/* CART */}
//               <Link to="/cart" className="relative text-lg">
//                 🛒
//                 {cartCount > 0 && (
//                   <span className="absolute -top-2 -right-3 bg-red-500 text-xs px-2 rounded-full">
//                     {cartCount}
//                   </span>
//                 )}
//               </Link>

//               {/* AUTH */}
//               {user ? (
//                 <>
//                   <Link
//                     to="/profile"
//                     className="hover:text-yellow-400 transition"
//                   >
//                     Profile
//                   </Link>

//                   {user.role === "admin" && (
//                     <Link
//                       to="/admin"
//                       className="hover:text-yellow-400 transition"
//                     >
//                       Admin
//                     </Link>
//                   )}

//                   <button
//                     onClick={() => {
//                       logout();
//                       navigate("/");
//                     }}
//                     className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
//                   >
//                     Logout
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <Link to="/login" className="hover:text-yellow-400">
//                     Login
//                   </Link>
//                   <Link
//                     to="/register"
//                     className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
//                   >
//                     Sign Up
//                   </Link>
//                 </>
//               )}
//             </div>

//           </div>
//         </div>
//       </div>

//       {/* ===================== SECONDARY UTILITY BAR ===================== */}
//       <div className="bg-white border-b shadow-sm">
//         <div className="max-w-7xl mx-auto px-6">
//           <ul className="flex items-center gap-8 py-3 text-sm font-medium text-gray-700">

//             <li
//               onClick={() => navigate("/products?filter=deals")}
//               className="cursor-pointer hover:text-yellow-500 flex items-center gap-1"
//             >
//               🔥 Deals
//             </li>

//             <li
//               onClick={() => navigate("/products?filter=best-sellers")}
//               className="cursor-pointer hover:text-yellow-500 flex items-center gap-1"
//             >
//               ⭐ Best Sellers
//             </li>

//             <li
//               onClick={() => navigate("/products?filter=new")}
//               className="cursor-pointer hover:text-yellow-500 flex items-center gap-1"
//             >
//               🆕 New Arrivals
//             </li>

//             <li
//               onClick={() => navigate("/my-orders")}
//               className="cursor-pointer hover:text-yellow-500 flex items-center gap-1"
//             >
//               🚚 Track Order
//             </li>

//             <li
//               onClick={() => navigate("/support")}
//               className="cursor-pointer hover:text-yellow-500 flex items-center gap-1"
//             >
//               📞 Support
//             </li>

//           </ul>
//         </div>
//       </div>

//     </nav>
//   );
// };

// export default Navbar;
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import React, { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${searchTerm}`);
      setSearchTerm("");
    }
  };

  return (
    <nav className="sticky top-0 z-50">

      {/* ===================== TOP MAIN NAVBAR ===================== */}
      <div className="bg-slate-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-20">

            {/* LOGO */}
            <Link to="/home" className="text-2xl font-bold text-yellow-400">
              Mahalakshmi
            </Link>

            {/* MAIN CATEGORIES */}
            <div className="hidden md:flex gap-10 ml-8 text-sm font-semibold">
              <Link
                to="/category/electrical"
                className="hover:text-yellow-400 transition"
              >
                Electrical
              </Link>
              <Link
                to="/category/sanitary"
                className="hover:text-yellow-400 transition"
              >
                Sanitary
              </Link>
            </div>

            {/* SEARCH BAR */}
            <form
              onSubmit={handleSearch}
              className="flex-1 mx-10 hidden md:flex"
            >
              <input
                type="text"
                placeholder="Search products, brands & more..."
                className="w-full px-4 py-2 rounded-l-md text-black focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="bg-yellow-400 px-5 rounded-r-md text-black font-semibold hover:bg-yellow-500"
              >
                Search
              </button>
            </form>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-10 text-sm">

              {/* AUTH & CART */}
              {user ? (
                <>
                  {/* CART (Only visible when logged in) */}
                  <Link to="/cart" className="relative text-lg">
                    🛒
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-3 bg-red-500 text-xs px-2 rounded-full">
                        {cartCount}
                      </span>
                    )}
                  </Link>

                  <Link
                    to="/profile"
                    className="hover:text-yellow-400 transition"
                  >
                    Profile
                  </Link>

                  {user.role === "admin" && (
                    <Link
                      to="/admin"
                      className="hover:text-yellow-400 transition"
                    >
                      Admin
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                    className="bg-red-500 px-4 py-1.5 rounded hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="hover:text-yellow-400 transition">
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-yellow-400 text-black px-4 py-1.5 rounded hover:bg-yellow-500 transition font-semibold"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* ===================== SECONDARY UTILITY BAR ===================== */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-center md:justify-start">
            <ul className="flex items-center gap-12 py-3 text-sm font-medium text-gray-700 overflow-x-auto no-scrollbar">

              <li
                onClick={() => navigate("/products?filter=deals")}
                className="cursor-pointer hover:text-yellow-500 flex items-center gap-2 whitespace-nowrap transition"
              >
                🔥 Deals
              </li>

              <li
                onClick={() => navigate("/products?filter=best-sellers")}
                className="cursor-pointer hover:text-yellow-500 flex items-center gap-2 whitespace-nowrap transition"
              >
                ⭐ Best Sellers
              </li>

              <li
                onClick={() => navigate("/products?filter=new-arrivals")}
                className="cursor-pointer hover:text-yellow-500 flex items-center gap-2 whitespace-nowrap transition"
              >
                🆕 New Arrivals
              </li>

              <li
                onClick={() => navigate("/profile")}
                className="cursor-pointer hover:text-yellow-500 flex items-center gap-2 whitespace-nowrap transition"
              >
                🚚 Track Order
              </li>

              <li
                onClick={() => navigate("/support")}
                className="cursor-pointer hover:text-yellow-500 flex items-center gap-2 whitespace-nowrap transition"
              >
                📞 Support
              </li>

            </ul>
          </div>
        </div>
      </div>



    </nav >
  );
};

export default Navbar;

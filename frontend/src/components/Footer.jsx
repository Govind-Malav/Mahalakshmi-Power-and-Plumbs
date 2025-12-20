import React from "react";
const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">

        <div>
          <h3 className="text-lg font-semibold text-white">Mahalakshmi</h3>
          <p className="text-sm mt-2">
            One-stop  store for Electrical & Sanitary items.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-white">Categories</h4>
          <ul className="mt-2 space-y-1 text-sm">
            <li>Electrical Items</li>
            <li>Sanitary Items</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white">Support</h4>
          <p className="text-sm mt-2">Email: mahalakshmivendors@gmail.com</p>
          <p className="text-sm">Phone: +91 8905337634</p>
        </div>
      </div>

      <div className="text-center text-sm py-3 bg-slate-800">
        © 2025 Mahalakshmi. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

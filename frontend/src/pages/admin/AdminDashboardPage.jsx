import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import api from "../../services/apiClient";

const StatCard = ({ title, value, icon, color = "from-green-400 to-emerald-500" }) => (
  <div className={`bg-white rounded-2xl shadow-md p-5 flex items-center gap-4`}> 
    <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center text-white text-xl shadow-lg`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
    </div>
  </div>
);

const ActionCard = ({ to, title, desc, icon, accent = "yellow" }) => (
  <Link to={to} className={`block p-6 rounded-2xl bg-white shadow hover:shadow-xl transition transform hover:-translate-y-1`}>
    <div className="flex items-start gap-4">
      <div className="text-3xl">{icon}</div>
      <div>
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>
    </div>
  </Link>
);

const AdminDashboardPage = () => {
  const [counts, setCounts] = useState({ products: 0, orders: 0, users: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCounts = async () => {
      try {
        setLoading(true);
        const res = await api.get("/admin/stats");
        if (res.data && res.data.stats) {
          setCounts({
            products: res.data.stats.products || 0,
            orders: res.data.stats.orders || 0,
            users: res.data.stats.users || 0
          });
        }
      } catch (err) {
        console.error("Failed to load dashboard counts", err);
      } finally {
        setLoading(false);
      }
    };
    loadCounts();
  }, []);

  return (
    <section className="bg-gradient-to-b from-slate-50 to-white min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-6">

        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Admin Dashboard</h1>
            <p className="text-sm text-slate-500 mt-1">Overview of store activity and quick actions</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-white px-4 py-2 rounded-lg shadow hover:shadow-md text-sm">Settings</button>
            <Link to="/admin/products/add" className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 text-sm">Add Product</Link>
          </div>
        </header>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <StatCard title="Products" value={loading ? '...' : counts.products} icon="📦" color="from-indigo-500 to-indigo-600" />
          <StatCard title="Orders" value={loading ? '...' : counts.orders} icon="🧾" color="from-emerald-400 to-emerald-500" />
          <StatCard title="Users" value={loading ? '...' : counts.users} icon="👥" color="from-yellow-400 to-yellow-500" />
        </div>

        {/* ACTIONS */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <ActionCard to="/admin/products/add" title="Add Product" desc="Create a new product listing quickly" icon="➕" />
          <ActionCard to="/admin/orders" title="Manage Orders" desc="View recent orders and update status" icon="📦" />
          <ActionCard to="/admin/users" title="Users" desc="View registered users and details" icon="👥" />
          <ActionCard to="/admin/products" title="Manage Products" desc="Edit or remove existing products" icon="🛠️" />
        </div>

        {/* RECENT ACTIVITY - placeholder */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
          <p className="text-sm text-gray-500">No recent activity to display. Use the Manage Orders or Manage Products pages to view updates.</p>
        </div>

      </div>
    </section>
  );
};

export default AdminDashboardPage;

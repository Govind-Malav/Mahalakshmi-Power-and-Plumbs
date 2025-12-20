import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import api from "../../services/apiClient";

const ManageProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data.products || []);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = filterCategory === "all" || p.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, filterCategory]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure? This cannot be undone.")) return;

    try {
      await api.delete(`/products/${id}`);
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      alert("Delete failed: " + err.response?.data?.message || err.message);
    }
  };

  const getSectionBadge = (section) => {
    if (!section) return null;
    const badges = {
      "deals": "🔥 Deals",
      "best-sellers": "⭐ Best Sellers",
      "new-arrivals": "📦 New Arrivals"
    };
    return badges[section] || section;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  const categories = ["all", "electrical", "sanitary"];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Products</h1>
            <p className="text-gray-600 mt-1">{filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found</p>
          </div>

          <Link
            to="/admin/products/add"
            className="inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition shadow-lg"
          >
            + Add Product
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Products</label>
              <input
                type="text"
                placeholder="Search by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat === "all" ? "All Categories" : cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Table */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-12 text-center">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-xl text-gray-600 font-semibold">No products found</p>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters, or add a new product.</p>
            <Link
              to="/admin/products/add"
              className="inline-block mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-semibold transition"
            >
              Add First Product
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Product</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Section</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Price</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProducts.map((p, idx) => (
                    <tr key={p._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            <img src={p.image || "/images/product-placeholder.png"} alt={p.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{p.name}</p>
                            <p className="text-xs text-gray-500">{p.subcategory || "—"}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {p.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {p.section ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
                            {getSectionBadge(p.section)}
                          </span>
                        ) : (
                          <span className="text-gray-400 text-sm">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 font-semibold text-green-600">₹{p.price}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            to={`/admin/products/${p._id}`}
                            className="inline-flex items-center px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-sm font-medium transition"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(p._id)}
                            className="inline-flex items-center px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-medium transition"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer Stats */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 px-6 py-4 flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold">{filteredProducts.length}</span> of <span className="font-semibold">{products.length}</span> products
              </p>
              <div className="text-sm text-gray-600">
                Total Value: <span className="font-semibold text-green-600">₹{filteredProducts.reduce((sum, p) => sum + p.price, 0).toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ManageProductsPage;

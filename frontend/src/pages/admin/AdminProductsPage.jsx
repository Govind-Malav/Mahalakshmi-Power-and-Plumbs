import React, { useEffect, useState } from "react";
import api from "../../services/apiClient";

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      console.log("🔍 Fetching products from backend...");
      const response = await api.get("/products");
      console.log("✅ Products fetched:", response.data);
      setProducts(response.data);
      setError("");
    } catch (err) {
      console.error("❌ Error fetching products:", err);
      console.error("Error status:", err.response?.status);
      console.error("Error data:", err.response?.data);
      setError("Failed to load products: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
      alert("Product deleted successfully!");
    } catch (err) {
      alert("Error deleting product: " + (err.response?.data?.message || err.message));
    }
  };

  const handleEdit = (id) => {
    const product = products.find((p) => p.id === id);
    localStorage.setItem("editProduct", JSON.stringify(product));
    window.location.href = "/admin/edit-product";
  };

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Manage Products</h1>
          <button 
            onClick={fetchProducts}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            🔄 Refresh
          </button>
        </div>

        {error && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{error}</div>}

        {loading ? (
          <p>Loading products...</p>
        ) : products.length === 0 ? (
          <p>No products added yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border">Name</th>
                  <th className="p-3 border">Category</th>
                  <th className="p-3 border">Price</th>
                  <th className="p-3 border">Section</th>
                  <th className="p-3 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td className="p-3 border">{p.name}</td>
                    <td className="p-3 border">{p.category}</td>
                    <td className="p-3 border">₹{p.price}</td>
                    <td className="p-3 border">{p.section || "-"}</td>
                    <td className="p-3 border space-x-2">
                      <button
                        onClick={() => handleEdit(p.id)}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </section>
  );
};

export default AdminProductsPage;

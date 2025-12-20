import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/apiClient";

const placeholder = "/images/product-placeholder.png";

const allowedSubcategories = {
  electrical: ["products", "appliances"],
  sanitary: ["products", "essentials"]
};

const allowedSections = ["deals", "best-sellers", "new-arrivals"];

const EditProductsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data.product || res.data);
      } catch (err) {
        setError("Failed to load product: " + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const imagePreview = useMemo(() => (product?.image ? product.image : placeholder), [product?.image]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: name === "price" ? (value ? parseFloat(value) : "") : value
    });
  };

  const validate = () => {
    if (!product.name.trim()) return "Product name is required";
    if (!product.price || Number(product.price) <= 0) return "Price must be greater than 0";

    const cat = product.category.toLowerCase();
    const sub = product.subcategory ? product.subcategory.toLowerCase() : "products";

    if (allowedSubcategories[cat] && !allowedSubcategories[cat].includes(sub)) {
      return `Subcategory '${sub}' is not valid for '${cat}'`;
    }

    if (product.section && product.section !== "none" && !allowedSections.includes(product.section)) {
      return `Invalid section selected`;
    }

    return null;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setSaving(true);
    try {
      const updateData = {
        name: product.name.trim(),
        price: parseFloat(product.price),
        category: product.category.toLowerCase(),
        subcategory: product.subcategory.toLowerCase(),
        description: product.description,
        image: product.image || placeholder,
        section: product.section && product.section !== "none" ? product.section : undefined
      };

      const res = await api.put(`/products/${id}`, updateData);

      if (res.data?.success || res.status === 200) {
        setSuccess("Product updated successfully!");
        setTimeout(() => navigate("/admin/products"), 1500);
      } else {
        setError(res.data?.message || "Failed to update product");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || "Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl font-semibold">Product not found</p>
          <button onClick={() => navigate("/admin/products")} className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg">
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        {/* FORM */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Edit Product</h2>
            <p className="text-sm text-gray-500 mt-1">Update product details and pricing information</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded mb-4">
              ✓ {success}
            </div>
          )}

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-yellow-500"
                placeholder="e.g. 2.5mm Copper Wire"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (INR) *</label>
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-yellow-500"
                  placeholder="e.g. 47"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                <select
                  name="section"
                  value={product.section || "none"}
                  onChange={handleChange}
                  className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="none">No Special Section</option>
                  <option value="deals">🔥 Deals</option>
                  <option value="best-sellers">⭐ Best Sellers</option>
                  <option value="new-arrivals">📦 New Arrivals</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select
                  name="category"
                  value={product.category}
                  onChange={(e) => {
                    handleChange(e);
                    setProduct(prev => ({ ...prev, subcategory: "products" }));
                  }}
                  className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="electrical">Electrical</option>
                  <option value="sanitary">Sanitary</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
                <select
                  name="subcategory"
                  value={product.subcategory}
                  onChange={handleChange}
                  className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-yellow-500"
                >
                  {product.category === "electrical" ? (
                    <>
                      <option value="products">Electrical Products</option>
                      <option value="appliances">Electrical Appliances</option>
                    </>
                  ) : (
                    <>
                      <option value="products">Sanitary Products</option>
                      <option value="essentials">Sanitary Essentials</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="text"
                name="image"
                value={product.image}
                onChange={handleChange}
                className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-yellow-500"
                placeholder="/images/item.jpg or https://..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={product.description || ""}
                onChange={handleChange}
                rows={4}
                className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-yellow-500"
                placeholder="Short product description"
              />
            </div>

            <div className="flex gap-4 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold shadow transition disabled:bg-gray-400"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/products")}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-lg font-semibold shadow transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* PREVIEW + INFO */}
        <aside className="bg-white rounded-2xl shadow p-6 h-fit">
          <h3 className="font-semibold text-lg mb-4">Live Preview</h3>
          <div className="border rounded-lg overflow-hidden mb-4 bg-gray-50">
            <img src={imagePreview} alt="preview" className="w-full h-48 object-cover" />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-md text-gray-900">{product.name || "Product title"}</h4>
                  <div className="text-sm text-gray-500">{product.category} • {product.subcategory}</div>
                </div>
                {product.section && product.section !== "none" && (
                  <div className="text-xs bg-amber-400 text-white px-2 py-1 rounded font-semibold">
                    {product.section}
                  </div>
                )}
              </div>

              <div className="text-2xl font-bold text-green-600 mb-2">₹{product.price || "0"}</div>
              <p className="text-sm text-gray-600">{product.description || "Description appears here."}</p>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-blue-900 font-semibold">Product ID</p>
              <p className="text-blue-700 font-mono text-xs">{product._id}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-700 font-semibold mb-1">Tips</p>
              <ul className="text-gray-600 text-xs space-y-1 list-disc ml-4">
                <li>Update price to reflect market changes</li>
                <li>Choose section for special promotions</li>
                <li>Keep description under 200 chars</li>
              </ul>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default EditProductsPage;

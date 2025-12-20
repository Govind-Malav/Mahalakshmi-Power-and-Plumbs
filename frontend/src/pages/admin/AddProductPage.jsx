import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/apiClient";

const placeholder = "/images/product-placeholder.png";

const allowedSubcategories = {
  electrical: ["products", "appliances"],
  sanitary: ["products", "essentials"]
};

const allowedSections = ["deals", "best-sellers", "new-arrivals"];

const AddProductPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("electrical");
  const [subcategory, setSubcategory] = useState("products");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [section, setSection] = useState("none");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const imagePreview = useMemo(() => (image ? image : placeholder), [image]);

  const validate = () => {
    if (!name.trim()) return "Product name is required";
    if (!price || Number(price) <= 0) return "Price must be greater than 0";

    const cat = category.toLowerCase();
    const sub = subcategory ? subcategory.toLowerCase() : "products";

    if (allowedSubcategories[cat] && !allowedSubcategories[cat].includes(sub)) {
      return `Subcategory '${sub}' is not valid for '${cat}'`;
    }

    if (section !== "none" && !allowedSections.includes(section)) {
      return `Invalid section selected`;
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setLoading(true);

    try {
      const newProduct = {
        name: name.trim(),
        price: parseFloat(price),
        category: category.toLowerCase(),
        subcategory: subcategory.toLowerCase(),
        description,
        image: image || placeholder,
        section: section !== "none" ? section : undefined
      };

      const res = await api.post("/products", newProduct);
      if (res.data?.success) {
        navigate("/admin/products");
      } else {
        setError(res.data?.message || "Failed to add product");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        {/* FORM */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow p-8">
          <h2 className="text-2xl font-bold mb-4">Add Product</h2>
          <p className="text-sm text-gray-500 mb-6">Create a professional product listing. Fields marked required must be provided.</p>

          {error && <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
              <input value={name} onChange={e => setName(e.target.value)} className="w-full border px-4 py-3 rounded-lg" placeholder="e.g. 2.5mm Copper Wire" />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (INR) *</label>
                <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="w-full border px-4 py-3 rounded-lg" placeholder="e.g. 47" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                <select value={section} onChange={e => setSection(e.target.value)} className="w-full border px-4 py-3 rounded-lg">
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
                <select value={category} onChange={e => { setCategory(e.target.value); setSubcategory("products"); }} className="w-full border px-4 py-3 rounded-lg">
                  <option value="electrical">Electrical</option>
                  <option value="sanitary">Sanitary</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
                <select value={subcategory} onChange={e => setSubcategory(e.target.value)} className="w-full border px-4 py-3 rounded-lg">
                  {category === "electrical" ? (
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
              <input value={image} onChange={e => setImage(e.target.value)} className="w-full border px-4 py-3 rounded-lg" placeholder="/images/item.jpg or https://..." />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} className="w-full border px-4 py-3 rounded-lg" placeholder="Short product description" />
            </div>

            <div className="pt-2">
              <button disabled={loading} type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-semibold shadow">
                {loading ? "Adding..." : "Add Product"}
              </button>
            </div>
          </form>
        </div>

        {/* PREVIEW + TIPS */}
        <aside className="bg-white rounded-2xl shadow p-6">
          <h3 className="font-semibold text-lg mb-4">Preview</h3>
          <div className="border rounded-lg overflow-hidden mb-4">
            <div className="w-full h-48 flex items-center justify-center bg-white">
              <img src={imagePreview} alt="preview" className="max-h-full max-w-full object-contain" />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-md">{name || "Product title"}</h4>
                  <div className="text-sm text-gray-500">{category} • {subcategory}</div>
                </div>
                {section !== "none" && <div className="text-xs bg-amber-400 text-white px-2 py-1 rounded">{section}</div>}
              </div>

              <div className="text-xl font-bold text-green-600">₹{price || "0"}</div>
              <p className="text-sm text-gray-500 mt-3">{description || "Short description appears here."}</p>
            </div>
          </div>

          <h4 className="font-semibold mb-2">Quick Tips</h4>
          <ul className="text-sm text-gray-600 list-disc ml-5 space-y-2">
            <li>Use clear product titles and accurate prices.</li>
            <li>Upload square images or provide high-resolution URLs.</li>
            <li>Assign products to a section only if you want them highlighted.</li>
          </ul>
        </aside>

      </div>
    </div>
  );
};

export default AddProductPage;

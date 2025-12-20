import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const ProductsPage = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const category = params.get("category");
  const filter = params.get("filter"); // deals, best-sellers, new-arrivals
  const type = params.get("type"); // subcategory
  const searchTerm = params.get("search") || "";

  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);

        // Build query params for API
        let url = "/products";
        const queryParams = new URLSearchParams();
        
        if (category) queryParams.append("category", category);
        if (filter) queryParams.append("filter", filter);
        if (searchTerm) queryParams.append("search", searchTerm);

        if (queryParams.toString()) {
          url += "?" + queryParams.toString();
        }

        const res = await fetch(`http://localhost:5000/api${url}`);
        const data = await res.json();

        // ✅ NORMALIZE RESPONSE
        const productList = Array.isArray(data.products)
          ? data.products
          : [];

        setProducts(productList);
      } catch (err) {
        console.error("Failed to fetch products", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [category, filter, searchTerm]);

  const filteredProducts = products
    .filter((p) => {
      // Only apply subcategory filter if not using section filter
      const matchesSubcategory = !filter && type
        ? p.subcategory?.toLowerCase() === type.toLowerCase()
        : true;

      // Search filtering is already done at API level for section filters
      const matchesSearch = !filter && searchTerm
        ? p.name?.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      return matchesSubcategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "priceLow") return a.price - b.price;
      if (sortBy === "priceHigh") return b.price - a.price;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  const displayCategory = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "";

  let headerTitle = "All Products";
  if (searchTerm) {
    headerTitle = `Search results for "${searchTerm}"`;
  } else if (filter) {
    const filterLabels = {
      "deals": "🔥 Deals",
      "best-sellers": "⭐ Best Sellers",
      "new-arrivals": "📦 New Arrivals"
    };
    headerTitle = filterLabels[filter] || "Special Section";
  } else if (category) {
    const typeLabel = type
      ? type.charAt(0).toUpperCase() + type.slice(1)
      : "";
    headerTitle = typeLabel
      ? `${displayCategory} ${typeLabel}`
      : displayCategory;
  }

  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">{headerTitle}</h2>
            <p className="text-sm text-gray-500">
              {filteredProducts.length} products found
            </p>
          </div>

          {/* SORT */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border px-3 py-2 rounded text-sm"
          >
            <option value="">Sort By</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>

        {/* GRID */}
        {loading ? (
          <div className="text-center text-gray-500 py-20">
            <p className="text-lg font-medium">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm mt-1">Try changing filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default ProductsPage;

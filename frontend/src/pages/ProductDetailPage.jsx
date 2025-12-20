import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../services/productService";
import { useCart } from "../context/CartContext";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const load = async () => {
      const data = await fetchProductById(id);
      setProduct(data);
    };
    load();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading product...
      </div>
    );
  }

  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-10">

        {/* PRODUCT IMAGE */}
        <div className="bg-white p-6 rounded-lg shadow">
          <img
            src={product.image || "/images/no-image.png"}
            alt={product.name}
            className="w-full h-96 object-contain"
          />
        </div>

        {/* PRODUCT INFO */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-3xl font-bold mb-4">
            {product.name}
          </h1>

          <p className="text-gray-500 mb-2">
            Category: {product.category}
          </p>

          <p className="text-2xl font-bold text-green-600 mb-4">
            ₹{product.price}
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            {product.description}
          </p>

          <button
            onClick={() => addToCart(product, 1)}
            className="bg-yellow-400 hover:bg-yellow-500 px-6 py-3 rounded font-semibold text-lg"
          >
            Add to Cart
          </button>

        </div>

      </div>
    </section>
  );
};

export default ProductDetailPage;

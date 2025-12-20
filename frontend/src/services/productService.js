import api from "./apiClient";

export const fetchProducts = async (category) => {
  const res = await api.get("/products", {
    params: { category }
  });
  return res.data;
};

export const fetchProductById = async (id) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

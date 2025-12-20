import api from "./apiClient";

export const registerRequest = async (name, email, password, contact) => {
  const response = await api.post("/auth/register", { name, email, password, contact });
  return response.data;
};

export const loginRequest = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

import api from "./apiClient";

export const sendContactMessage = async (formData) => {
    const response = await api.post("/contact", formData);
    return response.data;
};

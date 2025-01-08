import { create } from "zustand";

export const useStore = create((set) => ({
  products: [],
  selectedProduct: null, // Add selectedProduct to store
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch("api/products"); // Adjust API URL if needed
      if (response.ok) {
        const data = await response.json();
        set({ products: data.data.data, isLoading: false });
      } else {
        throw new Error("Failed to fetch products");
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchProductDetails: async (productId) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`/api/products/${productId}`);
      const product = await response.json();
      if (product.status === "success") {
        // Add the base URL to the image_url
        const productData = {
          ...product.data,
          image: product.data.image_url, // Replace with your actual base URL
        };
        set({ selectedProduct: productData, isLoading: false });
      } else {
        set({ error: "Product not found", isLoading: false });
      }
    } catch (error) {
      set({ error: "Failed to fetch product", isLoading: false });
    }
  },
}));

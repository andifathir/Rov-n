import { create } from "zustand";

export const useStore = create((set) => ({
  products: [],
  isLoading: false,
  error: null,
  fetchProducts: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch("api/products"); // Adjust API URL if needed
      if (response.ok) {
        const data = await response.json();
        console.log(data); // Optional: To debug and check the structure of the data
        set({ products: data.data.data, isLoading: false }); // Access the correct data path
      } else {
        throw new Error("Failed to fetch products");
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));

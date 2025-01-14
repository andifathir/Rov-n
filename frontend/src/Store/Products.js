import { create } from "zustand";

export const useStore = create((set) => ({
  products: [],
  selectedProduct: null, // Add selectedProduct to store
  isLoading: false,
  error: null,

  // Fetch all products
  fetchProducts: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch("api/products");
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

  // Fetch details of a single product
  fetchProductDetails: async (productId) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`/api/products/${productId}`);
      const product = await response.json();
      if (product.status === "success") {
        const productData = {
          ...product.data,
          image: product.data.image_url,
        };
        set({ selectedProduct: productData, isLoading: false });
      } else {
        set({ error: "Product not found", isLoading: false });
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Add a new product
  addProduct: async (newProduct) => {
    set({ isLoading: true });
    try {
      const response = await fetch("api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        const addedProduct = await response.json();
        set((state) => ({
          products: [...state.products, addedProduct.data],
          isLoading: false,
        }));
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add product");
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));

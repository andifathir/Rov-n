import { create } from "zustand";

export const useStore = create((set) => ({
  categories: [],
  isLoading: false,
  error: null,

  fetchCategories: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch("/api/category");
      if (response.ok) {
        const data = await response.json();
        // Extract categories from response
        const categories = data.data.data.map((category) => ({
          id: category.category_id,
          name: category.category_name,
        }));
        set({ categories, isLoading: false });
      } else {
        throw new Error("Failed to fetch categories");
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));

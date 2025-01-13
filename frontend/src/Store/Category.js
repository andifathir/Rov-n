import { create } from "zustand";

export const useStore = create((set) => ({
  categories: [],
  isLoading: false,
  error: null,
  currentPage: 1, // Track the current page
  totalPages: 1,   // Track the total number of pages

  fetchCategories: async (page = 1) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`/api/category?page=${page}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);  // Log to inspect the full response structure
        
        // Extract categories from data.data
        const categories = data.data.data.map((category) => ({
          id: category.category_id,
          name: category.category_name,
        }));
  
        // Set the categories in state
        set({ categories, isLoading: false });
  
        // Set pagination data if you want to implement "Next" page fetching
        set({ pagination: data.data });
      } else {
        throw new Error("Failed to fetch categories");
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
  

  addCategory: async (newCategory) => {
    set({ isLoading: true });
    try {
      const response = await fetch("/api/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      });
      if (response.ok) {
        const addedCategory = await response.json();
        set((state) => ({
          categories: [...state.categories, addedCategory.data],
          isLoading: false,
        }));
      } else {
        throw new Error("Failed to add category");
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));

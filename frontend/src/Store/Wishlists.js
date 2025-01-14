import { create } from 'zustand';

export const useWishlistStore = create((set) => ({
  wishlists: [], // State for wishlist data
  isLoading: false, // Tracks loading state
  error: null, // Stores errors, if any

  // Fetch all wishlists
  fetchWishlists: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/wishlists'); // Replace with full URL if needed
      if (!response.ok) {
        throw new Error(`Failed to fetch wishlists: ${response.status}`);
      }
      const data = await response.json();
      set({ wishlists: data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Add a new wishlist
  addWishlist: async (newWishlist) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/wishlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newWishlist),
      });
      if (!response.ok) {
        throw new Error(`Failed to add wishlist: ${response.status}`);
      }
      const addedWishlist = await response.json();
      set((state) => ({
        wishlists: [...state.wishlists, addedWishlist],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Update a wishlist
  updateWishlist: async (wishlistId, updatedWishlist) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/api/wishlists/${wishlistId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedWishlist),
      });
      if (!response.ok) {
        throw new Error(`Failed to update wishlist: ${response.status}`);
      }
      const updatedData = await response.json();
      set((state) => ({
        wishlists: state.wishlists.map((wishlist) =>
          wishlist.wishlist_id === wishlistId ? updatedData : wishlist
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Delete a wishlist
  deleteWishlist: async (wishlistId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/api/wishlists/${wishlistId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Failed to delete wishlist: ${response.status}`);
      }
      set((state) => ({
        wishlists: state.wishlists.filter(
          (wishlist) => wishlist.wishlist_id !== wishlistId
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));

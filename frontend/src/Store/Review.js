import { create } from 'zustand';

export const useStore = create((set) => ({
  reviews: [],
  isLoading: false,
  error: null,
  fetchReviews: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch('api/reviews'); // Replace with your actual Laravel API endpoint
      if (response.ok) {
        const data = await response.json();
        set({ reviews: data, isLoading: false });
      } else {
        throw new Error('Failed to fetch reviews');
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  addReview: async (review) => {
    try {
      const response = await fetch('api/reviews', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
      });
      if (response.ok) {
        // Review added successfully
      } else {
        throw new Error('Failed to add review');
      }
    } catch (error) {
      console.error(error);
    }
  },

  updateReview: async (reviewId, updatedReview) => {
    try {
      const response = await fetch(`api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedReview),
      });
      if (response.ok) {
        // Review updated successfully
      } else {
        throw new Error('Failed to update review');
      }
    } catch (error) {
      console.error(error);
    }
  },

  deleteReview: async (reviewId) => {
    try {
      const response = await fetch(`api/reviews/${reviewId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Review deleted successfully
      } else {
        throw new Error('Failed to delete review');
      }
    } catch (error) {
      console.error(error);
    }
  },
}));

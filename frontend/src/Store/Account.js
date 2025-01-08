import { create } from "zustand"; 

export const useStore = create((set) => ({
    user: null,
    isLoading: false,
    error: null,

    loginUser: async (email, password) => {
        set({ isLoading: true });
        try {
            const response = await fetch("/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (data.status === "success") {
                set({ user: data.data, isLoading: false });
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    registerAccount: async (name, email, password) => {
        set({ isLoading: true });
        try {
            const response = await fetch("/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await response.json();
            if (data.status === "success") {
                set({ user: data.data, isLoading: false });
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },
}));
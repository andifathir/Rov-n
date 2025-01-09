import { create } from 'zustand';

const useStore = create((set) => ({
  token: null,
  user: null,
  login: (token, user) => set({ token, user }),  // Store the full user object\
  logout: () => set({ token: null, user: null }),
}));

export default useStore;
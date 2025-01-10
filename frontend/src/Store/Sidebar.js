import { create } from 'zustand';

const useStore = create((set) => ({
  selectedComponent: null,
  setSelectedComponent: (component) => set({ selectedComponent: component }),
}));

export default useStore;

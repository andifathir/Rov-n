import { create } from 'zustand';

const useStore = create((set) => ({
  selectedComponent: 'product',
  setSelectedComponent: (component) => set({ selectedComponent: component }),
}));

export default useStore;

import { create } from 'zustand';

const useStore = create((set) => ({
  selectedComponent: 'tambahProduct',
  setSelectedComponent: (component) => set({ selectedComponent: component }),
}));

export default useStore;

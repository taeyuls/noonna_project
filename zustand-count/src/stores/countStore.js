import { create } from "zustand";

const counterStore = create((set) => ({
  count: 1,
  increese: () => set((state) => ({ count: state.count + 1 })),
  decreese: () => set((state) => ({ count: state.count - 1 })),
  increeseBy: (value) => set((state) => ({ count: state.count + value })),
  decreeseBy: (value) => set((state) => ({ count: state.count - value })),
}));

export default counterStore;

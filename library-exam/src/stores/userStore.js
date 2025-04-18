import { create } from "zustand";

export const useUserStore = create((set) => ({
  email: localStorage.getItem("email") || "",
  login: (email) => {
    localStorage.setItem("email", email);
    set({ email });
  },
  logout: () => {
    localStorage.removeItem("email");
    set({ email: "" });
  },
}));

import { nanoid } from "nanoid";
import { create } from "zustand";

const useContactStore = create((set) => ({
  contacts: [],
  addContact: (name, phoneNumber) =>
    set((state) => ({
      contacts: [...state.contacts, { id: nanoid(), name, phoneNumber }],
    })),
  deleteContact: (id) =>
    set((state) => ({
      contacts: state.contacts.filter((c) => c.id !== id),
    })),
}));

export default useContactStore;

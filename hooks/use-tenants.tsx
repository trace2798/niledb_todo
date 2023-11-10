import { create } from "zustand";

type TenantsStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useTenants = create<TenantsStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
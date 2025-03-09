import { create } from "zustand";

interface Organization {
  id: string;
  name: string;
}

interface State {
  access: string;
  setAccess: (access: string) => void;
  organization: Organization[] | null;
  setOrganization: (organization: Organization[]) => void;
  stock: Record<string, unknown>[];
  setStock: (stock: Record<string, unknown>[]) => void;
  selectedStock: Record<string, unknown> | null;
  setSelectedStock: (selectedStock: Record<string, unknown> | null) => void;
}

export const useStore = create<State>((set) => ({
  access: "",
  setAccess: (access) => set({ access }),
  organization: null,
  setOrganization: (organization) => set({ organization }),
  stock: [],
  setStock: (stock) => set({ stock }),
  selectedStock: null,
  setSelectedStock: (selectedStock) => set({ selectedStock }),
}));

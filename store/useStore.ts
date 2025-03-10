import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Organization {
  id: string;
  name: string;
}

interface State {
  access: string;
  setAccess: (access: string) => void;
  organization: Organization[] | null;
  setOrganization: (organization: Organization[]) => void;
  productId: string | null;
  setProductId: (productId: string) => void;
  stock: Record<string, unknown>[];
  setStock: (stock: Record<string, unknown>[]) => void;
  selectedStock: Record<string, unknown> | null;
  setSelectedStock: (selectedStock: Record<string, unknown> | null) => void;
  stockName: string;
  setStockName: (stockNamec: string) => void;
  price: string;
  setPrice: (price: string) => void;
  currency: string;
  setCurrency: (currency: string) => void;
  quantity: string;
  setQuantity: (quantity: string) => void;
}

export const useStore = create<State>()(
  persist(
    (set) => ({
      access: "",
      setAccess: (access) => set({ access }),
      organization: null,
      setOrganization: (organization) => set({ organization }),
      productId: null,
      setProductId: (productId) => set({ productId }),
      stock: [],
      setStock: (stock) => set({ stock }),
      selectedStock: null,
      setSelectedStock: (selectedStock) => set({ selectedStock }),
      stockName: "",
      setStockName: (stockName) => set({ stockName }),
      price: "",
      setPrice: (price) => set({ price }),
      currency: "",
      setCurrency: (currency) => set({ currency }),
      quantity: "",
      setQuantity: (quantity) => set({ quantity }),
    }),
    { name: "my-store", skipHydration: true }
  )
);

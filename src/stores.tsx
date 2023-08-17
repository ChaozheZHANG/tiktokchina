import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  image: string;
}

interface ShoppingCartStore {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
  clearCart: () => void;
}

export const useShoppingCartStore = create<ShoppingCartStore>(set => ({
  products: [],
  addProduct: product =>
    set(state => ({
      products: [...state.products, product],
    })),
  removeProduct: product =>
    set(state => ({
      products: state.products.filter(p => p.id !== product.id),
    })),
  clearCart: () =>
    set(state => ({
      products: [],
    })),
}));

interface WalletStore {
  actualBalance: number;
  virtualBalance: number;
  addMoney: (amount: number) => void;
  removeMoney: (amount: number) => void;
  applyPurchase: () => void;
  revertPurchase: () => void;
}

export const useWalletStore = create<WalletStore>(set => ({
  actualBalance: 3000,
  virtualBalance: 3000,
  addMoney: amount =>
    set(state => ({
      virtualBalance: state.virtualBalance + amount,
    })),
  removeMoney: amount =>
    set(state => ({
      virtualBalance: state.virtualBalance - amount,
    })),
  applyPurchase: () =>
    set(state => ({
      actualBalance: state.virtualBalance,
    })),
  revertPurchase: () =>
    set(state => ({
      virtualBalance: state.actualBalance,
    })),
}));

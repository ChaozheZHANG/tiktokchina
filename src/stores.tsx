import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  price: string;
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

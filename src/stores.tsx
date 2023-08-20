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

interface EventLog {
  id: string;
  event: string;
  userId: string;
  productId?: string;
  timestamp: number;
}

interface UserEventLogStore {
  eventLogs: EventLog[];
  addEventLog: (eventLog: EventLog) => void;
}

let id = 0;
export const useUserEventLogStore = create<UserEventLogStore>(set => ({
  eventLogs: [],
  addEventLog: eventLog =>
    set(state => {
      console.log('add event log', eventLog);
      
      id += 1;
      return {
        eventLogs: [
          ...state.eventLogs,
          {
            ...eventLog,
            id: `${id}`,
            timestamp: Date.now(),
          },
        ],
      };
    }),
}));

interface User {
  id: string;
  name: string;
}

interface UserStore {
  user: User;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserStore>(set => ({
  user: {
    id: '1',
    name: 'user 1',
  },
  setUser: user =>
    set(state => ({
      user,
    })),
}));

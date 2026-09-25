import { create } from 'zustand';

import type { ProductBarcodeSearchResult } from '@/domain/models/product';
import type { SaleCartItem } from '@/domain/models/sale-cart-item';
import type { Service } from '@/domain/models/service';
import { addProductToSaleCart } from '@/domain/use-cases/add-product-to-sale-cart';
import { addServiceToSaleCart } from '@/domain/use-cases/add-service-to-sale-cart';
import { removeItemFromSaleCart } from '@/domain/use-cases/remove-item-from-sale-cart';
import { updateSaleCartItemQuantity } from '@/domain/use-cases/update-sale-cart-item-quantity';

type SaleStore = {
  addProduct: (product: ProductBarcodeSearchResult) => void;
  addService: (service: Service) => void;
  cartItems: SaleCartItem[];
  removeItem: (itemKey: string) => void;
  reset: () => void;
  setItemQuantity: (itemKey: string, quantity: number) => void;
};

export const useSaleStore = create<SaleStore>((set) => ({
  cartItems: [],

  addProduct: (product) =>
    set((state) => ({
      cartItems: addProductToSaleCart(state.cartItems, product),
    })),
  addService: (service) =>
    set((state) => ({
      cartItems: addServiceToSaleCart(state.cartItems, service),
    })),
  removeItem: (itemKey) =>
    set((state) => ({
      cartItems: removeItemFromSaleCart(state.cartItems, itemKey),
    })),
  reset: () => set({ cartItems: [] }),
  setItemQuantity: (itemKey, quantity) =>
    set((state) => ({
      cartItems: updateSaleCartItemQuantity(state.cartItems, {
        itemKey,
        quantity,
      }),
    })),
}));

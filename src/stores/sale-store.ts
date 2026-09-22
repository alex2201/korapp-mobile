import { create } from 'zustand';

import type { ProductBarcodeSearchResult } from '@/domain/models/product';
import type { SaleCartItem } from '@/domain/models/sale-cart-item';
import { addProductToSaleCart } from '@/domain/use-cases/add-product-to-sale-cart';
import { removeProductFromSaleCart } from '@/domain/use-cases/remove-product-from-sale-cart';
import { updateSaleCartItemQuantity } from '@/domain/use-cases/update-sale-cart-item-quantity';

type SaleStore = {
  addProduct: (product: ProductBarcodeSearchResult) => void;
  cartItems: SaleCartItem[];
  removeProduct: (productPublicId: string) => void;
  reset: () => void;
  setProductQuantity: (productPublicId: string, quantity: number) => void;
};

export const useSaleStore = create<SaleStore>((set) => ({
  cartItems: [],

  addProduct: (product) =>
    set((state) => ({
      cartItems: addProductToSaleCart(state.cartItems, product),
    })),
  removeProduct: (productPublicId) =>
    set((state) => ({
      cartItems: removeProductFromSaleCart(
        state.cartItems,
        productPublicId,
      ),
    })),
  reset: () => set({ cartItems: [] }),
  setProductQuantity: (productPublicId, quantity) =>
    set((state) => ({
      cartItems: updateSaleCartItemQuantity(state.cartItems, {
        productPublicId,
        quantity,
      }),
    })),
}));

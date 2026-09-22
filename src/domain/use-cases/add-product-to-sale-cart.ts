import type { ProductBarcodeSearchResult } from '../models/product';
import type { SaleCartItem } from '../models/sale-cart-item';
import { updateSaleCartItemQuantity } from './update-sale-cart-item-quantity';

export function addProductToSaleCart(
  cartItems: SaleCartItem[],
  product: ProductBarcodeSearchResult,
): SaleCartItem[] {
  if (product.currentStock < 1) return cartItems;

  const existingItem = cartItems.find(
    (item) => item.product.publicId === product.publicId,
  );

  if (!existingItem) {
    return [...cartItems, { product, quantity: 1 }];
  }

  const cartItemsWithCurrentProduct = cartItems.map((item) =>
    item.product.publicId === product.publicId
      ? { ...item, product }
      : item,
  );

  return updateSaleCartItemQuantity(cartItemsWithCurrentProduct, {
    productPublicId: product.publicId,
    quantity: existingItem.quantity + 1,
  });
}

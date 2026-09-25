import type { ProductBarcodeSearchResult } from '../models/product';
import type { SaleCartItem } from '../models/sale-cart-item';
import { isFractionalProductUnit } from '../../lib/product-units';
import { updateSaleCartItemQuantity } from './update-sale-cart-item-quantity';

export function addProductToSaleCart(
  cartItems: SaleCartItem[],
  product: ProductBarcodeSearchResult,
): SaleCartItem[] {
  const isFractional = isFractionalProductUnit(product.unit);

  if (product.currentStock <= 0 || (!isFractional && product.currentStock < 1)) {
    return cartItems;
  }

  const existingItem = cartItems.find(
    (item) =>
      item.kind === 'product' && item.product.publicId === product.publicId,
  );

  if (!existingItem) {
    return [
      ...cartItems,
      { kind: 'product', product, quantity: isFractional ? 0 : 1 },
    ];
  }

  const cartItemsWithCurrentProduct = cartItems.map((item) =>
    item.kind === 'product' && item.product.publicId === product.publicId
      ? { ...item, product }
      : item,
  );

  if (isFractional) return cartItemsWithCurrentProduct;

  return updateSaleCartItemQuantity(cartItemsWithCurrentProduct, {
    itemKey: `product-${product.publicId}`,
    quantity: existingItem.quantity + 1,
  });
}

import type { SaleCartItem } from '../models/sale-cart-item';

export function removeProductFromSaleCart(
  cartItems: SaleCartItem[],
  productPublicId: string,
): SaleCartItem[] {
  return cartItems.filter(
    (item) => item.product.publicId !== productPublicId,
  );
}

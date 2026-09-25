import {
  getSaleCartItemKey,
  type SaleCartItem,
} from '../models/sale-cart-item';

export function removeItemFromSaleCart(
  cartItems: SaleCartItem[],
  itemKey: string,
): SaleCartItem[] {
  return cartItems.filter((item) => getSaleCartItemKey(item) !== itemKey);
}

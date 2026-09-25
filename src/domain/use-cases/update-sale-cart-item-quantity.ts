import {
  getSaleCartItemKey,
  type SaleCartItem,
} from '../models/sale-cart-item';

type UpdateSaleCartItemQuantityInput = {
  itemKey: string;
  quantity: number;
};

export function updateSaleCartItemQuantity(
  cartItems: SaleCartItem[],
  { itemKey, quantity }: UpdateSaleCartItemQuantityInput,
): SaleCartItem[] {
  const item = cartItems.find(
    (cartItem) => getSaleCartItemKey(cartItem) === itemKey,
  );

  if (!item) return cartItems;

  const maximumQuantity =
    item.kind === 'product' ? Math.floor(item.product.currentStock) : 99;
  const nextQuantity = Math.max(
    1,
    Math.min(Math.floor(quantity), maximumQuantity),
  );

  if (!Number.isFinite(nextQuantity) || nextQuantity === item.quantity) {
    return cartItems;
  }

  return cartItems.map((cartItem) =>
    getSaleCartItemKey(cartItem) === itemKey
      ? { ...cartItem, quantity: nextQuantity }
      : cartItem,
  );
}

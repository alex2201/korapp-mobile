import type { SaleCartItem } from '../models/sale-cart-item';

type UpdateSaleCartItemQuantityInput = {
  productPublicId: string;
  quantity: number;
};

export function updateSaleCartItemQuantity(
  cartItems: SaleCartItem[],
  { productPublicId, quantity }: UpdateSaleCartItemQuantityInput,
): SaleCartItem[] {
  const item = cartItems.find(
    (cartItem) => cartItem.product.publicId === productPublicId,
  );

  if (!item) return cartItems;

  const maximumQuantity = Math.floor(item.product.currentStock);
  const nextQuantity = Math.max(
    1,
    Math.min(Math.floor(quantity), maximumQuantity),
  );

  if (!Number.isFinite(nextQuantity) || nextQuantity === item.quantity) {
    return cartItems;
  }

  return cartItems.map((cartItem) =>
    cartItem.product.publicId === productPublicId
      ? { ...cartItem, quantity: nextQuantity }
      : cartItem,
  );
}

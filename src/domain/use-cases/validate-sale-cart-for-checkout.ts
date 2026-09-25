import type { SaleCartItem } from '../models/sale-cart-item';

export type SaleCartValidation = {
  isValid: boolean;
  reason: string | null;
};

export function validateSaleCartForCheckout(
  cartItems: SaleCartItem[],
): SaleCartValidation {
  if (cartItems.length === 0) {
    return { isValid: false, reason: 'Agrega al menos un artículo' };
  }

  const invalidQuantity = cartItems.some(
    (item) => !Number.isFinite(item.quantity) || item.quantity <= 0,
  );
  if (invalidQuantity) {
    return { isValid: false, reason: 'Completa las cantidades' };
  }

  const insufficientStock = cartItems.some(
    (item) =>
      item.kind === 'product' && item.quantity > item.product.currentStock,
  );
  if (insufficientStock) {
    return { isValid: false, reason: 'Revisa el inventario disponible' };
  }

  return { isValid: true, reason: null };
}

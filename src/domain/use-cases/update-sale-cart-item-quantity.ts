import {
  getSaleCartItemKey,
  type SaleCartItem,
} from '../models/sale-cart-item';
import {
  FRACTIONAL_QUANTITY_PRECISION,
  FRACTIONAL_QUANTITY_STEP,
  isFractionalProductUnit,
} from '../../lib/product-units';

type UpdateSaleCartItemQuantityInput = {
  itemKey: string;
  quantity: number;
};

type ProductQuantityInput = {
  currentStock: number;
  quantity: number;
  unit: string;
};

export function getMaximumProductQuantity(
  currentStock: number,
  unit: string,
): number {
  if (!isFractionalProductUnit(unit)) return Math.floor(currentStock);

  const precisionFactor = 10 ** FRACTIONAL_QUANTITY_PRECISION;
  return Number(
    (
      Math.floor((currentStock + Number.EPSILON) * precisionFactor) /
      precisionFactor
    ).toFixed(FRACTIONAL_QUANTITY_PRECISION),
  );
}

export function resolveProductQuantity({
  currentStock,
  quantity,
  unit,
}: ProductQuantityInput): number {
  if (!Number.isFinite(quantity)) return 0;

  const maximumQuantity = getMaximumProductQuantity(currentStock, unit);
  if (!isFractionalProductUnit(unit)) {
    return Math.max(1, Math.min(Math.floor(quantity), maximumQuantity));
  }

  const preciseQuantity = Number(
    quantity.toFixed(FRACTIONAL_QUANTITY_PRECISION),
  );
  return Math.max(0, Math.min(preciseQuantity, maximumQuantity));
}

export function stepProductQuantity(
  input: ProductQuantityInput,
  direction: -1 | 1,
): number {
  const step = isFractionalProductUnit(input.unit)
    ? FRACTIONAL_QUANTITY_STEP
    : 1;

  return resolveProductQuantity({
    ...input,
    quantity: input.quantity + direction * step,
  });
}

export function updateSaleCartItemQuantity(
  cartItems: SaleCartItem[],
  { itemKey, quantity }: UpdateSaleCartItemQuantityInput,
): SaleCartItem[] {
  const item = cartItems.find(
    (cartItem) => getSaleCartItemKey(cartItem) === itemKey,
  );

  if (!item) return cartItems;

  if (!Number.isFinite(quantity)) return cartItems;

  const nextQuantity =
    item.kind === 'product'
      ? resolveProductQuantity({
          currentStock: item.product.currentStock,
          quantity,
          unit: item.product.unit,
        })
      : Math.max(1, Math.min(Math.floor(quantity), 99));

  if (nextQuantity === item.quantity) {
    return cartItems;
  }

  return cartItems.map((cartItem) =>
    getSaleCartItemKey(cartItem) === itemKey
      ? { ...cartItem, quantity: nextQuantity }
      : cartItem,
  );
}

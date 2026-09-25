import type { SaleCartItem } from '../models/sale-cart-item';

export type SaleCartSummary = {
  itemCount: number;
  total: number;
};

export function getSaleCartSummary(
  cartItems: SaleCartItem[],
): SaleCartSummary {
  return cartItems.reduce<SaleCartSummary>(
    (summary, item) => {
      const unitPrice = Number(
        item.kind === 'product' ? item.product.currentPrice ?? 0 : item.service.price,
      );

      return {
        itemCount: summary.itemCount + item.quantity,
        total:
          summary.total +
          (Number.isFinite(unitPrice) ? unitPrice * item.quantity : 0),
      };
    },
    { itemCount: 0, total: 0 },
  );
}

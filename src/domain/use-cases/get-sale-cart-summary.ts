import type { SaleCartItem } from '../models/sale-cart-item';

export type SaleCartSummary = {
  productCount: number;
  total: number;
};

export function getSaleCartSummary(
  cartItems: SaleCartItem[],
): SaleCartSummary {
  return cartItems.reduce<SaleCartSummary>(
    (summary, item) => {
      const unitPrice = Number(item.product.currentPrice ?? 0);

      return {
        productCount: summary.productCount + item.quantity,
        total:
          summary.total +
          (Number.isFinite(unitPrice) ? unitPrice * item.quantity : 0),
      };
    },
    { productCount: 0, total: 0 },
  );
}

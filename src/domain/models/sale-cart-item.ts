import type { ProductBarcodeSearchResult } from './product';
import type { Service } from './service';

export type ProductSaleCartItem = {
  kind: 'product';
  product: ProductBarcodeSearchResult;
  quantity: number;
};

export type ServiceSaleCartItem = {
  kind: 'service';
  service: Service;
  quantity: number;
};

export type SaleCartItem = ProductSaleCartItem | ServiceSaleCartItem;

export function getSaleCartItemKey(item: SaleCartItem): string {
  return item.kind === 'product'
    ? `product-${item.product.publicId}`
    : `service-${item.service.id}`;
}

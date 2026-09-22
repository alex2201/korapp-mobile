import type { ProductBarcodeSearchResult } from './product';

export type SaleCartItem = {
  product: ProductBarcodeSearchResult;
  quantity: number;
};

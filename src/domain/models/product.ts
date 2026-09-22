export type Product = {
  id: number;
  publicId: string;
  name: string;
  genericName: string | null;
  unit: string;
  barcode: string | null;
  currentPrice: string | null;
  currentStock: number;
  requiresPrescription: boolean;
};

export type ProductBarcodeSearchResult = Product & {
  bestBatchId: number | null;
};

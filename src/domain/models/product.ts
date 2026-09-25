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

export type ProductBarcodeSuggestion = {
  id: number;
  publicId: string;
  name: string;
  genericName: string | null;
  barcode: string;
  unit: string;
};

export type ProductSearchResult = {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
};

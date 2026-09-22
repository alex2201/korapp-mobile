import type { AuthenticatedUser } from '../models/authenticated-user';
import type { Pharmacy } from '../models/pharmacy';
import type { ProductBarcodeSearchResult } from '../models/product';

export interface AuthRepository {
  verifyToken(): Promise<AuthenticatedUser>;
}

export interface PharmacyRepository {
  getInfo(): Promise<Pharmacy>;
  searchProductByBarcode(
    barcode: string,
  ): Promise<ProductBarcodeSearchResult>;
}

export interface AuthIdentity {
  getIdToken(forceRefresh?: boolean): Promise<string>;
}

export interface AuthSessionRepository {
  getToken(identity?: AuthIdentity | null): Promise<string | null>;
  observeAuthState(
    listener: (identity: AuthIdentity | null) => void,
    onError?: (error: Error) => void,
  ): () => void;
}

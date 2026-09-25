import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { TextInput } from 'react-native';

import type {
  ProductBarcodeSearchResult,
  ProductBarcodeSuggestion,
} from '@/domain/models/product';
import { searchProductByBarcode } from '@/domain/use-cases/search-product-by-barcode';
import { searchProductsByName } from '@/domain/use-cases/search-products-by-name';
import { suggestProductsByBarcode } from '@/domain/use-cases/suggest-products-by-barcode';
import { pharmacyRepository } from '@/services/farmacia-app-api/repositories/pharmacy-repository';
import { useSaleStore } from '@/stores/sale-store';

export type ProductSearchMode = 'barcode' | 'name';

export type ProductSearchListItem =
  | { kind: 'product'; product: ProductBarcodeSearchResult }
  | { kind: 'barcode-suggestion'; suggestion: ProductBarcodeSuggestion };

const SEARCH_DEBOUNCE_MS = 300;

export function useProductSearch() {
  const [mode, setMode] = useState<ProductSearchMode>('barcode');
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<ProductSearchListItem[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const searchIdRef = useRef(0);
  const addProduct = useSaleStore((state) => state.addProduct);

  useEffect(() => {
    const searchId = ++searchIdRef.current;
    const normalizedQuery = query.trim();

    if (!normalizedQuery) return;

    const timeout = setTimeout(async () => {
      setIsSearching(true);
      setSearchError(null);

      try {
        const nextResults: ProductSearchListItem[] =
          mode === 'name'
            ? (await searchProductsByName(
                { pharmacyRepository },
                normalizedQuery,
              )).products.map((product) => ({
                kind: 'product' as const,
                product: { ...product, bestBatchId: null },
              }))
            : (await suggestProductsByBarcode(
                { pharmacyRepository },
                normalizedQuery,
              )).map((suggestion) => ({
                kind: 'barcode-suggestion' as const,
                suggestion,
              }));

        if (searchId !== searchIdRef.current) return;
        setResults(nextResults);
        setHasSearched(true);
      } catch (error) {
        if (searchId !== searchIdRef.current) return;
        setResults([]);
        setHasSearched(true);
        setSearchError(
          error instanceof Error
            ? error.message
            : 'Ocurrió un error inesperado. Intenta nuevamente.',
        );
      } finally {
        if (searchId === searchIdRef.current) {
          setIsSearching(false);
        }
      }
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timeout);
  }, [mode, query]);

  function closeSearch() {
    router.back();
  }

  function selectMode(nextMode: ProductSearchMode) {
    if (nextMode === mode) return;

    searchIdRef.current += 1;
    setMode(nextMode);
    setQuery('');
    setResults([]);
    setSearchError(null);
    setHasSearched(false);
    setIsSearching(false);
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  function updateQuery(nextQuery: string) {
    if (nextQuery === query) return;

    searchIdRef.current += 1;
    setQuery(nextQuery);
    setResults([]);
    setSearchError(null);
    setHasSearched(false);
    setIsSearching(false);
  }

  function addProductAndClose(product: ProductBarcodeSearchResult) {
    addProduct(product);
    closeSearch();
  }

  async function selectResult(result: ProductSearchListItem) {
    if (isSearching) return;

    if (result.kind === 'product') {
      addProductAndClose(result.product);
      return;
    }

    const searchId = ++searchIdRef.current;
    setIsSearching(true);
    setSearchError(null);

    try {
      const product = await searchProductByBarcode(
        { pharmacyRepository },
        result.suggestion.barcode,
      );

      if (searchId !== searchIdRef.current) return;
      addProductAndClose(product);
    } catch (error) {
      if (searchId !== searchIdRef.current) return;
      setResults([]);
      setHasSearched(true);
      setSearchError(
        error instanceof Error
          ? error.message
          : 'Ocurrió un error inesperado. Intenta nuevamente.',
      );
    } finally {
      if (searchId === searchIdRef.current) {
        setIsSearching(false);
      }
    }
  }

  return {
    closeSearch,
    hasSearched,
    inputRef,
    isSearching,
    mode,
    query,
    results,
    searchError,
    selectMode,
    selectResult,
    setQuery: updateQuery,
  };
}

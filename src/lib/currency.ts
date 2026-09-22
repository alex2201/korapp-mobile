const mxnCurrencyFormatter = new Intl.NumberFormat('es-MX', {
  currency: 'MXN',
  currencyDisplay: 'narrowSymbol',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
  style: 'currency',
});

export function formatMxnCurrency(value: number | string): string {
  const numericValue = Number(value);
  return mxnCurrencyFormatter.format(
    Number.isFinite(numericValue) ? numericValue : 0,
  );
}

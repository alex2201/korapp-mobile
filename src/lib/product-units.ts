const UNIT_LABELS: Record<string, { singular: string; plural: string }> = {
  piece: { singular: 'pieza', plural: 'piezas' },
  box: { singular: 'caja', plural: 'cajas' },
  bottle: { singular: 'botella', plural: 'botellas' },
  blister: { singular: 'blíster', plural: 'blísteres' },
  vial: { singular: 'frasco', plural: 'frascos' },
  ampoule: { singular: 'ampolla', plural: 'ampollas' },
  tube: { singular: 'tubo', plural: 'tubos' },
  sachet: { singular: 'sachet', plural: 'sachets' },
  ml: { singular: 'mililitro', plural: 'mililitros' },
  l: { singular: 'litro', plural: 'litros' },
  mg: { singular: 'miligramo', plural: 'miligramos' },
  g: { singular: 'gramo', plural: 'gramos' },
  kg: { singular: 'kilogramo', plural: 'kilogramos' },
};

const FRACTIONAL_UNITS = new Set(['ml', 'l', 'mg', 'g', 'kg']);

export const FRACTIONAL_QUANTITY_STEP = 0.1;
export const FRACTIONAL_QUANTITY_PRECISION = 3;

function normalizeUnit(unit: string): string {
  return unit.trim().toLowerCase();
}

export function getProductUnitLabel(unit: string, quantity = 1): string {
  const labels = UNIT_LABELS[normalizeUnit(unit)];

  if (!labels) return unit;
  return quantity === 1 ? labels.singular : labels.plural;
}

export function isFractionalProductUnit(unit: string): boolean {
  return FRACTIONAL_UNITS.has(normalizeUnit(unit));
}

export function formatFractionalQuantity(quantity: number): string {
  return quantity
    .toFixed(FRACTIONAL_QUANTITY_PRECISION)
    .replace(/\.?0+$/, '');
}

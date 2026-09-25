import { View } from 'react-native';

import { AppText } from '@/components/ui';
import type { Product } from '@/domain/models/product';
import { formatMxnCurrency } from '@/lib/currency';
import { getProductUnitLabel } from '@/lib/product-units';

import { styles } from './sale-product-item.styles';

type SaleProductInformationProps = {
  product: Product;
  quantity: number;
};

function formatPrice(price: string | null): string {
  const numericPrice = Number(price);
  return price && Number.isFinite(numericPrice)
    ? formatMxnCurrency(numericPrice)
    : 'Sin precio';
}

export function SaleProductInformation({
  product,
  quantity,
}: SaleProductInformationProps) {
  const price = Number(product.currentPrice);
  const subtotal =
    product.currentPrice && Number.isFinite(price)
      ? formatMxnCurrency(price * quantity)
      : 'Sin precio';

  return (
    <View style={styles.productColumn}>
      <View style={styles.productInformation}>
        <AppText numberOfLines={2} selectable variant="labelLarge">
          {product.name}
        </AppText>
        <AppText numberOfLines={1} selectable tone="muted" variant="bodySmall">
          {product.genericName || 'Sin principio activo'}
        </AppText>
      </View>
      <AppText selectable tone="muted" variant="bodySmall">
        {`${formatPrice(product.currentPrice)} / ${getProductUnitLabel(product.unit)}`}
      </AppText>
      <AppText selectable tone="secondary" variant="labelLarge">
        {`Subtotal: ${subtotal}`}
      </AppText>
    </View>
  );
}

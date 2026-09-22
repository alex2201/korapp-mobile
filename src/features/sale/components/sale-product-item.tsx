import { Alert, Pressable, View } from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import type { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable';

import { AppText, Badge, Card } from '@/components/ui';
import type { Product } from '@/domain/models/product';
import { formatMxnCurrency } from '@/lib/currency';

import { styles } from './sale-product-item.styles';

type SaleProductItemProps = {
  onRemove: () => void;
  onSetQuantity: (quantity: number) => void;
  product: Product;
  quantity: number;
};

function formatPrice(price: string | null): string {
  if (!price) return 'Sin precio';

  const numericPrice = Number(price);
  return Number.isFinite(numericPrice)
    ? formatMxnCurrency(numericPrice)
    : 'Sin precio';
}

export function SaleProductItem({
  onRemove,
  onSetQuantity,
  product,
  quantity,
}: SaleProductItemProps) {
  const maximumQuantity = Math.floor(product.currentStock);

  function confirmRemoval(onCancel?: () => void) {
    Alert.alert(
      'Eliminar producto',
      `¿Quieres eliminar ${product.name} del carrito?`,
      [
        { onPress: onCancel, style: 'cancel', text: 'Cancelar' },
        { onPress: onRemove, style: 'destructive', text: 'Eliminar' },
      ],
    );
  }

  function handleDecrease() {
    if (quantity === 1) {
      confirmRemoval();
      return;
    }

    onSetQuantity(quantity - 1);
  }

  function renderRightAction(swipeable: SwipeableMethods) {
    return (
      <Pressable
        accessibilityLabel={`Eliminar ${product.name} del carrito`}
        accessibilityRole="button"
        onPress={() => confirmRemoval(() => swipeable.close())}
        style={({ pressed }) => [
          styles.deleteAction,
          pressed ? styles.deleteActionPressed : null,
        ]}
      >
        <AppText tone="inverse" variant="label">
          Eliminar
        </AppText>
      </Pressable>
    );
  }

  return (
    <ReanimatedSwipeable
      friction={2}
      overshootRight={false}
      renderRightActions={(_progress, _translation, swipeable) =>
        renderRightAction(swipeable)
      }
    >
      <Card
        accessibilityLabel={`${product.name}, ${formatPrice(product.currentPrice)}, cantidad ${quantity}`}
        padding="sm"
        style={styles.card}
        variant="outlined"
      >
        <View style={styles.itemLayout}>
          <View style={styles.productColumn}>
            <View style={styles.productInformation}>
              <AppText numberOfLines={2} selectable variant="labelLarge">
                {product.name}
              </AppText>
              <AppText
                numberOfLines={1}
                selectable
                tone="muted"
                variant="bodySmall"
              >
                {product.genericName || 'Sin principio activo'}
              </AppText>
            </View>
            <AppText selectable tone="secondary" variant="labelLarge">
              {formatPrice(product.currentPrice)}
            </AppText>
          </View>
          <View style={styles.quantitySection}>
            <Badge variant="brand">{`Cantidad: ${quantity}`}</Badge>
            <View style={styles.quantityControls}>
              <Pressable
                accessibilityLabel={`Reducir cantidad de ${product.name}`}
                accessibilityRole="button"
                onPress={handleDecrease}
                style={({ pressed }) => [
                  styles.quantityButton,
                  pressed ? styles.quantityButtonPressed : null,
                ]}
              >
                <AppText tone="brand" variant="subheading">
                  −
                </AppText>
              </Pressable>
              <Pressable
                accessibilityLabel={`Aumentar cantidad de ${product.name}`}
                accessibilityRole="button"
                accessibilityState={{ disabled: quantity >= maximumQuantity }}
                disabled={quantity >= maximumQuantity}
                onPress={() => onSetQuantity(quantity + 1)}
                style={({ pressed }) => [
                  styles.quantityButton,
                  pressed ? styles.quantityButtonPressed : null,
                  quantity >= maximumQuantity
                    ? styles.quantityButtonDisabled
                    : null,
                ]}
              >
                <AppText tone="brand" variant="subheading">
                  +
                </AppText>
              </Pressable>
            </View>
          </View>
        </View>
      </Card>
    </ReanimatedSwipeable>
  );
}

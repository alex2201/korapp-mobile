import { Pressable, View } from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import type { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable';

import { AppText, Card } from '@/components/ui';
import type { Product } from '@/domain/models/product';

import { useSaleProductItem } from '../hooks/use-sale-product-item';
import { SaleProductInformation } from './sale-product-information';
import { styles } from './sale-product-item.styles';
import { SaleProductQuantityControl } from './sale-product-quantity-control';

type SaleProductItemProps = {
  onRemove: () => void;
  onSetQuantity: (quantity: number) => void;
  product: Product;
  quantity: number;
};

export function SaleProductItem({
  onRemove,
  onSetQuantity,
  product,
  quantity,
}: SaleProductItemProps) {
  const quantityControl = useSaleProductItem({
    onRemove,
    onSetQuantity,
    product,
    quantity,
  });

  function renderRightAction(swipeable: SwipeableMethods) {
    return (
      <Pressable
        accessibilityLabel={`Eliminar ${product.name} del carrito`}
        accessibilityRole="button"
        onPress={() => quantityControl.confirmRemoval(() => swipeable.close())}
        style={({ pressed }) => [
          styles.deleteAction,
          pressed ? styles.deleteActionPressed : null,
        ]}
      >
        <AppText tone="inverse" variant="label">Eliminar</AppText>
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
        accessibilityHint={
          quantityControl.hasQuantityError
            ? 'Ingresa una cantidad mayor que cero para continuar'
            : undefined
        }
        accessibilityLabel={`${product.name}, cantidad ${quantity}`}
        padding="sm"
        style={[
          styles.card,
          quantityControl.hasQuantityError ? styles.cardInvalid : null,
        ]}
        variant="outlined"
      >
        <View style={styles.itemLayout}>
          <SaleProductInformation product={product} quantity={quantity} />
          <SaleProductQuantityControl
            {...quantityControl}
            product={product}
            quantity={quantity}
          />
        </View>
      </Card>
    </ReanimatedSwipeable>
  );
}

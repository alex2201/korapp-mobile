import { Pressable, TextInput, View } from 'react-native';

import { AppText, Badge } from '@/components/ui';
import type { Product } from '@/domain/models/product';
import { FRACTIONAL_QUANTITY_STEP, getProductUnitLabel } from '@/lib/product-units';

import { styles } from './sale-product-item.styles';

type SaleProductQuantityControlProps = {
  changeFractionalInput: (value: string) => void;
  decreaseDiscreteQuantity: () => void;
  increaseDiscreteQuantity: () => void;
  isFractional: boolean;
  maximumQuantity: number;
  normalizeFractionalInput: () => void;
  product: Product;
  quantity: number;
  quantityInput: string;
  stepFractionalQuantity: (direction: -1 | 1) => void;
};

function QuantityButton({
  disabled,
  label,
  onPress,
  symbol,
}: {
  disabled?: boolean;
  label: string;
  onPress: () => void;
  symbol: '−' | '+';
}) {
  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.quantityButton,
        pressed ? styles.quantityButtonPressed : null,
        disabled ? styles.quantityButtonDisabled : null,
      ]}
    >
      <AppText tone="brand" variant="subheading">
        {symbol}
      </AppText>
    </Pressable>
  );
}

export function SaleProductQuantityControl({
  changeFractionalInput,
  decreaseDiscreteQuantity,
  increaseDiscreteQuantity,
  isFractional,
  maximumQuantity,
  normalizeFractionalInput,
  product,
  quantity,
  quantityInput,
  stepFractionalQuantity,
}: SaleProductQuantityControlProps) {
  const unitLabel = getProductUnitLabel(product.unit);

  if (isFractional) {
    return (
      <View style={styles.fractionalQuantitySection}>
        <AppText tone="muted" variant="caption">Cantidad</AppText>
        <View style={styles.fractionalQuantityControl}>
          <TextInput
            accessibilityLabel={`Cantidad de ${product.name} en ${unitLabel}`}
            inputMode="decimal"
            keyboardType="decimal-pad"
            onBlur={normalizeFractionalInput}
            onChangeText={changeFractionalInput}
            placeholder="0.0"
            selectTextOnFocus
            style={[
              styles.fractionalQuantityInput,
              quantity <= 0 ? styles.fractionalQuantityInputInvalid : null,
            ]}
            value={quantityInput}
          />
          <AppText tone="secondary" variant="label">{product.unit}</AppText>
        </View>
        <View style={styles.fractionalStepControls}>
          <QuantityButton
            disabled={quantity <= 0}
            label={`Reducir ${FRACTIONAL_QUANTITY_STEP} ${unitLabel} de ${product.name}`}
            onPress={() => stepFractionalQuantity(-1)}
            symbol="−"
          />
          <QuantityButton
            disabled={quantity >= maximumQuantity}
            label={`Aumentar ${FRACTIONAL_QUANTITY_STEP} ${unitLabel} de ${product.name}`}
            onPress={() => stepFractionalQuantity(1)}
            symbol="+"
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.quantitySection}>
      <Badge variant="brand">
        {`${quantity} ${getProductUnitLabel(product.unit, quantity)}`}
      </Badge>
      <View style={styles.quantityControls}>
        <QuantityButton
          label={`Reducir cantidad de ${product.name}`}
          onPress={decreaseDiscreteQuantity}
          symbol="−"
        />
        <QuantityButton
          disabled={quantity >= maximumQuantity}
          label={`Aumentar cantidad de ${product.name}`}
          onPress={increaseDiscreteQuantity}
          symbol="+"
        />
      </View>
    </View>
  );
}

import { Pressable } from 'react-native';

import { AppText } from '@/components/ui';
import { colors } from '@/theme';

import { BarcodeIcon } from './barcode-icon';
import { styles } from './scan-product-button.styles';

type ScanProductButtonProps = {
  onPress: () => void;
};

export function ScanProductButton({ onPress }: ScanProductButtonProps) {
  return (
    <Pressable
      accessibilityLabel="Escanear producto"
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed ? styles.pressed : null]}
    >
      <BarcodeIcon color={colors.text.inverse} />
      <AppText tone="inverse" variant="label">
        Escanear
      </AppText>
    </Pressable>
  );
}

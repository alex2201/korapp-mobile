import { Alert, Pressable } from 'react-native';

import { AppText } from '@/components/ui';
import { colors } from '@/theme';

import { BarcodeIcon } from './barcode-icon';
import { styles } from './scan-product-button.styles';

export function ScanProductButton() {
  function handlePress() {
    Alert.alert('Escanear producto', 'El escáner se implementará próximamente.');
  }

  return (
    <Pressable
      accessibilityLabel="Escanear producto"
      accessibilityRole="button"
      onPress={handlePress}
      style={({ pressed }) => [styles.button, pressed ? styles.pressed : null]}
    >
      <BarcodeIcon color={colors.text.inverse} />
      <AppText tone="inverse" variant="label">
        Escanear
      </AppText>
    </Pressable>
  );
}

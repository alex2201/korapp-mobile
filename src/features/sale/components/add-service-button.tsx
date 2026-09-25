import { router } from 'expo-router';
import { Pressable } from 'react-native';

import { colors } from '@/theme';

import { ServiceIcon } from './service-icon';
import { styles } from './add-service-button.styles';

export function AddServiceButton() {
  return (
    <Pressable
      accessibilityHint="Abre la selección de servicios"
      accessibilityLabel="Agregar servicio"
      accessibilityRole="button"
      hitSlop={4}
      onPress={() => router.push('/(tabs)/sale/service-selection')}
      style={({ pressed }) => [styles.button, pressed ? styles.pressed : null]}
    >
      <ServiceIcon color={colors.brand.primary} />
    </Pressable>
  );
}

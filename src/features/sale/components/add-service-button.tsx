import { Alert, Pressable } from 'react-native';

import { colors } from '@/theme';

import { ServiceIcon } from './service-icon';
import { styles } from './add-service-button.styles';

export function AddServiceButton() {
  function handlePress() {
    Alert.alert(
      'Agregar servicio',
      'La selección de servicios se implementará próximamente.',
    );
  }

  return (
    <Pressable
      accessibilityHint="Abre la selección de servicios"
      accessibilityLabel="Agregar servicio"
      accessibilityRole="button"
      hitSlop={4}
      onPress={handlePress}
      style={({ pressed }) => [styles.button, pressed ? styles.pressed : null]}
    >
      <ServiceIcon color={colors.brand.primary} />
    </Pressable>
  );
}

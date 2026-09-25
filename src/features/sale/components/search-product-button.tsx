import { router } from 'expo-router';
import { Pressable } from 'react-native';

import { colors } from '@/theme';

import { SearchIcon } from './search-icon';
import { styles } from './search-product-button.styles';

export function SearchProductButton() {
  return (
    <Pressable
      accessibilityHint="Abre la búsqueda por nombre o código de barras"
      accessibilityLabel="Buscar producto"
      accessibilityRole="button"
      hitSlop={4}
      onPress={() => router.push('/(tabs)/sale/product-search')}
      style={({ pressed }) => [styles.button, pressed ? styles.pressed : null]}
    >
      <SearchIcon color={colors.brand.primary} />
    </Pressable>
  );
}

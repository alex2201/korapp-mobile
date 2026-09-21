import { StyleSheet } from 'react-native';

import { colors, radii, spacing } from '@/theme';

export const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colors.brand.primary,
    borderCurve: 'continuous',
    borderRadius: radii.full,
    flexDirection: 'row',
    flex: 1,
    gap: spacing.sm,
    height: 56,
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    maxWidth: 350,
  },
  pressed: {
    opacity: 0.75,
  },
});

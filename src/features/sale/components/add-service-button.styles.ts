import { StyleSheet } from 'react-native';

import { colors, radii } from '@/theme';

export const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colors.background.default,
    borderColor: colors.border.default,
    borderCurve: 'continuous',
    borderRadius: radii.full,
    borderWidth: 1,
    height: 56,
    justifyContent: 'center',
    width: 56,
  },
  pressed: {
    backgroundColor: colors.background.muted,
  },
});

import { StyleSheet } from 'react-native';

import { colors } from '@/theme';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.brand.primary,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: colors.text.inverse,
    fontSize: 30,
    fontWeight: '700',
  },
});

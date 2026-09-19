import { StyleSheet } from 'react-native';

import { colors } from '@/theme';

export const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.background.default,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
  },
});

import { StyleSheet } from 'react-native';

import { colors, spacing } from '@/theme';

export const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background.default,
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    backgroundColor: colors.background.default,
    flexGrow: 1,
  },
  scrollViewContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  bottomAction: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'center',
    paddingHorizontal: spacing['2xl'],
    paddingVertical: spacing.md,
  },
});

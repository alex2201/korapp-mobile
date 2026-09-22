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
  mainContent: {
    flex: 1,
    paddingHorizontal: spacing['3xl'],
    paddingTop: spacing.md,
    width: '100%',
    gap: spacing.md
  },
  content: {
    flexGrow: 1,
    alignItems: 'flex-start',
    width: '100%',
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

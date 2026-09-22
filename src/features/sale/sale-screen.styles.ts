import { StyleSheet } from 'react-native';

import { colors, radii, spacing } from '@/theme';

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
    gap: spacing.md,
    paddingHorizontal: spacing['3xl'],
    paddingTop: spacing.md,
    width: '100%',
  },
  content: {
    alignItems: 'flex-start',
    flexGrow: 1,
    gap: spacing.xl,
    width: '100%',
  },
  scrollViewContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingBottom: spacing.xl,
  },
  checkoutSummary: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'space-between',
    paddingHorizontal: spacing['2xl'],
    paddingTop: spacing.md,
    width: '100%',
  },
  productCountBadge: {
    backgroundColor: colors.brand.subtle,
    borderColor: colors.border.default,
    borderRadius: radii.full,
    borderWidth: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  productCountBadgeEmpty: {
    backgroundColor: colors.background.soft,
    borderColor: colors.border.soft,
    opacity: 0.65,
  },
  checkoutButton: {
    alignItems: 'center',
    backgroundColor: colors.status.success,
    borderRadius: radii.full,
    flex: 1,
    height: 52,
    justifyContent: 'center',
    maxWidth: 420,
    paddingHorizontal: spacing.lg,
  },
  checkoutButtonPressed: {
    backgroundColor: colors.statusSurface.success.text,
  },
  checkoutButtonDisabled: {
    opacity: 0.4,
  },
  productList: {
    gap: spacing.md,
    width: '100%',
  },
  emptyState: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1,
    gap: spacing.sm,
    justifyContent: 'center',
    minHeight: 240,
    padding: spacing['2xl'],
  },
  emptyStateDescription: {
    maxWidth: 360,
    textAlign: 'center',
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

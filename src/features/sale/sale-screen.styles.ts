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
  checkoutSection: {
    alignItems: 'center',
    backgroundColor: colors.background.default,
    borderColor: colors.border.soft,
    borderTopWidth: 1,
    gap: spacing.sm,
    paddingBottom: spacing.sm,
    paddingTop: spacing.md,
    width: '100%',
  },
  checkoutAlert: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: colors.statusSurface.warning.background,
    borderColor: colors.statusSurface.warning.border,
    borderRadius: radii.full,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.sm,
    marginRight: spacing['2xl'],
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  checkoutAlertText: {
    color: colors.statusSurface.warning.text,
  },
  checkoutSummary: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'space-between',
    paddingHorizontal: spacing['2xl'],
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
  checkoutAction: {
    flex: 1,
    gap: spacing.xs,
    maxWidth: 420,
  },
  checkoutButton: {
    alignItems: 'center',
    backgroundColor: colors.status.success,
    borderRadius: radii.full,
    height: 52,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    width: '100%',
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

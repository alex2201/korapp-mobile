import { StyleSheet } from 'react-native';

import { colors, radii, spacing } from '@/theme';

export const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background.default,
    flex: 1,
  },
  closeButton: {
    alignItems: 'center',
    borderRadius: radii.full,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  closeButtonPressed: {
    backgroundColor: colors.background.muted,
  },
  closeButtonLabel: {
    lineHeight: 28,
  },
  content: {
    flexGrow: 1,
    gap: spacing.md,
    padding: spacing['3xl'],
  },
  introduction: {
    gap: spacing.sm,
    paddingBottom: spacing.lg,
  },
  emptyState: {
    alignItems: 'center',
    gap: spacing.md,
    justifyContent: 'center',
    minHeight: 240,
  },
  emptyDescription: {
    maxWidth: 340,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: colors.brand.primary,
    borderCurve: 'continuous',
    borderRadius: radii.full,
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  retryButtonPressed: {
    opacity: 0.75,
  },
  servicePressed: {
    opacity: 0.72,
  },
  serviceContent: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.lg,
  },
  serviceIcon: {
    alignItems: 'center',
    backgroundColor: colors.brand.subtle,
    borderCurve: 'continuous',
    borderRadius: radii.md,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  serviceInformation: {
    flex: 1,
    gap: spacing.xs,
  },
  serviceMetadata: {
    alignItems: 'flex-end',
    gap: spacing.xs,
  },
});

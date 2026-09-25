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
    padding: spacing['3xl'],
  },
  headerContent: {
    gap: spacing['3xl'],
    paddingBottom: spacing.md,
  },
  introduction: {
    gap: spacing.sm,
  },
  modeSelector: {
    backgroundColor: colors.background.muted,
    borderCurve: 'continuous',
    borderRadius: radii.full,
    flexDirection: 'row',
    padding: spacing.xs,
  },
  modeButton: {
    alignItems: 'center',
    borderCurve: 'continuous',
    borderRadius: radii.full,
    flex: 1,
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: spacing.md,
  },
  modeButtonActive: {
    backgroundColor: colors.background.default,
    boxShadow: '0 1px 3px rgba(30, 52, 68, 0.14)',
  },
  modeButtonPressed: {
    opacity: 0.72,
  },
  form: {
    gap: spacing.md,
  },
  emptyResults: {
    alignItems: 'center',
    gap: spacing.sm,
    minHeight: 190,
    justifyContent: 'center',
  },
  emptyResultsDescription: {
    maxWidth: 340,
    textAlign: 'center',
  },
  resultSeparator: {
    height: spacing.md,
  },
  resultPressed: {
    opacity: 0.72,
  },
  resultDisabled: {
    opacity: 0.55,
  },
  resultContent: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'space-between',
  },
  resultInformation: {
    flex: 1,
    gap: spacing.xs,
  },
  resultMetadata: {
    alignItems: 'flex-end',
    gap: spacing.xs,
  },
});

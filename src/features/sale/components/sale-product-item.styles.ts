import { StyleSheet } from 'react-native';

import { colors, radii, spacing } from '@/theme';

export const styles = StyleSheet.create({
  card: {
    width: '100%',
  },
  cardInvalid: {
    borderColor: colors.status.error,
  },
  itemLayout: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.xl,
    justifyContent: 'space-between',
  },
  productColumn: {
    flex: 1,
    gap: spacing.lg,
  },
  productInformation: {
    gap: spacing.xs,
  },
  quantitySection: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  quantityControls: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  fractionalQuantitySection: {
    alignItems: 'center',
    alignSelf: 'stretch',
    gap: spacing.sm,
  },
  fractionalQuantityControl: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  fractionalStepControls: {
    flexDirection: 'row',
    gap: spacing['2xl'],
    justifyContent: 'center',
  },
  fractionalQuantityInput: {
    backgroundColor: colors.background.default,
    borderColor: colors.border.default,
    borderRadius: radii.md,
    borderWidth: 1,
    color: colors.text.primary,
    fontVariant: ['tabular-nums'],
    minWidth: 72,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    textAlign: 'right',
  },
  fractionalQuantityInputInvalid: {
    borderColor: colors.status.error,
  },
  quantityButton: {
    alignItems: 'center',
    backgroundColor: colors.background.soft,
    borderColor: colors.border.default,
    borderRadius: radii.full,
    borderWidth: 1,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  quantityButtonPressed: {
    backgroundColor: colors.brand.subtle,
  },
  quantityButtonDisabled: {
    opacity: 0.4,
  },
  deleteAction: {
    alignItems: 'center',
    backgroundColor: colors.status.error,
    borderBottomRightRadius: radii.lg,
    borderTopRightRadius: radii.lg,
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  deleteActionPressed: {
    backgroundColor: colors.statusSurface.error.text,
  },
});

import { StyleSheet } from 'react-native';

import { colors, radii, spacing } from '@/theme';

export const styles = StyleSheet.create({
  card: {
    width: '100%',
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

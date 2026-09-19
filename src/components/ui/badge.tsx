import { View, type ViewProps } from 'react-native';

import { colors, radii, spacing } from '@/theme';

import { AppText } from './app-text';

export type BadgeVariant = 'neutral' | 'brand' | 'success' | 'warning' | 'error' | 'info';

export interface BadgeProps extends ViewProps {
  children: string;
  variant?: BadgeVariant;
}

const variants = {
  neutral: { background: colors.background.muted, border: colors.border.soft, text: colors.text.secondary },
  brand: { background: colors.brand.subtle, border: colors.border.default, text: colors.brand.primary },
  success: colors.statusSurface.success,
  warning: colors.statusSurface.warning,
  error: colors.statusSurface.error,
  info: colors.statusSurface.info,
} as const;

export function Badge({ children, style, variant = 'neutral', ...props }: BadgeProps) {
  const appearance = variants[variant];

  return (
    <View
      {...props}
      style={[
        {
          alignSelf: 'flex-start',
          backgroundColor: appearance.background,
          borderColor: appearance.border,
          borderRadius: radii.full,
          borderWidth: 1,
          paddingHorizontal: spacing.sm,
          paddingVertical: spacing.xs,
        },
        style,
      ]}
    >
      <AppText style={{ color: appearance.text }} variant="caption">
        {children}
      </AppText>
    </View>
  );
}

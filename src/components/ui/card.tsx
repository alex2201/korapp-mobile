import { View, type ViewProps } from 'react-native';

import { colors, radii, shadows, spacing } from '@/theme';

export type CardVariant = 'default' | 'soft' | 'outlined';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends ViewProps {
  padding?: CardPadding;
  variant?: CardVariant;
}

const paddings = { none: 0, sm: spacing.md, md: spacing.lg, lg: spacing.xl } as const;

export function Card({ children, padding = 'md', style, variant = 'default', ...props }: CardProps) {
  return (
    <View
      {...props}
      style={[
        {
          backgroundColor: variant === 'soft' ? colors.background.soft : colors.background.default,
          borderColor: variant === 'soft' ? colors.border.soft : colors.border.default,
          borderCurve: 'continuous',
          borderRadius: radii.lg,
          borderWidth: variant === 'default' ? 0 : 1,
          padding: paddings[padding],
        },
        variant === 'default' && shadows.sm,
        style,
      ]}
    >
      {children}
    </View>
  );
}

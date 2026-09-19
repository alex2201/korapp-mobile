import type { ReactNode } from 'react';
import { ActivityIndicator, Pressable, type PressableProps, type ViewStyle } from 'react-native';

import { colors, radii, spacing } from '@/theme';

import { AppText } from './app-text';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  children: string;
  fullWidth?: boolean;
  leading?: ReactNode;
  loading?: boolean;
  size?: ButtonSize;
  style?: PressableProps['style'];
  trailing?: ReactNode;
  variant?: ButtonVariant;
}

const variantStyles: Record<ButtonVariant, { container: ViewStyle; pressed: ViewStyle; text: 'primary' | 'inverse' | 'error' }> = {
  primary: {
    container: { backgroundColor: colors.brand.primary, borderColor: colors.brand.primary },
    pressed: { backgroundColor: '#2A465B', borderColor: '#2A465B' },
    text: 'inverse',
  },
  secondary: {
    container: { backgroundColor: colors.brand.subtle, borderColor: colors.border.default },
    pressed: { backgroundColor: colors.border.soft },
    text: 'primary',
  },
  outline: {
    container: { backgroundColor: colors.background.default, borderColor: colors.border.default },
    pressed: { backgroundColor: colors.background.soft },
    text: 'primary',
  },
  ghost: {
    container: { backgroundColor: 'transparent', borderColor: 'transparent' },
    pressed: { backgroundColor: colors.background.muted },
    text: 'primary',
  },
  danger: {
    container: { backgroundColor: colors.status.error, borderColor: colors.status.error },
    pressed: { backgroundColor: colors.statusSurface.error.text, borderColor: colors.statusSurface.error.text },
    text: 'inverse',
  },
};

const sizeStyles: Record<ButtonSize, { container: ViewStyle; textVariant: 'caption' | 'label' }> = {
  sm: { container: { minHeight: 36, paddingHorizontal: spacing.md, paddingVertical: spacing.sm }, textVariant: 'caption' },
  md: { container: { minHeight: 44, paddingHorizontal: spacing.lg, paddingVertical: 10 }, textVariant: 'label' },
  lg: { container: { minHeight: 50, paddingHorizontal: spacing.xl, paddingVertical: spacing.md }, textVariant: 'label' },
};

export function Button({ children, disabled, fullWidth = false, leading, loading = false, size = 'md', style, trailing, variant = 'primary', ...props }: ButtonProps) {
  const isDisabled = disabled || loading;
  const appearance = variantStyles[variant];
  const dimensions = sizeStyles[size];

  return (
    <Pressable
      {...props}
      accessibilityRole="button"
      accessibilityState={{ busy: loading, disabled: isDisabled }}
      disabled={isDisabled}
      style={(state) => [
        { alignItems: 'center', borderCurve: 'continuous', borderRadius: radii.md, borderWidth: 1.5, flexDirection: 'row', gap: spacing.sm, justifyContent: 'center' },
        appearance.container,
        dimensions.container,
        fullWidth && { alignSelf: 'stretch' },
        state.pressed && appearance.pressed,
        isDisabled && { opacity: 0.55 },
        typeof style === 'function' ? style(state) : style,
      ]}
    >
      {loading && <ActivityIndicator color={appearance.text === 'inverse' ? colors.text.inverse : colors.brand.primary} />}
      {!loading && leading}
      <AppText tone={appearance.text} variant={dimensions.textVariant}>{children}</AppText>
      {!loading && trailing}
    </Pressable>
  );
}

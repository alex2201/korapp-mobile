import { Text, type TextProps, type TextStyle } from 'react-native';

import { colors, fontFamilies, textStyles } from '@/theme';

export type AppTextVariant = keyof typeof textStyles | 'displayItalic';
export type AppTextTone =
  | 'primary'
  | 'secondary'
  | 'muted'
  | 'inverse'
  | 'brand'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

export interface AppTextProps extends TextProps {
  tone?: AppTextTone;
  variant?: AppTextVariant;
}

const toneColors: Record<AppTextTone, string> = {
  primary: colors.text.primary,
  secondary: colors.text.secondary,
  muted: colors.text.muted,
  inverse: colors.text.inverse,
  brand: colors.brand.primary,
  success: colors.status.success,
  warning: colors.status.warning,
  error: colors.status.error,
  info: colors.status.info,
};

const variantStyles: Record<AppTextVariant, TextStyle> = {
  ...textStyles,
  displayItalic: {
    ...textStyles.display,
    fontFamily: fontFamilies.display.italic.bold,
  },
};

export function AppText({
  children,
  style,
  tone = 'primary',
  variant = 'body',
  ...props
}: AppTextProps) {
  return (
    <Text {...props} style={[variantStyles[variant], { color: toneColors[tone] }, style]}>
      {children}
    </Text>
  );
}

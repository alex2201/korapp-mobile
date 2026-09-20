import { colors } from './colors';
import { fontFamilies, fontSizes, lineHeights, textStyles } from './typography';

export { colors, fontFamilies, fontSizes, lineHeights, textStyles };

export const radii = {
  sm: 6,
  md: 10,
  lg: 16,
  full: 9999,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 48,
} as const;

export const shadows = {
  sm: {
    boxShadow: '0 1px 3px rgba(25, 24, 59, 0.06)',
  },
  md: {
    boxShadow: '0 4px 12px rgba(25, 24, 59, 0.10)',
  },
  lg: {
    boxShadow: '0 8px 24px rgba(25, 24, 59, 0.14)',
  },
} as const;

export const theme = {
  colors,
  typography: {
    families: fontFamilies,
    sizes: fontSizes,
    lineHeights,
    styles: textStyles,
  },
  radii,
  spacing,
  shadows,
} as const;

export type AppTheme = typeof theme;

import type { TextStyle } from 'react-native';

export const fontFamilies = {
  sans: {
    thin: 'Lato_100Thin',
    light: 'Lato_300Light',
    regular: 'Lato_400Regular',
    bold: 'Lato_700Bold',
    black: 'Lato_900Black',
    italic: {
      thin: 'Lato_100Thin_Italic',
      light: 'Lato_300Light_Italic',
      regular: 'Lato_400Regular_Italic',
      bold: 'Lato_700Bold_Italic',
      black: 'Lato_900Black_Italic',
    },
  },
  display: {
    regular: 'PlayfairDisplay_400Regular',
    bold: 'PlayfairDisplay_700Bold',
    black: 'PlayfairDisplay_900Black',
    italic: {
      regular: 'PlayfairDisplay_400Regular_Italic',
      bold: 'PlayfairDisplay_700Bold_Italic',
    },
  },
  mono: 'monospace',
} as const;

/** Matches the web type scale (rem values converted using a 16px base). */
export const fontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
} as const;

export const lineHeights = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.6,
} as const;

export const textStyles = {
  display: {
    fontFamily: fontFamilies.display.black,
    fontSize: fontSizes['3xl'],
    lineHeight: fontSizes['3xl'] * lineHeights.tight,
  },
  heading: {
    fontFamily: fontFamilies.sans.bold,
    fontSize: fontSizes['2xl'],
    lineHeight: fontSizes['2xl'] * lineHeights.tight,
  },
  subheading: {
    fontFamily: fontFamilies.sans.bold,
    fontSize: fontSizes.lg,
    lineHeight: fontSizes.lg * lineHeights.normal,
  },
  body: {
    fontFamily: fontFamilies.sans.regular,
    fontSize: fontSizes.base,
    lineHeight: fontSizes.base * lineHeights.relaxed,
  },
  bodySmall: {
    fontFamily: fontFamilies.sans.regular,
    fontSize: fontSizes.sm,
    lineHeight: fontSizes.sm * lineHeights.normal,
  },
  label: {
    fontFamily: fontFamilies.sans.bold,
    fontSize: fontSizes.sm,
    lineHeight: fontSizes.sm * lineHeights.normal,
  },
  caption: {
    fontFamily: fontFamilies.sans.regular,
    fontSize: fontSizes.xs,
    lineHeight: fontSizes.xs * lineHeights.normal,
  },
} satisfies Record<string, TextStyle>;

import { StyleSheet } from 'react-native';
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Mask,
  Pattern,
  RadialGradient,
  Rect,
  Stop,
} from 'react-native-svg';

import { colors } from '@/theme';

const DOT_SPACING = 44;
const DOT_OPACITY = 0.24;
const DOT_RADIUS = 1.25;

export function DottedBackground() {
  return (
    <Svg
      height="100%"
      pointerEvents="none"
      style={StyleSheet.absoluteFill}
      width="100%"
    >
      <Defs>
        <LinearGradient id="hero-background" x1="0%" x2="100%" y1="0%" y2="100%">
          <Stop offset="0%" stopColor="#091624" />
          <Stop offset="50%" stopColor="#0E2238" />
          <Stop offset="100%" stopColor="#061218" />
        </LinearGradient>

        <RadialGradient id="primary-glow" cx="50%" cy="0%" rx="90%" ry="60%">
          <Stop offset="0%" stopColor={colors.brand.primary} stopOpacity={0.6} />
          <Stop offset="70%" stopColor={colors.brand.primary} stopOpacity={0} />
        </RadialGradient>

        <RadialGradient id="accent-glow" cx="50%" cy="30%" rx="60%" ry="45%">
          <Stop offset="0%" stopColor={colors.brand.accent} stopOpacity={0.07} />
          <Stop offset="65%" stopColor={colors.brand.accent} stopOpacity={0} />
        </RadialGradient>

        <Pattern
          id="dots"
          height={DOT_SPACING}
          patternUnits="userSpaceOnUse"
          width={DOT_SPACING}
        >
          <Circle
            cx={DOT_RADIUS}
            cy={DOT_RADIUS}
            fill={colors.brand.accent}
            fillOpacity={DOT_OPACITY}
            r={DOT_RADIUS}
          />
        </Pattern>

        <RadialGradient id="fade" cx="50%" cy="20%" rx="70%" ry="55%">
          <Stop offset="0%" stopColor="white" stopOpacity={1} />
          <Stop offset="100%" stopColor="white" stopOpacity={0} />
        </RadialGradient>

        <Mask
          id="dotted-mask"
          height="100%"
          maskUnits="userSpaceOnUse"
          width="100%"
          x={0}
          y={0}
        >
          <Rect fill="url(#fade)" height="100%" width="100%" />
        </Mask>
      </Defs>

      <Rect fill="url(#hero-background)" height="100%" width="100%" />
      <Rect fill="url(#primary-glow)" height="70%" width="100%" />
      <Rect fill="url(#accent-glow)" height="100%" width="100%" />
      <Rect fill="url(#dots)" height="100%" mask="url(#dotted-mask)" width="100%" />
    </Svg>
  );
}

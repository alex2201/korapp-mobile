import Svg, { Circle, Path } from 'react-native-svg';

type ServiceIconProps = {
  color: string;
  size?: number;
};

export function ServiceIcon({ color, size = 22 }: ServiceIconProps) {
  return (
    <Svg
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      <Path
        d="M11 2v2M5 2v2M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1M8 15a6 6 0 0 0 12 0v-3"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <Circle
        cx={20}
        cy={10}
        fill="none"
        r={2}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </Svg>
  );
}

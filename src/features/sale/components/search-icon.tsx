import Svg, { Circle, Path } from 'react-native-svg';

type SearchIconProps = {
  color: string;
  size?: number;
};

export function SearchIcon({ color, size = 22 }: SearchIconProps) {
  return (
    <Svg
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      <Path
        d="m21 21-4.34-4.34"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <Circle
        cx={11}
        cy={11}
        fill="none"
        r={8}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </Svg>
  );
}

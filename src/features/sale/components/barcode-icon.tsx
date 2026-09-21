import Svg, { Path } from 'react-native-svg';

type BarcodeIconProps = {
  color: string;
  size?: number;
};

export function BarcodeIcon({ color, size = 22 }: BarcodeIconProps) {
  return (
    <Svg
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      <Path
        d="M3 5v14M8 5v14M12 5v14M17 5v14M21 5v14"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </Svg>
  );
}

import Svg, { Path } from 'react-native-svg';

type CheckoutAlertIconProps = {
  color: string;
  size?: number;
};

export function CheckoutAlertIcon({
  color,
  size = 18,
}: CheckoutAlertIconProps) {
  return (
    <Svg
      accessibilityElementsHidden
      height={size}
      importantForAccessibility="no-hide-descendants"
      viewBox="0 0 24 24"
      width={size}
    >
      <Path
        d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <Path
        d="M12 9v4m0 4h.01"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={2}
      />
    </Svg>
  );
}

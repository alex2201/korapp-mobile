import { Image, type ImageProps, StyleSheet } from 'react-native';

const logo = require('@/assets/images/logo.png');

export type LogoImageProps = Omit<ImageProps, 'source'>;

export function LogoImage({
  accessibilityLabel = 'Korapp',
  resizeMode = 'contain',
  style,
  ...imageProps
}: LogoImageProps) {
  return (
    <Image
      {...imageProps}
      accessibilityLabel={accessibilityLabel}
      resizeMode={resizeMode}
      source={logo}
      style={[styles.logo, style]}
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    aspectRatio: 500 / 130,
    height: 'auto',
    tintColor: '#FFFFFF',
  },
});

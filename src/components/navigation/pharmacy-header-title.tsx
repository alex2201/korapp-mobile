import { Image, View } from 'react-native';

import { AppText } from '@/components/ui';

const korappIcon = require('@/assets/images/icon.png');

type PharmacyHeaderTitleProps = {
  name: string;
};

export function PharmacyHeaderTitle({ name }: PharmacyHeaderTitleProps) {
  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        maxWidth: 260,
      }}
    >
      <View
        style={{
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.14)',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: 9,
          borderWidth: 1,
          height: 34,
          justifyContent: 'center',
          width: 34,
        }}
      >
        <Image
          accessibilityIgnoresInvertColors
          accessibilityLabel="Korapp"
          resizeMode="contain"
          source={korappIcon}
          style={{ height: 23, tintColor: '#FFFFFF', width: 23 }}
        />
      </View>

      <AppText
        numberOfLines={1}
        style={{ color: '#FFFFFF', flexShrink: 1 }}
        variant="labelLarge"
      >
        {name}
      </AppText>
    </View>
  );
}

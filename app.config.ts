import type { ConfigContext, ExpoConfig } from 'expo/config';

const variants = {
  qa: {
    androidPackage: 'com.appsmx.korapp.qa',
    firebaseDirectory: './firebase/qa',
    iosBundleIdentifier: 'com.appsmx.korapp.qa',
    name: 'Korapp QA',
    scheme: 'korapp-qa',
  },
  production: {
    androidPackage: 'com.appsmx.korapp',
    firebaseDirectory: './firebase/production',
    iosBundleIdentifier: 'com.appsmx.korapp',
    name: 'Korapp',
    scheme: 'korapp',
  },
} as const;

type AppVariant = keyof typeof variants;

function getAppVariant(): AppVariant {
  const appVariant = process.env.APP_VARIANT ?? 'qa';

  if (appVariant !== 'qa' && appVariant !== 'production') {
    throw new Error(
      `APP_VARIANT must be "qa" or "production". Received: "${appVariant}".`,
    );
  }

  return appVariant;
}

export default ({ config }: ConfigContext): ExpoConfig => {
  const appVariant = getAppVariant();
  const variant = variants[appVariant];

  return {
    ...config,
    name: variant.name,
    slug: config.slug ?? 'korapp',
    scheme: variant.scheme,
    ios: {
      ...config.ios,
      bundleIdentifier: variant.iosBundleIdentifier,
      googleServicesFile: `${variant.firebaseDirectory}/GoogleService-Info.plist`,
    },
    android: {
      ...config.android,
      package: variant.androidPackage,
      googleServicesFile: `${variant.firebaseDirectory}/google-services.json`,
    },
    extra: {
      ...config.extra,
      appVariant,
    },
  };
};

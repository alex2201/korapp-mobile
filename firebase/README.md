# Firebase environments

Native Firebase configuration is selected at build time with `APP_VARIANT`.

Expected files:

```text
firebase/
├── qa/
│   ├── GoogleService-Info.plist
│   └── google-services.json
└── production/
    ├── GoogleService-Info.plist
    └── google-services.json
```

The QA applications use `com.appsmx.korapp.qa`. Production applications use
`com.appsmx.korapp`.

QA is the default variant. To inspect the resolved configurations:

```bash
APP_VARIANT=qa npx expo config --type public
APP_VARIANT=production npx expo config --type public
```

Before changing the native variant, regenerate the platform project so the
correct Firebase files and application identifiers are embedded:

```bash
APP_VARIANT=qa npx expo prebuild --clean
APP_VARIANT=qa npx expo run:ios --device
```

Use `APP_VARIANT=production` for production builds after adding the production
Firebase files.

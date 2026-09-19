# Korapp Mobile

Aplicación móvil de Korapp creada con Expo y React Native.

## Entorno

El proyecto usa Node.js 24 LTS. Si tienes `nvm` instalado:

```bash
nvm use
npm install
```

Las dependencias se instalan localmente en `mobile/node_modules` y no se
comparten con `api` ni con `web`.

## Desarrollo

```bash
npm start
```

Desde Expo puedes abrir la app en un dispositivo, simulador de iOS, emulador de
Android o navegador. También puedes iniciar una plataforma directamente:

```bash
npm run ios
npm run android
npm run web
```

## Verificaciones

```bash
npm run lint
npm run typecheck
```

## Stack

- Expo + TypeScript
- Expo Router
- SecureStore

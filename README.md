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

## Configuración local

Crea `mobile/.env.local` con la URL del API de Korapp:

```env
EXPO_PUBLIC_KORAPP_API_URL=http://localhost:4000/api/v1
```

Usa `localhost` para el simulador de iOS, `10.0.2.2` para el emulador de
Android o la IP local de tu computadora cuando ejecutes la app en un dispositivo
físico. El dispositivo y la computadora deben estar en la misma red.

`.env.local` contiene configuración propia de cada equipo y está ignorado por
Git. Reinicia Expo después de modificarlo.

Las credenciales nativas de Firebase también se proporcionan localmente. Consulta
[`firebase/README.md`](firebase/README.md) para conocer los archivos requeridos
por ambiente.

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

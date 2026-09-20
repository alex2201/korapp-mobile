import { Keyboard, View } from 'react-native';

import { AppText, Button, TextField } from '@/components/ui';
import { spacing } from '@/theme';

import { useLogin } from '../hooks/useLogin';

interface LoginFormProps {
  onForgotPassword: (email: string) => void;
}

export function LoginForm({ onForgotPassword }: LoginFormProps) {
  const {
    canSubmit,
    email,
    emailError,
    isSubmitting,
    login,
    loginError,
    markEmailAsTouched,
    markPasswordAsTouched,
    password,
    passwordError,
    setEmail,
    setPassword,
  } = useLogin();

  function submitLogin() {
    Keyboard.dismiss();
    void login();
  }

  return (
    <View style={{ gap: spacing.lg }}>
      <TextField
        autoCapitalize="none"
        autoComplete="email"
        error={emailError}
        keyboardType="email-address"
        label="Correo electrónico"
        onBlur={markEmailAsTouched}
        onChangeText={setEmail}
        placeholder="tu@farmacia.com"
        returnKeyType="next"
        textContentType="emailAddress"
        value={email}
      />
      <TextField
        autoCapitalize="none"
        autoComplete="current-password"
        error={passwordError}
        label="Contraseña"
        onBlur={markPasswordAsTouched}
        onChangeText={setPassword}
        onSubmitEditing={canSubmit ? submitLogin : undefined}
        placeholder="••••••••"
        returnKeyType="done"
        secureTextEntry
        textContentType="password"
        value={password}
      />
      {loginError && (
        <AppText accessibilityLiveRegion="polite" selectable tone="error" variant="caption">
          {loginError}
        </AppText>
      )}
      <Button
        disabled={!canSubmit}
        fullWidth
        loading={isSubmitting}
        onPress={submitLogin}
        size="lg"
      >
        Iniciar sesión
      </Button>

      <Button
        fullWidth
        onPress={() => onForgotPassword(email.trim())}
        size="lg"
        variant="ghost"
      >
        ¿Olvidaste tu contraseña?
      </Button>
    </View>
  );
}

import { Keyboard, View } from 'react-native';

import { AppText, Button, TextField } from '@/components/ui';
import { spacing } from '@/theme';
import { useResetPassword } from '../hooks/use-reset-password';

interface ResetPasswordFormProps {
  initialEmail: string;
  onBackToLogin: () => void;
  onSuccess: (email: string) => void;
}

export function ResetPasswordForm({
  initialEmail,
  onBackToLogin,
  onSuccess,
}: ResetPasswordFormProps) {
  const {
    canSubmit,
    email,
    emailError,
    isSubmitting,
    markEmailAsTouched,
    resetError,
    resetPassword,
    setEmail,
  } = useResetPassword({ initialEmail, onSuccess });

  function submitResetPassword() {
    Keyboard.dismiss();
    void resetPassword();
  }

  return (
    <View style={{ gap: spacing['2xl'] }}>
      <View style={{ gap: spacing.sm }}>
        <AppText variant="heading">Restablecer contraseña</AppText>
        <AppText selectable tone="secondary" variant="bodySmall">
          Te enviaremos un enlace para crear una nueva contraseña.
        </AppText>
      </View>

      <View style={{ gap: spacing.lg }}>
        <TextField
          autoCapitalize="none"
          autoComplete="email"
          error={emailError}
          keyboardType="email-address"
          label="Correo electrónico"
          onBlur={markEmailAsTouched}
          onChangeText={setEmail}
          onSubmitEditing={canSubmit ? submitResetPassword : undefined}
          placeholder="tu@farmacia.com"
          returnKeyType="done"
          textContentType="emailAddress"
          value={email}
        />
        {resetError && (
          <AppText accessibilityLiveRegion="polite" selectable tone="error" variant="caption">
            {resetError}
          </AppText>
        )}
        <Button
          disabled={!canSubmit}
          fullWidth
          loading={isSubmitting}
          onPress={submitResetPassword}
          size="lg"
        >
          Enviar enlace
        </Button>
        <Button fullWidth onPress={onBackToLogin} variant="ghost">
          ← Volver al inicio de sesión
        </Button>
      </View>
    </View>
  );
}

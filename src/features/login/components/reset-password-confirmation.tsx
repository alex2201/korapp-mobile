import { View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { AppText, Button } from '@/components/ui';
import { colors, spacing } from '@/theme';

interface ResetPasswordConfirmationProps {
  email: string;
  onBackToLogin: () => void;
}

export function ResetPasswordConfirmation({
  email,
  onBackToLogin,
}: ResetPasswordConfirmationProps) {
  return (
    <View style={{ alignItems: 'center', gap: spacing.xl, paddingVertical: spacing.xl }}>
      <Svg accessibilityLabel="Enlace enviado" height={48} role="img" viewBox="0 0 48 48" width={48}>
        <Circle
          cx={24}
          cy={24}
          fill="none"
          r={18}
          stroke={colors.status.success}
          strokeWidth={3}
        />
        <Path
          d="M16 24.5l5.5 5.5L33 18.5"
          fill="none"
          stroke={colors.status.success}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
        />
      </Svg>

      <AppText style={{ textAlign: 'center' }} variant="heading">
        Revisa tu correo
      </AppText>

      <AppText selectable style={{ textAlign: 'center' }} tone="secondary" variant="bodySmall">
        Enviamos un enlace de restablecimiento a{'\n'}
        <AppText variant="label">{email}</AppText>. El enlace expira en 1 hora.
      </AppText>

      <Button fullWidth onPress={onBackToLogin} variant="ghost">
        ← Volver al inicio de sesión
      </Button>
    </View>
  );
}

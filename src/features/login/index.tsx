import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Card, LogoImage } from '@/components/ui';

import { DottedBackground } from './components/dotted-background';
import { LoginForm } from './components/login-form';
import { ResetPasswordConfirmation } from './components/reset-password-confirmation';
import { ResetPasswordForm } from './components/reset-password-form';
import { styles } from './styles/login-screen.styles';

type LoginFlowState =
  | { view: 'login' }
  | { view: 'resetPassword'; email: string }
  | { view: 'resetPasswordConfirmation'; email: string };

export function LoginScreen() {
  const [flow, setFlow] = useState<LoginFlowState>({ view: 'login' });

  function showResetPasswordForm(email: string) {
    setFlow({ view: 'resetPassword', email });
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <DottedBackground />
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={process.env.EXPO_OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            contentInsetAdjustmentBehavior="automatic"
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.container}>
              <LogoImage style={styles.logoImg} />

              <Card padding="md" style={styles.loginCard}>
                {flow.view === 'resetPassword' && (
                  <ResetPasswordForm
                    initialEmail={flow.email}
                    onBackToLogin={() => setFlow({ view: 'login' })}
                    onSuccess={(email) =>
                      setFlow({ view: 'resetPasswordConfirmation', email })
                    }
                  />
                )}

                {flow.view === 'resetPasswordConfirmation' && (
                  <ResetPasswordConfirmation
                    email={flow.email}
                    onBackToLogin={() => setFlow({ view: 'login' })}
                  />
                )}

                {flow.view === 'login' && (
                  <>
                    <View style={styles.cardHeader}>
                      <AppText variant="heading">Bienvenido</AppText>
                      <AppText tone="secondary" variant="bodySmall">
                        Ingresa tus credenciales para continuar
                      </AppText>
                    </View>

                    <LoginForm onForgotPassword={showResetPasswordForm} />
                  </>
                )}
              </Card>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

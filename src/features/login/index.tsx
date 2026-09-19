import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Button, Card, LogoImage, TextField } from '@/components/ui';

import { DottedBackground } from './components/dotted-background';
import { styles } from './login-screen.styles';

export function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const canSubmit = email.trim().length > 0 && password.length > 0;

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

              <Card padding="lg" style={styles.loginCard}>
                <View style={styles.cardHeader}>
                  <AppText variant="heading">Bienvenido</AppText>
                  <AppText tone="secondary" variant="bodySmall">
                    Ingresa tus credenciales para continuar
                  </AppText>
                </View>

                <View style={styles.form}>
                  <TextField
                    autoCapitalize="none"
                    autoComplete="email"
                    keyboardType="email-address"
                    label="Correo electrónico"
                    onChangeText={setEmail}
                    placeholder="tu@farmacia.com"
                    returnKeyType="next"
                    textContentType="emailAddress"
                    value={email}
                  />
                  <TextField
                    autoCapitalize="none"
                    autoComplete="current-password"
                    label="Contraseña"
                    onChangeText={setPassword}
                    onSubmitEditing={canSubmit ? Keyboard.dismiss : undefined}
                    placeholder="••••••••"
                    returnKeyType="done"
                    secureTextEntry
                    textContentType="password"
                    value={password}
                  />
                  <Button
                    disabled={!canSubmit}
                    fullWidth
                    onPress={Keyboard.dismiss}
                    size="lg"
                  >
                    Iniciar sesión
                  </Button>
                </View>
              </Card>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

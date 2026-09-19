import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 48,
    paddingVertical: 32,
  },
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    gap: 24,
    maxWidth: 420,
    width: '100%',
  },
  logoImg: {
    maxWidth: 280,
    width: '75%',
  },
  loginCard: {
    gap: 16,
    width: '100%',
  },
  cardHeader: {
    gap: 8,
  },
  form: {
    gap: 16,
  },
});

import { spacing } from '@/theme';
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
    paddingHorizontal: spacing['4xl'],
    paddingVertical: spacing['4xl'],
  },
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    gap: spacing['2xl'],
    maxWidth: 420,
    width: '100%',
  },
  logoImg: {
    maxWidth: 280,
    width: '75%',
  },
  loginCard: {
    gap: spacing['2xl'],
    width: '100%',
  },
  cardHeader: {
    gap: spacing.lg,
  },
});

import { useReducer, type Dispatch } from 'react';

import { resetPasswordWithEmail } from '@/features/auth/firebase-auth';
import { validateEmail } from '@/features/auth/auth-validation';

interface ResetPasswordState {
  email: string;
  emailTouched: boolean;
  isSubmitting: boolean;
  resetError?: string;
}

type ResetPasswordAction =
  | { type: 'emailChanged'; value: string }
  | { type: 'emailTouched' }
  | { type: 'submissionAttempted' }
  | { type: 'resetStarted' }
  | { type: 'resetFailed'; error: string };

function createInitialState(email: string): ResetPasswordState {
  return {
    email,
    emailTouched: false,
    isSubmitting: false,
  };
}

function resetPasswordReducer(
  state: ResetPasswordState,
  action: ResetPasswordAction,
): ResetPasswordState {
  switch (action.type) {
    case 'emailChanged':
      return { ...state, email: action.value, resetError: undefined };
    case 'emailTouched':
    case 'submissionAttempted':
      return { ...state, emailTouched: true };
    case 'resetStarted':
      return { ...state, isSubmitting: true, resetError: undefined };
    case 'resetFailed':
      return { ...state, isSubmitting: false, resetError: action.error };
  }
}

function getFirebaseErrorCode(error: unknown) {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof error.code === 'string'
      ? error.code
      : undefined
  );
}

function getResetPasswordErrorMessage(error: unknown) {
  switch (getFirebaseErrorCode(error)) {
    case 'auth/network-request-failed':
      return 'Revisa tu conexión a internet e intenta de nuevo.';
    case 'auth/too-many-requests':
      return 'Demasiados intentos. Intenta de nuevo más tarde.';
    default:
      return 'No pudimos enviar el enlace. Intenta de nuevo.';
  }
}

interface CreateResetPasswordActionsParams {
  canSubmit: boolean;
  dispatch: Dispatch<ResetPasswordAction>;
  email: string;
  onSuccess: (email: string) => void;
}

function createResetPasswordActions({
  canSubmit,
  dispatch,
  email,
  onSuccess,
}: CreateResetPasswordActionsParams) {
  async function resetPassword() {
    dispatch({ type: 'submissionAttempted' });

    if (!canSubmit) return;

    const normalizedEmail = email.trim().toLowerCase();
    dispatch({ type: 'resetStarted' });

    try {
      await resetPasswordWithEmail(normalizedEmail);
      onSuccess(normalizedEmail);
    } catch (error) {
      if (getFirebaseErrorCode(error) === 'auth/user-not-found') {
        onSuccess(normalizedEmail);
        return;
      }

      dispatch({ type: 'resetFailed', error: getResetPasswordErrorMessage(error) });
    }
  }

  return {
    markEmailAsTouched: () => dispatch({ type: 'emailTouched' }),
    resetPassword,
    setEmail: (value: string) => dispatch({ type: 'emailChanged', value }),
  };
}

interface UseResetPasswordParams {
  initialEmail: string;
  onSuccess: (email: string) => void;
}

export function useResetPassword({ initialEmail, onSuccess }: UseResetPasswordParams) {
  const [state, dispatch] = useReducer(resetPasswordReducer, initialEmail, createInitialState);
  const emailValidationError = validateEmail(state.email);
  const canSubmit = !emailValidationError && !state.isSubmitting;
  const actions = createResetPasswordActions({
    canSubmit,
    dispatch,
    email: state.email,
    onSuccess,
  });

  return {
    canSubmit,
    email: state.email,
    emailError: state.emailTouched ? emailValidationError : undefined,
    isSubmitting: state.isSubmitting,
    resetError: state.resetError,
    ...actions,
  };
}

import { useReducer, type Dispatch } from 'react';

import { signInToFirebaseWithEmailAndPassword } from '@/features/auth/firebase-auth';
import { validateEmail, validatePassword } from '@/features/auth/auth-validation';

function getLoginErrorMessage(error: unknown) {
  const code =
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof error.code === 'string'
      ? error.code
      : undefined;

  switch (code) {
    case 'auth/invalid-credential':
      return 'Correo o contraseña incorrectos';
    case 'auth/user-disabled':
      return 'Esta cuenta está deshabilitada';
    case 'auth/too-many-requests':
      return 'Demasiados intentos. Intenta de nuevo más tarde.';
    default:
      return 'No pudimos iniciar sesión. Intenta de nuevo.';
  }
}

interface LoginState {
  email: string;
  emailTouched: boolean;
  isSubmitting: boolean;
  loginError?: string;
  password: string;
  passwordTouched: boolean;
}

type LoginAction =
  | { type: 'emailChanged'; value: string }
  | { type: 'passwordChanged'; value: string }
  | { type: 'emailTouched' }
  | { type: 'passwordTouched' }
  | { type: 'submissionAttempted' }
  | { type: 'loginStarted' }
  | { type: 'loginFailed'; error: string }
  | { type: 'loginFinished' };

const initialState: LoginState = {
  email: '',
  emailTouched: false,
  isSubmitting: false,
  password: '',
  passwordTouched: false,
};

function loginReducer(state: LoginState, action: LoginAction): LoginState {
  switch (action.type) {
    case 'emailChanged':
      return { ...state, email: action.value, loginError: undefined };
    case 'passwordChanged':
      return { ...state, loginError: undefined, password: action.value };
    case 'emailTouched':
      return { ...state, emailTouched: true };
    case 'passwordTouched':
      return { ...state, passwordTouched: true };
    case 'submissionAttempted':
      return { ...state, emailTouched: true, passwordTouched: true };
    case 'loginStarted':
      return { ...state, isSubmitting: true, loginError: undefined };
    case 'loginFailed':
      return { ...state, loginError: action.error };
    case 'loginFinished':
      return { ...state, isSubmitting: false };
  }
}

interface CreateLoginActionsParams {
  canSubmit: boolean;
  dispatch: Dispatch<LoginAction>;
  state: LoginState;
}

function createLoginActions({
  canSubmit,
  dispatch,
  state,
}: CreateLoginActionsParams) {
  function setEmail(value: string) {
    dispatch({ type: 'emailChanged', value });
  }

  function setPassword(value: string) {
    dispatch({ type: 'passwordChanged', value });
  }

  async function login() {
    dispatch({ type: 'submissionAttempted' });

    if (!canSubmit) return;

    dispatch({ type: 'loginStarted' });

    try {
      await signInToFirebaseWithEmailAndPassword(
        state.email.trim().toLowerCase(),
        state.password,
      );
    } catch (error) {
      dispatch({ type: 'loginFailed', error: getLoginErrorMessage(error) });
    } finally {
      dispatch({ type: 'loginFinished' });
    }
  }

  return {
    login,
    markEmailAsTouched: () => dispatch({ type: 'emailTouched' }),
    markPasswordAsTouched: () => dispatch({ type: 'passwordTouched' }),
    setEmail,
    setPassword,
  };
}

export function useLogin() {
  const [state, dispatch] = useReducer(loginReducer, initialState);

  const emailValidationError = validateEmail(state.email);
  const passwordValidationError = validatePassword(state.password);
  const canSubmit =
    !emailValidationError && !passwordValidationError && !state.isSubmitting;
  const actions = createLoginActions({ canSubmit, dispatch, state });

  return {
    canSubmit,
    email: state.email,
    emailError: state.emailTouched ? emailValidationError : undefined,
    isSubmitting: state.isSubmitting,
    loginError: state.loginError,
    password: state.password,
    passwordError: state.passwordTouched ? passwordValidationError : undefined,
    ...actions,
  };
}

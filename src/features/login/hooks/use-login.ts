import { validateEmail, validatePassword } from '@/features/auth/auth-validation';
import { getFirebaseAuthErrorCode } from '@/features/auth/firebase-auth-errors';
import { signInToFirebaseWithEmailAndPassword } from '@/features/auth/firebase-auth';
import { useFormSubmission } from '@/features/auth/hooks/use-form-submission';
import { useValidatedField } from '@/features/auth/hooks/use-validated-field';

function getLoginErrorMessage(error: unknown) {
  switch (getFirebaseAuthErrorCode(error)) {
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

interface CreateLoginActionsParams {
  canSubmit: boolean;
  email: ReturnType<typeof useValidatedField>;
  password: ReturnType<typeof useValidatedField>;
  submission: ReturnType<typeof useFormSubmission>;
}

function createLoginActions({
  canSubmit,
  email,
  password,
  submission,
}: CreateLoginActionsParams) {
  function setEmail(value: string) {
    email.setValue(value);
    submission.clearError();
  }

  function setPassword(value: string) {
    password.setValue(value);
    submission.clearError();
  }

  async function login() {
    email.markAsTouched();
    password.markAsTouched();

    if (!canSubmit) return;

    submission.start();

    try {
      await signInToFirebaseWithEmailAndPassword(
        email.value.trim().toLowerCase(),
        password.value,
      );
    } catch (error) {
      submission.fail(getLoginErrorMessage(error));
    } finally {
      submission.finish();
    }
  }

  return { login, setEmail, setPassword };
}

export function useLogin() {
  const email = useValidatedField('', validateEmail);
  const password = useValidatedField('', validatePassword);
  const submission = useFormSubmission();
  const canSubmit = email.isValid && password.isValid && !submission.isSubmitting;
  const actions = createLoginActions({ canSubmit, email, password, submission });

  return {
    canSubmit,
    email: email.value,
    emailError: email.error,
    isSubmitting: submission.isSubmitting,
    loginError: submission.error,
    markEmailAsTouched: email.markAsTouched,
    markPasswordAsTouched: password.markAsTouched,
    password: password.value,
    passwordError: password.error,
    ...actions,
  };
}

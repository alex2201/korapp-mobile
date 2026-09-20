import { resetPasswordWithEmail } from '@/features/auth/firebase-auth';
import { getFirebaseAuthErrorCode } from '@/features/auth/firebase-auth-errors';
import { useFormSubmission } from '@/features/auth/hooks/use-form-submission';
import { useValidatedField } from '@/features/auth/hooks/use-validated-field';
import { validateEmail } from '@/features/auth/auth-validation';

function getResetPasswordErrorMessage(error: unknown) {
  switch (getFirebaseAuthErrorCode(error)) {
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
  email: ReturnType<typeof useValidatedField>;
  onSuccess: (email: string) => void;
  submission: ReturnType<typeof useFormSubmission>;
}

function createResetPasswordActions({
  canSubmit,
  email,
  onSuccess,
  submission,
}: CreateResetPasswordActionsParams) {
  function setEmail(value: string) {
    email.setValue(value);
    submission.clearError();
  }

  async function resetPassword() {
    email.markAsTouched();

    if (!canSubmit) return;

    const normalizedEmail = email.value.trim().toLowerCase();
    submission.start();

    try {
      await resetPasswordWithEmail(normalizedEmail);
      onSuccess(normalizedEmail);
    } catch (error) {
      if (getFirebaseAuthErrorCode(error) === 'auth/user-not-found') {
        onSuccess(normalizedEmail);
        return;
      }

      submission.fail(getResetPasswordErrorMessage(error));
    }
  }

  return { resetPassword, setEmail };
}

interface UseResetPasswordParams {
  initialEmail: string;
  onSuccess: (email: string) => void;
}

export function useResetPassword({ initialEmail, onSuccess }: UseResetPasswordParams) {
  const email = useValidatedField(initialEmail, validateEmail);
  const submission = useFormSubmission();
  const canSubmit = email.isValid && !submission.isSubmitting;
  const actions = createResetPasswordActions({ canSubmit, email, onSuccess, submission });

  return {
    canSubmit,
    email: email.value,
    emailError: email.error,
    isSubmitting: submission.isSubmitting,
    markEmailAsTouched: email.markAsTouched,
    resetError: submission.error,
    ...actions,
  };
}

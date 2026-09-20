import { useReducer } from 'react';

interface FormSubmissionState {
  error?: string;
  isSubmitting: boolean;
}

type FormSubmissionAction =
  | { type: 'cleared' }
  | { type: 'started' }
  | { type: 'failed'; error: string }
  | { type: 'finished' };

const initialState: FormSubmissionState = {
  isSubmitting: false,
};

function formSubmissionReducer(
  state: FormSubmissionState,
  action: FormSubmissionAction,
): FormSubmissionState {
  switch (action.type) {
    case 'cleared':
      return { ...state, error: undefined };
    case 'started':
      return { error: undefined, isSubmitting: true };
    case 'failed':
      return { error: action.error, isSubmitting: false };
    case 'finished':
      return { ...state, isSubmitting: false };
  }
}

export function useFormSubmission() {
  const [state, dispatch] = useReducer(formSubmissionReducer, initialState);

  return {
    clearError: () => dispatch({ type: 'cleared' }),
    error: state.error,
    fail: (error: string) => dispatch({ type: 'failed', error }),
    finish: () => dispatch({ type: 'finished' }),
    isSubmitting: state.isSubmitting,
    start: () => dispatch({ type: 'started' }),
  };
}

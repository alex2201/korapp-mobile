import { useReducer } from 'react';

type Validator = (value: string) => string | undefined;

interface ValidatedFieldState {
  touched: boolean;
  value: string;
}

type ValidatedFieldAction =
  | { type: 'changed'; value: string }
  | { type: 'touched' };

function validatedFieldReducer(
  state: ValidatedFieldState,
  action: ValidatedFieldAction,
): ValidatedFieldState {
  switch (action.type) {
    case 'changed':
      return { ...state, value: action.value };
    case 'touched':
      return { ...state, touched: true };
  }
}

export function useValidatedField(initialValue: string, validate: Validator) {
  const [state, dispatch] = useReducer(validatedFieldReducer, {
    touched: false,
    value: initialValue,
  });
  const validationError = validate(state.value);

  return {
    error: state.touched ? validationError : undefined,
    isValid: !validationError,
    markAsTouched: () => dispatch({ type: 'touched' }),
    setValue: (value: string) => dispatch({ type: 'changed', value }),
    value: state.value,
  };
}

import { Signal, signal } from "@preact/signals";

type FormErrors = {
  [key: string]: FormErrorsFields;
};

export interface FormErrorsFields {
  empty: boolean;
  invalid: boolean;
  message: string;
}

const formState = {
  errors: signal<FormErrors>({}),
};

export const useFormErrors = (): {
  errors: Signal<FormErrors>;
  hasErrors: () => boolean;
  setFormErrors: (newErrors: FormErrors) => void;
} => {
  const errors = formState.errors;
  const setFormErrors = (newErrors: FormErrors) => {
    errors.value = {
      ...errors.value,
      ...newErrors,
    };
  };

  const hasErrors = () => {
    return Object.values(errors.value).some((error) =>
      error.empty || error.invalid
    );
  };

  return { errors, hasErrors, setFormErrors };
};

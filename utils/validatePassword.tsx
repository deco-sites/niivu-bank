import { Input } from "deco-sites/niivu-bank/components/ui/inputs/index.tsx";
import { JSX } from "deco/deps.ts";

interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
}

interface EmptyInputs<T> {
  [key: string]: T;
}

/**
 * Validates the password according to specified criteria.
 * @param {string} password The password to validate.
 * @returns {PasswordValidationResult} The result of password validation.
 */
export function validatePassword(password: string) {
  const regexParts: EmptyInputs<RegExp> = {
    minLength: /^.{8,}$/,
    maxLength: /^.{1,64}$/,
    minLowercaseLetters: /^(.*[a-z]){2,}.*$/,
    minUppercaseLetters: /^(.*[A-Z]){1,}.*$/,
    minNumbers: /^(.*\d){2,}.*$/,
    minSpecialChars: /^(?=.*[!@#$%^&*()_+{}:<>?]).*$/,
  };

  const errors: EmptyInputs<string> = {
    minLength: "No mínimo 8 caracteres",
    maxLength: "Máximo de 64 caracteres",
    minLowercaseLetters: "Pelo menos 2 letras",
    minUppercaseLetters: "Pelo menos 1 caracter maiusculo",
    minNumbers: "Pelo menos 2 números",
    minSpecialChars: "Pelo menos 1 caracter especial",
  };

  const validationResult: PasswordValidationResult = {
    isValid: true,
    errors: [],
  };

  Object.keys(regexParts).forEach((key) => {
    if (!regexParts[key].test(password)) {
      validationResult.isValid = false;
      validationResult.errors.push(errors[key]);
    }
  });

  return validationResult;
}

/**
 * Gets password error components based on validation result.
 * @param {PasswordValidationResult} validationResult The result of password validation.
 * @returns {JSX.Element[]} The password error components.
 */
export function getPasswordErrorComponents(
  validationResult: PasswordValidationResult,
) {
  const errorComponents: JSX.Element[] = [];

  if (!validationResult.isValid) {
    errorComponents.push(
      <Input.Label key="topLabel" label="Sua senha deve ter:" class="mt-3" />,
    );
    validationResult.errors.forEach((error, index) => {
      errorComponents.push(<Input.Label key={index} label={error} />);
    });
  }

  return errorComponents;
}

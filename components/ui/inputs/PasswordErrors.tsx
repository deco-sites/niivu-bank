import { Input } from "deco-sites/niivu-bank/components/ui/inputs/index.tsx";

export interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
}

export function PasswordErrors({
  validationResult,
}: { validationResult: PasswordValidationResult }) {
  return (
    <>
      {!validationResult.isValid && (
        <Input.Label key="topLabel" label="Sua senha deve ter:" class="mt-3" />
      )}
      {validationResult.errors.map((error, index) => {
        return <Input.Label key={index} label={error} />;
      })}
    </>
  );
}

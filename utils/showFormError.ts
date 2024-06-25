import { FormErrorsFields } from "site/sdk/useFormErros.tsx";

export function showFormError(obj: FormErrorsFields) {
  return obj?.empty || obj?.invalid ? obj?.message : undefined;
}

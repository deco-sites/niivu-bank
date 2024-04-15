import { FormErrorsFields } from "deco-sites/niivu-bank/sdk/useFormErros.tsx";

export function showFormError(obj: FormErrorsFields) {
  return obj?.empty || obj?.invalid ? obj?.message : undefined;
}

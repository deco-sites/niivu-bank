import { ComponentChildren, JSX, RefObject } from "preact";
import { useUI } from "deco-sites/niivu-bank/sdk/useUI.ts";
import validateCPF from "deco-sites/niivu-bank/utils/ValidadeForm/CPF.ts";
import validateCNPJ from "deco-sites/niivu-bank/utils/ValidadeForm/CNPJ.ts";
import validateField from "deco-sites/niivu-bank/utils/ValidadeForm/Field.ts";
import getFormValues from "deco-sites/niivu-bank/utils/getFormValues.ts";
import { invoke } from "deco-sites/niivu-bank/runtime.ts";
import formatCNPJ from "deco-sites/niivu-bank/utils/formatCNPJ.ts";

export interface Props {
  children: ComponentChildren;
  type: "CPF" | "CNPJ";
  successLink: string;
  formRef: RefObject<HTMLFormElement>;
}

interface FieldValidation {
  field?: string;
  minLength: number;
  condition?: boolean;
  validator?: (value: string) => boolean;
}

function Form({ children, type, successLink, formRef }: Props) {
  const { sendSolicitationLoading, errosForm } = useUI();

  const fieldValidations: Record<string, FieldValidation> = {
    full_name: { minLength: 3 },
    phone: { minLength: 9 },
    cpf: { minLength: 14, validator: validateCPF },
    zip_code: { minLength: 9 },
    street: { minLength: 3 },
    number: { minLength: 1 },
    city: { minLength: 3 },
    state: { minLength: 2 },
    business_name: { minLength: 3, condition: type === "CNPJ" },
    CNPJ: {
      minLength: 18,
      condition: type === "CNPJ",
      validator: validateCNPJ,
    },
    legal_zip_code: { minLength: 9, condition: type === "CNPJ" },
    legal_street: { minLength: 3, condition: type === "CNPJ" },
    legal_number: { minLength: 1, condition: type === "CNPJ" },
    legal_city: { minLength: 3, condition: type === "CNPJ" },
    legal_state: { minLength: 2, condition: type === "CNPJ" },
  };

  const hasError = () => {
    const arrayError = Object.values(errosForm.value);

    if (arrayError.filter((item) => item).length > 0) {
      return true;
    }
    return false;
  };

  const handleFieldValidation = (
    fieldName: string,
    fieldValue: string | undefined,
    minLength: number,
    validator?: (value: string) => boolean,
  ) => {
    if (!validateField(fieldValue, minLength)) {
      errosForm.value = {
        ...errosForm.value,
        [fieldName]: true,
      };
      sendSolicitationLoading.value = false;
      return;
    }

    if (validator && !validator(fieldValue!)) {
      errosForm.value = {
        ...errosForm.value,
        [fieldName]: {
          // @ts-ignore - This is a valid assignment
          ...errosForm.value[fieldName],
          invalid: true,
        },
      };
      sendSolicitationLoading.value = false;
      return;
    }

    errosForm.value = {
      ...errosForm.value,
      [fieldName]: false,
    };
  };

  const submit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    sendSolicitationLoading.value = true;

    const formValues = getFormValues(e);

    for (const fieldName in fieldValidations) {
      const { minLength, condition, validator } = fieldValidations[fieldName];
      if (condition !== undefined && !condition) continue;

      const fieldValue = formValues[fieldName];
      handleFieldValidation(fieldName, fieldValue, minLength, validator);
    }

    if (hasError()) {
      sendSolicitationLoading.value = false;
      return;
    }

    const solicitation = await invoke({
      key: "deco-sites/niivu-bank/loaders/actions/solicitation.ts",
      props: {
        type,
        cnpj: formatCNPJ(formValues.CNPJ),
        ...formValues,
      },
    });

    if ("error" in solicitation || "status" in solicitation) {
      sendSolicitationLoading.value = false;
      return;
    }

    window.location.href = `${successLink}?solicitation-id=${
      solicitation[0].id
    }`;
  };

  return (
    <form
      class="form-control group/form"
      onSubmit={submit}
      ref={formRef}
      method="Post"
    >
      {children}
    </form>
  );
}

export default Form;

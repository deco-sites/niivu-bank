import { ComponentChildren, JSX, RefObject } from "preact";
import { useUI } from "deco-sites/niivu-bank/sdk/useUI.ts";
import validateCPF from "deco-sites/niivu-bank/utils/ValidadeForm/CPF.ts";
import validateCNPJ from "deco-sites/niivu-bank/utils/ValidadeForm/CNPJ.ts";
import validateField from "deco-sites/niivu-bank/utils/ValidadeForm/Field.ts";
import getFormValues from "deco-sites/niivu-bank/utils/getFormValues.ts";
import { invoke } from "deco-sites/niivu-bank/runtime.ts";
import formatCNPJ from "deco-sites/niivu-bank/utils/formatCNPJ.ts";
import { useFormErrors } from "deco-sites/niivu-bank/sdk/useFormErros.tsx";

export interface Props {
  children: ComponentChildren;
  type: "CPF" | "CNPJ";
  successLink: string;
  formRef: RefObject<HTMLFormElement>;
}

export type FieldValidation = Record<string, FieldValidationConfig>;

export interface FieldValidationConfig {
  field?: string;
  minLength: number;
  condition?: boolean;
  validator?: (value: string) => boolean;
}

export interface ErrosForm {
  [key: string]: {
    empty: boolean;
    invalid: boolean;
    messageInvalid: string;
    messageEmpty: string;
  };
}

interface SendSolicitation {
  type: "CPF" | "CNPJ";
  [key: string]: string | undefined;
}

function Form({ children, type, successLink, formRef }: Props) {
  const fieldsValidations: FieldValidation = {
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
  } as const;

  const { sendSolicitationLoading, sendSolicitationError } = useUI();
  const { hasErrors, setFormErrors } = useFormErrors();

  const setError = (fieldName: string, type: "empty" | "invalid") => {
    if (type === "empty") {
      setFormErrors({
        [fieldName]: {
          empty: true,
          invalid: false,
          message: `Campo obrigatório`,
        },
      });
    }

    if (type === "invalid") {
      setFormErrors({
        [fieldName]: {
          empty: false,
          invalid: true,
          message: `${fieldName?.toUpperCase()} inválido`,
        },
      });
    }
  };

  const clearError = (fieldName: string) => {
    setFormErrors({
      [fieldName]: {
        empty: false,
        invalid: false,
        message: "",
      },
    });
  };

  const handleFieldValidation = (
    fieldName: string,
    fieldValue: string | undefined,
    minLength: number,
    validator?: (value: string) => boolean,
  ) => {
    if (!validateField(fieldValue, minLength)) {
      setError(fieldName, "empty");
      sendSolicitationLoading.value = false;
      return;
    }

    if (validator && !validator(fieldValue!)) {
      setError(fieldName, "invalid");
      sendSolicitationLoading.value = false;
      return;
    }

    clearError(fieldName);
  };

  const submit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    sendSolicitationLoading.value = true;

    const formValues = getFormValues(e);
    Object.entries(fieldsValidations).forEach(
      ([fieldName, validationConfig]) => {
        const { minLength, condition, validator } = validationConfig;
        if (condition !== undefined && condition === false) return;

        const fieldValue = formValues[fieldName];

        handleFieldValidation(fieldName, fieldValue, minLength, validator);
      },
    );

    if (hasErrors()) {
      sendSolicitationLoading.value = false;
      return;
    }

    try {
      const props: SendSolicitation = {
        type,
        ...formValues,
      };
      if (type === "CNPJ") {
        props.cnpj = formatCNPJ(formValues?.CNPJ);
      }
      const solicitation = await invoke({
        key: "deco-sites/niivu-bank/loaders/actions/solicitation.ts",
        props,
      });

      if ("error" in solicitation && "status" in solicitation) {
        sendSolicitationLoading.value = false;
        sendSolicitationError.value = true
        return;
      }

      window.location.href = successLink;
    } catch (error) {
      console.log(error);
      sendSolicitationError.value = true;
      return;
    } finally {
      sendSolicitationLoading.value = false;
    }
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

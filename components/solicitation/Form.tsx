import { ComponentChildren, JSX, RefObject } from "preact";
import { invoke } from "$store/runtime.ts";
import { INTERNAL_ERROR } from "$store/utils/enum.ts";
import { Signal } from "@preact/signals";
import { useUI } from "deco-sites/niivu-bank/sdk/useUI.ts";
export interface Props {
  children: ComponentChildren;
  type: "CPF" | "CNPJ";
  successLink: string;
  formRef: RefObject<HTMLFormElement>;
}

function Form({ children, type, successLink, formRef}: Props) {
  const { sendSolicitationLoading } = useUI();
  const submit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    sendSolicitationLoading.value = true;
    
    e.preventDefault();

    // personalForm
    const full_name =
      (e.currentTarget.elements.namedItem("name") as HTMLInputElement)?.value;
    const cpf = (e.currentTarget.elements.namedItem("cpf") as HTMLInputElement)
      ?.value;
    const rg = (e.currentTarget.elements.namedItem("rg") as HTMLInputElement)
      ?.value;
    const phone =
      (e.currentTarget.elements.namedItem("phone") as HTMLInputElement)?.value;

    // AddressForm
    const zip_code =
      (e.currentTarget.elements.namedItem("cep") as HTMLInputElement)
        ?.value;
    const street =
      (e.currentTarget.elements.namedItem("street") as HTMLInputElement)?.value;
    const number =
      (e.currentTarget.elements.namedItem("number") as HTMLInputElement)?.value;
    const complement =
      (e.currentTarget.elements.namedItem("complement") as HTMLInputElement)
        ?.value;
    const city =
      (e.currentTarget.elements.namedItem("city") as HTMLInputElement)?.value;
    const state =
      (e.currentTarget.elements.namedItem("state") as HTMLInputElement)?.value;

    // CorporationForm
    const business_name = (e.currentTarget.elements.namedItem(
      "corporate-reason",
    ) as HTMLInputElement)?.value;
    const cnpj =
      (e.currentTarget.elements.namedItem("CNPJ") as HTMLInputElement)?.value;
    const legal_zip_code =
      (e.currentTarget.elements.namedItem("legal-cep") as HTMLInputElement)
        ?.value;
    const legal_street =
      (e.currentTarget.elements.namedItem("legal-street") as HTMLInputElement)
        ?.value;
    const legal_number =
      (e.currentTarget.elements.namedItem("legal-number") as HTMLInputElement)
        ?.value;
    const legal_complement = (e.currentTarget.elements.namedItem(
      "legal-complement",
    ) as HTMLInputElement)?.value;
    const legal_city =
      (e.currentTarget.elements.namedItem("legal-city") as HTMLInputElement)
        ?.value;
    const legal_state =
      (e.currentTarget.elements.namedItem("legal-state") as HTMLInputElement)
        ?.value;

    const solicitation = await invoke({
      key: "deco-sites/niivu-bank/loaders/actions/solicitation.ts",
      props: {
        type,
        full_name,
        phone,
        zip_code,
        street,
        number,
        complement,
        cpf,
        rg,
        city,
        state,
        cnpj,
        business_name,
        legal_zip_code,
        legal_street,
        legal_number,
        legal_complement,
        legal_city,
        legal_state,
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
    <form class="form-control group/form" onSubmit={submit} ref={formRef}>
      {children}
    </form>
  );
}

export default Form;

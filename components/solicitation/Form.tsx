import { ComponentChildren, JSX } from "preact";
import { invoke } from "$store/runtime.ts";
import { useUI } from "$store/sdk/useUI.ts";

export interface Props {
  children: ComponentChildren;
}

function Form({ children }: Props) {
  const { displayCorporateForm } = useUI();
  const submit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
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
    const corporate_reason = (e.currentTarget.elements.namedItem(
      "corporate-reason",
    ) as HTMLInputElement)?.value;
    const cnpj =
      (e.currentTarget.elements.namedItem("CNPJ") as HTMLInputElement)?.value;
    const legal_cep =
      (e.currentTarget.elements.namedItem("legal-CEP") as HTMLInputElement)
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

    await invoke({
      key: "deco-sites/niivu-bank/loaders/actions/solicitation.ts",
      props: {
        phone,
        zip_code,
        street,
        number,
        complement,
        city,
        state,
        cpf,
        rg,
        full_name,
        cnpj,
        corporate_reason,
        legal_cep,
        legal_street,
        legal_number,
        legal_complement,
        legal_city,
        legal_state,
      },
    });
  };

  return (
    <form class="form-control" onSubmit={submit}>
      <div role="tablist" class="tabs tabs-bordered m-auto">
        <input
          onClick={() => {
            displayCorporateForm.value = false;
          }}
          class="tab checked:text-secondary checked:!border-secondary"
          type="radio"
          name="my_tabs_1"
          id="physical-person"
          value="CPF"
          role="tab"
          aria-label="Pessoa Fisíca"
          checked
        />
        <input
          onClick={() => {
            displayCorporateForm.value = true;
          }}
          class="tab checked:text-secondary checked:!border-secondary"
          type="radio"
          name="my_tabs_1"
          id="legal-person"
          value="CNPJ"
          role="tab"
          aria-label="Pessoa Jurídica"
        />
      </div>
      {children}
    </form>
  );
}

export default Form;

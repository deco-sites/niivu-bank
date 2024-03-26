import { usePartialSection } from "deco/hooks/usePartialSection.ts";

export interface Props {
  type: "CPF" | "CNPJ";
}

function TabList({ type }: Props) {
  return (
    <div role="tablist" class="tabs tabs-bordered m-auto">
      <button
        {...usePartialSection({ props: { type: "CPF" } })}
        class={`tab ${type === "CPF" && "text-secondary !border-secondary"}`}
        name="my_tabs_1"
        id="physical-person"
        type="button"
        value="CPF"
        checked
      >
        Pessoa Fisíca
      </button>
      <button
        {...usePartialSection({ props: { type: "CNPJ" } })}
        class={`tab ${type === "CNPJ" && "text-secondary !border-secondary"}`}
        id="legal-person"
        type="button"
        value="CNPJ"
      >
        Pessoa Jurídica
      </button>
    </div>
  );
}

export default TabList;

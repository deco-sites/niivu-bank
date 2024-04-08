import { usePartialSection } from "deco/hooks/usePartialSection.ts";

export interface Props {
  type: "CPF" | "CNPJ";
}

function TabList({ type }: Props) {
  return (
    <div role="tablist" class="tabs tabs-bordered m-auto pb-8 max-md:w-full">
      <button
        {...usePartialSection({ props: { type: "CPF" } })}
        class={`tab py-2 px-7 lg:py-4 lg:px-8 h-auto font-bold leading-[14px] ${
          type === "CPF" && "text-secondary !border-secondary"
        }`}
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
        class={`tab py-2 px-7 lg:py-4 lg:px-8 h-auto font-bold leading-[14px] ${
          type === "CNPJ" && "text-secondary !border-secondary"
        }`}
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

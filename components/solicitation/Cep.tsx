import { invoke } from "$store/runtime.ts";
import { RefObject } from "preact";
export interface Props {
  formRef: RefObject<HTMLFormElement>;
  prefix?: string;
  placeholder: string;
}

export default function Cep({ formRef, prefix, placeholder }: Props) {
  const prefixResult: string = typeof prefix === "string" ? `${prefix}-` : "";

  const getCep = async (
    e: Event,
  ) => {
    const dataInput = (e.target as HTMLInputElement).value ?? "";
    const cep = dataInput.replace(/\D/g, "");

    if (cep.length === 8) {
      const response = await invoke({
        key: "deco-sites/niivu-bank/loaders/actions/getCep.ts",
        props: {
          cep,
        },
      });

      if (response?.status) {
        return;
      }

      (formRef.current!.elements.namedItem(
        `${prefixResult}cep`,
      ) as HTMLInputElement)!
        .value = response.cep ?? "";
      (formRef.current!.elements.namedItem(
        `${prefixResult}street`,
      ) as HTMLInputElement)!
        .value = response.street ?? "";
      (formRef.current!.elements.namedItem(
        `${prefixResult}city`,
      ) as HTMLInputElement)!.value = response.city ?? "";
      (formRef.current!.elements.namedItem(
        `${prefixResult}state`,
      ) as HTMLInputElement)!
        .value = response.state ?? "";
    }

    (e.target as HTMLInputElement).value = cep
      .replace(/^(\d{5})(\d)/, "$1-$2");
  };
  return (
    <div class="flex flex-col gap-1 flex-grow">
      <label class="text-primary font-medium" htmlFor={`${prefixResult}cep`}>
        <span>CEP*</span>
      </label>
      <input
        onChange={getCep}
        class="input"
        type="text"
        id={`${prefixResult}cep`}
        name={`${prefixResult}cep`}
        placeholder={placeholder}
        required
      />
    </div>
  );
}

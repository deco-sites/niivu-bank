import { invoke } from "$store/runtime.ts";
import { RefObject } from "preact";
import { Input } from "site/components/ui/inputs/index.tsx";
export interface Props {
  formRef: RefObject<HTMLFormElement>;
  prefix?: string;
  placeholder: string;
  messageError?: string;
}

export default function Cep(
  { formRef, prefix, placeholder, messageError }: Props,
) {
  const prefixResult: string = typeof prefix === "string" ? `${prefix}_` : "";
  const getCep = async (
    e: Event,
  ) => {
    const dataInput = (e.target as HTMLInputElement).value ?? "";
    const cep = dataInput.replace(/\D/g, "");

    if (cep.length === 8) {
      const response = await invoke({
        key: "site/loaders/actions/getCep.ts",
        props: {
          cep,
        },
      });
      if (response?.status) {
        return;
      }
      (formRef.current!.elements.namedItem(
        `${prefixResult}zip_code`,
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
        onPaste={getCep}
        class="input"
        type="text"
        maxLength={9}
        id={`${prefixResult}zip_code`}
        name={`${prefixResult}zip_code`}
        placeholder={placeholder}
        required
      />
      <Input.Error message={messageError?.length ? messageError : undefined} />
    </div>
  );
}

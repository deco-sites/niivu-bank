import { Input } from "site/components/ui/inputs/index.tsx";

export interface Props {
  placeholder: string;
  messageError?: string;
  isRequired?: boolean;
}

const PhoneFormatter = (
  { placeholder, messageError, isRequired = true }: Props,
) => {
  const handleChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, "");

    // Limita o número de dígitos a 11
    value = value.slice(0, 11);

    // Formata o número de telefone no formato: (xx) xxxxx-xxxx
    if (value.length > 2) {
      input.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}`;
    }
    if (value.length > 7) {
      input.value += `-${value.slice(7)}`;
    }
  };

  return (
    <div class="flex flex-col gap-2 flex-grow">
      <label
        class={`text-primary ${isRequired ? "font-medium" : ""}`}
        htmlFor={"phone"}
      >
        <span class="text-sm">Telefone{isRequired ? "*" : ""}</span>
      </label>
      <input
        class="input"
        type={"text"}
        name={"phone"}
        id="phone"
        placeholder={placeholder}
        required={isRequired}
        maxlength={15}
        onChange={handleChange}
        onPaste={handleChange}
      />
      <Input.Error message={messageError?.length ? messageError : undefined} />
    </div>
  );
};

export default PhoneFormatter;

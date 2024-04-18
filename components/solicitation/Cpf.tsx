import { Input } from "deco-sites/niivu-bank/components/ui/inputs/index.tsx";

export interface Props {
  placeholder: string;
  messageError?: string;
}

const CPFFormatter = ({ placeholder, messageError }: Props) => {
  const handleChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, "");

    if (value.length > 11) {
      input.value = value.slice(0, 11);
    }

    input.value = value
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  return (
    <div class="flex flex-col gap-2 flex-grow">
      <label class="text-primary font-medium" htmlFor={"cpf"}>
        <span class="text-sm">CPF*</span>
      </label>
      <input
        class="input"
        type={"text"}
        id={"cpf"}
        name={"cpf"}
        placeholder={placeholder}
        required
        maxlength={14}
        onChange={handleChange}
        onPaste={handleChange}
      />
      <Input.Error message={messageError?.length ? messageError : undefined} />
    </div>
  );
};

export default CPFFormatter;

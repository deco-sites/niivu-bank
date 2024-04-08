export interface Props {
  placeholder: string;
}

const CnpjFormatter = ({ placeholder }: Props) => {
  const handleChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, "");

    input.value = value
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/\/(\d{4})(\d)/, "/$1-$2");
  };

  return (
    <div class="flex flex-col gap-2 flex-grow">
      <label class="text-primary font-medium" htmlFor={"CNPJ"}>
        <span class="text-sm">CNPJ*</span>
      </label>
      <input
        class="input"
        type="text"
        id={"CNPJ"}
        name={"CNPJ"}
        placeholder={placeholder}
        required
        maxlength={18}
        onChange={handleChange}
      />
    </div>
  );
};

export default CnpjFormatter;

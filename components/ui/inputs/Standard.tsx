import { Input } from "site/components/ui/inputs/index.tsx";

export interface Props {
  labelText: string;
  id: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  maxlength?: number;
  disabled?: boolean;
  messageError?: string;
}

function Standard(
  {
    labelText,
    id,
    name,
    placeholder,
    type = "text",
    required,
    maxlength,
    disabled,
    messageError,
  }: Props,
) {
  return (
    <div class="flex flex-col gap-2 flex-grow">
      <label class="text-primary font-medium" htmlFor={id}>
        <span class="text-sm">{`${labelText}${required ? "*" : ""}`}</span>
      </label>
      <input
        class="input input-bordered"
        type={type}
        id={id}
        name={name ?? id}
        placeholder={placeholder}
        required={required}
        maxlength={maxlength}
        disabled={disabled}
      />
      <Input.Error message={messageError?.length ? messageError : undefined} />
    </div>
  );
}

export default Standard;

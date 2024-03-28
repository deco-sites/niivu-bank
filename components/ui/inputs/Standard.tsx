export interface Props {
  labelText: string;
  id: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  maxlength?: number;
  disabled?: boolean;
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
  }: Props,
) {
  return (
    <div class="flex flex-col gap-1 flex-grow">
      <label class="text-primary font-medium" htmlFor={id}>
        <span>{`${labelText}${required ? "*" : ""}`}</span>
      </label>
      <input
        class="input"
        type={type}
        id={id}
        name={name ?? id}
        placeholder={placeholder}
        required={required}
        maxlength={maxlength}
        disabled={disabled}
      />
    </div>
  );
}

export default Standard;

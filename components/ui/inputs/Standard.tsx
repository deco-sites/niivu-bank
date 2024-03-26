export interface Props {
  labelText: string;
  id: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  maxlength?: number;
}

function Standard(
  { labelText, id, name, placeholder, type = "text", required, maxlength }:
    Props,
) {
  return (
    <div class="flex flex-col gap-1 flex-grow">
      <label class="text-primary font-medium" htmlFor={id}>
        <span>{labelText}</span>
      </label>
      <input
        class="input border border-black rounded-t-lg"
        type={type}
        id={id}
        name={name ?? id}
        placeholder={placeholder}
        required={required}
        maxlength={maxlength}
      />
    </div>
  );
}

export default Standard;

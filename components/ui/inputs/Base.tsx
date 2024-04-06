interface Props {
  placeholder: string;
  class?: string;
  name?: string;
  type?: string;
}

export default function Base(
  { placeholder, class: _class, name, type }: Props,
) {
  return (
    <input
      name={name}
      type={type ?? "text"}
      placeholder={placeholder}
      class={`input w-full text-primary text-sm ${_class}`}
    />
  );
}

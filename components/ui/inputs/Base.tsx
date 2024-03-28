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
      class={`h-10 w-full px-4 border border-gray-400 rounded-t-md rounded-b-none text-primary text-sm focus:outline-none focus:border-b-2 focus:border-b-black ${_class}`}
    />
  );
}

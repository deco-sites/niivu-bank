interface InputFieldProps {
  placeholder: string;
  class?: string;
  name?: string;
}

export default function InputText(
  { placeholder, class: _class, name }: InputFieldProps,
) {
  return (
    <>
      <input
        name={name}
        type="text"
        placeholder={placeholder}
        class={`h-10 w-full px-4 border border-gray-400 rounded-t-md rounded-b-none text-black text-sm focus:outline-none ${_class}`}
      />
    </>
  );
}

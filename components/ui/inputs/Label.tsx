interface InputFieldLabelProps {
  label: string;
  class?: string;
}

export default function InputFieldLabel(
  { label, class: _class }: InputFieldLabelProps,
) {
  return <label class={`text-black text-sm ${_class}`}>{label}</label>;
}

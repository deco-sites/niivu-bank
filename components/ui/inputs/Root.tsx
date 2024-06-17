import type { ComponentChildren } from "preact";

interface InputFieldRootProps {
  children: ComponentChildren;
  class?: string;
}

export default function InputFieldRoot(
  { children, class: _class }: InputFieldRootProps,
) {
  return (
    <div
      class={`relative mim-h-16 flex flex-col items-start justify-between ${_class}`}
    >
      {children}
    </div>
  );
}

import type { ComponentChildren } from "preact";

interface InputFieldRootProps {
  children: ComponentChildren;
}

export default function InputFieldRoot({ children }: InputFieldRootProps) {
  return (
    <div class="relative mim-h-16 flex flex-col items-start justify-between">
      {children}
    </div>
  );
}

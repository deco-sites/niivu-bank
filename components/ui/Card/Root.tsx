import type { ComponentChildren } from "preact";

interface InputFieldRootProps {
  children: ComponentChildren;
}

export default function CartRoot({ children }: InputFieldRootProps) {
  return (
    <div class="w-full min-h-64 bg-white border border-[##E0E0E0] shadow-lg rounded p-8 space-y-2">
      {children}
    </div>
  );
}

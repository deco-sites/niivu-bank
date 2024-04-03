import { Signal, useSignal } from "@preact/signals";
import { ChangeEvent } from "https://esm.sh/v128/preact@10.19.2/compat/src/index.js";
import Icon from "deco-sites/niivu-bank/components/ui/Icon.tsx";

interface Props {
  placeholder: string;
  value?: Signal<string>;
  class?: string;
  name?: string;
}

export default function Password(
  { placeholder, class: _class, value: signal, name }: Props,
) {
  const showPassword = useSignal(false);
  const newType = showPassword.value ? "text" : "password";

  const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    if (signal) {
      signal.value = newValue;
    }
  };

  return (
    <div class="relative w-full">
      <input
        name={name}
        type={newType}
        placeholder={placeholder}
        value={signal && signal.value}
        onInput={handleInputChange}
        class={`input w-full px-4 pt-2 ${_class} `}
      />
      <button
        aria-label={showPassword.value ? "Esconder senha" : "Mostrar senha"}
        type="button"
        class="absolute top-6 right-0 h-6 mr-4 transform -translate-y-1/2"
        onClick={togglePasswordVisibility}
      >
        {showPassword.value
          ? <Icon size={24} id="Eye" class="pt-0.5" />
          : <Icon size={24} id="EyeClosed" class="pt-px" />}
      </button>
    </div>
  );
}

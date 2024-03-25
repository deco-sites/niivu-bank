import { useSignal } from "@preact/signals";
import { ChangeEvent } from "https://esm.sh/v128/preact@10.19.2/compat/src/index.js";
import Icon from "deco-sites/niivu-bank/components/ui/Icon.tsx";

interface InputFieldProps {
  placeholder: string;
  value?: string;
  class?: string;
  name?: string;
}

export default function InputField(
  { placeholder, class: _class, value, name }: InputFieldProps,
) {
  const showPassword = useSignal(false);
  const newType = showPassword.value ? "text" : "password";

  const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    value = newValue;
  };

  return (
    <div class="relative w-full">
      <input
        name={name}
        type={newType}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        class={`input input-bordered input-primary h-10 w-full px-4 border border-gray-400 rounded-t-md rounded-b-none text-sm focus:outline-none border-b-2 focus:border-b-2 border-b-black focus:border-b-black ${_class} `}
      />
      <button
        aria-label={showPassword.value ? "Esconder senha" : "Mostrar senha"}
        type="button"
        class="absolute inset-y-1/2 right-0 h-6 mr-4 mt-1 transform -translate-y-1/2"
        onClick={togglePasswordVisibility}
      >
        {showPassword.value
          ? <Icon size={24} id="Eye" class="pt-px" />
          : <Icon size={24} id="EyeClosed" />}
      </button>
    </div>
  );
}

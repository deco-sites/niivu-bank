import { useSignal } from "@preact/signals";
import type { JSX } from "preact";
import { invoke } from "deco-sites/niivu-bank/runtime.ts";
import { Input } from "deco-sites/niivu-bank/components/ui/inputs/index.tsx";
import Button from "deco-sites/niivu-bank/components/ui/Button.tsx";

export default function RecoveryPasswordForm() {
  const isLoaging = useSignal(false);
  const emptyInputs = useSignal({
    email: false,
  });

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const email = (e.currentTarget.elements.namedItem("email") as RadioNodeList)
      ?.value;

    if (!email) {
      emptyInputs.value = {
        email: !email,
      };
      return;
    }

    try {
      isLoaging.value = true;
      const response = await invoke({
        key: "deco-sites/niivu-bank/loaders/actions/recoveryPassword.ts",
        props: {
          email: email,
        },
      });
      console.log(response);
    //window.location.href = "/minha-conta/solicitacao";
    } finally {
      isLoaging.value = false;
    }
  };

  return (
    <form onSubmit={handleSubmit} method="POST">
      <div class="space-y-4">
        <Input.Root>
          <Input.Label label="E-mail" class="mb-2" />
          <Input.Base
            name="email"
            placeholder="exemple@gmail.com.br"
          />
          <Input.Error
            message={emptyInputs.value.email
              ? "Email vazio ou inválido"
              : undefined}
          />
        </Input.Root>
        <Button
          loading={isLoaging.value}
          type="submit"
          class="w-full bg-primary text-neutral rounded font-bold text-sm md:text-lg"
        >
          Enviar solicitação
        </Button>
      </div>
    </form>
  );
}

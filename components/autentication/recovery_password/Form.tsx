import { useSignal } from "@preact/signals";
import type { JSX } from "preact";
import { invoke } from "deco-sites/niivu-bank/runtime.ts";
import { Input } from "deco-sites/niivu-bank/components/ui/inputs/index.tsx";
import Button from "deco-sites/niivu-bank/components/ui/Button.tsx";
import { EMPTY_INVALID_EMAIL } from "deco-sites/niivu-bank/components/autentication/constants.ts";

export default function RecoveryPasswordForm() {
  const isLoaging = useSignal(false);
  const emailEmpty = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const email = (e.currentTarget.elements.namedItem("email") as RadioNodeList)
      ?.value;

    if (!email) {
      emailEmpty.value = !email;
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

      if (response.status === 200) {
        window.location.href = "/entrar";
      }
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
            type="email"
            placeholder="exemple@gmail.com.br"
          />
          <Input.Error
            message={emailEmpty.value ? EMPTY_INVALID_EMAIL : undefined}
          />
        </Input.Root>
        <Button
          loading={isLoaging.value}
          type="submit"
          class="w-full bg-primary text-neutral rounded font-bold text-sm md:text-lg"
        >
          Recuperar senha
        </Button>
      </div>
    </form>
  );
}

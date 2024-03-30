import { useSignal } from "@preact/signals";
import type { JSX } from "preact";
import { invoke } from "deco-sites/niivu-bank/runtime.ts";
import { Input } from "deco-sites/niivu-bank/components/ui/inputs/index.tsx";
import Button from "deco-sites/niivu-bank/components/ui/Button.tsx";

export default function LoginForm() {
  const isLoaging = useSignal(false);
  const isError = useSignal(false);
  const emptyInputs = useSignal({
    email: false,
    password: false,
  });

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    isError.value = false;
    const email = (e.currentTarget.elements.namedItem("email") as RadioNodeList)
      ?.value;
    const password =
      (e.currentTarget.elements.namedItem("password") as RadioNodeList)?.value;

    if (!email || !password) {
      emptyInputs.value = {
        email: !email,
        password: !password,
      };
      return;
    }
    try {
      isLoaging.value = true;
      const response = await invoke({
        key: "deco-sites/niivu-bank/loaders/actions/singin.ts",
        props: {
          email: email,
          password: password,
        },
      });

      if (response.status === 400) {
        isError.value = true;
        return;
      }
      
      if(response.message === "no-solicitation"){
        window.location.href = "/minha-conta/solicitacao";
      }else{
        window.location.href = "/minha-conta/solicitacao/status";
      }
    } finally {
      isLoaging.value = false;
    }
  };

  return (
    <form onSubmit={handleSubmit} method="POST">
      {isError.value && (
        <p class="text-error text-sm text-center">
          E-mail ou senha inválidos
        </p>
      )}
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
        <Input.Root>
          <Input.Label label="Senha" class="mb-2" />
          <Input.Password
            name="password"
            placeholder="**********"
          />
          <Input.Error
            message={emptyInputs.value.password
              ? "preencha a senha"
              : undefined}
          />
        </Input.Root>
        <div class="space-y-2">
          <Button
            loading={isLoaging.value}
            type="submit"
            class="w-full bg-primary text-neutral rounded font-bold text-sm md:text-lg"
          >
            Entrar
          </Button>
        </div>
      </div>
    </form>
  );
}

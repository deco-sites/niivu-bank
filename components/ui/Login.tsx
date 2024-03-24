import Button from "deco-sites/niivu-bank/components/ui/Button.tsx";
import Icon from "deco-sites/niivu-bank/components/ui/Icon.tsx";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import type Autentication from "deco-sites/niivu-bank/sections/authentication/AutenticationController.tsx";
import type { JSX } from "preact";
import { Input } from "deco-sites/niivu-bank/components/ui/inputs/index.tsx";
import { invoke } from "deco-sites/niivu-bank/runtime.ts";
import { useSignal } from "@preact/signals";

function Login() {
  const isLoaging = useSignal(false);
  const isError = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    isError.value = false;
    e.preventDefault();
    const email = (e.currentTarget.elements.namedItem("email") as RadioNodeList)
      ?.value;
    const password =
      (e.currentTarget.elements.namedItem("password") as RadioNodeList)?.value;

    if (!email || !password) {
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

      window.location.href = "/minha-conta";
    } finally {
      isLoaging.value = false;
      isLoaging.value = false;
    }
  };

  return (
    <div class="md:pt-32">
      <div class="flex justify-center md:justify-start md:mb-9 items-center h-16 border-b-2 border-[#E5E5E5] md:border-none">
        <img
          width="306"
          height="92"
          src="/image/Niivo_Logo_Preta_pc.webp"
          alt="Niivo Logo Preta PC"
          class="hidden md:block"
        />

        <img
          width="150"
          height="45"
          src="/image/Niivo_Logo_Preta_mobile.webp"
          alt="Niivo Logo Preta Mobile"
          class="md:hidden"
        />
      </div>
      <div class="px-4 pt-6 md:p-0">
        <div class="mb-4">
          <h1 class=" text-black font-bold text-3xl">
            Acessar Minha Conta
          </h1>
          <h2 class="h-5 text-black text-sm font-pangran">
            Digite seu e-mail e senha para acessar
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          {isError.value && (
            <p class="text-red-500 text-sm text-center">
              E-mail ou senha inválidos
            </p>
          )}
          <div class="space-y-4">
            <Input.Root>
              <Input.Label label="E-mail" class="mb-2" />
              <Input.Text
                name="email"
                placeholder="exemple@gmail.com.br"
              />
            </Input.Root>
            <Input.Root>
              <Input.Label label="Senha" class="mb-2" />
              <Input.Password
                name="password"
                placeholder="**********"
                class="rounded-b-none border-b-2 focus:border-b-2 border-b-black focus:border-b-black"
              />
            </Input.Root>
            <div class="space-y-2">
              <Button
                loading={isLoaging.value}
                type="submit"
                class="w-full h-14 bg-black text-white rounded font-bold text-xl"
              >
                Entrar
              </Button>

              <button
                type="button"
                //   {...usePartialSection<typeof Autentication>({
                //         props: { stap: "recoveryPassword" },
                //     })}
                class="w-full flex justify-center cursor-pointer text-black opacity-70 text-sm"
              >
                Esqueceu sua senha?
              </button>
            </div>
          </div>
          <div className="divider text-black bg text-xs mt-6">Ou entre com</div>
          <div class="space-y-2">
            <Button
              ariaLabel="Entre com Facebook"
              class="w-full h-14 bg-blue-facebook text-white rounded font-bold text-base"
            >
              <Icon size={24} id="Facebook" /> Entre com Facebook
            </Button>

            <Button
              ariaLabel="Entre com Google"
              class="w-full h-14 bg-white rounded  shadow-md"
            >
              <Icon size={24} id="Google" />{" "}
              <span class="text-black opacity-55 font-bold text-base">
                Entre com Google
              </span>
            </Button>
          </div>
          <p class="text-black text-sm text-center mt-6">
            Não tem uma conta?{" "}
            <button
              type="button"
              //   {...usePartialSection<typeof Autentication>({props: { stap: "register" }})}
              class="text-black font-bold"
            >
              Cadastre-se
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;

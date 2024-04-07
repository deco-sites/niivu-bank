import { useSignal } from "@preact/signals";
import type { JSX } from "preact";
import { invoke } from "deco-sites/niivu-bank/runtime.ts";
import { Input } from "deco-sites/niivu-bank/components/ui/inputs/index.tsx";
import { EMAIL_RESGISTER_ERROR } from "deco-sites/niivu-bank/utils/enum.ts";
import Loading from "deco-sites/niivu-bank/components/daisy/Loading.tsx";
import { validatePassword } from "deco-sites/niivu-bank/utils/validatePassword.tsx";
import {
  EMPTY_INVALID_EMAIL,
  ERROR_EMPTY_PASSWORD,
  GENERIC_ERROR,
} from "deco-sites/niivu-bank/components/autentication/constants.ts";
import { PasswordErrors } from "deco-sites/niivu-bank/components/ui/inputs/PasswordErrors.tsx";

export default function SignupForm() {
  const isLoaging = useSignal(false);
  const isDiffPasswords = useSignal(false);
  const password = useSignal("");
  const emailError = useSignal(false);
  const emptyInputs = useSignal({
    email: false,
    password: false,
    confirmPassword: false,
  });

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    isDiffPasswords.value = false;
    const email = (e.currentTarget.elements.namedItem("email") as RadioNodeList)
      ?.value;
    const passwordComfirm =
      (e.currentTarget.elements.namedItem("passwordComfirm") as RadioNodeList)
        ?.value;

    if (!email || !password.value || !passwordComfirm) {
      emptyInputs.value = {
        email: !email,
        password: !password.value,
        confirmPassword: !passwordComfirm,
      };
      return;
    }
    if (validatePassword(password.value).errors.length > 0) {
      return;
    }
    if (
      passwordComfirm.length && password.value.length &&
      password.value !== passwordComfirm
    ) {
      isDiffPasswords.value = true;
      return;
    }

    try {
      isLoaging.value = true;
      const response = await invoke({
        key: "deco-sites/niivu-bank/loaders/actions/singup.ts",
        props: {
          email: email,
          password: password.value,
        },
      });

      if (response.message === EMAIL_RESGISTER_ERROR) {
        emailError.value = true;
      }
      if (response.status === 201) {
        window.location.href = "/entrar?step=login";
      }
    } finally {
      isLoaging.value = false;
    }
  };

  return (
    <form onSubmit={handleSubmit} method="POST">
      <div class="space-y-4">
        <Input.Error
          message={emailError.value ? GENERIC_ERROR : undefined}
        />
        <Input.Root>
          <Input.Label label="E-mail" class="mb-2" />
          <Input.Base
            name="email"
            placeholder="exemplo@email.com.br"
          />
          <Input.Error
            message={emptyInputs.value.email ? EMPTY_INVALID_EMAIL : undefined}
          />
        </Input.Root>
        <Input.Root>
          <Input.Label label="Senha" class="mb-2" />
          <Input.Password
            name="password"
            placeholder="**********"
            value={password}
          />
          <Input.Error
            message={emptyInputs.value.password
              ? ERROR_EMPTY_PASSWORD
              : undefined}
          />
        </Input.Root>
        <Input.Root>
          <Input.Label label="Confirme sua senha" class="mb-2" />
          <Input.Password
            name="passwordComfirm"
            placeholder="**********"
          />
          <Input.Error
            message={emptyInputs.value.confirmPassword
              ? ERROR_EMPTY_PASSWORD
              : undefined}
          />
          <Input.Error
            message={isDiffPasswords.value ? "senhas não coincidem" : undefined}
          />
          {password.value.length > 3 && (
            <PasswordErrors
              validationResult={validatePassword(password.value)}
            />
          )}
        </Input.Root>
        <div class="space-y-2">
          <div class="flex flex-col mt-6 gap-10 group/warning">
            <div class="flex items-start gap-4">
              <input
                class="checkbox checkbox-primary checkbox-md border-[3px]"
                type="checkbox"
                name="warningConsent"
                id="warningConsent"
              />
              <div class="flex flex-col gap-2">
                <span class="font-normal">
                  Autorização
                </span>
                <span class="text-sm">
                  Autorizo o NIIVO BANK e empresas coligadas a consultar as
                  minhas informações nas bases de dados cadastrais disponíveis,
                  inclusive no SCR (Sistema de cadastro gerido pelo Banco
                  Central do Brasil).
                </span>
              </div>
            </div>
            <button
              type="submit"
              class="btn btn-accent text-xl pointer-events-none group-has-[input:checked]/warning:pointer-events-auto group-has-[input:checked]/warning:btn-primary text-white"
            >
              {isLoaging.value
                ? <Loading style="loading-spinner" size="loading-sm" />
                : "Cadastrar"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

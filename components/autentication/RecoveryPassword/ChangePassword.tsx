import { useSignal } from "@preact/signals";
import type { JSX } from "preact";
import { invoke } from "deco-sites/niivu-bank/runtime.ts";
import { Input } from "deco-sites/niivu-bank/components/ui/inputs/index.tsx";
import {
  getPasswordErrorComponents,
  validatePassword,
} from "deco-sites/niivu-bank/utils/validatePassword.tsx";
import Button from "deco-sites/niivu-bank/components/ui/Button.tsx";
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
} from "deco-sites/niivu-bank/utils/enum.ts";

export default function ChangePassword() {
  const isLoaging = useSignal(false);
  const isDiffPasswords = useSignal(false);
  const password = useSignal("");
  const error = useSignal(false);
  const tokens = useSignal({
    accessToken: "",
    refreshToken: "",
  });
  const emptyInputs = useSignal({
    password: false,
    confirmPassword: false,
  });

  const getAccessToken = () => {
    const hash = window.location.hash;
    const hashParams = hash ? hash.substring(1).split("&") : [];

    for (const param of hashParams) {
      if (param.startsWith(ACCESS_TOKEN)) {
        tokens.value.accessToken = param.substring(ACCESS_TOKEN.length + 1);
      } else if (param.startsWith(REFRESH_TOKEN)) {
        tokens.value.refreshToken = param.substring(REFRESH_TOKEN.length + 1);
      }
    }
  };

  if (location && location.hash) {
    getAccessToken();
  }

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    isDiffPasswords.value = false;
    error.value = false;
    const passwordComfirm =
      (e.currentTarget.elements.namedItem("passwordComfirm") as RadioNodeList)
        ?.value;

    if (!password.value || !passwordComfirm) {
      emptyInputs.value = {
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
        key: "deco-sites/niivu-bank/loaders/actions/updatePassword.ts",
        props: {
          password: password.value,
          access_token: tokens.value.accessToken,
          refresh_token: tokens.value.refreshToken,
        },
      });

      if (response.status === 200) {
        window.location.href = "/entrar";
      }
      if (response.status === 500) {
        error.value = true;
      }
    } finally {
      isLoaging.value = false;
    }
  };

  return (
    <form onSubmit={handleSubmit} method="POST">
      <div class="space-y-4">
        <Input.Error
          message={error.value
            ? "Um problema aconteceu, tente novamente mais tarde"
            : undefined}
        />
        <Input.Root>
          <Input.Label label="Senha" class="mb-2" />
          <Input.Password
            name="password"
            placeholder="**********"
            value={password}
          />
          <Input.Error
            message={emptyInputs.value.password
              ? "preencha a senha"
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
              ? "preencha a senha"
              : undefined}
          />
          <Input.Error
            message={isDiffPasswords.value ? "senhas não coincidem" : undefined}
          />
          {password.value.length > 3 &&
            getPasswordErrorComponents(validatePassword(password.value))}
        </Input.Root>
        <div class="space-y-2">
          <Button
            loading={isLoaging.value}
            type="submit"
            class="w-full bg-primary text-neutral rounded font-bold text-sm md:text-lg"
          >
            nova senha
          </Button>
        </div>
      </div>
    </form>
  );
}

import { useSignal } from "@preact/signals";
import type { JSX } from "preact";
import { invoke } from "deco-sites/niivu-bank/runtime.ts";
import { Input } from "deco-sites/niivu-bank/components/ui/inputs/index.tsx";

interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
};

interface EmptyInputs<T> {
  [key: string]: T;
}

export default function SignupForm() {
  const isLoaging = useSignal(false);
  const isDiffPasswords = useSignal(false);
  const password = useSignal('');
  const emptyInputs = useSignal({
    email: false,
    password: false,
    confirmPassword: false,
  });

  const validatePassword = (password: string) => {
    const regexParts: EmptyInputs<RegExp> = {
      minLength: /^.{8,}$/,
      maxLength: /^.{1,64}$/,
      minLetters: /^(.*[a-zA-Z]){2,}.*$/,
      minNumbers: /^(.*\d){2,}.*$/,
      minSpecialChars: /^(?=.*[!@#$%^&*()_+{}:<>?]).*$/
    };

    const errors: EmptyInputs<string> = {
      minLength: "No mínimo 8 caracteres",
      maxLength: "Máximo de 64 caracteres",
      minLetters: "Pelo menos 2 letras",
      minNumbers: "Pelo menos 2 números",
      minSpecialChars: "Pelo menos 1 caracter especial"
    };

    const validationResult: PasswordValidationResult = {
      isValid: true,
      errors: []
    };

    Object.keys(regexParts).forEach(key => {
      if (!regexParts[key].test(password)) {
        validationResult.isValid = false;
        validationResult.errors.push(errors[key]);
      }
    });

    return validationResult;
  };

  const getPasswordErrorComponents = (validationResult: PasswordValidationResult) => {
    const errorComponents: JSX.Element[] = [];

    if (!validationResult.isValid) {
      errorComponents.push(<Input.Label key="topLabel" label="Sua senha deve ter:" class="mt-3" />);
      validationResult.errors.forEach((error, index) => {
          errorComponents.push(<Input.Label key={index} label={error} />);
      });
    }

    return errorComponents;
  };

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    isDiffPasswords.value = false;
    const email = (e.currentTarget.elements.namedItem("email") as RadioNodeList)
      ?.value;
    const passwordComfirm = (e.currentTarget.elements.namedItem("passwordComfirm") as RadioNodeList)
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
    if (passwordComfirm.length && password.value.length && password.value !== passwordComfirm) {
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

      window.location.href = "/minha-conta/solicitacao";
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
            message={isDiffPasswords.value
              ? "senhas não coincidem"
              : undefined}
          />
          { password.value.length > 3 && getPasswordErrorComponents(validatePassword(password.value))}
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
                  Autorizo o NIIVO BANK e empresas coligadas a consultar as minhas informações nas bases de dados cadastrais disponíveis, inclusive no SCR (Sistema de cadastro gerido pelo Banco Central do Brasil).
                </span>
              </div>
            </div>
            <button
              type="submit"
              class="btn btn-accent text-xl text-primary pointer-events-none text-white group-has-[input:checked]/warning:pointer-events-auto group-has-[input:checked]/warning:btn-primary"
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

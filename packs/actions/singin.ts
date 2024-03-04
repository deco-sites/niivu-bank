import type { AppContext } from "$store/apps/site.ts";
import { setCookies } from "$store/utils/cookies.ts";

export interface SingIn {
  email: string;
  password: string;
}

export default async function loader(
  props: SingIn,
  _req: Request,
  ctx: AppContext,
) {
  const { email, password } = props;
  const { supabaseClient } = ctx;

  const passwordRegex = /^(?=.*[!@#$%^&*()_+{}:<>?])(?=.*[A-Z])(?=.*\d).{8,}$/;

  if (!passwordRegex.test(password)) {
    return {
      status: 400,
      message:
        "Sua senha tem que ter 8 caracteres, pelo menos um caracter especial, uma letra maiúscula e um número",
    };
  }

  if (!/@/.test(email)) {
    return { status: 400, message: "Email invalido" };
  }

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { status: 400, message: "Verifique seu email ou senha" };
  }

  setCookies(data.session.access_token, ctx.response.headers);

  return { status: 200, message: "Usuario logado" };
}

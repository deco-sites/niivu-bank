import type { AppContext } from "$store/apps/site.ts";
import { setCookies } from "$store/utils/cookies.ts";

export interface SingUp {
  email: string;
  password: string;
}

export default async function loader(
  props: SingUp,
  req: Request,
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

  const url = new URL(req.url);

  const { error } = await supabaseClient.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${url.origin}/api/authorization`,
    },
  });

  if (error) {
    return { status: 400, message: "Email já cadastrado" };
  }

  const { data, error: singInError } = await supabaseClient.auth
    .signInWithPassword({
      email,
      password,
    });

  if (singInError) {
    return { status: 500, message: singInError };
  }

  setCookies(data.session.access_token, ctx.response.headers);

  return { status: 201, message: "Email Cadastrado" };
}

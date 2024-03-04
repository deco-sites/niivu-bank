import type { AppContext } from "$store/apps/site.ts";
import { setCookies } from "$store/utils/cookies.ts";
import {
  BAD_REQUEST,
  CREATED,
  EMAIL_ERROR,
  EMAIL_RESGISTER_ERROR,
  INTERNAL_ERROR,
  PASSWORD_ERROR,
  SUCCESS,
} from "$store/utils/enum.ts";

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
      status: BAD_REQUEST,
      message: PASSWORD_ERROR,
    };
  }

  if (!/@/.test(email)) {
    return { status: BAD_REQUEST, message: EMAIL_ERROR };
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
    return { status: BAD_REQUEST, message: EMAIL_RESGISTER_ERROR };
  }

  const { data, error: singInError } = await supabaseClient.auth
    .signInWithPassword({
      email,
      password,
    });

  if (singInError) {
    return { status: INTERNAL_ERROR, message: singInError };
  }

  setCookies(data.session.access_token, ctx.response.headers);

  return { status: CREATED, message: SUCCESS };
}

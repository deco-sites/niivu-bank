import type { AppContext } from "$store/apps/site.ts";
import {
  BAD_REQUEST,
  INTERNAL_ERROR,
  OK,
  PASSWORD_ERROR,
  SERVER_ERROR,
  SUCCESS,
  TOKEN_ERROR,
} from "$store/utils/enum.ts";
import { getEmail } from "$store/utils/cookies.ts";

export interface Props {
  password?: string;
  access_token?: string;
  refresh_token?: string;
}

export default async function loader(
  { password, access_token, refresh_token }: Props,
  _req: Request,
  ctx: AppContext,
) {
  const { supabaseClient } = ctx;

  const passwordRegex = /^(?=.*[!@#$%^&*()_+{}:<>?])(?=.*[A-Z])(?=.*\d).{8,}$/;

  if (!password || !passwordRegex.test(password)) {
    return {
      status: BAD_REQUEST,
      message: PASSWORD_ERROR,
    };
  }

  if (!access_token || !refresh_token) {
    return {
      status: BAD_REQUEST,
      message: TOKEN_ERROR,
    };
  }

  const email = getEmail({ supabaseClient, access_token });

  if (typeof email !== "string") {
    return { status: INTERNAL_ERROR, message: SERVER_ERROR };
  }

  await supabaseClient.auth.setSession({
    access_token,
    refresh_token,
  });

  const { error } = await supabaseClient.auth.updateUser({
    password: password,
  });

  if (error) {
    return { status: INTERNAL_ERROR, message: SERVER_ERROR };
  }

  return { status: OK, message: SUCCESS };
}

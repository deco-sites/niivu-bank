import type { AppContext } from "$store/apps/site.ts";
import { setCookies } from "$store/utils/cookies.ts";
import {
  BAD_REQUEST,
  EMAIL_ERROR,
  HAS_SOLICITATION,
  NO_SOLICITATION,
  OK,
  PASSWORD_ERROR,
  SINGIN_ERROR,
} from "$store/utils/enum.ts";
import { SOLICITATION_ENTITY_NAME } from "deco-sites/niivu-bank/packs/utils/constants.ts";

export interface Props {
  email: string;
  password: string;
}

export default async function loader(
  props: Props,
  _req: Request,
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

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { status: BAD_REQUEST, message: SINGIN_ERROR };
  }

  const checkSolicitation = await supabaseClient.from(SOLICITATION_ENTITY_NAME)
    .select().eq("email", email).single();

  setCookies(data.session.access_token, ctx.response.headers);

  return {
    status: OK,
    message: checkSolicitation.error ? NO_SOLICITATION : HAS_SOLICITATION,
  };
}

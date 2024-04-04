import type { AppContext } from "$store/apps/site.ts";
import {
  INTERNAL_ERROR,
  OK,
  SERVER_ERROR,
  SUCCESS,
} from "$store/utils/enum.ts";

export interface Props {
  email?: string;
}

export default function loader(
  { email }: Props,
  req: Request,
  ctx: AppContext,
) {
  const { supabaseClient } = ctx;

  if (!email) {
    return { status: INTERNAL_ERROR, message: SERVER_ERROR };
  }

  const url = new URL(req.url);

  supabaseClient.auth.resetPasswordForEmail(email, {
    redirectTo: `${url.host}/entrar?step=changePassword`,
  });

  return { status: OK, message: SUCCESS };
}

import { AppContext } from "deco-sites/niivu-bank/apps/site.ts";
import {
  INTERNAL_ERROR,
  SERVER_ERROR,
} from "deco-sites/niivu-bank/utils/enum.ts";

export default async function loader(
  _props: unknown,
  req: Request,
  ctx: AppContext,
) {
  const { supabaseClient } = ctx;
  const url = new URL(req.url);
  const { data, error } = await supabaseClient.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${url.origin}/entrar`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    console.log(error);
    return { status: INTERNAL_ERROR, message: SERVER_ERROR };
  }

  return data.url;
}

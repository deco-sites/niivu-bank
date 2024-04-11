import { TEMPORARY_REDIRECT } from "deco-sites/niivu-bank/utils/enum.ts";
import type { AppContext } from "$store/apps/site.ts";
import { COOKIE_NAME } from "deco-sites/niivu-bank/utils/cookies.ts";

export default async function loader(
  _props: Record<string, never>,
  req: Request,
  ctx: AppContext,
) {
  const { supabaseClient } = ctx;
  const newHeaders = new Headers(req.headers);
  newHeaders.append("Set-Cookie", `${COOKIE_NAME}=; Max-Age=0; Path=/`);
  await supabaseClient.auth.signOut();
  return new Response("", {
    status: TEMPORARY_REDIRECT,
    headers: newHeaders,
  });
}

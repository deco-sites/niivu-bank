import { OK } from "deco-sites/niivu-bank/utils/enum.ts";
import type { AppContext } from "$store/apps/site.ts";
import { COOKIE_NAME } from "deco-sites/niivu-bank/utils/cookies.ts";

export default async function loader(
  _props: Record<string, never>,
  req: Request,
  ctx: AppContext,
) {
  const { supabaseClient } = ctx;
  await supabaseClient.auth.signOut();

  const newHeaders = new Headers(req.headers);
  newHeaders.append("Set-Cookie", `${COOKIE_NAME}=; Max-Age=0; Path=/`);

  return new Response(JSON.stringify({ message: "Logout successful", status: OK }), {
    status: OK,
    headers: newHeaders
  })
}

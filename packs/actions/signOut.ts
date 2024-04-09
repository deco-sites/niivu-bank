import { TEMPORARY_REDIRECT } from "deco-sites/niivu-bank/utils/enum.ts";
import type { AppContext } from "$store/apps/site.ts";

export default async function loader(
  _props: Record<string, never>,
  _req: Request,
  ctx: AppContext,
) {
  const { supabaseClient } = ctx;
  await supabaseClient.auth.signOut();

  return new Response("", {
    status: TEMPORARY_REDIRECT,
    headers: { location: "/entrar" },
  });
}

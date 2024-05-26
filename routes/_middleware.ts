import { DecoState } from "deco/types.ts";
import { FreshContext } from "$fresh/server.ts";
import { getCookie } from "$store/utils/cookies.ts";
import { TEMPORARY_REDIRECT } from "$store/utils/enum.ts";
import type { Supabase } from "$store/loaders/supabase/supabaseConfig.ts";
import { Manifest } from "$store/manifest.gen.ts";

export async function handler(
  req: Request,
  ctx: FreshContext<
    DecoState<
      Record<string | number | symbol, never>,
      Record<string | number | symbol, never>,
      Manifest
    >
  >,
) {
  const isMyAccount = new URLPattern({ pathname: "/minha-conta*" }).test(
    req.url,
  );

  const res = await ctx.next();
  if (isMyAccount) {
    const cookie = getCookie(req);
    if (cookie === undefined) {
      return new Response("", {
        status: TEMPORARY_REDIRECT,
        headers: { location: "/" },
      });
    }

    const supabaseClient = await ctx.state.invoke(
      // @ts-ignore Because we can't change the types.
      "SupaBase Client",
    ) as Supabase;
    const { error } = await supabaseClient.auth.getUser(cookie);

    if (error) {
      return new Response("", {
        status: TEMPORARY_REDIRECT,
        headers: { location: "/entrar" },
      });
    }
  }

  return res;
}

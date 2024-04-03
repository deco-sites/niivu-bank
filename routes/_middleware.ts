import { DecoState } from "deco/types.ts";
import { FreshContext } from "$fresh/server.ts";
import { getCookie } from "$store/utils/cookies.ts";
import { TEMPORARY_REDIRECT } from "$store/utils/enum.ts";
import type { Supabase } from "$store/loaders/supabase/supabaseConfig.ts";
import { Manifest } from "$store/manifest.gen.ts";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "deco-sites/niivu-bank/components/autentication/RecoveryPassword/constants.ts";
import { invoke } from "deco-sites/niivu-bank/runtime.ts";

export async function handler(
  req: Request,
  ctx: FreshContext<
    DecoState<
      Record<string | number | symbol, never>,
      Record<string | number | symbol, never>,
      //@ts-ignore Um erro bizarro acontecendo quando remove o ts-ignore
      Manifest
    >
  >,
) {
  const getAccessToken = async () => {
    const hash = window.location.hash;
    const hashParams = hash ? hash.substring(1).split('&') : [];
    let accessToken, refreshToken;

    for (const param of hashParams) {
        if (param.startsWith(ACCESS_TOKEN)) {
          accessToken = param.substring(ACCESS_TOKEN.length + 1)
        } else if (param.startsWith(REFRESH_TOKEN)) {
          refreshToken = param.substring(REFRESH_TOKEN.length + 1)
        }
    }
    const t = await invoke({
      key: "deco-sites/niivu-bank/loaders/actions/updatePassword.ts",
      props: {
        password: "teste34de90SNH????",
        access_token: accessToken,
        refresh_token: refreshToken,
      },
    });
    console.log(t);
    
    return { accessToken, refreshToken };
  };

  if(window && window.location && window.location.hash){
    getAccessToken()
  }

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
        headers: { location: "/" },
      });
    }
  }

  return res;
}

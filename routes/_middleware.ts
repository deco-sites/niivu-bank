import { DecoState } from "deco/types.ts";
import { FreshContext } from "$fresh/server.ts";
import { getCookie } from "$store/utils/cookies.ts";
import { TEMPORARY_REDIRECT } from "$store/utils/enum.ts";
import type { Supabase } from "$store/loaders/supabase/supabaseConfig.ts";
import { Manifest } from "$store/manifest.gen.ts";
import {
  SOLICITATION_ENTITY_NAME,
} from "deco-sites/niivu-bank/packs/utils/constants.ts";
import { Emails } from "../loaders/configs/emailsConfig.ts";

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
    const { data, error } = await supabaseClient.auth.getUser(cookie);

    if (error) {
      return new Response("", {
        status: TEMPORARY_REDIRECT,
        headers: { location: "/entrar" },
      });
    }

    const isSolicitation = new URLPattern({
      pathname: "/minha-conta/solicitacao",
    }).test(req.url);
    if (isSolicitation) {
      const { emails } = await ctx.state.invoke(
        // @ts-ignore Because we can't change the types.
        "Emails de Solicitação",
      ) as Emails ?? { emails: [] };
      const hasAdminEmail = emails.some((email) => email === data.user.email);
      
      const {data: solicitationData, error} = await supabaseClient.from(SOLICITATION_ENTITY_NAME)
        .select().eq(
          "email",
          data.user.email,
        );

      const solicitation = solicitationData?.[0]
      if(solicitation.id_risk3 && !hasAdminEmail){
        return new Response("", {
          status: TEMPORARY_REDIRECT,
          headers: { location: "/minha-conta/acompanhar-solicitacao" },
        });
      }

      if (error && !hasAdminEmail) {
        return new Response("", {
          status: TEMPORARY_REDIRECT,
          headers: { location: "/" },
        });
      }
    }
  }

  return res;
}

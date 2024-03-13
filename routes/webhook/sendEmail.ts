import { FreshContext } from "$fresh/server.ts";
import { DecoState } from "deco/types.ts";
import { readAll } from 'https://deno.land/std/io/mod.ts';
import re from "https://esm.sh/v135/preact-render-to-string@6.3.1/X-ZS8q/denonext/preact-render-to-string.mjs";

export async function handler(req: Request, ctx: unknown){
    try {
        //o body da requisição é um stream, então precisamos ler o corpo da requisição
        const bodyText = await req.text();
        const cleanBodyText = bodyText.replace(/\n/g, '').replace(/\s+/g, ' ');
        const fixedBodyText = cleanBodyText.replace(/"{/g, "'{").replace(/}"/g, "}'");

        const objetoJSON = eval("(" + fixedBodyText + ")");
        console.log("Objeto JSON:", objetoJSON);
        return await ctx.state.invoke("deco-sites/niivu-bank/loaders/actions/sendEmail.ts", {
            reqBody: objetoJSON,
        });
    } catch (error) {
        console.error("Erro ao processar o corpo da solicitação:", error);
        return error;
    }
}
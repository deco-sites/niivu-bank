import { AppContext } from "deco-sites/niivu-bank/apps/site.ts";

export async function handler(req: Request, ctx: AppContext, ...args: unknown[]){
    // Lê o corpo da solicitação como texto
    const bodyText = await req.text();
    console.log("Corpo da solicitação:", bodyText);
    
    // Passa o corpo da solicitação como argumento para a função invocada
    return await ctx.state.invoke("deco-sites/niivu-bank/loaders/actions/sendEmail.ts", {
        reqBody: bodyText,
    });
}
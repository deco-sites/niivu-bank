import { AppContext } from "deco-sites/niivu-bank/apps/site.ts";

export async function handler(req: Request, ctx: AppContext, ...args: unknown[]){
    const bodyText = await req.text();
    console.log("Corpo da solicitação:", bodyText);
    
    const requestBody = JSON.parse(bodyText);
    console.log("Corpo da solicitação (JSON):", requestBody);
    
    return await ctx.state.invoke("deco-sites/niivu-bank/loaders/actions/sendEmail.ts", {
        reqBody: bodyText,
    });
}
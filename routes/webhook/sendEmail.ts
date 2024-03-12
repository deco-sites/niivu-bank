export async function handler(req: unknown, ctx: unknown){
    return await ctx.state.invoke("deco-sites/niivu-bank/loaders/actions/sendEmail.ts", {
        req,
        ctx
    })
}
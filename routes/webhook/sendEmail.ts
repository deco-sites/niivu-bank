export async function handler(req: unknown, ctx: unknown){
    console.log({ req });
    console.log({ ctx });
    
    return await ctx.state.invoke("deco-sites/niivu-bank/loaders/actions/sendEmail.ts", {
        req: req,
    })
}
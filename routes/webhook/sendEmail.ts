export async function handler(req: unknown, ctx: unknown){
    console.log( req.body );
    console.log({ ctx });
    console.log();
    
    
    return await ctx.state.invoke("deco-sites/niivu-bank/loaders/actions/sendEmail.ts", {
        req: req,
    })
}
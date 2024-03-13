export async function handler(props: unknown,req: unknown, ctx: unknown){
    console.log({ req });
    console.log({ ctx });
    console.log({ props });
    
    return await ctx.state.invoke("deco-sites/niivu-bank/loaders/actions/sendEmail.ts", {
        req: req,
    })
}
import { WebhookRequestSupabase } from "deco-sites/niivu-bank/packs/types.ts";
import { STATUS_ENUM_ACCOUNT_OPENING, STATUS_ENUM_CREDIT_ANALYSIS } from "deco-sites/niivu-bank/packs/utils/constants.ts";


export async function handler(req: Request, ctx: unknown) {
  try {
    //o body da requisição é um stream, então precisamos ler o corpo da requisição
    const bodyText = await req.text();
    const cleanBodyText = bodyText.replace(/\n/g, "").replace(/\s+/g, " ");
    const fixedBodyText = cleanBodyText.replace(/"{/g, "'{").replace(
      /}"/g,
      "}'",
    ); 

    const objetoJSON = eval("(" + fixedBodyText + ")")  as unknown as WebhookRequestSupabase;

    const { type, record, old_record } = objetoJSON;

    if(type !== "UPDATE" || record.analysis_classification === STATUS_ENUM_CREDIT_ANALYSIS && old_record.analysis_classification !== STATUS_ENUM_CREDIT_ANALYSIS) {
        return
    }

    const isApproved = record.analysis_classification === STATUS_ENUM_ACCOUNT_OPENING && old_record.analysis_classification !== STATUS_ENUM_ACCOUNT_OPENING;
    
    return await ctx.state.invoke(
      "deco-sites/niivu-bank/loaders/actions/sendEmail.ts",
      {
        isApproved,
        email: record.email,
        name: record.full_name,
      },
    );
  } catch (error) {
    console.error("Erro ao processar o corpo da solicitação:", error);
    return error;
  }
}

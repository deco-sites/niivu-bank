import { WebhookRequestSupabase } from "deco-sites/niivu-bank/packs/types.ts";
import { FreshContext } from "$fresh/server.ts";
import {
  STATUS_ENUM_ACCOUNT_OPENING,
  STATUS_ENUM_CREDIT_ANALYSIS,
  STATUS_ENUM_DISAPPROVED,
} from "deco-sites/niivu-bank/packs/utils/constants.ts";
import { CreditRequestData } from "deco-sites/niivu-bank/packs/utils/createHTMLEmail.ts";
import { DecoState } from "deco/types.ts";
import { Manifest } from "deco-sites/niivu-bank/manifest.gen.ts";

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
  console.log("email iniciado");
  try {
    //o body da requisição é um stream
    const bodyText = await req.text();
    const cleanBodyText = bodyText.replace(/\n/g, "").replace(/\s+/g, " ");
    const fixedBodyText = cleanBodyText.replace(/"{/g, "'{").replace(
      /}"/g,
      "}'",
    );
    const objectJSON = eval(
      "(" + fixedBodyText + ")",
    ) as unknown as WebhookRequestSupabase;

    const { type, record, old_record } = objectJSON;

    if (
      type !== "UPDATE" ||
      record.analysis_classification === STATUS_ENUM_CREDIT_ANALYSIS
    ) {
      return;
    }

    const analysisRisk3 = record.credit_status;
    const isApproved = analysisRisk3 &&
      (record.analysis_classification === STATUS_ENUM_ACCOUNT_OPENING &&
        old_record.analysis_classification !== STATUS_ENUM_ACCOUNT_OPENING);
    const isReproved = !analysisRisk3 &&
      record.analysis_classification === STATUS_ENUM_DISAPPROVED;
    if (!isApproved && !isReproved) {
      return;
    }
    if (isApproved && isReproved) {
      console.error(
        "Erro ao enviar email, status de análise inválido solicitation aprovado e Reprovada ao mesmo tempo",
        {
          idRisk3Solicitation: record.id_risk3,
          isApproved,
          isReproved,
        },
      );
      return;
    }

    const nameSplit = record.full_name?.split(" ");
    const param: CreditRequestData = {
      nome: record.full_name,
      email: record.email,
      status: record.status === "true" ? true : false,
      classificacaoAnalise: record.analysis_classification,
      telefone: record.phone,
      cidade: record.city,
      estado: record.state,
      nomeCompleto: record.full_name,
      rua: record.street,
      numero: record.number,
      complemento: record.complement,
      cep: record.zip_code,
      cnpj: record.cnpj,
      cpf: record.cpf,
      rg: record.rg,
    };

    console.log("invoke actions sendEmail");
    return await ctx.state.invoke(
      "deco-sites/niivu-bank/loaders/actions/sendEmail.ts",
      {
        isApproved: isApproved,
        isReproved: isReproved,
        email: record.email,
        fullName: record.full_name,
        name: nameSplit ? nameSplit[0] : undefined,
        lastName: nameSplit ? nameSplit[nameSplit.length - 1] : undefined,
        param,
      },
    );
  } catch (error) {
    console.error("Error:", error);
    return error;
  }
}

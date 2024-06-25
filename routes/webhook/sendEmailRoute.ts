import { WebhookRequestSupabase } from "site/packs/types.ts";
import { FreshContext } from "$fresh/server.ts";
import {
  STATUS_ENUM_ABLE,
  STATUS_ENUM_ACCOUNT_OPENING,
  STATUS_ENUM_CREDIT_ANALYSIS,
  STATUS_ENUM_DISAPPROVED,
} from "site/packs/utils/constants.ts";
import { CreditRequestData } from "site/packs/utils/createHTMLEmail.ts";
import { DecoState } from "deco/types.ts";
import { Manifest } from "site/manifest.gen.ts";

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

    const { type, record } = objectJSON;

    if (
      type !== "UPDATE" ||
      record.analysis_classification === STATUS_ENUM_CREDIT_ANALYSIS
    ) {
      return;
    }

    const isApproved = record.status === STATUS_ENUM_ACCOUNT_OPENING;
    const isReproved = record.status === STATUS_ENUM_DISAPPROVED;
    const isAbleAccount = record.status === STATUS_ENUM_ABLE;

    if (!isApproved && !isReproved && !isAbleAccount) {
      console.error(
        "Error sending email, analysis status invalid request not approved and not Failed",
        {
          idRisk3Solicitation: record.id_risk3,
          isApproved,
          isReproved,
        },
      );
      return;
    }
    if (isApproved && isReproved) {
      console.error(
        "Error sending email, invalid analysis status, request approved and failed at the same time",
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

    console.log("invoke actions sendEmail, solicitation_id: ", record.id_risk3);
    return await ctx.state.invoke(
      "site/loaders/actions/sendEmail.ts",
      {
        isApproved: isApproved,
        isReproved: isReproved,
        isAbleAccount: isAbleAccount,
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

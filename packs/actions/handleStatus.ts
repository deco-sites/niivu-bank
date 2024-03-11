import type { AppContext } from "$store/apps/site.ts";
import {
  CLASSIFICATION_APPROVED,
  HEADER_AUTH_TOKEN,
  SOLICITATION_ENTITY_NAME,
  SOLICITATION_FILD_ID_RISK,
  STATUS_ENUM_ACCOUNT_OPENING,
  STATUS_ENUM_RISK3_FAILED,
} from "deco-sites/niivu-bank/packs/utils/constants.ts";

export default async function loader(
  props: {
    id: string;
  },
  _req: Request,
  ctx: AppContext,
) {
  console.info("Hook Risk3 was called")
  const { id } = props;

  if (!id) {
    return {
      error: "error, id_solicitation_risk3.",
    };
  }

  const { risk3, supabaseClient } = ctx;
  const { clientRisk3, password, username } = risk3;

  const usernameStr = typeof username === "string" ? username : username?.get();
  const passwordSrt = typeof password === "string" ? password : password?.get();

  if (!usernameStr || !passwordSrt) {
    console.error("Hook Risk3 gave an error due to lack of password or configured user")
    return {
      error: "risk3-credentials",
    };
  }

  const response = await clientRisk3["POST /api/v0/login"]({
    username: usernameStr,
    password: passwordSrt,
  }).then((res) => res.json());

  const { data, status, message } = response;

  if (status === "error" && !data) {
    console.error("Hook Risk3 gave an error in the request, message: " + message)
    return {
      error: message,
    };
  }

  const headers = new Headers({ [HEADER_AUTH_TOKEN]: data.token });

  const analisys = await clientRisk3["GET /api/v0/analises/id/:solicitationId"](
    { solicitationId: id },
    { headers },
  ).then((res) => res.json());

  const { analise: { classificacao } } = analisys.data;
  const isApproved = classificacao === CLASSIFICATION_APPROVED;
  const statusCredit = isApproved
    ? STATUS_ENUM_ACCOUNT_OPENING
    : STATUS_ENUM_RISK3_FAILED;

  const solicitation = await supabaseClient.from(SOLICITATION_ENTITY_NAME)
    .select("*").eq(SOLICITATION_FILD_ID_RISK, id).single();

  if (!solicitation || solicitation.data.length === 0) {
    console.error("Hook Risk3 gave an error in the request Supabase, message: solicitation not found")
    return {
      error: "error, solicitation not found.",
    };
  }

  const updateSolicitation = await supabaseClient.from(SOLICITATION_ENTITY_NAME)
    .update({
      status: statusCredit,
      credit_status: isApproved,
      analysis_classification: classificacao,
    }).eq("id", solicitation.data.id);

  if (updateSolicitation.error !== null) {
    console.error("Hook Risk3 gave an error in the request, message: " + updateSolicitation.error)
    return {
      error: "error, update solicitation.",
    };
  }

  console.info("Hook Risk3 was successfully executed")
  return {
    status: 201,
  };
}

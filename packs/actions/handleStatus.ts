import type { AppContext } from "$store/apps/site.ts";
import {
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
  console.log("Risk3 webhook: was called");
  const { id } = props;

  if (!id) {
    return {
      error: "error, id_solicitation_risk3.",
    };
  }

  const { risk3, supabaseClient } = ctx;
  const { clientRisk3, password, username, colorSolicitation } = risk3;
  const authToken = typeof password === "string"
    ? password
    : password.get() as string;
  if (!password || !username) {
    console.error("Risk3 webhook: password or user not set.");
    return {
      error: "risk3-credentials",
    };
  }

  const response = await clientRisk3["POST /api/v0/login"]({
    username: username,
    password: authToken,
  }).then((res) => res.json());

  const { data, status, message } = response;

  if (status === "error" && !data) {
    console.error("Risk3 webhook: Error " + message);
    return {
      error: message,
    };
  }

  const headers = new Headers({ [HEADER_AUTH_TOKEN]: data.token });

  const analisys = await clientRisk3["GET /api/v0/analises/id/:solicitationId"](
    { solicitationId: id },
    { headers },
  ).then((res) => res.json());

  const { analise } = analisys.data;
  const isApproved = colorSolicitation?.some((cor) =>
    cor.toLowerCase() === analise?.classificacao.toLowerCase()
  );

  const statusCredit = isApproved
    ? STATUS_ENUM_ACCOUNT_OPENING
    : STATUS_ENUM_RISK3_FAILED;

  const solicitation = await supabaseClient.from(SOLICITATION_ENTITY_NAME)
    .select("*").eq(SOLICITATION_FILD_ID_RISK, id).single();

  if (
    !solicitation || solicitation.status === 406 ||
    solicitation?.data?.length === 0
  ) {
    console.error(
      "Risk3 webhook: request Supabase, message: solicitation not found",
    );
    return {
      error: "error, solicitation not found.",
    };
  }

  const updateSolicitation = await supabaseClient.from(SOLICITATION_ENTITY_NAME)
    .update({
      status: statusCredit,
      credit_status: isApproved,
      analysis_classification: analise?.classificacao ?? "sem classificação",
    }).eq("id", solicitation.data.id);

  if (updateSolicitation.error !== null) {
    console.error(
      {
        error: "Risk3 webhook: update status in Supabase",
      },
    );
    return {
      error: "error, update solicitation.",
    };
  }

  console.log("Risk3 webhook: was successfully executed");
  return {
    status: 201,
  };
}

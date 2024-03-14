import type { AppContext } from "$store/apps/site.ts";
import {
  SupabaseClient,
} from "https://esm.sh/v135/@supabase/supabase-js@2.7.0";
import {
  HEADER_AUTH_TOKEN,
  SOLICITATION_ENTITY_NAME,
  STATUS_ENUM_ABLE,
  STATUS_ENUM_ACCOUNT_OPENING,
  STATUS_ENUM_CREDIT_ANALYSIS,
  STATUS_ENUM_DISAPPROVED,
  STATUS_ENUM_IN_OPERATION,
  STATUS_ENUM_RISK3_FAILED,
  STATUS_ENUM_SIGNATURE,
  STATUS_ENUM_SUSPENDED,
} from "deco-sites/niivu-bank/packs/utils/constants.ts";
import { INTERNAL_ERROR, SERVER_ERROR } from "$store/utils/enum.ts";
import { getEmail } from "$store/utils/cookies.ts";

interface Fields {
  phone: string;
  zip_code: string;
  street: string;
  number: string;
  complement?: string;
  city: string;
  state: string;
  email: string;
}

interface CNPJ extends Omit<Fields, "email"> {
  type: "CNPJ";
  cnpj: string;
  business_name?: string;
}

interface CPF extends Omit<Fields, "email"> {
  type: "CPF";
  full_name?: string;
  cpf?: string;
  rg?: string;
}

interface Entity extends Fields {
  credit_status: boolean;
  id_solicitation_risk3: string;
  status: Status;
}

enum Status {
  AnalysisDeCredito = STATUS_ENUM_CREDIT_ANALYSIS,
  AccountOpening = STATUS_ENUM_ACCOUNT_OPENING,
  Risk3Failed = STATUS_ENUM_RISK3_FAILED,
  Signature = STATUS_ENUM_SIGNATURE,
  Able = STATUS_ENUM_ABLE,
  InOperation = STATUS_ENUM_IN_OPERATION,
  Suspended = STATUS_ENUM_SUSPENDED,
  Disapproved = STATUS_ENUM_DISAPPROVED,
}

interface DataObjectSoliciation {
  id: number;
  id_solicitation_risk3: number | null;
  business_name: string | null;
  full_name: string;
  email: string;
  cnpj: string | null;
  cpf: string;
  rg: string | null;
  phone: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zip_code: string;
  status: string;
  credit_status: boolean;
}

interface ApiResponse {
  error: null | string;
  data: DataObjectSoliciation[];
  count: null | number;
  status: number;
  statusText: string;
}

type LoaderResponse =
  | { error: string }
  | { data: SupabaseClient<ApiResponse> }
  | { status: number; message: string };

export default async function loader(
  props: CNPJ | CPF,
  req: Request,
  ctx: AppContext,
): Promise<LoaderResponse> {
  const { risk3, supabaseClient } = ctx;
  const { clientRisk3, password, username, product } = risk3;

  const { type, ...rest } = props;

  if (type !== "CPF" && type !== "CNPJ") {
    return {
      error: "error, wrong type.",
    };
  }

  if (!username || !password) {
    return {
      error: "risk3-credentials",
    };
  }

  const email = getEmail({ supabaseClient, req });

  if (typeof email !== "string") {
    return { status: INTERNAL_ERROR, message: SERVER_ERROR };
  }

  const response = await clientRisk3["POST /api/v0/login"]({
    username: username,
    password: password,
  }).then((res) => res.json());

  const { data, status, message } = response;

  if (status === "error" && !data) {
    return {
      error: message,
    };
  }

  const headers = new Headers({ [HEADER_AUTH_TOKEN]: data.token });

  if (type === "CPF") {
    const body = {
      cpfs: [props.cpf!],
    };

    const { data: { records } } = await clientRisk3
      ["POST /api/v0/analises/cpf"](
        {},
        {
          body,
          headers,
        },
      ).then((res) => res.json());

    // This API returns 400 even when it is correct
    clientRisk3["POST /api/v0/logout"]({}, {
      headers,
    });

    const customerWithStatus: Entity = {
      ...rest,
      id_solicitation_risk3: records[0].id!,
      credit_status: false,
      status: Status.AnalysisDeCredito,
      email,
    };

    return await supabaseClient.from(SOLICITATION_ENTITY_NAME).insert([{
      ...customerWithStatus,
    }]).select() as unknown as LoaderResponse;
  } else {
    const { data: { records } } = await clientRisk3["POST /api/v0/analises"]({
      product: product,
    }, {
      headers: headers,
      body: {
        cnpjs: [props.cnpj!],
      },
    }).then((res) => res.json());

    // This API returns 400 even when it is correct
    clientRisk3["POST /api/v0/logout"]({}, {
      headers: headers,
    });

    const customerWithStatus: Entity = {
      ...rest,
      id_solicitation_risk3: records[0].id!,
      credit_status: false,
      status: Status.AnalysisDeCredito,
      email,
    };

    return await supabaseClient.from(SOLICITATION_ENTITY_NAME).insert([{
      ...customerWithStatus,
    }]).select() as unknown as LoaderResponse;
  }
}

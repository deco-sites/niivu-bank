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
  full_name: string;
  phone: string;
  zip_code: string;
  street: string;
  number: string;
  complement?: string;
  cpf: string;
  rg?: string;
  city: string;
  state: string;
}

interface CNPJ extends Fields {
  type: "CNPJ";
  cnpj: string;
  business_name: string;
  legal_zip_code: string;
  legal_street: string;
  legal_number: string;
  legal_complement?: string;
  legal_city: string;
  legal_state: string;
}

interface CPF extends Fields {
  type: "CPF";
}

interface Entity extends Fields {
  email: string;
  credit_status: boolean;
  id_risk3: string;
  status: Status;
  cnpj?: string;
  business_name?: string;
  legal_zip_code?: string;
  legal_street?: string;
  legal_number?: string;
  legal_complement?: string;
  legal_city?: string;
  legal_state?: string;
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
  id_risk3: number | null;
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

  if (props.type !== "CPF" && props.type !== "CNPJ") {
    return {
      error: "error, wrong type.",
    };
  }

  if (!username || !password) {
    return {
      error: "risk3-credentials",
    };
  }

  const email = await getEmail({ supabaseClient, req });

  if (typeof email !== "string") {
    console.log(email);
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

  const {
    full_name,
    phone,
    zip_code,
    street,
    number,
    complement,
    cpf,
    rg,
    city,
    state,
  } = props;

  if (props.type === "CPF") {
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
      full_name,
      phone,
      zip_code: zip_code.replace(/\D/g, ""),
      street,
      number,
      complement,
      cpf,
      rg: rg?.replace(/\D/g, ""),
      city,
      state,
      id_risk3: records[0].id!,
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

    const {
      cnpj,
      business_name,
      legal_zip_code,
      legal_street,
      legal_number,
      legal_complement,
      legal_city,
      legal_state,
    } = props;

    // This API returns 400 even when it is correct
    clientRisk3["POST /api/v0/logout"]({}, {
      headers: headers,
    });

    const customerWithStatus: Entity = {
      full_name,
      phone,
      zip_code: zip_code.replace(/\D/g, ""),
      street,
      number,
      complement,
      cpf,
      rg: rg?.replace(/\D/g, ""),
      city,
      state,
      cnpj,
      business_name,
      legal_zip_code: legal_zip_code.replace(/\D/g, ""),
      legal_street,
      legal_number,
      legal_complement,
      legal_city,
      legal_state,
      id_risk3: records[0].id!,
      credit_status: false,
      status: Status.AnalysisDeCredito,
      email,
    };
    const test = await supabaseClient.from(SOLICITATION_ENTITY_NAME).insert([{
      ...customerWithStatus,
    }]).select() as unknown as LoaderResponse;

    console.log({ test });
    return test;
  }
}

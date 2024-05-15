import type { AppContext } from "$store/apps/site.ts";
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
import {
  INTERNAL_ERROR,
  RISK3_ERROR,
  SERVER_ERROR,
  SUPABASE_ERROR,
} from "$store/utils/enum.ts";
import { getEmail } from "$store/utils/cookies.ts";
import { RecordRisk } from "deco-sites/niivu-bank/packs/utils/creditAnalysis.ts";

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

type LoaderResponse =
  | { error: string }
  | DataObjectSoliciation[]
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

  console.log(data.token)
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
    let recordsData: RecordRisk[];

    try {
      const { data: { records } } = await clientRisk3
        ["POST /api/v0/niivo_api/cpf"](
          {},
          {
            body,
            headers,
          },
        ).then((res) => res.json());
      recordsData = records;
      // This API returns 400 even when it is correct
      clientRisk3["POST /api/v0/logout"]({}, {
        headers,
      });
    } catch (error) {
      console.error(error);
      return { status: INTERNAL_ERROR, message: RISK3_ERROR };
    }

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
      id_risk3: recordsData[0].id!,
      credit_status: false,
      status: Status.AnalysisDeCredito,
      email,
    };

    const { data, error } = await supabaseClient.from(SOLICITATION_ENTITY_NAME)
      .insert([{
        ...customerWithStatus,
      }]).select();
    if (error) {
      console.error(error);
      return { status: INTERNAL_ERROR, message: SUPABASE_ERROR };
    }

    return data as DataObjectSoliciation[];
  } else {
    let recordsData: RecordRisk[];
    try {
      const { data: { records } } = await clientRisk3["POST /api/v0/niivo_api"](
        {
          product: product,
        },
        {
          headers: headers,
          body: {
            cnpjs: [props.cnpj!],
          },
        },
      ).then((res) => res.json());
      recordsData = records;
    } catch (error) {
      console.error(error);
      return { status: INTERNAL_ERROR, message: RISK3_ERROR };
    }

    // This API returns 400 even when it is correct
    clientRisk3["POST /api/v0/logout"]({}, {
      headers: headers,
    });

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
      id_risk3: recordsData[0].id!,
      credit_status: false,
      status: Status.AnalysisDeCredito,
      email,
    };

    const { data, error } = await supabaseClient.from(SOLICITATION_ENTITY_NAME)
      .insert([{
        ...customerWithStatus,
      }]).select();
    if (error) {
      console.error(error);
      return { status: INTERNAL_ERROR, message: SUPABASE_ERROR };
    }
    return data as DataObjectSoliciation[];
  }
}

import type { AppContext } from "$store/apps/site.ts";
import { SupabaseClient, createClient } from "https://esm.sh/v135/@supabase/supabase-js@2.7.0";
import {
  RESPONSE_RISK3_APPROVED,
  SOLICITATION_ENTITY_NAME,
  STATUS_ENUM_ABLE,
  STATUS_ENUM_ACCOUNT_OPENING,
  STATUS_ENUM_DISAPPROVED,
  STATUS_ENUM_IN_OPERATION,
  STATUS_ENUM_SIGNATURE,
  STATUS_ENUM_SUSPENDED,
  STATUS_ENUM_CREDIT_ANALYSIS,
  STATUS_ENUM_RISK3_FAILED,
  HEADER_AUTH_TOKEN,
} from "deco-sites/niivu-bank/packs/utils/constants.ts";

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

interface CNPJ extends Fields {
  type: "CNPJ";
  cnpj: string;
  business_name?: string;
}

interface CPF extends Fields {
  type: "CPF";
  full_name?: string;
  cpf?: string;
  rg?: string;
}

interface Entity extends Fields {
  credit_status: boolean;
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
  | { data: SupabaseClient<ApiResponse> };


export default async function loader(
  props: CNPJ | CPF,
  _req: Request,
  ctx: AppContext,
): Promise<LoaderResponse> {
  const { supabase, risk3 } = ctx;
  const { clientRisk3, password, username, product } = risk3
  
  if (!supabase) {
    return {
      error: "supabase-credentials"
    }
  }

  const clientSupabase = createClient<ApiResponse>(supabase.url!, supabase.token!);

  const { type, ...rest } = props;

  if (type !== "CPF" && type !== "CNPJ") {
    return {
     error: "error, wrong type."
    }
  }

  const usernameStr = typeof username === "string" ? username : username?.get();
  const passwordSrt = typeof password === "string" ? password : password?.get();

  if (!usernameStr || !passwordSrt) {
    return {
      error: "risk3-credentials"
    };
  }

  const response = await clientRisk3["POST /api/v0/login"]({
    username: usernameStr,
    password: passwordSrt,
  }).then((res) => res.json());

  const { data, status, message } = response;

  if (status === "error" && !data) {
    return {
     error: message
    }
  }

  const AUTH_TOKEN = `Bearer ${data.token}`
  const headers = new Headers();
  headers.append(HEADER_AUTH_TOKEN, AUTH_TOKEN);

  if (type === "CPF") {
    const body = {
      cpfs: [props.cpf!],
    };
    
    const creditAnalysis = await clientRisk3["POST /api/v0/analises/cpf"]({},
      {
        body: body,
        headers: headers,
      }
    ).then((res) => res.json())
  
    clientRisk3["POST /api/v0/logout"]({
      headers: headers
    });

    const customerWithStatus: Entity = {
      ...rest,
      credit_status: creditAnalysis.data[0].status === RESPONSE_RISK3_APPROVED
        ? true
        : false,
      status: Status.AnalysisDeCredito,
    };

    return await clientSupabase.from(SOLICITATION_ENTITY_NAME).insert([{
      ...customerWithStatus,
    }]).select() as unknown as LoaderResponse;
  } else {
    const creditAnalysis = await clientRisk3["POST /api/v0/analises"]({
      product: product,
    }, {
      headers: headers,
      body: {
        cnpjs: [props.cnpj!],
      },
    }).then((res) => res.json())
    
    clientRisk3["POST /api/v0/logout"]({
      headers: headers
    });

    const customerWithStatus: Entity = {
      ...rest,
      credit_status: creditAnalysis.data[0].status === RESPONSE_RISK3_APPROVED
        ? true
        : false,
      status: Status.AnalysisDeCredito,
    };

    return await clientSupabase.from(SOLICITATION_ENTITY_NAME).insert([{
      ...customerWithStatus,
    }]).select() as unknown as LoaderResponse;
  }
}

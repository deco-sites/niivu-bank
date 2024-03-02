import type { AppContext } from "$store/apps/site.ts";
import { createClient } from "https://esm.sh/v135/@supabase/supabase-js@2.7.0";
import {
  RESPONSE_RISK3_APPROVED,
  SOLICITATION_ENTITY_NAME,
  STATUS_ENUM_ABLE,
  STATUS_ENUM_ACCOUNT_OPENING,
  STATUS_ENUM_DISAPPROVED,
  STATUS_ENUM_IN_OPERATION,
  STATUS_ENUM_SIGNATURE,
  STATUS_ENUM_SUSPENDED,
} from "../utils/constants.ts";

interface Fields {
  phone: string;
  zip_code: string;
  street: string;
  number: string;
  complement?: string;
  city: string;
  state: string;
  email: string;
  rg?: string;
  full_name?: string;
  cpf?: string;
  business_name?: string;
  cnpj?: string;
}

interface Entity extends Fields {
  credit_status: boolean;
  status: StatusEnum;
}

export type StatusEnum =
  | typeof STATUS_ENUM_ACCOUNT_OPENING
  | typeof STATUS_ENUM_SIGNATURE
  | typeof STATUS_ENUM_ABLE
  | typeof STATUS_ENUM_IN_OPERATION
  | typeof STATUS_ENUM_SUSPENDED
  | typeof STATUS_ENUM_DISAPPROVED;

interface Props extends Fields {
  type: "CPF" | "CNPJ";
}

export default async function loader(
  props: Props,
  _req: Request,
  ctx: AppContext,
) {
  const { supaBase, risk3 } = ctx;
  const { clientRisk3, password, username, product } = risk3;
  if (!supaBase) {
    return "You must provide supaBase fields in site.ts";
  }

  const client = createClient(supaBase.url!, supaBase.token!);

  const { type, ...rest } = props;

  if (type !== "CPF" && type !== "CNPJ") {
    return "error, wrong type.";
  }

    const user = typeof username === "string"
    ? username 
    : username?.get()
  const pass = typeof password === "string"? password : password?.get()

  const res = await clientRisk3["POST /api/v0/login"]({
    username: user ?? "api@lavorocredito.com.br",
    password: pass ?? "Lavoro?Usu4r10@API",
  }, {})
  const response = await res.json();

  const { data, status, message } = response

  if (status === "error" && !data) {
    return message;
  }

  if (type === "CPF") {
    const res = await clientRisk3["POST /api/v0/analises/cpf"]({
      "Venidera-AuthToken": `Bearer ${data.token}`
    }, {
      body: {
        cpfs: [props.cpf!]
      }
    });
    const analise = await res.json();

    clientRisk3["POST /api/v0/logout"]({"Venidera-AuthToken": `Bearer ${data.token}`}, {});

    const customerWithStatus: Entity = {
      ...rest,
      credit_status: analise.data[0].status === RESPONSE_RISK3_APPROVED ? true : false,
      status: STATUS_ENUM_ACCOUNT_OPENING,
    };

    return await client.from(SOLICITATION_ENTITY_NAME).insert([{
      ...customerWithStatus,
    }]).select();
  } else {
    const res = await clientRisk3["POST /api/v0/analises"]({
      product: product
    }, {
      headers: {
        "Venidera-AuthToken": `Bearer ${data.token}`
      },
      body: {
        cnpjs: [props.cnpj!]
      },
      
    });
    const analise = await res.json();
    clientRisk3["POST /api/v0/logout"]({"Venidera-AuthToken": `Bearer ${data.token}`}, {});

    const customerWithStatus: Entity = {
      ...rest,
      credit_status: analise.data[0].status === RESPONSE_RISK3_APPROVED ? true : false,
      status: STATUS_ENUM_ACCOUNT_OPENING,
    };

    return await client.from(SOLICITATION_ENTITY_NAME).insert([{
      ...customerWithStatus,
    }]).select();
  }
}

import type { AppContext } from "$store/apps/site.ts";
import { createClient } from "https://esm.sh/v135/@supabase/supabase-js@2.7.0";
import {
  checkCNPJ,
  checkCPF,
  loginRisk3,
  logoutRisk3,
} from "deco-sites/niivu-bank/packs/utils.ts/risk3.ts";
import { RESPONSE_RISK3_APPROVED, SOLICITATION_ENTITY_NAME, STATUS_ENUM_ABLE, STATUS_ENUM_ACCOUNT_OPENING, STATUS_ENUM_DISAPPROVED, STATUS_ENUM_IN_OPERATION, STATUS_ENUM_SIGNATURE, STATUS_ENUM_SUSPENDED } from "deco-sites/niivu-bank/packs/utils.ts/constants.ts";

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

export type StatusEnum = typeof STATUS_ENUM_ACCOUNT_OPENING | typeof STATUS_ENUM_SIGNATURE  | typeof STATUS_ENUM_ABLE | typeof STATUS_ENUM_IN_OPERATION | typeof STATUS_ENUM_SUSPENDED | typeof STATUS_ENUM_DISAPPROVED;

interface Props extends Fields {
  type: "CPF" | "CNPJ";
}

export default async function loader(
  props: Props,
  _req: Request,
  ctx: AppContext,
) {
  const { supaBase, risk3 } = ctx;
  if (!supaBase) {
    return "You must provide supaBase fields in site.ts";
  }

  const client = createClient(supaBase.url!, supaBase.token!);

  const { type, ...rest } = props;

  if (type !== "CPF" && type !== "CNPJ") {
    return "error, wrong type.";
  }

  const response = await loginRisk3(risk3.username, risk3.password, risk3.url);

  if (response.status === "error" && !response.data) {
    return response.message;
  }

  if (type === "CPF") {
    const analise = await checkCPF(risk3.url, response.data!, props.cpf!);
    logoutRisk3(risk3.url);

    const customerWithStatus: Entity = {
      ...rest,
      credit_status: analise.data === RESPONSE_RISK3_APPROVED ? true : false,
      status: STATUS_ENUM_ACCOUNT_OPENING,
    };

    return await client.from(SOLICITATION_ENTITY_NAME).insert([{
      ...customerWithStatus,
    }]).select();
  } else {
    const analise = await checkCNPJ(
      props.cnpj!,
      risk3.url,
      risk3.product,
      response.data!,
    );
    logoutRisk3(risk3.url);

    const customerWithStatus: Entity = {
      ...rest,
      credit_status: analise.data === RESPONSE_RISK3_APPROVED ? true : false,
      status: STATUS_ENUM_ACCOUNT_OPENING,
    };

    return await client.from(SOLICITATION_ENTITY_NAME).insert([{
      ...customerWithStatus,
    }]).select();
  }
}

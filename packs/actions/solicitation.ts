import type { AppContext } from "$store/apps/site.ts";
import { createClient } from "https://esm.sh/v135/@supabase/supabase-js@2.7.0";
import {
  checkCNPJ,
  checkCPF,
  loginRisk3,
  logoutRisk3,
} from "deco-sites/niivu-bank/packs/utils.ts/risk3.ts";

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

interface Props extends Fields {
  type: "CPF" | "CNPJ";
}

type StatusEnum = "iniciado" | "em análise" | "reprovado" | "aprovado";

const ENTITY_NAME = "customer";

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
      credit_status: analise.data === "Aprovado" ? true : false,
      status: "iniciado",
    };

    return await client.from(ENTITY_NAME).insert([{
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
      credit_status: analise.data === "Aprovado" ? true : false,
      status: "iniciado",
    };

    return await client.from(ENTITY_NAME).insert([{
      ...customerWithStatus,
    }]).select();
  }
}

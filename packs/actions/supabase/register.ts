import type { AppContext } from "$store/apps/site.ts";
import { createClient } from "https://esm.sh/v135/@supabase/supabase-js@2.7.0";

export interface defaultFields {
  phone: string;
  address: {
    zip_code: string;
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
  };
  email: string;
}

export interface CPF extends defaultFields {
  type: "CPF";
  rg: string;
  full_name: string;
  cpf: string;
}

export interface CNPJ extends defaultFields {
  type: "CNPJ";
  business_name: string;
  cnpj: string;
}

export default async function loader(
  props: CPF | CNPJ,
  _req: Request,
  ctx: AppContext,
) {
  const { supaBase } = ctx;
  if (!supaBase) {
    return "You must provide supaBase fields in site.ts";
  }

  const client = createClient(supaBase.url!, supaBase.token!);

  const { type } = props;

  if (type !== "CPF" && type !== "CNPJ") {
    return "error, wrong type.";
  }

  const { phone, address, email } = props;

  const { data, error } = await client.from("address").insert(
    address,
  ).select();
  if (error) {
    return error;
  }
  const [addressData] = data;

  if (type === "CPF") {
    const { full_name, rg, cpf } = props;
    return client.from("physicalperson").insert([{
      phone,
      address_id: addressData.id,
      email,
      full_name,
      rg,
      cpf,
    }]);
  } else {
    const { business_name, cnpj } = props;
    return client.from("legalperson").insert([{
      phone,
      address_id: addressData.id,
      email,
      business_name,
      cnpj,
    }]);
  }
}

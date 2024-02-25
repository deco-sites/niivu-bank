import type { AppContext } from "$store/apps/site.ts";
import { Secret } from "apps/website/loaders/secret.ts";
import { createClient } from "https://esm.sh/v135/@supabase/supabase-js@2.7.0";
import { ResponseRisk3 } from "deco-sites/niivu-bank/packs/types.ts";

interface defaultFields {
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

async function loginRisk3(
  usernameSecret: Secret,
  passwordSecret: Secret,
  url: string,
): Promise<ResponseRisk3> {
  const username = typeof usernameSecret === "string"
    ? usernameSecret
    : usernameSecret?.get();
  const password = typeof passwordSecret === "string"
    ? passwordSecret
    : passwordSecret?.get();

  console.log(username, password, url);
  const res = await fetch(
    `${url}/api/v0/login?username=${username}&password=${password}`,
    {
      method: "POST",
    },
  );

  return res.json();
}

function logoutRisk3(url: string) {
  return fetch(`${url}/api/v0/logout`, {
    method: "POST",
  });
}

async function analiseCPF(url: string, authToken: string, cpf: string): Promise<ResponseRisk3> {
  const response = await fetch(`${url}/api/v0/analises/cpf`, {
    method: "POST",
    headers: {
      "Venidera-AuthToken": `Bearer ${authToken??"123"}`
    },
    body: JSON.stringify({
      cpfs: [cpf],
    }),
  });

  return response.json();
}

async function analiseCNPJ(authToken: string, url: string, cnpj: string, product: string): Promise<ResponseRisk3> {
  const response = await fetch(`${url}/api/v0/analise?product=${product}`, {
    method: "POST",
    headers: {
      "Venidera-AuthToken": `Bearer ${authToken??"123"}`
    },
    body: JSON.stringify({
      cnpjs: [cnpj],
    }),
  });

  return response.json();
}

export default async function loader(
  props: CPF | CNPJ,
  _req: Request,
  ctx: AppContext,
) {
  const { supaBase, risk3 } = ctx;
  if (!supaBase) {
    return "You must provide supaBase fields in site.ts";
  }

  const client = createClient(supaBase.url!, supaBase.token!);

  const { type } = props;

  if (type !== "CPF" && type !== "CNPJ") {
    return "error, wrong type.";
  }

  const response = await loginRisk3(risk3.username, risk3.password, risk3.url);

  if (response.status === "error" && !response.data) {
    return response.message;
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
    await client.from("physicalperson").insert([{
      phone,
      address_id: addressData.id,
      email,
      full_name,
      rg,
      cpf,
    }]);

    const analise = await analiseCPF(risk3.url, response.data!, cpf, );
    Promise.all([logoutRisk3(risk3.url)]);

    return analise;
  } else {
    const { business_name, cnpj } = props;
    await client.from("legalperson").insert([{
      phone,
      address_id: addressData.id,
      email,
      business_name,
      cnpj,
    }]);

    const analise = await analiseCNPJ(cnpj, risk3.url, risk3.product, response.data!)
    Promise.all([logoutRisk3(risk3.url)]);

    return analise;
  }
}

import { ResponseRisk3 } from "deco-sites/niivu-bank/packs/types.ts";
import { Secret } from "apps/website/loaders/secret.ts";

export async function loginRisk3(
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

  const res = await fetch(
    `${url}/api/v0/login?username=${username}&password=${password}`,
    {
      method: "POST",
    },
  );

  return res.json();
}

export function logoutRisk3(url: string) {
  return fetch(`${url}/api/v0/logout`, {
    method: "POST",
  });
}

export async function checkCPF(
  url: string,
  authToken: string,
  cpf: string,
): Promise<ResponseRisk3> {
  const response = await fetch(`${url}/api/v0/analises/cpf`, {
    method: "POST",
    headers: {
      "Venidera-AuthToken": `Bearer ${authToken ?? "123"}`,
    },
    body: JSON.stringify({
      cpfs: [cpf],
    }),
  });

  return response.json();
}

export async function checkCNPJ(
  authToken: string,
  url: string,
  cnpj: string,
  product: string,
): Promise<ResponseRisk3> {
  const response = await fetch(`${url}/api/v0/analise?product=${product}`, {
    method: "POST",
    headers: {
      "Venidera-AuthToken": `Bearer ${authToken ?? "123"}`,
    },
    body: JSON.stringify({
      cnpjs: [cnpj],
    }),
  });

  return response.json();
}

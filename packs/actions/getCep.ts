import type { AppContext } from "$store/apps/site.ts";

export interface Props {
  cep: string;
}

interface Address {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export default async function loader(
  { cep }: Props,
  _req: Request,
  _ctx: AppContext,
) {
  if (!cep) {
    return { status: 400, message: "cep-undefined" };
  }

  const data = await fetch(`https://viacep.com.br/ws/${cep}/json/`).then((
    res,
  ) => res.json()) as Address;

  return {
    cep: data.cep,
    street: data.logradouro,
    complement: data.complemento,
    city: data.localidade,
    state: data.uf,
  };
}

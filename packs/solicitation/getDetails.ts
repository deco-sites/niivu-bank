import type { AppContext } from "$store/apps/site.ts";
import { getEmail } from "$store/utils/cookies.ts";
import {
  BAD_REQUEST,
  EMAIL_ERROR,
  INTERNAL_ERROR,
  SERVER_ERROR,
} from "deco-sites/niivu-bank/utils/enum.ts";
import { SOLICITATION_ENTITY_NAME } from "deco-sites/niivu-bank/packs/utils/constants.ts";

export interface DataObjectSoliciation {
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

export interface Error {
  status: number;
  message: string;
}

export default async function loader(
  _props: unknown,
  req: Request,
  ctx: AppContext,
): Promise<DataObjectSoliciation | Error> {
  const { supabaseClient } = ctx;
  const email = await getEmail({ supabaseClient, req });

  if (typeof email !== "string") {
    return { status: INTERNAL_ERROR, message: SERVER_ERROR };
  }

  const { data, error } = await supabaseClient.from(SOLICITATION_ENTITY_NAME)
    .select().eq(
      "email",
      email,
    );

  if (error) {
    return { status: BAD_REQUEST, message: EMAIL_ERROR };
  }

  return (data as unknown as DataObjectSoliciation[])[0];
}

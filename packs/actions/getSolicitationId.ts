import type { AppContext } from "$store/apps/site.ts";
import { getEmail } from "$store/utils/cookies.ts";
import { INTERNAL_ERROR, SERVER_ERROR, NOT_FOUND, NOT_FOUND_ERROR, OK } from "$store/utils/enum.ts";
import {
  SOLICITATION_ENTITY_NAME,
} from "deco-sites/niivu-bank/packs/utils/constants.ts";

export default async function loader(
  _props: unknown,
  req: Request,
  ctx: AppContext,
) {
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
        return { status: NOT_FOUND, message: NOT_FOUND_ERROR }
    }

    return { status: OK, message: data[0].id_risk3 }
}

import commerce, { Props as CommerceProps } from "apps/commerce/mod.ts";
import { Section } from "deco/blocks/section.ts";
import type { App as A, AppContext as AC } from "deco/mod.ts";
import manifest, { Manifest } from "../manifest.gen.ts";
import { Secret } from "apps/website/loaders/secret.ts";
import { fetchSafe } from "apps/utils/fetch.ts";
import { ClientOf, createHttpClient } from "apps/utils/http.ts";
import creditAnalysis from "../packs/utils/creditAnalysis.ts";

export interface SupaBase {
  token?: string;
  url?: string;
}

/**
 * @title Configurações do Risk3
 */
export interface Risk3 {
  /**
   * @title Email
   * @description exemplo: "example@example.com"
   */
  username: Secret;

  /**
   * @title Senha
   */
  password: Secret;

  /**
   * @title URL
   * @description exemplo: https://express-api.risk3.live
   */
  url: string;

  /**
   * @title Produto
   * @description Qual o produto que será utilizado?
   * - express: Express
   * - express_light: Express Light
   */
  product: "express" | "express_light";

  /**
   * @title Cliente do Risk3
   * @ignore
   */
  clientRisk3: ClientOf<creditAnalysis>
}

export type Props = {
  theme?: Section;
  supaBase: SupaBase;
  risk3: Risk3;
} & CommerceProps;

export type App = ReturnType<typeof Site>;
export type AppContext = AC<App>;

export default function Site(
  { supaBase, risk3, theme, ...state }: Props,
): A<Manifest, Props, [ReturnType<typeof commerce>]> {
  const clientRisk3 = createHttpClient<creditAnalysis>({
    base:risk3.url,
    fetcher: fetchSafe,
  });

  const risk3ConfigsAndClient = {
    ...risk3,
    clientRisk3,
  };

  return {
    state: { supaBase, risk3: risk3ConfigsAndClient, theme, ...state },
    manifest,
    dependencies: [
      commerce({
        ...state,
        global: theme ? [...(state.global ?? []), theme] : state.global,
      }),
    ],
  };
}

export { onBeforeResolveProps } from "apps/website/mod.ts";

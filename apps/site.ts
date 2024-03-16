import commerce, { Props as CommerceProps } from "apps/commerce/mod.ts";
import { Section } from "deco/blocks/section.ts";
import type { App as A, AppContext as AC } from "deco/mod.ts";
import manifest, { Manifest } from "../manifest.gen.ts";
import { ClientOf, createHttpClient } from "apps/utils/http.ts";
import creditAnalysis from "../packs/utils/creditAnalysis.ts";
import type { Supabase } from "$store/loaders/supabase/supabaseConfig.ts";

/**
 * @title Configurações do Risk3
 */
export interface Risk3 {
  /**
   * @title Email
   * @description exemplo: "example@example.com"
   */
  username: string;

  /**
   * @title Senha
   */
  password: string;

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
  clientRisk3: ClientOf<creditAnalysis>;
}

/**
 * @title Configurações de envio de email
 */
export interface SendEmailConfig {
  /**
   * @title Chave da API
   * @description Chave da API do Brevo
   */
  apiKey: string;

  /**
   * @title Email da equipe Niivo
   * @description Email que envia os dados dos clientes para a equipe Niivo
   */
  emailNiivo: string;

  /**
   * @title Template ID, email para Equipe Niivo
   * @description ID do template de email que será enviado para a equipe Niivo com os dados do cliente aprovado
   */
  templateIdApprovedNiivo: string;

  /**
   * @title Template ID, Cliente aprovado
   * @description ID do template de email que será enviado para o cliente com análise de crédito aprovada
   */
  templateIdApproved: string;

  /**
   * @title Template ID, Cliente reprovado
   * @description ID do template de email que será enviado para o cliente com análise de crédito aprovada
   */
  templateIdReproved: string;
}

export type Props = {
  theme?: Section;
  supabaseClient: Supabase;
  risk3: Risk3;
  sendEmail: SendEmailConfig;
} & CommerceProps;

export type App = ReturnType<typeof Site>;
export type AppContext = AC<App>;

export default function Site(
  { supabaseClient, risk3, theme, sendEmail, ...state }: Props,
): A<Manifest, Props, [ReturnType<typeof commerce>]> {
  const clientRisk3 = createHttpClient<creditAnalysis>({
    base: risk3.url,
    headers: new Headers({ "accept": "application/json" }),
  });

  const risk3ConfigsAndClient = {
    ...risk3,
    clientRisk3,
  };

  return {
    state: {
      supabaseClient,
      risk3: risk3ConfigsAndClient,
      sendEmail,
      theme,
      ...state,
    },
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

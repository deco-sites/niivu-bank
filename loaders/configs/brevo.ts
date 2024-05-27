import { Secret } from "apps/website/loaders/secret.ts";
import { ClientOf, createHttpClient } from "apps/utils/http.ts";
import BrevoClient from "deco-sites/niivu-bank/packs/utils/createHTMLEmail.ts";

export interface Props {
  /**
   * @title Brevo Chave da API
   */
  apiKey: Secret;

  /**
   * @title Brevo URL
   */
  baseUrl: string;

  /**
   * @title Email da equipe Niivo
   * @description Email que envia os dados dos clientes para a equipe Niivo
   */
  emailNiivo: string;

  /**
   * @title Cliente do Brevo
   * @ignore
   */
  clientBrevo: ClientOf<BrevoClient>;
}

export interface BrevoConfig {
  emailNiivo: string;
  clientBrevo: ClientOf<BrevoClient>;
}

/**
 * @title Configurações de envio de email
 */
export default function loader(
  { apiKey, baseUrl, emailNiivo }: Props,
): BrevoConfig {
  const authToken = typeof apiKey === "string"
    ? apiKey
    : apiKey.get() as string;

  const clientBrevo = createHttpClient<BrevoClient>({
    base: baseUrl,
    headers: new Headers({
      "accept": "application/json",
      "api-key": authToken,
    }),
  });

  return {
    emailNiivo: emailNiivo,
    clientBrevo,
  };
}

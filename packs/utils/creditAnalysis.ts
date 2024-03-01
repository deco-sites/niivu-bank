import { ResponseRisk3 } from "deco-sites/niivu-bank/packs/types.ts";
import { Secret } from "apps/website/loaders/secret.ts";
import { ClientOf } from "apps/utils/http.ts";

export async function loginRisk3(
  usernameSecret: Secret,
  passwordSecret: Secret,
  clientRisk3: ClientOf<creditAnalysis>,
): Promise<AuthResponse> {
  const username = typeof usernameSecret === "string"
    ? usernameSecret
    : usernameSecret?.get();
  const password = typeof passwordSecret === "string"
    ? passwordSecret
    : passwordSecret?.get();

  const res = await clientRisk3["POST /api/v0/login"]({
    username: username ?? "api@lavorocredito.com.br",
    password: password ?? "Lavoro?Usu4r10@API"
  },{});

  return res.json();
}

export function logoutRisk3(clientRisk3: ClientOf<creditAnalysis>, authToken: string) {
   return clientRisk3["POST /api/v0/logout"]({}, {
    "Venidera-AuthToken": `Bearer ${ authToken }`
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

interface AuthResponse {
  status: "success" | "error";
  message: string;
  status_code: number;
  data: {
    username: string;
    organization: string;
    token: string;
  };
}

interface CreditAnalysisResponse{
  status: "success" | string;
  message: string;
  status_code: number;
  data: Records[]
}

interface Records{
  cpf?: string;
  cnpj?: string;
  status: string | "error";
  status_message: string;
  id?: string,
}

interface AnalysisRequestResponse {
  status: "success" | "error";
  message: string;
  status_code: number;
  data: {
    pessoa_fisica: {
      cpf: string;
      nome: string;
      data_de_nascimento: string;
      sexo: string;
      nome_da_mae: string;
      endereco: string;
      email: string;
      telefone: string;
    };
    data_da_solicitacao: string;
    data_da_finalizacao: string;
    data_de_validade: string;
    produto: string;
    status: string | "Concluída";
    solicitante: {
      email: string;
      organizacao: string;
      cnpj: string;
    };
    analise: {
      classificacao: string;
      resultado_da_analise: {
        score: string;
        alerta: string;
      };
      fatores_restricao: any[];
      calculos: {
        score_final: number;
        fator_de_alerta: number;
        bloco_restritivos: {
          nome: string;
          score: number;
          fator_de_alerta: number;
          indicador_restricao_cadastral: {
            nome: string;
            score: number;
            fator_de_alerta: number;
            metrica_obito: {
              nome: string;
              valor: string;
              enabled: boolean;
              score: string;
              fator_de_alerta: string;
            };
            metrica_situacao_regular_cpf: {
              nome: string;
              valor: string;
              enabled: boolean;
              score: string;
              fator_de_alerta: string;
            };
          };
        };
        bloco_cadastro_positivo: {
          nome: string;
          score: number;
          fator_de_alerta: number;
          indicador_cadastro_positivo: {
            nome: string;
            score: string;
            fator_de_alerta: string;
            metrica_score_quod: {
              nome: string;
              valor: string;
              enabled: boolean;
              score: string;
              fator_de_alerta: string;
            };
          };
        };
      };
    };
  };
}

export default interface creditAnalysis {
  "GET /version": {
    response: {
      version: string;
    };
  };
  "POST /api/v0/login": {
    response: AuthResponse;
    searchParams: {
      username: string;
      password: string;
    };
  };
  "POST /api/v0/logout": {
    headers: {
      "Venidera-AuthToken": string;
    };
  };
  "POST /api/v0/analises/cpf": {
    response: CreditAnalysisResponse;
    headers: {
      "Venidera-AuthToken": string;
    }
    body: {
      cpfs: string[];
    };
  };
  "POST /api/v0/analises": {
    response: CreditAnalysisResponse;
    headers: {
      "Venidera-AuthToken": string;
    }
    searchParams: {
      product: "express" | "express_light";
    };
    body: {
      cnpjs: string[];
    };
  };
  "GET /api/v0/analises/id/:solicitationId": {
    response: AnalysisRequestResponse;
    headers: {
      "Venidera-AuthToken": string;
    }
  };
}
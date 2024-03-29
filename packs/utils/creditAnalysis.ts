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

interface CreditAnalysisResponse {
  status: "success" | string;
  message: message;
  status_code: number;
  data: {
    statistics: {
      cpfs_requested: number;
      cpfs_duplicated: number;
      cpfs_inserted: number;
      cpfs_not_inserted: number;
    };
    records: Record[];
  };
}

type message =
  | string
  | "Value is not a valid email address"
  | "Usuário não cadastrado."
  | "Falha na autenticação. Token inválido."
  | "Autenticação necessária."
  | "Expecting value: line 2 column 12 (char 13)";

interface Record {
  cpf?: string;
  cnpj?: string;
  status: string | "error";
  status_message: string;
  id?: string;
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

export default interface CreditAnalysis {
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
    response: void;
    headers: {
      "Venidera-AuthToken": string;
    };
  };
  "POST /api/v0/analises/cpf": {
    response: CreditAnalysisResponse;
    headers: {
      "Venidera-AuthToken": string;
    };
    body: {
      cpfs: string[];
    };
  };
  "POST /api/v0/analises": {
    response: CreditAnalysisResponse;
    headers: {
      "Venidera-AuthToken": string;
    };
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
    };
  };
}

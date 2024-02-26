export interface ResponseRisk3 {
  status: string | "error";
  message: message;
  status_code?: number;
  data?: string;
}

type message =
  | string
  | "Value is not a valid email address"
  | "Usuário não cadastrado."
  | "Falha na autenticação. Token inválido."
  | "Autenticação necessária."
  | "Expecting value: line 2 column 12 (char 13)";

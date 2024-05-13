export const SOLICITATION_ENTITY_NAME = "solicitation";
export const SOLICITATION_FILD_ID_RISK = "id_risk3";

export const STATUS_ENUM_CREDIT_ANALYSIS = "Análise de Crédito";
export const STATUS_ENUM_ACCOUNT_OPENING = "Abertura de Conta";
export const STATUS_ENUM_RISK3_FAILED = "Reprovado RISK3";
export const STATUS_ENUM_SIGNATURE = "Assinatura";
export const STATUS_ENUM_ABLE = "Habilitado";
export const STATUS_ENUM_IN_OPERATION = "Em operação";
export const STATUS_ENUM_SUSPENDED = "Suspenso";
export const STATUS_ENUM_DISAPPROVED = "Reprovado";

export const RESPONSE_RISK3_APPROVED = "aprovado";

export const HEADER_AUTH_TOKEN = "Venidera-AuthToken";

export type StatusType =
  | "Análise de Crédito"
  | "Abertura de Conta"
  | "Reprovado RISK3"
  | "Assinatura"
  | "Habilitado"
  | "Em operação"
  | "Suspenso"
  | "Reprovado";

// TODO: Try to improve in deco this. The schema reader don't read enums
// export enum StatusEnum {
//   STATUS_ENUM_CREDIT_ANALYSIS,
//   STATUS_ENUM_ACCOUNT_OPENING,
//   STATUS_ENUM_RISK3_FAILED,
//   STATUS_ENUM_SIGNATURE,
//   STATUS_ENUM_ABLE,
//   STATUS_ENUM_IN_OPERATION,
//   STATUS_ENUM_SUSPENDED,
//   STATUS_ENUM_DISAPPROVED,
// }

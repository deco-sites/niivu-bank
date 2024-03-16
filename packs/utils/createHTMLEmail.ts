export interface CreditRequestData {
  nomeNegocio?: string;
  status: boolean;
  classificacaoAnalise: string;
  telefone: string;
  cidade: string;
  estado: string;
  nomeCompleto?: string;
  nome?: string;
  sobrenome?: string;
  rua: string;
  numero: number;
  complemento?: string;
  cep: string;
  email: string;
  cnpj?: string;
  cpf?: string;
  rg?: string;
}

interface EmailDetails {
  to: { email: string; name: string }[];
  templateId: string;
  param: CreditRequestData;
}

/**
 * Function that creates the body of the email to be sent based on the provided parameters.
 * @param {string} name - Name of the recipient.
 * @param {string} email - Email of the recipient.
 * @param {string} templateId - ID of the email template to be used.
 * @param {CreditRequestData} solicitationData - Data of the recipient.
 * @returns {EmailDetails} - Body of the email to be sent.
 */

export function createEmail(
  name: string,
  email: string,
  templateId: string,
  solicitationData: CreditRequestData,
): EmailDetails {
  return {
    to: [{ email, name }],
    templateId,
    param: solicitationData,
  };
}

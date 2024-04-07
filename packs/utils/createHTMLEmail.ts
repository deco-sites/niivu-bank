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

interface EmailRecipient {
  email: string;
  name: string;
}

interface MessageVersion {
  to: EmailRecipient[];
  params: CreditRequestData;
  subject?: string;
}

interface EmailBody {
  sender?: EmailRecipient;
  to: EmailRecipient[];
  subject?: string;
  params: CreditRequestData;
  htmlContent: string;
  messageVersions?: MessageVersion[];
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
  solicitationData: CreditRequestData,
): EmailBody {
  return {
    sender:{
      "email":"brevo@brevo.com",
      "name":"Brevo"
    },
    to: [{ email, name }],
    htmlContent:"<!DOCTYPE html><html><body><p>{{params.email}} {{params.nomeCompleto}} </p></body></html>",
    params: solicitationData,
  };
}

export default interface BrevoClient {
  "POST /v3/smtp/email": {
    response: unknown;
    body: EmailBody;
  };
}

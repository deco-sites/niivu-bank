import { AppContext } from "deco-sites/niivu-bank/apps/site.ts";
import {
  createEmail,
  CreditRequestData,
} from "deco-sites/niivu-bank/packs/utils/createHTMLEmail.ts";
import { BREVO_API_URL } from "deco-sites/niivu-bank/packs/utils/constants.ts";
interface EmailData {
  isApproved: boolean;
  email: string;
  name: string;
  fullName: string;
  lastName: string;
  param: CreditRequestData;
}
export default async function loader(
  props: EmailData,
  _req: unknown,
  ctx: AppContext,
) {
  try {
    console.info("init sendEmail");
    const {
      apiKey,
      emailNiivo,
      templateIdReproved,
      templateIdApproved,
      templateIdApprovedNiivo,
    } = ctx.sendEmail;
    const { isApproved, email, name, lastName, fullName, param } = props;

    const solicitationData: CreditRequestData = {
      nome: name,
      sobrenome: lastName,
      nomeCompleto: fullName,
      email,
      status: param.status,
      classificacaoAnalise: param.classificacaoAnalise,
      telefone: param.telefone,
      cidade: param.cidade,
      estado: param.estado,
      rua: param.rua,
      numero: param.numero,
      complemento: param.complemento,
      cep: param.cep,
      cnpj: param.cnpj,
      cpf: param.cpf,
      rg: param.rg,
    };

    if (!apiKey) {
      console.log("Chave de API não encontrada");
      return "email-credentials";
    }

    if (isApproved) {
      const approvedEmail = createEmail(
        name,
        email,
        templateIdApproved,
        solicitationData,
      );

      const bodyEmailForNiivo = createEmail(
        name,
        emailNiivo,
        templateIdApprovedNiivo,
        solicitationData,
      );

      const response = await fetch(BREVO_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
        body: JSON.stringify([approvedEmail, bodyEmailForNiivo]),
      });

      console.log("respond approved sendEmail status", response.status);
      return {
        status: response.status,
      };
    } else {
      const bodyEmail = createEmail(
        name,
        email,
        templateIdReproved,
        solicitationData,
      );

      const response = await fetch(BREVO_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
        body: JSON.stringify(bodyEmail),
      });

      console.log("respond repruve sendEmail status", response.status);
      return {
        status: response.status,
      };
    }
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return error + ctx.sendEmail;
  }
}

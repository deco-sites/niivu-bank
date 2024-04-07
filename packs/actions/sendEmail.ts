import { AppContext } from "deco-sites/niivu-bank/apps/site.ts";
import {
  createEmail,
  CreditRequestData,
} from "deco-sites/niivu-bank/packs/utils/createHTMLEmail.ts";

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
      clientBrevo,
    } = ctx.brevo;
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
        solicitationData,
      );

      const bodyEmailForNiivo = createEmail(
        name,
        emailNiivo,
        solicitationData,
      );

      const response = await clientBrevo["POST /v3/smtp/email"]({}, {
        body: approvedEmail,
      }).then((res) => res.json());

      const responseEmailNiivo = await clientBrevo["POST /v3/smtp/email"]({}, {
        body: bodyEmailForNiivo,
      }).then((res) => res.json());

      console.log("respond approved sendEmail status", {
        response,
        responseEmailNiivo,
      });
    } else {
      const bodyEmail = createEmail(
        name,
        email,
        solicitationData,
      );

      const response = clientBrevo["POST /v3/smtp/email"]({}, {
        body: bodyEmail,
      }).then((res) => res.json());

      console.log("respond reproved sendEmail status", { response });
    }
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return error;
  }
}

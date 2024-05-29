import { AppContext } from "deco-sites/niivu-bank/apps/site.ts";
import {
  createEmailHTML,
  CreditRequestData,
} from "deco-sites/niivu-bank/packs/utils/createHTMLEmail.ts";
import {
  ABLE_ACCOUNT,
  APPROVED_CREDIT,
  APPROVED_CUSTOMER,
  DISAPPROVED_CREDIT,
} from "deco-sites/niivu-bank/email-tamplate/MinifiedTemplates.ts";

interface EmailData {
  isApproved: boolean;
  isReproved: boolean;
  isAbleAccount: boolean;
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
      emailNiivo,
      clientBrevo,
    } = ctx.brevo;
    const {
      isApproved,
      isReproved,
      isAbleAccount,
      email,
      name,
      lastName,
      fullName,
      param,
    } = props;

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

    if (isApproved) {
      const approvedEmail = createEmailHTML(
        name,
        email,
        solicitationData,
        "Abertura de Conta - Documentação Necessária",
        {
          email: emailNiivo,
          name: "Niivo",
        },
        APPROVED_CREDIT,
      );

      const bodyEmailForNiivo = createEmailHTML(
        name,
        emailNiivo,
        solicitationData,
        "Cliente Aprovado",
        {
          email: emailNiivo,
          name: "Niivo",
        },
        APPROVED_CUSTOMER,
      );

      await clientBrevo["POST /v3/smtp/email"]({}, {
        body: approvedEmail,
      }).then((res) => res.json());

      await clientBrevo["POST /v3/smtp/email"]({}, {
        body: bodyEmailForNiivo,
      }).then((res) => res.json());
    } else if (isReproved) {
      const bodyEmail = createEmailHTML(
        name,
        email,
        solicitationData,
        "Credito Reprovado",
        {
          email: emailNiivo,
          name: "Niivo",
        },
        DISAPPROVED_CREDIT,
      );

      await clientBrevo["POST /v3/smtp/email"]({}, {
        body: bodyEmail,
      }).then((res) => res.json());
      console.log("Email send");
    } else if (isAbleAccount) {
      const bodyEmail = createEmailHTML(
        name,
        email,
        solicitationData,
        "Conta Habilitada - Niivo Bank",
        {
          email: emailNiivo,
          name: "Niivo",
        },
        ABLE_ACCOUNT,
      );

      await clientBrevo["POST /v3/smtp/email"]({}, {
        body: bodyEmail,
      }).then((res) => res.json());
      console.log("Email send");
    }
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return error;
  }
}

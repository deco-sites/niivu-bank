import { AppContext } from "deco-sites/niivu-bank/apps/site.ts";
import { createEmailApproved, createEmailRepruved } from "deco-sites/niivu-bank/packs/utils/createHTMLEmail.ts";
import { BREVO_API_URL } from "deco-sites/niivu-bank/packs/utils/constants.ts";
interface EmailData {
  isApproved: boolean;
  email: string;
  name: string;
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
    from,
    emailNiivo,
    subject
    } = ctx.sendEmail;
    const { isApproved, email, name } = props;

    if (!apiKey) {
      console.log("Chave de API não encontrada");
      return "email-credentials";
    }

    if(isApproved){
      const bodyEmail = createEmailApproved({
        name,
        email,
        sanderName: "Equipe Niivu Bank",
        subject,
        sanderEmail: from
      })
      const bodyEmailForNiivo = createEmailApproved({
        name,
        email,
        sanderName: "Equipe Niivu Bank",
        subject: "Solicitação de crédito aprovada para um cliente",
        sanderEmail: emailNiivo
      })


    const response = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify([bodyEmail, bodyEmailForNiivo]),
    });
    
    console.log("respond approved sendEmail status", response.status)
    return {
      status: response.status,
    }
    } else {
      const bodyEmail = createEmailRepruved({
        name,
        email,
        sanderName: "Equipe Niivu Bank",
        sanderEmail: from,
        subject: "Solicitação de crédito reprovada"
      })

    const response = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify(bodyEmail),
    });

    console.log("respond repruve sendEmail status", response.status)
    return {
      status: response.status,
    }
    }
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return error + ctx.sendEmail;
  }
}

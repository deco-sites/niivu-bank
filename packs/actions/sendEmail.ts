import { AppContext } from "deco-sites/niivu-bank/apps/site.ts";

export default async function loader(
  _props: unknown,
  req: unknown,
  ctx: AppContext,
) {
  try {
    // Obtendo a chave da API do Brevo do contexto
    const brevoApiKey = ctx.sendEmail;

    // Dados do email
    const emailData = {
      sender: { name: "John Doe", email: "celso@niivobank.com.br" },
      to: [{ email: "jonasdasilvajesus@outlook.com", name: "Jane Doe" }],
      subject: "Meu assunto",
      htmlContent:
        "<html><body><h1>Este é meu primeiro email transacional</h1></body></html>" +
        JSON.stringify(req),
      params: { subject: "Novo Assunto", parameter: "Meu valor de parâmetro" },
    };

    // Enviando a requisição para a API do Brevo
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": brevoApiKey,
      },
      body: JSON.stringify(emailData),
    });

    // Verificando se a requisição foi bem-sucedida
    if (!response.ok) {
      throw new Error(`Erro ao enviar email: ${response.statusText}`);
    }
    return "Email enviado com sucesso!" + ctx.sendEmail;
    console.log("Email enviado com sucesso!");
  } catch (error) {
    return error + ctx.sendEmail;
    console.error("Erro ao enviar email:", error);
  }
}

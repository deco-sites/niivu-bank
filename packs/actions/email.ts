import { AppContext } from "deco-sites/niivu-bank/apps/site.ts";
import { CONTACT } from "deco-sites/niivu-bank/email-tamplate/MinifiedTemplates.ts";
import {
  EmailData,
  replacePlaceholderWithHtmlList,
} from "deco-sites/niivu-bank/packs/utils/emailHandles.ts";

export default async function loader(
  props: EmailData,
  _req: unknown,
  ctx: AppContext,
) {
  const {
    emailNiivo,
    clientBrevo,
  } = ctx.brevo;

  const email = props?.email?.toString() ?? "";
  const name = props?.name?.toString() ?? "";
  try {
    return await clientBrevo["POST /v3/smtp/email"]({}, {
      body: {
        sender: {
          email,
          name,
        },
        messageVersions: [
          {
            to: [{ email: emailNiivo, name: "Niivo Bank" }],
          },
        ],
        subject: "NiivoBank - Contato",
        htmlContent: replacePlaceholderWithHtmlList(
          CONTACT,
          "{{ list }}",
          props,
        ),
      },
    }).then((res) => res.json());
  } catch (error) {
    console.error(error);
  }
}

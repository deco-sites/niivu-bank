import Divider from "$store/components/ui/Divider.tsx";
import ContactForm, {
  Inputs,
  Select,
  WarningConsent,
} from "site/components/contact/Form.tsx";

interface Modal {
  /**
   * @title Texto do modal
   * @description Texto que aparece no modal quando o email é enviado
   * @format rich-text
   */
  richText: string;
  /**
   * @title Label do botão do modal
   */
  buttonLabel: string;
}
interface Props {
  /**
   * @title Titulo do formulario de contato
   */
  title: string;

  /** @title Caixas de seleções */
  select?: Select;

  /**
   * @title Label dos inputs
   */
  inputs: Inputs;

  /**
   * @title Titulo do formulario de contato
   */
  warningConsent?: WarningConsent;


  modal: Modal;
}

export default function Contact(
  { title, warningConsent, inputs, select, modal }: Props,
) {
  return (
    <div class="container px-4">
      <p class="font-bold py-2">
        <span class="font-bold py-2">{title}</span>
      </p>
      <Divider />
      <div class="py-8">
        <ContactForm
          inputs={inputs}
          select={select}
          buttonLabel={warningConsent?.buttonLabel}
          disclaimerText={warningConsent?.disclaimerText ?? ""}
          modalRichText={modal.richText}
          modalButtonLabel={modal.buttonLabel}
        />
      </div>
    </div>
  );
}

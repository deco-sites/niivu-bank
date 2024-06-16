import Divider from "$store/components/ui/Divider.tsx";
import ContactForm, {
  Inputs,
  Select,
  WarningConsent,
} from "deco-sites/niivu-bank/components/contact/Form.tsx";

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
}

export default function Contact(
  { title, warningConsent, inputs, select }: Props,
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
        />
      </div>
    </div>
  );
}

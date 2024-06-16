import Divider from "$store/components/ui/Divider.tsx";
import ContactForm, {
  Inputs,
  WarningConsent,
} from "deco-sites/niivu-bank/components/contact/Form.tsx";

interface Props {
  /**
   * @title Titulo do formulario de contato
   */
  title: string;

  /**
   * @title Label dos inputs
   */
  inputs: Inputs;

  /**
   * @title Titulo do formulario de contato
   */
  warningConsent?: WarningConsent;
}

export default function Contact({ title, warningConsent, inputs }: Props) {
  console.log(title, warningConsent, inputs);
  return (
    <div class="w-full px-4">
      <p class="font-bold py-2">
        <span class="font-bold py-2">{title}</span>
      </p>
      <Divider />
      <div class="py-8">
        <ContactForm
          inputs={inputs}
          buttonLabel={warningConsent?.buttonLabel}
          disclaimerText={warningConsent?.disclaimerText ?? ""}
        />
      </div>
    </div>
  );
}

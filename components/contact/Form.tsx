import WarningConsent from "deco-sites/niivu-bank/components/solicitation/WarningConsent.tsx";
import { Input } from "deco-sites/niivu-bank/components/ui/inputs/index.tsx";
import PhoneFormatter from "deco-sites/niivu-bank/components/solicitation/Phone.tsx";
import Checkbox from "deco-sites/niivu-bank/components/daisy/Checkbox.tsx";

interface Props {
  title?: string;
  inputs: Inputs;
  disclaimerText: string;
  buttonLabel?: string;
}

export interface Checkboxes {
  /**
   * @title Label do Caixa de seleção
   */
  label?: string;
}

/**
 * @title Label dos inputs
 */
export interface Inputs {
  /**
   * @title Caixas de seleções
   */
  checkboxes?: Checkboxes[];
  /** @title Nome */
  name?: string;
  /** @title Telefone */
  phone?: string;
  email?: string;
  /** @title Setor de atuação */
  industry?: string;
  /** @title Nome da empresa */
  companyName?: string;
  /** @title Site da empresa */
  companyWebsite?: string;
}

export interface WarningConsent {
  /**
   * @title Descrição
   */
  disclaimerText: string;

  /**
   * @title Texto do botão
   */
  buttonLabel?: string;
}

export default function ContactForm(
  { disclaimerText, buttonLabel, inputs }: Props,
) {
  return (
    <form onSubmit={() => {}} method="POST">
      <div class="space-y-4">
        <div class="flex flex-wrap min-w-min gap-4">
          {inputs?.checkboxes &&
            inputs.checkboxes.map((checkbox) => (
              <div class="flex items-start gap-4">
                <input
                  class="checkbox checkbox-primary checkbox-md border-[3px]"
                  type="checkbox"
                  name={checkbox.label}
                />
                <span class="font-normal">
                  {checkbox.label}
                </span>
              </div>
            ))}
        </div>
        <Input.Root>
          <Input.Label label="Nome" class="mb-2" />
          <Input.Base
            name="name"
            type="text"
            placeholder={inputs?.name}
          />
        </Input.Root>
        <div class=" md:flex gap-4">
          <Input.Root class="w-full">
            <Input.Label label={"E-mail"} class="mb-2" />
            <Input.Base
              name="email"
              type="email"
              placeholder={inputs?.email}
            />
          </Input.Root>
          <Input.Root class="w-full">
            <Input.Label label="Setor de atuação" class="mb-2" />
            <Input.Base
              name="Industry"
              type="text"
              placeholder={inputs?.industry}
            />
          </Input.Root>
        </div>
        <div class=" md:flex gap-4">
          <Input.Root class="w-full">
            <Input.Label label="Nome da empresa" class="mb-2" />
            <Input.Base
              name="companyName"
              type="text"
              placeholder={inputs?.companyName}
            />
          </Input.Root>
          <Input.Root class="w-full">
            <Input.Label label="Site da empresa" class="mb-2" />
            <Input.Base
              name="companyWebsite"
              type="text"
              placeholder={inputs?.companyWebsite}
            />
          </Input.Root>
        </div>
        <PhoneFormatter
          placeholder={inputs?.phone ?? ""}
        />
        <Input.Root>
          <Input.Label label="Descrição" class="mb-2" />
          <textarea name="message" class="input w-full"></textarea>
        </Input.Root>
        <WarningConsent
          disclaimerText={disclaimerText}
          buttonLabel={buttonLabel}
        />
      </div>
    </form>
  );
}

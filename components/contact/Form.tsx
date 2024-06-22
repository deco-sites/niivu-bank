import WarningConsent from "deco-sites/niivu-bank/components/solicitation/WarningConsent.tsx";
import { Input } from "deco-sites/niivu-bank/components/ui/inputs/index.tsx";
import PhoneFormatter from "deco-sites/niivu-bank/components/solicitation/Phone.tsx";
import { JSX } from "preact";
import { invoke } from "deco-sites/niivu-bank/runtime.ts";
import { EmailData } from "deco-sites/niivu-bank/packs/utils/emailHandles.ts";
import { useId } from "deco-sites/niivu-bank/sdk/useId.ts";

interface Props {
  title?: string;
  select?: Select;
  inputs: Inputs;
  disclaimerText: string;
  buttonLabel?: string;
  modalRichText: string;
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
  /**
   * @title Caixas de seleções
   */
  checkboxes?: Checkboxes[];
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

export interface Select {
  /**
   * @title Label do select
   */
  label?: string;

  /**
   * @title Valor padrão do select
   */
  fistOption?: string;
  options: string[];
}
export function getFormValues(event: Event): EmailData {
  const target = event.target as HTMLFormElement;
  const elements = target.elements as HTMLFormControlsCollection;
  const values: EmailData = {};

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i] as
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement;
    //@ts-ignore html type error
    const { name, type, value, checked, options } = element;

    if (type === "checkbox") {
      values[name] = checked;
    } else if (type === "select-multiple") {
      const selectedOptions = [];
      for (let j = 0; j < options.length; j++) {
        if (options[j].selected && options[j].value !== "") {
          selectedOptions.push(options[j].value);
        }
      }
      values[name] = selectedOptions;
    } else {
      if (name && value !== "") {
        values[name] = value;
      }
    }
  }

  return values;
}

const Modal = ({ id, richText }: { id: string, richText: string; }) => {
  return (
    <>
      <input type="checkbox" id={id} className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <div dangerouslySetInnerHTML={{ __html: richText }} />
          <div className="modal-action">
            <label htmlFor={id} className="btn btn-primary text-xl text-white">Close!</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default function ContactForm(
  { disclaimerText, buttonLabel, inputs, select, modalRichText }: Props,
) {
  const id = useId()
  const submit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formValues = getFormValues(e);
    await invoke({
      key: "deco-sites/niivu-bank/loaders/actions/email.ts",
      props: {
        ...formValues,
      },
    });
    const input = document.getElementById(id) as HTMLInputElement
    input!.checked = true
  };

  return (
    <form onSubmit={submit} method="POST">
      <div class="space-y-4">
        {select?.label && (
          <Input.Root>
            <Input.Label label={select?.label} class="mb-2" />
            <select name="selectField" className="select w-full input">
              {select?.fistOption && (
                <option disabled selected>{select?.fistOption}</option>
              )}
              {select.options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </Input.Root>
        )}
        <Input.Root>
          <Input.Label label="Nome" class="mb-2" />
          <Input.Base
            name="name"
            type="text"
            placeholder={inputs?.name ?? ""}
          />
        </Input.Root>
        <div class=" md:flex space-y-4 md:space-y-0 md:gap-4 gap-0">
          <Input.Root class="w-full mt-4 md:mt-0">
            <Input.Label label={"E-mail"} class="mb-2" />
            <Input.Base
              name="email"
              type="email"
              placeholder={inputs?.email ?? ""}
            />
          </Input.Root>
          <Input.Root class="w-full">
            <Input.Label label="Setor de atuação" class="mb-2" />
            <Input.Base
              name="Industry"
              type="text"
              placeholder={inputs?.industry ?? ""}
            />
          </Input.Root>
        </div>
        <div class=" md:flex space-y-4 md:space-y-0 md:gap-4 gap-0">
          <Input.Root class="w-full">
            <Input.Label label="Nome da empresa" class="mb-2" />
            <Input.Base
              name="companyName"
              type="text"
              placeholder={inputs?.companyName ?? ""}
            />
          </Input.Root>
          <Input.Root class="w-full">
            <Input.Label label="Site da empresa" class="mb-2" />
            <Input.Base
              name="companyWebsite"
              type="text"
              placeholder={inputs?.companyWebsite ?? ""}
            />
          </Input.Root>
        </div>
        <PhoneFormatter
          placeholder={inputs?.phone ?? ""}
        />
        {inputs?.checkboxes && (inputs?.checkboxes?.length > 0) && (
          <div class="flex flex-wrap min-w-min md:gap-4 gap-0">
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
        )}
        <Input.Root>
          <Input.Label label="Descrição" class="mb-2" />
          <textarea name="message" class="input w-full h-36"></textarea>
        </Input.Root>
        <WarningConsent
          disclaimerText={disclaimerText}
          buttonLabel={buttonLabel}
        />
        <Modal id={id} richText={modalRichText} />
      </div>
    </form>
  );
}

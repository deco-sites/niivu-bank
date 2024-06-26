import AddressForm from "$store/components/solicitation/AddressForm.tsx";
import Form from "$store/islands/Form.tsx";
import TabList from "$store/components/solicitation/TabList.tsx";
import WarningConsent from "$store/components/solicitation/WarningConsent.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { AppContext } from "deco-sites/niivu-bank/apps/site.ts";
import { useRef } from "preact/hooks";
import CorporationForm from "deco-sites/niivu-bank/islands/CorporationForm.tsx";
import PersonalForm from "deco-sites/niivu-bank/islands/PersonalForm.tsx";

/**
 * @titleBy alt
 */
export interface Banner {
  /**
   * @description A largura da imagem é 496px
   */
  image: ImageWidget;
  /** @title Altura da Imagem */
  height: number;
  alt: string;
}

export interface Input {
  placeholder?: string;
  /**
   * We need to pass another prop because admin don't read object.oneKey. In this case just render the "oneKey".
   * @hide
   */
  test?: "sou um bug";
}
export interface Inputs {
  /** @title Nome */
  name: Input;
  cpf: Input;
  RG: Input;
  /** @title Telefone */
  phone: Input;
  email: Input;
  cep: Input;
  /** @title Rua / Avenida */
  street: Input;
  /** @title Número */
  number: Input;
  /** @title Complemento */
  complement: Input;
  /** @title Cidade */
  city: Input;
  /** @title Estado */
  state: Input;
  /** @title Razão Social */
  corporateReason: Input;
  cnpj: Input;
}

export interface Props {
  /**
   * @title Título
   */
  title: string;

  /** @title Subtítulo */
  subtitle: string;

  /**
   * @format html
   * @title Texto de Aviso
   */
  disclaimerText: string;
  banners?: Banner[];
  inputs?: Inputs;
  successLink: string;
  /**
   * @hide
   */
  type?: "CPF" | "CNPJ";
}

export function loader(props: Props, _req: Request, ctx: AppContext) {
  const stepsDesk = ["1. Preencha a solicitação", "2. Aguarde nossa análise"];
  const stepsMobile = ["1. Solicitação", "2. Análise"];
  return {
    ...props,
    steps: ctx.device === "desktop" ? stepsDesk : stepsMobile,
    type: props.type ?? "CPF",
    isDesktop: ctx.device === "desktop",
  };
}

function Solicitation(
  {
    steps,
    title,
    subtitle,
    disclaimerText,
    banners,
    isDesktop,
    type,
    successLink,
    inputs,
  }: ReturnType<
    typeof loader
  >,
) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div class="container flex lg:flex-row gap-10 pt-6 pb-16">
      <div class="flex flex-col gap-4 w-full">
        {/** breadcrump */}
        <div class="flex gap-2">
          {steps.map((step, index) => (
            <p>
              <span class={`${index === 0 && "font-bold"} text-sm`}>
                {step}
              </span>
            </p>
          ))}
        </div>
        <div class="flex flex-col gap-2 text-primary">
          <p class="font-normal max-md:text-lg max-md:left-5 text-3xl left-9">
            <span>{title}</span>
          </p>
          <p class="font-bold max-md:text-xs max-md:left-4 text-base left-5">
            <span>{subtitle}</span>
          </p>
        </div>
        <Form type={type} successLink={successLink} formRef={formRef}>
          <TabList type={type} />
          <PersonalForm inputs={inputs} />
          <AddressForm formRef={formRef} inputs={inputs} />
          {type === "CNPJ" && (
            <CorporationForm formRef={formRef} inputs={inputs} />
          )}
          <WarningConsent disclaimerText={disclaimerText} buttonSize="w-72" />
        </Form>
      </div>
      {banners?.length && isDesktop && (
        <div class="flex flex-col gap-4 max-lg:hidden shrink-0">
          {banners.map(({ alt, image, height }) => (
            <Image src={image} width={496} height={height} alt={alt} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Solicitation;

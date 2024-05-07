import { ImageWidget } from "apps/admin/widgets.ts";
import Step from "./Step.tsx";
import { AppContext } from "deco-sites/niivu-bank/apps/site.ts";
import { SectionProps } from "deco/mod.ts";
import Navbar from "deco-sites/niivu-bank/components/header/Navbar.tsx";
import {
  DataObjectSoliciation,
  Error,
} from "deco-sites/niivu-bank/packs/solicitation/getDetails.ts";
import { INTERNAL_ERROR } from "deco-sites/niivu-bank/utils/enum.ts";
import DropdownContainer from "deco-sites/niivu-bank/components/header/dropdown/Container.tsx";
import { useId } from "deco-sites/niivu-bank/sdk/useId.ts";

export interface IStep {
  /** @title Título */
  title: string;

  /**
   * @title É o Atual?
   * @description Esse campo deve ser selecionado apenas uma vez em um dos passos. Ele Vai definir em que etapa o usuário inicia.
   */
  isCurrent?: boolean;
}

/** @titleBy label */
export interface Url {
  label: string;
  url: string;
}

/**
 * @title Imagem do header
 */
export interface Logo {
  /**
   * @description Imagem para tela pequena
   */
  desk: ImageWidget;
  /** @description Imagem para tela grande*/
  mobile: ImageWidget;
  /** @description Descrição da imagem  */
  alt: string;
}

export interface Props {
  /** @description (150px)x(45px) */
  logo: Logo;
  urls: Url[];
  /** @ignore */
  steps?: IStep[];

  /**
   * @title mostrar o step?
   * @description Se o usuário está logado e a solicitação foi enviada, o step é mostrado
   */
  showStep?: boolean;

  /** @title Mostrar os itens de navegação */
  showNavItems?: boolean;

  solicitation: DataObjectSoliciation | Error;
}

export type UserData = null | {
  name?: string;
  email?: string;
  solicitation: string | null;
};

export function loader(props: Props, req: Request, ctx: AppContext) {
  const { pathname } = new URL(req.url);

  const data = {
    ...props,
    isDesktop: ctx.device === "desktop",
    isLogged: true,
    pathname,
    isSolicitationSend: false,
    userData: null as UserData,
  };
  const statusMessage = props.solicitation.status;

  if (typeof statusMessage !== "string") {
    if (statusMessage === INTERNAL_ERROR) {
      data.isLogged = false;
    }
    data.userData = null;
    return data;
  }

  const solicitation = props.solicitation as DataObjectSoliciation;
  const userName = solicitation?.full_name?.split(" ");
  data.isSolicitationSend = !!solicitation?.id_risk3;

  data.userData = {
    name: `${userName?.[0]} ${userName?.[userName.length - 1]}`,
    email: solicitation.email,
    solicitation: solicitation?.id_risk3,
  };

  return data;
}

function Header(
  {
    logo,
    steps,
    urls,
    isDesktop,
    pathname,
    isLogged,
    userData,
    showNavItems = true,
    showStep = false,
    isSolicitationSend,
  }: SectionProps<typeof loader>,
) {
  const statusIndex = isSolicitationSend
    ? steps?.length! - 1
    : steps?.findIndex((step) => step.isCurrent);
  const id = useId();

  return (
    <header>
      <DropdownContainer id={id}>
        <div class="w-full border-b border-base-300 max-lg:border-[#E5E5E5] max-lg:h-16 h-28">
          <Navbar
            id={id}
            menu={{ urls, isLogged }}
            showNavItems={showNavItems}
            logo={logo}
            steps={steps}
            urls={urls}
            statusIndex={statusIndex ?? 0}
            pathname={pathname}
            isLogged={isLogged}
            userData={userData}
            showStep={showStep}
            isDesktop={isDesktop}
          />
        </div>
      </DropdownContainer>
      {!isDesktop && showStep && (
        <ul class="timeline max-lg:w-full mx-auto">
          {steps?.map((props, index, array) => (
            <Step
              {...props}
              index={index}
              isLastStep={index === array.length - 1}
              statusIndex={statusIndex ?? 0}
            />
          ))}
        </ul>
      )}
    </header>
  );
}

export default Header;

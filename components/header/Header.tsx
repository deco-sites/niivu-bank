import { ImageWidget } from "apps/admin/widgets.ts";
import Step from "./Step.tsx";
import { AppContext } from "deco-sites/niivu-bank/apps/site.ts";
import { validateCookie } from "deco-sites/niivu-bank/utils/cookies.ts";
import { SectionProps } from "deco/mod.ts";
import { SOLICITATION_ENTITY_NAME } from "deco-sites/niivu-bank/packs/utils/constants.ts";
import Drawers from "deco-sites/niivu-bank/components/header/Drawer.tsx";
import Navbar from "deco-sites/niivu-bank/components/header/Navbar.tsx";

export interface IStep {
  /** @title Título */
  title: string;

  /**
   * @title É o Atual?
   * @description Esse campo deve ser selecionado apenas uma vez em um dos passos. Ele Vai definir em que etapa o usuário está.
   */
  isCurrent?: boolean;
}

/** @titleBy label */
export interface Url {
  label: string;
  url: string;
}

export interface Logo {
  desk: ImageWidget;
  mobile: ImageWidget;
  alt: string;
}

export interface Props {
  /** @description (150px)x(45px) */
  logo: Logo;
  urls: Url[];
  /** @ignore */
  steps?: IStep[];
}

export async function loader(props: Props, req: Request, ctx: AppContext) {
  const { pathname } = new URL(req.url);
  const { supabaseClient } = ctx;
  const authUserData = await validateCookie({ supabaseClient, req });
  const isLogged = authUserData.isValid;
  const { data: solicitationData, error } = await supabaseClient.from(
    SOLICITATION_ENTITY_NAME,
  )
    .select().eq(
      "email",
      authUserData.email,
    );
  const solicitation = solicitationData?.[0];
  const isSolicitationSend = !!solicitation?.id_risk3;
  const userName = solicitation?.full_name?.split(" ");
  const userData = {
    name: `${userName?.[0]} ${userName?.[userName.length - 1]}`,
    email: authUserData.email,
    solicitation: solicitation?.id_risk3,
  };

  return {
    ...props,
    isDesktop: ctx.device === "desktop",
    pathname,
    isLogged,
    userData,
    isSolicitationSend,
  };
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
    isSolicitationSend,
  }: SectionProps<typeof loader>,
) {
  const statusIndex = isSolicitationSend
    ? steps?.length! - 1
    : steps?.findIndex((step) => step.isCurrent);
  return (
    <header>
      <Drawers
        menu={{ urls }}
      >
        <div class="w-full border-b border-base-300 max-lg:border-[#E5E5E5] max-lg:h-16 h-28">
          <Navbar
            logo={logo}
            steps={steps}
            urls={urls}
            statusIndex={statusIndex ?? 0}
            isDesktop={isDesktop}
            pathname={pathname}
            isLogged={isLogged}
            userData={userData}
            isSolicitationSend={isSolicitationSend}
          />
        </div>
      </Drawers>
      {!isDesktop && isLogged && isSolicitationSend &&
        pathname?.includes("/minha-conta/solicitacao") && (
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

import { ImageWidget } from "apps/admin/widgets.ts";
import Step from "./Step.tsx";
import { AppContext } from "deco-sites/niivu-bank/apps/site.ts";
import NavBar from "deco-sites/niivu-bank/components/header/Navbar.tsx";

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
  urls?: Url[];
  steps?: IStep[];
}

export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  return { ...props, isDesktop: ctx.device === "desktop" };
};

function Header({ logo, steps, urls, isDesktop }: ReturnType<typeof loader>) {
  const statusIndex = steps?.findIndex(({ isCurrent }) => isCurrent);
  return (
    <header>
      <div class="w-full border-b border-[#F4F4F4] max-lg:border-[#E5E5E5] max-lg:h-16 h-28">
        <NavBar
          logo={logo}
          steps={steps}
          urls={urls}
          statusIndex={statusIndex ?? 0}
          isDesktop={isDesktop}
        />
      </div>
      {!isDesktop && (
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

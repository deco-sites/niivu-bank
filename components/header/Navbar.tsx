import {
  IStep,
  Logo,
  Url,
} from "deco-sites/niivu-bank/components/header/Header.tsx";
import Image from "apps/website/components/Image.tsx";
import Step from "deco-sites/niivu-bank/components/header/Step.tsx";
import Button from "deco-sites/niivu-bank/components/ui/Button.tsx";
import NavItem from "deco-sites/niivu-bank/components/header/NavItem.tsx";
import Icon from "deco-sites/niivu-bank/components/ui/Icon.tsx";
import UserInfo from "deco-sites/niivu-bank/components/ui/UserInfo.tsx";
import ButtonLogout from "deco-sites/niivu-bank/islands/ButtonLogout.tsx";
import MenuButton from "deco-sites/niivu-bank/components/header/MenuButton.tsx";

export interface Props {
  /** @description (150px)x(45px) */
  logo: Logo;
  urls?: Url[];
  steps?: IStep[];
  statusIndex: number;
  isDesktop: boolean;
  pathname: string;
  isLogged: boolean;
  userData: {
    name: string;
    email?: string;
    solicitation: string;
  };
  isSolicitationSend: boolean;
}

function Navbar(
  {
    logo,
    steps,
    statusIndex,
    isDesktop,
    urls,
    pathname,
    isLogged,
    isSolicitationSend,
    userData,
  }: Props,
) {
  const isLoggedAndSolicitationSend = isLogged && isSolicitationSend;
  const isLoggedAndNotSolicitationSend = isLogged && !isSolicitationSend;

  const showButtonLogout = isLoggedAndNotSolicitationSend &&
    pathname === "/minha-conta/solicitacao";
  const showUserInfoAndMenu = isLoggedAndSolicitationSend &&
    pathname.includes("/minha-conta");
  const showStep = isLoggedAndSolicitationSend &&
    pathname.includes("/minha-conta/solicitacao");

  return (
    <div class="container h-full flex items-center justify-between text-center">
      {isDesktop && (
        <Image src={logo.desk} width={212} height={63} class="md:mb-6" />
      )}
      {!isDesktop && <Image src={logo.mobile} width={150} height={45} />}
      {!showButtonLogout && showStep &&
        (
          <ul class="timeline max-lg:hidden mx-auto">
            {steps?.map((props, index, array) => (
              <Step
                {...props}
                index={index}
                isLastStep={index === array.length - 1}
                statusIndex={statusIndex}
              />
            ))}
          </ul>
        )}
      {!showStep && showButtonLogout && (
        <ul class="hidden md:flex items-center w-full pl-28 gap-12">
          {urls?.map((item) => <NavItem item={item} />)}
        </ul>
      )}
      {!isLogged && (
        <a href={`/entrar`}>
          <Button class="flex items-center max-h-9 w-24 btn-sm btn-outline btn-secondary text-base px-0">
            <Icon id="User" width={20} height={24} />
            Entrar
          </Button>
        </a>
      )}
      {!showButtonLogout && showUserInfoAndMenu &&
        (
          <div class="hidden w-40 h-full md:flex items-center justify-end">
            <UserInfo userName={userData.name} />
          </div>
        )}
      {!showUserInfoAndMenu && showButtonLogout &&
        (
          <div class="w-40 h-full flex items-center justify-end">
            <ButtonLogout />
          </div>
        )}
      {showButtonLogout && <MenuButton />}
    </div>
  );
}

export default Navbar;

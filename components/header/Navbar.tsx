import {
  IStep,
  Logo,
  Url,
} from "deco-sites/niivu-bank/components/header/Header.tsx";
import Step from "deco-sites/niivu-bank/components/header/Step.tsx";
import NavItem from "deco-sites/niivu-bank/components/header/NavItem.tsx";
import MenuButton from "deco-sites/niivu-bank/components/header/MenuButton.tsx";
import { UserHandle } from "deco-sites/niivu-bank/components/header/UserHandle.tsx";
import {
  PATH_MY_ACCOUT,
  PATH_SOLICITATION,
  PATH_SOLICITATION_SUCCESS,
} from "deco-sites/niivu-bank/components/header/Constants.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

export interface Props {
  /** @description (150px)x(45px) */
  logo: Logo;
  urls?: Url[];
  steps?: IStep[];
  statusIndex: number;
  pathname: string;
  isLogged: boolean;
  userData: {
    name: string;
    email?: string;
    solicitation: string;
  };
  isSolicitationSend: boolean;
  showStep: boolean;
  isDesktop: boolean;
}

function Navbar(
  {
    logo,
    steps,
    statusIndex,
    urls,
    pathname,
    isLogged,
    isSolicitationSend,
    userData,
    showStep,
    isDesktop,
  }: Props,
) {
  const showLogoutButton = isDesktop && isLogged && !isSolicitationSend &&
      pathname === PATH_SOLICITATION ||
    pathname === PATH_MY_ACCOUT && isDesktop;
  const showMenu = pathname === PATH_MY_ACCOUT ||
    pathname === PATH_SOLICITATION || pathname === "/" ||
    pathname.includes(PATH_SOLICITATION_SUCCESS);
  const showUserInfo = isLogged && isSolicitationSend && (
    pathname.includes(PATH_SOLICITATION) || pathname === "/"
  );

  return (
    <div class="container h-full flex items-center justify-between text-center">
      <a href="/">
        <Picture preload>
          <Source
            src={logo.mobile}
            width={150}
            height={45}
            media="(max-width: 767px)"
          />
          <Source
            src={logo.desk}
            width={212}
            height={63}
            class="md:mb-6"
            media="(min-width: 767px)"
          />
          <img src={logo.desk} alt={logo.alt ?? "Niivo Logo Preta Mobile"} />
        </Picture>
      </a>
      {showStep &&
        (
          <ul class="timeline max-lg:hidden mt-6">
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
      {!showStep && showMenu && (
        <ul class="hidden md:flex items-center w-full pl-28 gap-12">
          {urls?.map((item) => <NavItem item={item} />)}
        </ul>
      )}
      <UserHandle
        isLogged={isLogged}
        showUserInfo={showUserInfo}
        showButtonLogout={showLogoutButton}
        userName={userData.name}
      />
      {!isDesktop && showMenu && <MenuButton />}
    </div>
  );
}

export default Navbar;

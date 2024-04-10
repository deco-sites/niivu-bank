import {
  IStep,
  Logo,
  Url,
} from "deco-sites/niivu-bank/components/header/Header.tsx";
import Image from "apps/website/components/Image.tsx";
import Step from "deco-sites/niivu-bank/components/header/Step.tsx";
import Button from "deco-sites/niivu-bank/components/ui/Button.tsx";
import NavItem from "deco-sites/niivu-bank/components/header/NavItem.tsx";
import MenuButton from "deco-sites/niivu-bank/components/header/MenuButton.tsx";
import { UserHandle } from "deco-sites/niivu-bank/components/header/UserHandle.tsx";
import {
  PATH_MY_ACCOUT,
  PATH_SOLICITATION,
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
  }: Props,
) {
  const showLogoutButton =
    isLogged && !isSolicitationSend && pathname === PATH_SOLICITATION ||
    pathname === PATH_MY_ACCOUT;
  const showMenu = pathname === PATH_MY_ACCOUT ||
    pathname === PATH_SOLICITATION || pathname === "/";
  const showUserInfo = isLogged && isSolicitationSend &&
    pathname.includes(PATH_SOLICITATION);
  const showStep = isLogged && isSolicitationSend &&
    pathname.includes(PATH_SOLICITATION);

  return (
    <div class="container h-full flex items-center justify-between text-center">
      <Picture preload>
        <Source
          src={logo.mobile}
          width={150}
          height={45}
          media="(max-width: 767px)"
        />
        <Source
          src={logo.desk}
          width={306}
          height={92}
          class="md:mb-6"
          media="(min-width: 767px)"
        />
        <img src={logo.desk} alt={logo.alt ?? "Niivo Logo Preta Mobile"} />
      </Picture>
      {!showLogoutButton && showStep &&
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
      {showMenu && <MenuButton />}
    </div>
  );
}

export default Navbar;

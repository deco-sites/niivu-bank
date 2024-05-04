import {
  IStep,
  Logo,
  Url,
} from "deco-sites/niivu-bank/components/header/Header.tsx";
import Step from "deco-sites/niivu-bank/components/header/Step.tsx";
import NavItem from "deco-sites/niivu-bank/components/header/NavItem.tsx";
import { UserHandle } from "deco-sites/niivu-bank/components/header/UserHandle.tsx";
import {
  PATH_MY_ACCOUNT,
  PATH_SOLICITATION,
  PATH_SOLICITATION_SUCCESS,
} from "deco-sites/niivu-bank/components/header/Constants.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { UserData } from "deco-sites/niivu-bank/components/header/Header.tsx";
import Menu, { Props as MenuProps } from "deco-sites/niivu-bank/components/header/Menu.tsx";
import DropDownButton from "deco-sites/niivu-bank/components/header/dropdown/Button.tsx";
import DropdownContent from "deco-sites/niivu-bank/components/header/dropdown/Content.tsx";
import Icon from "deco-sites/niivu-bank/components/ui/Icon.tsx";

export interface Props {
  /** @description (150px)x(45px) */
  logo: Logo;
  urls?: Url[];
  steps?: IStep[];
  showNavItems?: boolean;
  statusIndex: number;
  pathname: string;
  isLogged: boolean;
  userData: UserData;
  showStep: boolean;
  isDesktop: boolean;
  id: string;
  menu: MenuProps;
}

function Navbar(
  {
    logo,
    steps,
    showNavItems,
    statusIndex,
    urls,
    pathname,
    isLogged,
    userData,
    showStep,
    isDesktop,
    id,
    menu
  }: Props,
) {
  const isHomePage = pathname === "/";
  const isSolicitationPage = pathname === PATH_SOLICITATION;
  const isMyAccountPage = pathname === PATH_MY_ACCOUNT;

  const showLogoutButton = isDesktop && isLogged && isMyAccountPage;
  const showMenu = isMyAccountPage ||
    isSolicitationPage || isHomePage ||
    pathname.includes(PATH_SOLICITATION_SUCCESS);
  const showUserInfo = isLogged && isDesktop && !isMyAccountPage;

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
      {isDesktop && showStep &&
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
      {showMenu && showNavItems && (
        <ul class="hidden md:flex items-center w-full pl-28 gap-12">
          {urls?.map((item) => <NavItem item={item} />)}
        </ul>
      )}
      <UserHandle
        isLogged={isLogged}
        showUserInfo={showUserInfo}
        showButtonLogout={showLogoutButton}
        userName={userData?.name}
      />
      {!isDesktop && showMenu && <> <DropDownButton id={id} class="md:hidden btn btn-circle md:btn-sm btn-xs btn-ghost">
        <Icon id="Bars3" size={20} strokeWidth={0.01} />
      </DropDownButton>
        <DropdownContent id={id}>
          <Menu {...menu} />
        </DropdownContent>
      </>
      }
    </div>
  );
}

export default Navbar;

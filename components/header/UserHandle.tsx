import Button from "deco-sites/niivu-bank/components/ui/Button.tsx";
import Icon from "deco-sites/niivu-bank/components/ui/Icon.tsx";
import UserInfo from "deco-sites/niivu-bank/components/ui/UserInfo.tsx";
import ButtonLogout from "deco-sites/niivu-bank/islands/ButtonLogout.tsx";

interface Props {
  isLogged?: boolean;
  showUserInfo?: boolean;
  showButtonLogout?: boolean;
  userName?: string;
}

export function UserHandle(
  { isLogged, showUserInfo, showButtonLogout, userName }: Props,
) {
  return (
    <>
      {!isLogged && (
        <a href={`/entrar`}>
          <Button class="hidden md:flex items-center max-h-9 w-24 btn-sm btn-outline btn-secondary text-base px-0">
            <Icon id="User" width={20} height={24} />
            Entrar
          </Button>
        </a>
      )}
      {showUserInfo && userName &&
        (
          <div class="hidden h-full md:flex items-center justify-end">
            <UserInfo userName={userName} />
          </div>
        )}
      {showButtonLogout &&
        (
          <div class="w-40 h-full flex items-center justify-end">
            <ButtonLogout />
          </div>
        )}
    </>
  );
}
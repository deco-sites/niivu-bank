import Icon from "deco-sites/niivu-bank/components/ui/Icon.tsx";
import ButtonLogout from "deco-sites/niivu-bank/components/ui/ButtonLogout.tsx";

export default function UserInfo({ userName }: { userName?: string }) {
  return (
    <div class="dropdown dropdown-hover min-w-32 cursor-pointer">
      <div tabIndex={0} role="button" class="flex items-end">
        <Icon id="User" size={24} class="mb-px mr-1" />
        <div class="w-full text-left flex flex-col">
          {userName && (
            <p class="text-xs text-secondary font-medium align-bottom">
              Bem Vindo
            </p>
          )}
          <h4 class="text-base font-medium overflow-ellipsis">
            {userName ?? "Bem Vindo"}
          </h4>
        </div>
      </div>
      <ul
        tabIndex={0}
        class="p-2 shadow menu dropdown-content bg-neutral-100 w-36 rounded-box z-50"
      >
        <li>
          <a href="/minha-conta">Minha conta</a>
        </li>
        <li>
          <ButtonLogout mobileMode />
        </li>
      </ul>
    </div>
  );
}

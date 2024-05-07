import { Url } from "deco-sites/niivu-bank/components/header/Header.tsx";
import Icon from "deco-sites/niivu-bank/components/ui/Icon.tsx";
import ButtonLogout from "deco-sites/niivu-bank/islands/ButtonLogout.tsx";

export interface Props {
  urls?: Url[];
  isLogged?: boolean;
}

function MenuItem({ item }: { item: Url }) {
  return (
    <a
      class=" text-base font-normal w-full flex justify-between"
      href={item.url}
    >
      {item.label}
      <Icon id="ChevronRight" height={24} width={20} class="text-base-300" />
    </a>
  );
}

function Menu({ urls, isLogged }: Props) {
  return (
    <ul class="px-4 w-full bg-white flex flex-col">
      {urls?.map((item) => (
        <li class="h-11 py-2 flex items-center border-b border-base-300">
          <MenuItem item={item} />
        </li>
      ))}
      <li class="h-11 flex items-center">
        {isLogged
          ? <ButtonLogout />
          : (
            <a class="flex justify-between w-full" href={`/entrar`}>
              <div class="flex text-base text-secondary">
                <Icon id="User" width={16} height={24} class="pt-px" />
                <p class="pt-px ml-4">
                  Entrar
                </p>
              </div>
              <Icon
                id="ChevronRight"
                height={24}
                width={20}
                class="text-base-300"
              />
            </a>
          )}
      </li>
    </ul>
  );
}

export default Menu;

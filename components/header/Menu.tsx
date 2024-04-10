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
    <ul class="px-4 w-screen flex flex-col">
      {urls?.map((item) => (
        <li class="h-10 flex items-center border-b border-base-300">
          <MenuItem item={item} />
        </li>
      ))}
      {isLogged && (
        <li class="h-10 flex items-center">
          <ButtonLogout />
        </li>
      )}
    </ul>
  );
}

export default Menu;

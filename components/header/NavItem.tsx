import { Url } from "deco-sites/niivu-bank/components/header/Header.tsx";

function NavItem({ item }: { item: Url }) {
  const { url, label } = item;
  return (
    <li class="group flex items-center">
      <a href={url} class="py-6">
        <span class="group-hover:underline group-hover:text-secondary text-base font-medium">
          {label}
        </span>
      </a>
    </li>
  );
}

export default NavItem;

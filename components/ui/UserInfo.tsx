import Icon from "deco-sites/niivu-bank/components/ui/Icon.tsx";

export default function UserInfo({ userName }: { userName: string }) {
  return (
    <div class="flex w-48 items-end">
      <Icon id="User" size={24} class="mb-px" />
      <div class="w-full text-left flex flex-col">
        <p class="text-xs text-secondary font-medium align-bottom">Bem Vindo</p>
        <p class="text-base font-medium align-bottom min-w-24  overflow-ellipsis">
          {userName}
        </p>
      </div>
    </div>
  );
}

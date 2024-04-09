import Button from "deco-sites/niivu-bank/components/ui/Button.tsx";
import { useUI } from "deco-sites/niivu-bank/sdk/useUI.ts";
import Icon from "deco-sites/niivu-bank/components/ui/Icon.tsx";

export default function MenuButton() {
  const { displayMenu } = useUI();

  return (
    <Button
      class="md:hidden btn btn-circle md:btn-sm btn-xs btn-ghost"
      aria-label="open menu"
      onClick={() => {
        displayMenu.value = !displayMenu.value;
      }}
    >
      <Icon id="Bars3" size={20} strokeWidth={0.01} />
    </Button>
  );
}

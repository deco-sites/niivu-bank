import { lazy, Suspense } from "preact/compat";
import { ComponentChildren } from "https://esm.sh/v128/preact@10.19.6/src/index.js";
import { useUI } from "deco-sites/niivu-bank/sdk/useUI.ts";
import Button from "deco-sites/niivu-bank/components/ui/Button.tsx";
import Drawer from "deco-sites/niivu-bank/components/ui/Drawer.tsx";
import Icon from "deco-sites/niivu-bank/components/ui/Icon.tsx";
import { Url } from "deco-sites/niivu-bank/components/header/Header.tsx";

const Menu = lazy(() =>
  import("deco-sites/niivu-bank/components/header/Menu.tsx")
);

interface Props {
  menu: {
    urls: Url[];
  };
  /**
   * @ignore_gen true
   */
  children?: ComponentChildren;
}

const Aside = (
  { title, onClose, children }: {
    title: string;
    onClose?: () => void;
    children: ComponentChildren;
  },
) => (
  <div class="bg-base-100 grid grid-rows-[auto_1fr] max-w-[100vw]">
    <div class="flex justify-between items-center border-b border-base-300">
      <h1 class="px-4 py-3">
        <span class="font-medium text-2xl">{title}</span>
      </h1>
      {onClose && (
        <Button aria-label="X" class="btn btn-ghost" onClick={onClose}>
          <Icon id="XMark" size={24} strokeWidth={2} />
        </Button>
      )}
    </div>
    <Suspense
      fallback={
        <div class="w-screen flex items-center justify-center">
          <span class="loading loading-ring" />
        </div>
      }
    >
      {children}
    </Suspense>
  </div>
);

function Drawers({ menu, children }: Props) {
  const { displayMenu } = useUI();

  return (
    <Drawer
      class="drawer-end"
      open={displayMenu.value}
      onClose={() => {
        displayMenu.value = false;
      }}
      aside={
        <Aside
          onClose={() => {
            displayMenu.value = false;
          }}
          title="Menu"
        >
          {displayMenu.value && <Menu {...menu} />}
        </Aside>
      }
    >
      {children}
    </Drawer>
  );
}

export default Drawers;

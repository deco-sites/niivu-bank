import Icon from "deco-sites/niivu-bank/components/ui/Icon.tsx";
import { invoke } from "deco-sites/niivu-bank/runtime.ts";
import { supabase } from "deco/deps.ts";

export default function ButtonLogout() {
  const logout = async () => {
    try {
      await invoke({ key: "deco-sites/niivu-bank/loaders/actions/signOut.ts" });
    } finally {
      window.location.href = "/";
    }
  };
  return (
    <button
      class="group flex items-center"
      onClick={logout}
    >
      <Icon
        id="SignOut"
        size={24}
        class="md:hidden group-hover:text-secondary"
      />
      <Icon
        id="Close"
        size={24}
        class="hidden md:block group-hover:text-secondary"
      />
      <p class="text-base ml-5 md:ml-2 group-hover:text-secondary">Sair</p>
    </button>
  );
}

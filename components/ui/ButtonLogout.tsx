import Icon from "deco-sites/niivu-bank/components/ui/Icon.tsx";
import { invoke } from "deco-sites/niivu-bank/runtime.ts";

export default function ButtonLogout() {
  const logout = async () => {
    try {
      const response = await invoke({ key: "deco-sites/niivu-bank/loaders/actions/signOut.ts" });;
      if (response.status !== 200) {
        throw new Error("Logout request failed");
      }
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out:", error);
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

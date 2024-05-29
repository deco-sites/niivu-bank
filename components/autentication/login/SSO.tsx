import Button from "deco-sites/niivu-bank/components/ui/Button.tsx";
import Icon from "deco-sites/niivu-bank/components/ui/Icon.tsx";
import { invoke } from "deco-sites/niivu-bank/runtime.ts";

export default function LoginSSO() {
  return (
    <>
      <div className="divider text-black bg text-xs mt-6">Ou entre com</div>
      <div class="space-y-2">
        <Button
          ariaLabel="Entre com Facebook"
          class="w-full bg-facebook border-facebook hover:border-facebook hover:bg-[#428df0] rounded font-bold text-neutral"
        >
          <Icon size={24} id="Facebook" />
          <span class="font-bold text-base text-center">
            Entre com Facebook
          </span>
        </Button>

        <Button
          onClick={async () => {
            const url = await invoke({
              key: "deco-sites/niivu-bank/loaders/actions/singinWithGoogle.ts",
            });
            if (typeof url !== "string") return;
            window.location.href = url;
          }}
          ariaLabel="Entre com Google"
          class="w-full btn-neutral rounded  shadow-md"
        >
          <Icon size={24} id="Google" />{" "}
          <span class="text-black opacity-55 font-bold text-base">
            Entre com Google
          </span>
        </Button>
      </div>
    </>
  );
}

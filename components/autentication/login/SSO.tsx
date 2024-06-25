import Button from "site/components/ui/Button.tsx";
import Icon from "site/components/ui/Icon.tsx";
import { invoke } from "site/runtime.ts";

export default function LoginSSO() {
  return (
    <>
      <div className="divider text-black bg text-xs mt-6">Ou entre com</div>
      <div class="space-y-2">
        <Button
          onClick={async () => {
            const url = await invoke({
              key: "site/loaders/actions/singinWithOAuth.ts",
              props: { provider: "facebook" },
            });
            if (typeof url !== "string") return;
            window.location.href = url;
          }}
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
              key: "site/loaders/actions/singinWithOAuth.ts",
              props: { provider: "google" },
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

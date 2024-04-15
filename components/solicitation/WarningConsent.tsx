import { useUI } from "deco-sites/niivu-bank/sdk/useUI.ts";
import Loading from "deco-sites/niivu-bank/components/daisy/Loading.tsx";
import { ERROR_SEND_SOLICITATION } from "deco-sites/niivu-bank/components/solicitation/constants.ts";
import { useSignal } from "@preact/signals";

export interface Props {
  disclaimerText: string;
  buttonSize?: string;
  buttonLabel?: string;
  isLoading?: boolean;
}

function WarningConsent(
  { disclaimerText, isLoading, buttonSize, buttonLabel = "Enviar" }: Props,
) {
  const { sendSolicitationLoading, sendSolicitationError } = useUI();

  const checkbox = useSignal(false);

  return (
    <div class="relative">
      <div class="flex flex-col gap-10 group/warning">
        <div class="flex items-start gap-4">
          <input
            onChange={(e) => checkbox.value = e.currentTarget.checked}
            class="checkbox checkbox-primary checkbox-md border-[3px]"
            type="checkbox"
            name="warningConsent"
            id="warningConsent"
          />
          <div class="flex flex-col gap-2">
            <span class="font-normal">
              Autorização
            </span>
            <div dangerouslySetInnerHTML={{ __html: disclaimerText }} />
          </div>
        </div>
        {sendSolicitationError.value && (
          <p class="absolute bottom-14 text-[#BF4040]">
            {ERROR_SEND_SOLICITATION}
          </p>
        )}
        <button
          type={checkbox.value ? "submit" : "button"}
          class={`btn btn-accent pointer-events-none text-white group-has-[input:checked]/warning:pointer-events-auto group-has-[input:checked]/warning:btn-primary text-xl ${buttonSize}`}
        >
          {sendSolicitationLoading.value || isLoading
            ? <Loading size="loading-md" style="loading-spinner" />
            : buttonLabel}
        </button>
      </div>
    </div>
  );
}

export default WarningConsent;

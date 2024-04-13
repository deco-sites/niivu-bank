import { useUI } from "deco-sites/niivu-bank/sdk/useUI.ts";
import Loading from "deco-sites/niivu-bank/components/daisy/Loading.tsx";

export interface Props {
  disclaimerText: string;
}

function WarningConsent({ disclaimerText }: Props) {
  const { sendSolicitationLoading } = useUI();

  return (
    <>
      <div class="flex flex-col gap-10 group/warning">
        <div class="flex items-start gap-4">
          <input
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
        <button
          type="submit"
          class="btn btn-accent pointer-events-none w-72 text-white group-has-[input:checked]/warning:pointer-events-auto group-has-[input:checked]/warning:btn-primary"
        >
          {sendSolicitationLoading.value
            ? <Loading size="loading-md" style="loading-spinner" />
            : "Enviar"}
        </button>
      </div>
    </>
  );
}

export default WarningConsent;

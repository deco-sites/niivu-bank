export interface Props {
  disclaimerText: string;
}

function warningConsent({ disclaimerText }: Props) {
  return (
    <>
      <div class="flex flex-col gap-2 group/warning">
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
          Enviar
        </button>
      </div>
    </>
  );
}

export default warningConsent;

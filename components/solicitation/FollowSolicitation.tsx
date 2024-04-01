import { StatusType } from "$store/packs/utils/constants.ts";
import type { AppContext } from "$store/apps/site.ts";
import Step from "./Step.tsx";
import Icon from "$store/components/ui/Icon.tsx";

export interface ToolTip {
  /** @title Em cima */
  up: string;
  /**
   * @format textarea
   * @title Em Baixo
   */
  down: string;
}
/** @titleBy title */
export interface Status {
  /** @title Título */
  title: string;
  /**
   * @title Mensagem
   * @format html
   */
  message?: string;
  /** @description Texto ao passar o mouse no titulo ou no icone de etapa */
  toolTip: ToolTip;
  /** @title Tipo de Status */
  statusType: StatusType;
}

export interface Props {
  status: Status[];
  /** @title Mensagem */
  message?: string;
}

export const loader = async (props: Props, _req: Request, ctx: AppContext) => {
  const statusMessage = await ctx.invoke(
    "deco-sites/niivu-bank/loaders/actions/analysiStatus.ts",
  );

  if (typeof statusMessage !== "string") {
    return {
      ...props,
      statusMessage: "Abertura de Conta",
      isDesk: ctx.device === "desktop",
    };
  }
  return { ...props, statusMessage, isDesk: ctx.device === "desktop" };
};

function FollowSolicitation(
  { status, message, isDesk, statusMessage = "Abertura de Conta" }: Awaited<
    ReturnType<typeof loader>
  >,
) {
  const statusIndex = status.findIndex(({ statusType }) =>
    statusType === statusMessage
  );

  const selectedItems = statusIndex === 0
    ? status.slice(0, 3)
    : statusIndex === status.length - 1
    ? status.slice(-3)
    : status.slice(statusIndex - 1, statusIndex + 2);

  const hasMessage = message && message.length > 0;

  return (
    <div class="container flex flex-col gap-32 pb-48">
      {isDesk && (
        <div>
          <h1 class="font-bold text-3xl leading-10 text-primary">
            Acompanhe aqui sua proposta
          </h1>
          <p class="font-normal text-sm text-[#292929]">
            sua proposta já foi enviada e já está no nosso sistema, veja abaixo
            o status
          </p>
        </div>
      )}
      <ul class="timeline max-lg:w-full mx-auto last:lg:w-24 first:lg:w-24">
        {/** Desk */}
        {isDesk &&
          status.map((props, index) => (
            <Step
              index={index}
              statusIndex={statusIndex}
              isLastStep={index === status.length - 1}
              {...props}
            />
          ))}
        {/** Mobile */}
        {!isDesk &&
          selectedItems.map((props, index) => (
            <Step
              index={index}
              statusIndex={statusIndex}
              isLastStep={index === selectedItems.length - 1}
              {...props}
            />
          ))}
      </ul>
      {hasMessage ||
        status[statusIndex].message && (
            <div class="flex items-center p-4 gap-4 mx-auto rounded-sm bg-[#E7E4FF] max-w-[605px]">
              <Icon id="Schedule" class="shrink-0" width={24} height={24} />
              <div
                dangerouslySetInnerHTML={{
                  __html: hasMessage
                    ? message
                    : status[statusIndex].message ?? "",
                }}
              />
            </div>
          )}
    </div>
  );
}

export default FollowSolicitation;

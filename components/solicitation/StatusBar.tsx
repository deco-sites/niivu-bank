import { StatusType } from "$store/packs/utils/constants.ts";
import type { AppContext } from "$store/apps/site.ts";
import Step from "./Step.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { DataObjectSoliciation, Error } from "../../packs/solicitation/getDetails.ts";
import { Head } from "https://deno.land/x/fresh@1.6.3/runtime.ts";

export interface ToolTip {
  /**
   * @format textarea
   * @title Em cima
   */
  up?: string;
  /**
   * @format textarea
   * @title Em Baixo
   */
  down?: string;
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

  solicitation: DataObjectSoliciation | Error;
}

export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  const statusMessage = props.solicitation.status;

  if (typeof statusMessage !== "string") {
    return {
      ...props,
      statusMessage: "Abertura de Conta",
      isDesktop: ctx.device === "desktop",
    };
  }
  return { ...props, statusMessage, isDesktop: ctx.device === "desktop" };
};

function FollowSolicitation(
  { status, isDesktop, statusMessage = "Abertura de Conta" }: Awaited<
    ReturnType<typeof loader>
  >,
) {
  let statusIndex = status.findIndex(({ statusType }) =>
    statusType === statusMessage
  );

  const mobileStatus = statusIndex === 0
    ? status.slice(0, 3)
    : statusIndex === status.length - 1
    ? status.slice(-3)
    : status.slice(statusIndex - 1, statusIndex + 2);

  const steps = isDesktop ? status : mobileStatus;

  if (!isDesktop) {
    statusIndex = steps.findIndex(({ statusType }) =>
      statusType === statusMessage
    );
  }

  return (
    <>
      <Head>
        <style
          dangerouslySetInnerHTML={{
            __html:
              "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap')",
          }}
        />
      </Head>
      <div class="container flex flex-col gap-5 lg:gap-32 pb-48 pt-5 lg:pt-6">
        {isDesktop && (
          <div>
            <h1 class="font-bold text-3xl leading-10 text-primary">
              Acompanhe aqui sua proposta
            </h1>
            <p class="font-normal text-sm text-[#292929]">
              Sua proposta já foi enviada e já está no nosso sistema, veja
              abaixo o status
            </p>
          </div>
        )}
        <ul class="timeline max-lg:w-full mx-auto last:lg:w-24 first:lg:w-24">
          {steps.map((props, index, array) => (
            <Step
              {...props}
              index={index}
              statusIndex={statusIndex}
              isLastStep={index === array.length - 1}
              toolTip={isDesktop ? props.toolTip : {}}
            />
          ))}
        </ul>
        {status[statusIndex]?.message && (
          <div class="flex items-center p-4 gap-4 mx-auto rounded-sm bg-[#E7E4FF] max-w-[605px]">
            <Icon id="Schedule" class="shrink-0" width={24} height={24} />
            <div
              class="[font-family:Inter]"
              dangerouslySetInnerHTML={{
                __html: status[statusIndex].message ?? "",
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default FollowSolicitation;

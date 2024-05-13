import {
  StatusType,
} from "$store/packs/utils/constants.ts";
import Step from "./Step.tsx";
import {
  DataObjectSoliciation,
} from "../../packs/solicitation/getDetails.ts";

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
  /** 
   * @description Aqui é para definir a cor do status na tabela
   * @title cor
   * @format color-input
   */
  color?: string;
  /** @title Tipo de Status */
  statusType: StatusType;
}

export interface Props {
  status: Status[];

  /**
   * @title Mensagem de Status padrão
   * @description Mensagem que será exibida caso não seja passado um status
   */
  statusMessageDefault?: StatusType;

  solicitation: DataObjectSoliciation;

  isDesktop: boolean;
}

function FollowSolicitation(
  { status, isDesktop, solicitation, statusMessageDefault }: Props,
) {
  const statusMessage = solicitation.status;
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
      statusType === statusMessage ?? statusMessageDefault ?? "Análise de Crédito"
    );
  }

  return (
    <ul class="timeline max-lg:w-full mx-auto">
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
  );
}

export default FollowSolicitation;

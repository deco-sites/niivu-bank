import type { Status } from "./StatusBar.tsx";
import Icon from "$store/components/ui/Icon.tsx";

export interface Props extends Status {
  statusIndex: number;
  index: number;
  isLastStep: boolean;
}

function Step({ title, statusIndex, toolTip, index, isLastStep }: Props) {
  const isStepFinish = index < statusIndex;
  const isCurrentStep = index === statusIndex;
  const isStepForward = index > statusIndex;
  const isFirst = index === 0;

  return (
    <li class="max-lg:flex-grow flex-shrink-[1] lg:w-48">
      {!isFirst && (
        <hr
          class={`relative !h-[2px] ${
            index <= statusIndex
              ? isLastStep ? "bg-secondary" : "bg-primary"
              : "bg-[#b8b8b8]"
          }`}
        />
      )}
      <div
        className={`timeline-start tooltip ${
          isCurrentStep && isLastStep
            ? "text-secondary"
            : (isStepFinish || isCurrentStep)
            ? "text-primary"
            : "text-[#b8b8b8]"
        } max-md:max-w-16 text-center font-bold text-xs md:text-sm`}
        data-tip={toolTip.up}
      >
        {title}
      </div>
      <div
        className="timeline-middle tooltip tooltip-bottom tooltip-primary"
        data-tip={toolTip.down}
      >
        {isStepFinish && <Icon id="RoundCheck" width={32} height={32} />}
        {isCurrentStep && isLastStep && (
          <Icon
            id="RoundCheck"
            class="text-secondary border-secondary"
            width={32}
            height={32}
          />
        )}
        {isCurrentStep && !isLastStep && (
          <div class="flex items-center justify-center font-bold w-8 h-8 border-2 border-primary rounded-full [font-family:Inter]">
            {index + 1}
          </div>
        )}
        {isStepForward && (
          <div class="w-4 h-4 my-2 border-2 border-accent rounded-full" />
        )}
      </div>
      {!isLastStep && (
        <hr
          class={`relative !h-[2px] ${
            index <= statusIndex ? "bg-primary" : "bg-[#b8b8b8]"
          }`}
        />
      )}
    </li>
  );
}

export default Step;

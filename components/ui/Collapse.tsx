import { useId } from "../../sdk/useId.ts";
import { ComponentChildren } from "preact";
import Icon from "../ui/Icon.tsx";

export interface Props {
  title: string;
  backgroundColor?: string;
  children: ComponentChildren;
  isDesktop?: boolean;
}

export default function Collapse(
  { title, children, isDesktop, backgroundColor = "white" }: Props,
) {
  const id = useId();
  const chevronSize = isDesktop ? 32 : 20;
  const closeSize = isDesktop ? 30 : 16;
  return (
    <div
      class="collapse border border-[#E0E0E0] rounded-lg group/collapse "
      style={{ backgroundColor, boxShadow: "0px 4px 8px -4px #00000029" }}
    >
      <input class="hidden" type="checkbox" id={id} />
      <label htmlFor={id}>
        <div class="collapse-title min-h-0 p-6 max-sm:text-sm font-bold text-xl text-[#414042] max-sm:h-20 h-28">
          <div class="flex items-center justify-between h-full">
            <p>{title}</p>
            <label class="swap group-has-[input:checked]/collapse:swap-active swap-rotate ml-auto pointer-events-none">
              <Icon
                id="ChevronDown"
                width={chevronSize}
                height={chevronSize}
                class="swap-off text-[#414042] sm:text-[#7B63FF]"
              />
              <Icon
                id="Close"
                width={closeSize}
                height={closeSize}
                class="swap-on text-[#414042] sm:text-[#7B63FF]"
              />
            </label>
          </div>
        </div>
      </label>
      <div class="collapse-content !p-0 font-normal text-base">
        {children}
      </div>
    </div>
  );
}

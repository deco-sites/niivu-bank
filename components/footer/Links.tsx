import { useId } from "deco-sites/niivu-bank/sdk/useId.ts";
import type { Section } from "./Footer.tsx"
import Icon from "deco-sites/niivu-bank/components/ui/Icon.tsx";

export interface Props extends Section {
    isDesktop: boolean;
}

function Links({ title, links, isDesktop }: Props) {
    const id = useId();
    return (
        <>
            {/* Desktop */}
            {isDesktop &&
                <div class="flex flex-col gap-6 w-[200px]">
                    <h3 class="font-bold text-base">{title}</h3>
                    <div class="flex flex-col gap-3">
                        {links.map(({ href, label, isOutside }) => (
                            <a class="h-6 text-base font-normal text-white"
                                rel={isOutside ? "noopener noreferrer" : ""}
                                target={isOutside ? "_blank" : "_self"}
                                href={href}>
                                {label}
                            </a>))}
                    </div>
                </div>
            }
            {/* Mobile */}
            {!isDesktop && <div class="collapse rounded-none group/footer">
                <input class="hidden" id={id} type="checkbox" />
                <label htmlFor={id}>
                    <div class="collapse-title bg-transparent min-h-0 p-0 rounded-none">
                        <div class="flex border-b border-[#E0E0E0] group-has-[input:checked]/footer:border-none items-center justify-between h-[72px] py-6">
                            <p class="font-bold text-base">{title}</p>
                            <label class="swap group-has-[input:checked]/footer:swap-active swap-rotate ml-auto pointer-events-none">
                                <Icon id="ChevronDown" width={24} height={24} class="swap-off text-[#F6F6F6]" />
                                <Icon id="ChevronRight" width={24} height={24} class="swap-on text-[#F6F6F6]" />
                            </label>
                        </div>
                    </div>
                </label>
                <div class="collapse-content p-0">
                    <div class="flex flex-col gap-3">
                        {links.map(({ href, label, isOutside }) => (
                            <a class="h-6 text-base font-normal text-white"
                                rel={isOutside ? "noopener noreferrer" : ""}
                                target={isOutside ? "_blank" : "_self"}
                                href={href}>
                                {label}
                            </a>))}
                    </div>
                </div>
            </div>}
        </>
    );
}

export default Links;
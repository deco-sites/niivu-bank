import StatusBar, { Props as StatusProps } from "deco-sites/niivu-bank/components/solicitation/StatusBar.tsx";
import {
    DataObjectSoliciation,
    Error,
} from "../../packs/solicitation/getDetails.ts";
import type { AppContext } from "$store/apps/site.ts";
import Icon from "deco-sites/niivu-bank/components/ui/Icon.tsx";

export interface Props extends Omit<StatusProps, "solicitation" | "isDesktop"> {
    solicitations: DataObjectSoliciation[] | Error;
}

export const loader = (props: Props, _req: Request, ctx: AppContext) => {
    if (!Array.isArray(props.solicitations)) {
        return {
            ...props,
            solicitations: [],
            isDesktop: ctx.device === "desktop",
        };
    }
    return { ...props, solicitations: props.solicitations as DataObjectSoliciation[], isDesktop: ctx.device === "desktop" };
};


function StatusTable({ solicitations, status, statusMessageDefault, isDesktop }:
    ReturnType<typeof loader>) {
    return (
        <>
            <style
                dangerouslySetInnerHTML={{
                    __html:
                        "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap')",
                }}
            />
            <div class="relative container flex flex-col gap-5 lg:gap-32 pb-48 pt-5 lg:pt-6">
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
                <div class="flex flex-col">
                    <div class="flex justify-start items-center gap-4 bg-[#F0F2F4] h-10 px-2 py-3 text-sm leading-4 text-[#111214] pr-12">
                        <p class="max-w-80 w-full h-4">ID</p>
                        <p class="max-w-80 w-full h-4">DOCUMENTO</p>
                        <p class="max-w-80 w-full h-4">STATUS</p>
                    </div>
                    {solicitations?.map((solicitation, index) => <div class="collapse rounded-none group/form">
                        <input class="hidden" id={`${index}`} type="checkbox" />
                        <label htmlFor={`${index}`}>
                            <div class="collapse-title min-h-0 p-0 rounded-none">
                                <div class="flex justify-start items-center gap-4 leading-4 text-[#111214] border-b border-[#E0E0E0] h-10 bg-transparent text-sm py-3 px-2 max-md:gap-2 max-md:text-[11px]">
                                    <p class="max-w-80 w-full h-6">{solicitation.id}</p>
                                    <p class="max-w-80 w-full h-6">{solicitation.cnpj ?? solicitation.cpf}</p>
                                    <div class="max-w-80 w-full h-6">
                                        <div class="max-w-40 h-6 rounded-full gap-2 p-2 bg-[#F0F2F4] flex justify-start items-center" style={{ color: status.find(({ statusType }) => statusType === solicitation.status)?.color }}>
                                            <div class="rounded-full w-2 h-2 flex-shrink-0 mt-1" style={{ backgroundColor: status.find(({ statusType }) => statusType === solicitation.status)?.color ?? "black" }} />
                                            <p class="line-clamp-1">{solicitation.status}</p>
                                        </div>
                                    </div>
                                    <label class="swap group-has-[input:checked]/form:swap-active swap-rotate ml-auto">
                                        <Icon id="ChevronRight" width={24} height={24} class="swap-off text-[#888D95]" />
                                        <Icon id="ChevronDown" width={24} height={24} class="swap-on text-[#888D95]" />
                                    </label>
                                </div>
                            </div>
                        </label>
                        <div class="collapse-content flex justify-center items-center">
                            <StatusBar solicitation={solicitation} statusMessageDefault={statusMessageDefault} status={status} isDesktop={isDesktop} />
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default StatusTable;
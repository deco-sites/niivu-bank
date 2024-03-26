import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Image from "apps/website/components/Image.tsx";
import type { AppContext } from "$store/apps/site.ts";
import { OK, TEMPORARY_REDIRECT } from "$store/utils/enum.ts";

export interface IPicture {
  desktop: ImageWidget;
  mobile: ImageWidget;
  alt: string;
}

export interface Props {
  image: IPicture;
  /** @title link do botão */
  buttonLink?: string;
  /** @title Icone */
  icon?: ImageWidget;
}

export const loader = async (props: Props, _req: Request, ctx: AppContext) => {
  const { invoke } = ctx;
  const { status, message } = await invoke(
    "deco-sites/niivu-bank/loaders/actions/getSolicitationId.ts",
  );

  if (status === OK) {
    return {
      ...props,
      risk3_id: message,
    };
  }

  return { ...props, risk3_id: undefined };
};

function SucessMessage(
  { image, icon, buttonLink, risk3_id }: Awaited<ReturnType<typeof loader>>,
) {
  return (
    <>
      <div class="relative w-full">
        <div class="layout flex gap-4 h-full text-white py-12">
          <div class="flex flex-col gap-8">
            <span class="text-xl font-bold md:text-5xl">
              Sua solicitação foi enviada!
            </span>
            <span class="text-base font-bold md:text-xl">
              O número da sua solicitação é {risk3_id}
            </span>
            <span class="text-xs md:text-base">
              Acompanhe sua solicitação clicando no botão abaixo ou aguarde que
              enviaremos um link.
            </span>
          </div>
          {icon && <Image src={icon} width={174} height={169} />}
        </div>

        <Picture preload class="absolute inset-0 -z-[1] h-full w-full">
          <Source
            src={image.mobile}
            width={288}
            height={261}
            media="(max-width: 767px)"
          />
          <Source
            src={image.desktop}
            width={1440}
            height={347}
            media="(min-width: 767px)"
          />
          <img
            class="max-md:m-auto max-md:w-11/12 w-full h-full object-cover"
            src={image.desktop}
            alt={image.alt}
          />
        </Picture>
      </div>
      {buttonLink && (
        <div class="layout">
          <a class="btn bg-primary text-white" href={buttonLink}>
            Acompanhar minha solicitação
          </a>
        </div>
      )}
    </>
  );
}

export default SucessMessage;

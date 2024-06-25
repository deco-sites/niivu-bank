import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Image from "apps/website/components/Image.tsx";
import type { AppContext } from "$store/apps/site.ts";
import Button from "site/components/ui/Button.tsx";
import {
  DataObjectSoliciation,
  Error,
} from "site/packs/solicitation/getDetails.ts";
import { redirect } from "deco/mod.ts";

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

  solicitations: DataObjectSoliciation[] | Error;
}

export const loader = (props: Props, req: Request, _ctx: AppContext) => {
  const url = new URL(req.url);

  const isAdmin = req.url.includes("__d");
  if (!Array.isArray(props.solicitations) && !isAdmin) {
    // We need to pass the complete url. Only with relative urls don't work.
    redirect(`${url.origin}/minha-conta/solicitacao`);
  }

  if (isAdmin) {
    return {
      ...props,
      solicitation_id: 1000,
    };
  }
  const solicitation = props.solicitations as DataObjectSoliciation[];

  return {
    ...props,
    solicitation_id: solicitation.at(-1)?.id,
  };
};

function SucessMessage(
  { image, icon, buttonLink, solicitation_id }: Awaited<
    ReturnType<typeof loader>
  >,
) {
  return (
    <>
      <div class="relative w-full min-h-80 mb-8">
        <div class="container flex gap-4 h-full text-white py-12 max-sm:px-4">
          <div class="flex flex-col gap-8">
            <span class="text-xl text-neutral font-bold md:text-5xl">
              Sua solicitação foi enviada!
            </span>
            <div class="flex items-start gap-4">
              <span class="text-neutral font-bold md:text-xl">
                O número da sua solicitação é {solicitation_id}
              </span>
              {icon && (
                <Image
                  class="sm:hidden"
                  src={icon}
                  width={48}
                  height={48}
                />
              )}
            </div>
            <span class="text-base font-normal text-neutral">
              Acompanhe sua solicitação clicando no botão abaixo ou aguarde que
              enviaremos um link.
            </span>
          </div>
          {icon && (
            <Image class="max-sm:hidden" src={icon} width={174} height={169} />
          )}
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
        <div class="container">
          <a href={buttonLink}>
            <Button class="bg-primary text-neutral rounded max-sm:w-full">
              <p class="text-white">
                Acompanhar minha solicitação
              </p>
            </Button>
          </a>
        </div>
      )}
    </>
  );
}

export default SucessMessage;

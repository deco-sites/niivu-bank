import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Image from "apps/website/components/Image.tsx";
import type { AppContext } from "$store/apps/site.ts";

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

export const loader = (props: Props, req: Request, _ctx: AppContext) => {
  const url = new URL(req.url);

  const solicitation_id = url.searchParams.get("solicitation-id");

  return { ...props, solicitation_id };
};

function SucessMessage(
  { image, icon, buttonLink, solicitation_id }: Awaited<
    ReturnType<typeof loader>
  >,
) {
  return (
    <>
      <div class="relative w-full">
        <div class="container flex gap-4 h-full text-white py-12">
          <div class="flex flex-col gap-8">
            <span class="text-xl font-bold md:text-5xl">
              Sua solicitação foi enviada!
            </span>
            <span class="text-base font-bold md:text-xl">
              O número da sua solicitação é {solicitation_id}
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
        <div class="container">
          <a class="btn bg-primary text-white" href={buttonLink}>
            Acompanhar minha solicitação
          </a>
        </div>
      )}
    </>
  );
}

export default SucessMessage;

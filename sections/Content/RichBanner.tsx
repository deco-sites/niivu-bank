import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface ImageProps {
    image: ImageWidget;
    /** @title Largura da imagem em pixels. */
    width?: number;
    /** @title Altura da imagem em pixels. */
    height?: number;
}

export interface Images {
    /** @description A proporção padrão é 360 x 194 */
    mobile: ImageProps;
    /** @description A proporção padrão é 1440 x 175 */
    desktop: ImageProps;
    alt: string;
}

export interface Cta {
    /** @title Texto acima do botão. */
    text: string;
    /** @title Texto do botão. */
    btnText: string;
    link: string;
}

export interface Props {
    images: Images;
    cta: Cta;
    preload?: boolean;
}

const Cta = ({ text, link, btnText }: Cta) => {
    return (
        <div class="container">
            <div class="flex flex-col items-center gap-6 ml-auto w-fit py-9">
                <p class="font-bold text-2xl leading-9 text-center max-md:max-w-56 text-white">{text}</p>
                <a
                    href={link}
                    class="btn bg-transparent flex items-center justify-center border border-white text-white rounded-sm py-4 px-8 font-normal text-base leading-5 max-w-52 hover:text-black hover:bg-white"
                >
                    {btnText}
                </a>
            </div>
        </div>
    );
};

function RichBanner({ preload, images, cta }: Props) {
    return (
        <div class="relative">
            <div class="absolute -z-10 w-full min-h-[175px]">
                <Picture preload={preload}>
                    <Source
                        media="(max-width: 767px)"
                        fetchPriority={preload ? "high" : "auto"}
                        src={images.mobile.image}
                        width={images.mobile.width ?? 360}
                        height={images.mobile.height ?? 194}
                    />
                    <Source
                        media="(min-width: 768px)"
                        fetchPriority={preload ? "high" : "auto"}
                        src={images.desktop.image}
                        width={images.desktop.width ?? 1440}
                        height={images.desktop.height ?? 175}
                    />
                    <img
                        class="object-cover w-full h-full min-h-[175px]"
                        loading={preload ? "eager" : "lazy"}
                        src={images.desktop.image}
                        alt={images.alt}
                    />
                </Picture>
            </div>
            <Cta {...cta} />
        </div>
    );
}

export default RichBanner;

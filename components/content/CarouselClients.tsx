import { ImageWidget } from "apps/admin/widgets.ts";
import Slider from "deco-sites/niivu-bank/components/ui/Slider.tsx";
import SliderJS from "deco-sites/niivu-bank/islands/SliderJS.tsx";
import { useId } from "deco-sites/niivu-bank/sdk/useId.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "deco-sites/niivu-bank/components/ui/Icon.tsx";

/** @titleBy alt */
export interface Item {
    image: ImageWidget;
    alt: string;
}

export interface Props {
    title: string;
    clients: Item[]
    /** @format color-input */
    backgroundColor?: string;
}

function CarouselClients({ title, clients, backgroundColor }: Props) {
    const id = useId()
    return (
        <div style={{ backgroundColor }}>
            <div class="container flex flex-col py-10 gap-14 items-center lg:pt-16 lg:pb-12" id={id}>
                <h2 class="text-3xl leading-10 font-bold text-primary text-center max-md:max-w-64">{title}</h2>
                <div class="flex justify-start gap-3">
                    <Slider.PrevButton>
                        <Icon id="ChevronLeft2" class="text-secondary lg:text-primary" width={15} height={24} />
                    </Slider.PrevButton>
                    <Slider class="carousel carousel-start">
                        {clients.map(({ image, alt }, index) => <Slider.Item class="flex-[0_0_auto] autoCard max-md:flex max-md:justify-center" index={index}>
                            <Image src={image} alt={alt} width={165} height={93} />
                        </Slider.Item>
                        )}
                    </Slider>
                    <Slider.NextButton>
                        <Icon id="ChevronRight2" class="text-secondary lg:text-primary" width={15} height={24} />
                    </Slider.NextButton>
                    <SliderJS rootId={id} />
                </div>
            </div>
        </div>
    );
}

export default CarouselClients;
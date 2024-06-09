import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Slider from "deco-sites/niivu-bank/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "deco-sites/niivu-bank/sdk/useId.ts";

/** @titleBy name */
export interface Step {
  /** @title Ícone */
  icon: ImageWidget;
  alt: string;
  /** @title Nome */
  name: string;
  /** @title Título */
  title: string;
  /** @title Descrição */
  description: string;
}

export interface Props {
  /** @title Título */
  title: string;
  /** @title Etapas */
  steps: Step[];
  /** @title Botão */
  cta: {
    /** @title Texto */
    title: string;
    link: string;
  };
}

const Step = ({ alt, description, icon, name, title }: Step) => {
  return (
    <div class="flex flex-col items-center lg:gap-3 gap-10 w-full">
      <div class="border-2 border-white/30 rounded-full flex items-center justify-center w-[89px] h-[89px]">
        <Image src={icon} alt={alt} width={32} height={32} />
      </div>
      <div class="flex justify-start gap-14">
        <div class="flex flex-col w-[234px] gap-3">
          <p class="font-normal text-sm text-[#E7E8E8] text-center">{name}</p>
          <p class="font-bold text-center text-2xl text-[#E7E8E8]">{title}</p>
          <p class="text-sm text-center text-[#E7E8E8]">{description}</p>
        </div>
      </div>
    </div>
  );
};

function Steps({ steps, title, cta }: Props) {
  const id = useId();
  return (
    <div class="bg-gradient-to-r from-info to-success">
      <div class="container">
        <div
          class="flex flex-col gap-10 pb-12 pt-16 xl:items-center"
          id={id}
        >
          <p class="font-bold text-center text-3xl text-[#E7E8E8]">{title}</p>
          <Slider class="carousel flex justify-start items-start gap-14 pt-3 px-1">
            {steps.map((stepProps, index, array) => (
              <>
                <Slider.Item
                  index={index}
                  class="carousel-item relative max-sm:w-full"
                >
                  <Step {...stepProps} />
                  {!(index === (array.length - 1)) && (
                    <hr class="bg-white h-[2px] w-40 absolute -right-[108px] top-10 max-sm:w-1/2" />
                  )}
                </Slider.Item>
              </>
            ))}
          </Slider>

          <div class="flex flex-col gap-7 w-full">
            <a
              class="btn bg-transparent border border-white flex items-center justify-center rounded-sm px-8 max-md:max-w-72 max-w-52 h-12 text-white mx-auto w-full"
              href={cta.link}
            >
              {cta.title}
            </a>
            <div class="flex items-center gap-2 mx-auto lg:hidden">
              {steps.map((_, index) => (
                <Slider.Dot index={index}>
                  <div class="w-2 h-2 group-disabled:w-4 bg-[#E0E0E0] rounded-full" />
                </Slider.Dot>
              ))}
            </div>
          </div>
          <SliderJS rootId={id} />
        </div>
      </div>
    </div>
  );
}

export default Steps;

import Icon from "$store/components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Header from "$store/components/ui/SectionHeader.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";

export interface Props {
  title?: string;
  posts?: Post[];
  layout: {
    numberOfSliders: {
      mobile: 1 | 2 | 3 | 4 | 5;
      desktop: 1 | 2 | 3 | 4 | 5;
    };
    headerAlignment?: "center" | "left";
    headerfontSize?: "Normal" | "Large" | "Small";
    showArrows?: boolean;
  };
}

export interface Post {
  href?: string;
  image: ImageWidget;
  alt?: string;
  label?: string;
  description?: string;
  theme?: string;
}

function BlogPosts({
  title = "BlogPosts",
  layout = {
    numberOfSliders: {
      mobile: 1,
      desktop: 3,
    },
    headerAlignment: "center",
    headerfontSize: "Normal",
    showArrows: false,
  } as Props["layout"],
  posts = [
    {
      href: "/",
      image:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/80a115a2-3623-4e9b-aec7-42601c2ff416",
      alt: "alternative text",
      label: "Poupar ou investir: confira as diferenças",
      description:
        "Você ainda está na dúvida se deve poupar ou investir? Então este conteúdo foi feito para você!",
      theme: "Orientação financeira",
    },
    {
      href: "/",
      image:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/80a115a2-3623-4e9b-aec7-42601c2ff416",
      alt: "alternative text",
      label:
        "Mercado Financeiro Registra Volatilidade devido a Indicadores Econômicos e Geopolíticos",
      description:
        "O mercado financeiro global enfrentou uma semana de volatilidade, com índices oscilando.",
      theme: "Orientação financeira",
    },
    {
      href: "/",
      image:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/80a115a2-3623-4e9b-aec7-42601c2ff416",
      alt: "alternative text",
      label: "Desvendando os Mistérios do Mundo Financeiro",
      description:
        "Descubra estratégias inteligentes para economizar, investir e planejar seu futuro financeiro de maneira eficaz.",
      theme: "Orientação financeira",
    },
    {
      href: "/",
      image:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/80a115a2-3623-4e9b-aec7-42601c2ff416",
      alt: "alternative text",
      label: "Poupar ou investir: confira as diferenças",
      description:
        "Você ainda está na dúvida se deve poupar ou investir? Então este conteúdo foi feito para você!",
      theme: "Orientação financeira",
    },
    {
      href: "/",
      image:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/80a115a2-3623-4e9b-aec7-42601c2ff416",
      alt: "alternative text",
      label:
        "Mercado Financeiro Registra Volatilidade devido a Indicadores Econômicos e Geopolíticos",
      description:
        "O mercado financeiro global enfrentou uma semana de volatilidade, com índices oscilando.",
      theme: "Orientação financeira",
    },
    {
      href: "/",
      image:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/80a115a2-3623-4e9b-aec7-42601c2ff416",
      alt: "alternative text",
      label: "Desvendando os Mistérios do Mundo Financeiro",
      description:
        "Descubra estratégias inteligentes para economizar, investir e planejar seu futuro financeiro de maneira eficaz.",
      theme: "Orientação financeira",
    },
  ],
}: Props) {
  const id = useId();

  if (!posts || posts.length === 0) {
    return null;
  }
  const slideDesktop = {
    1: "md:w-full",
    2: "md:w-1/2",
    3: "md:w-1/2 lg:w-1/3",
    4: "md:w-1/3 lg:w-1/4",
    5: "md:w-1/4 lg:w-1/5",
  };

  const slideMobile = {
    1: "w-full",
    2: "w-1/2",
    3: "w-1/3",
    4: "w-1/4",
    5: "w-1/5",
  };

  const Card = ({ post }: { post: Post }) => (
    <a
      href={post.href}
      class="min-w-[328px] md:min-w-[350px] max-w-[400px] h-[563px]"
    >
      <article class="w-full h-full flex flex-col bg-white">
        <figure class="w-full h-[283px]">
          <Image
            class="w-full h-full object-cover"
            src={post.image}
            alt={post.alt}
            width={430}
            height={283}
          />
        </figure>
        <div class="w-full flex flex-col justify-between px-3 mt-5 gap-6">
          <h1 class="text-xl font-bold">{post.label}</h1>
          <p class="text-base font-medium no-break-words">{post.description}</p>
          <p class="text-base font-bold text-secondary">
            {post.theme}
          </p>
        </div>
      </article>
    </a>
  );

  return (
    <div class=" h-[831px] flex flex-col pb-16 bg-gradient-to-l from-success to-info">
      <div class="py-8 md:py-14 px-6">
        <Header
          title={title || "BlogPosts"}
          fontSize={layout?.headerfontSize || "Normal"}
          alignment={layout?.headerAlignment || "center"}
          description="Prepare-se para uma jornada emocionante rumo à prosperidade financeira."
        />
      </div>
      <div
        id={id}
        class={`grid container ${
          layout?.showArrows ? "grid-cols-1 grid-rows-[auto_28px]" : ""
        } grid-rows-2 px-0`}
      >
        <Slider class="gap-6 carousel carousel-center sm:carousel-end md:pr-[1%]">
          {posts?.map((post, index) => (
            <Slider.Item
              index={index}
              class={`carousel-item justify-center  ${
                slideDesktop[layout?.numberOfSliders?.desktop ?? 3]
              } ${slideMobile[layout?.numberOfSliders?.mobile ?? 1]}`}
            >
              <Card post={post} />
            </Slider.Item>
          ))}
        </Slider>

        {layout?.showArrows && (
          <>
            <div
              class={`${
                posts.length <= 3 ? "hidden" : "hidden md:flex"
              }  container row-start-2 row-end-2 w-full items-center justify-end mt-1`}
            >
              <div class="flex justify-between w-14">
                <Slider.PrevButton class="w-12 h-12">
                  <Icon
                    class="text-white w-5"
                    size={24}
                    id="ChevronLeft"
                    strokeWidth={2}
                  />
                </Slider.PrevButton>
                <Slider.NextButton class="w-12 h-12">
                  <Icon
                    class="text-white"
                    size={24}
                    id="ChevronRight"
                    strokeWidth={1}
                  />
                </Slider.NextButton>
              </div>
            </div>

            <div
              class={`${
                posts.length <= 3 ? "flex md:hidden" : "flex"
              } relative z-10 w-full row-start-3  flex-row gap-4 justify-center items-center`}
            >
              <ul class="carousel justify-center col-span-full gap-6 z-10 row-start-4">
                {posts?.map((_, index) => (
                  <li class="carousel-item">
                    <Slider.Dot index={index}>
                      <div class="py-5">
                        <div class="group-disabled:w-4 group-disabled:bg-primary h-2 rounded bg-white w-2" />
                      </div>
                    </Slider.Dot>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
        <SliderJS rootId={id} />
      </div>
    </div>
  );
}

export default BlogPosts;

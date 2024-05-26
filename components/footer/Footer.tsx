import { ImageWidget } from "apps/admin/widgets.ts";
import Links from "deco-sites/niivu-bank/components/footer/Links.tsx";
import Image from "apps/website/components/Image.tsx";
import Social from "deco-sites/niivu-bank/components/footer/Social.tsx";
import { AppContext } from "deco-sites/niivu-bank/apps/site.ts";

/** @titleBy label */
export interface Item {
  label: string;
  href: string;
  /**
   *  @title É para fora do site?
   *  @description Esse campo serve para definir se o link vai abrir ou não uma nova aba.
   */
  isOutside?: boolean;
}

/** @titleBy alt */
export interface SocialMedia {
  /** @title Imagem */
  image: ImageWidget;
  alt: string;
  href: string;
  /**
   *  @title É para fora do site?
   *  @description Esse campo serve para definir se o link vai abrir ou não uma nova aba.
   */
  isOutside?: boolean;
}

/** @titleBy title */
export interface Section {
  /** @title Título */
  title: string;
  links: Item[];
}

/** @titleBy title */
export interface SocialSection {
  /** @title Título */
  title: string;
  links: SocialMedia[];
}

export interface Props {
  /** @title Seções  */
  sections: Section[];
  logo: ImageWidget;
  /**
   * @format html
   * @title Texto rico
   */
  richText: string;
  /** @title Mídias sociais */
  socialMedia: SocialSection;
}

export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  return { ...props, isDesktop: ctx.device === "desktop" };
};

function Footer(
  { sections, logo, richText, socialMedia, isDesktop }: ReturnType<
    typeof loader
  >,
) {
  const Divider = () => <div class="h-px w-full bg-white" />;
  return (
    <div class="bg-[#414042]">
      <footer class="container flex flex-col py-10 gap-20 text-white">
        <div
          class={`flex flex-wrap justify-start ${
            isDesktop ? "gap-6" : "flex-col"
          }`}
        >
          {sections.map((props) => <Links {...props} isDesktop={isDesktop} />)}
        </div>
        {isDesktop && <Divider />}
        <div class="flex justify-between items-center py-8 flex-wrap gap-16">
          {isDesktop && (
            <Image
              src={logo}
              width={212}
              height={63}
              decoding={"async"}
              loading={"lazy"}
            />
          )}
          {isDesktop && (
            <div
              class="max-w-[312px] lg:max-w-[478px]"
              dangerouslySetInnerHTML={{ __html: richText }}
            />
          )}
          <Social {...socialMedia} />
          {!isDesktop && (
            <div class="flex flex-col gap-7">
              <Image
                src={logo}
                width={212}
                height={63}
                decoding={"async"}
                loading={"lazy"}
              />
              <div
                class="max-w-[312px] lg:max-w-[478px]"
                dangerouslySetInnerHTML={{ __html: richText }}
              />
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}

export default Footer;

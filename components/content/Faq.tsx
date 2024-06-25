import { AppContext } from "site/apps/site.ts";
import Collapse from "../ui/Collapse.tsx";
import { Section } from "deco/blocks/section.ts";

/** @titleBy title */
export interface Accordion {
  /** @title Título */
  title: string;
  /**
   * @format rich-text
   * @title Descrição
   */
  description: string;
}

export interface Props {
  /** @title Título */
  title?: string;
  /** @title Posição do título */
  titlePosition: "aside" | "collum";
  accordions: Accordion[];
  /** @title Seção */
  section?: Section;
}

export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  return { ...props, isDesktop: ctx.device === "desktop" };
};

function Faq(
  { title, section, accordions, titlePosition, isDesktop }: ReturnType<
    typeof loader
  >,
) {
  return (
    <div class="container flex flex-col gap-6 py-10 sm:py-20">
      <div
        class={`flex gap-6 max-lg:flex-wrap ${
          titlePosition === "aside"
            ? "justify-between"
            : "flex-col justify-center"
        }`}
      >
        {title && (
          <p class="font-bold text-2xl sm:text-3xl text-[#404042] max-sm:max-w-64">
            {title}
          </p>
        )}
        <div class="flex flex-col justify-start pt-2 sm:pt-10 gap-6">
          {accordions.map(({ title, description }) => (
            <Collapse title={title} isDesktop={isDesktop}>
              <div
                class="px-6 pb-6"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </Collapse>
          ))}
        </div>
      </div>
      {section && <section.Component {...section.props} />}
    </div>
  );
}

export default Faq;

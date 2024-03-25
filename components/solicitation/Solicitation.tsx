import PersonalForm from "$store/components/solicitation/PersonalForm.tsx";
import AddressForm from "$store/components/solicitation/AddressForm.tsx";
import CorporationForm from "$store/components/solicitation/CorporationForm.tsx";
import Form from "$store/islands/Form.tsx";
import IsToRender from "$store/islands/RenderCorpForm.tsx";
import WarningConsent from "$store/components/solicitation/WarningConsent.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { AppContext } from "deco-sites/niivu-bank/apps/site.ts";

/**
 * @titleBy alt
 */
export interface Banner {
  /**
   * @description the image's width is 496px
   */
  image: ImageWidget;
  /** @title Altura da Imagem */
  height: number;
  alt: string;
}

export interface Props {
  /** @title Passos */
  steps: string[];
  /**
   * @format html
   * @title Texto rico
   */
  richText: string;

  /**
   * @format html
   * @title Texto de Aviso
   */
  disclaimerText: string;
  banners?: Banner[];
}

export function loader(props: Props, _req: Request, ctx: AppContext) {
  return {
    ...props,
    isDesktop: ctx.device === "desktop",
  };
}

function Solicitation(
  { steps, richText, disclaimerText, banners, isDesktop }: ReturnType<
    typeof loader
  >,
) {
  return (
    <div class="layout flex lg:flex-row gap-4">
      <div class="flex flex-col gap-4 w-full">
        {/** breadcrump */}
        <div class="flex gap-4">
          {steps.map((step, index) => (
            <span class={`${index === 0 && "font-bold"} text-sm`}>{step}</span>
          ))}
        </div>
        <div dangerouslySetInnerHTML={{ __html: richText }} />
        <Form>
          <PersonalForm />
          <AddressForm />
          <IsToRender>
            <CorporationForm />
          </IsToRender>
          <WarningConsent disclaimerText={disclaimerText} />
        </Form>
      </div>
      {banners?.length && isDesktop && (
        <div class="flex flex-col gap-4 max-lg:hidden">
          {banners.map(({ alt, image, height }) => (
            <Image src={image} width={496} height={height} alt={alt} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Solicitation;

import { Card } from "../components/ui/card/index.tsx";
import { AvailableIcons } from "deco-sites/niivu-bank/components/ui/Icon.tsx";

/**
 * @title {{title}}
 */
interface CardData {
  /**
   * @title Icones
   * @format icon-select
   * @options deco-sites/niivu-bank/loaders/customAdmin/AllIcons.ts
   */
  icons?: AvailableIcons;
  /**
   * @title Titulo
   */
  title?: string;
  /**
   * @title Descrição
   */
  description?: string;
}

interface Props {
  /**
   * @title Titulo da sessão
   */
  title: string;

  /**
   * @title Configuração dos cards
   */
  cards: CardData[];

  /**
   * @description Aqui é para definir a cor de fundo
   * @title cor
   * @format color-input
   */
  color?: string;
}

export default function CardsSection({ title, cards, color }: Props) {
  return (
    <div class="relative">
      <div className="grid grid-cols-3 gap-x-8 gap-y-8 pl-[174px] pr-[170px] pb-28">
        <p class="col-start-1 text-4xl text-start">
          <strong>{title}</strong>
        </p>
        {cards.map(({ title, description, icons }, index) => (
          <div
            key={index}
            className={`${
              index >= 2
                ? `row-2 col-start-${index - 1}`
                : `col-start-${index + 2}`
            }`}
          >
            <Card.Root>
              <Card.Icons id={icons} size={32} />
              <Card.Title title={title} />
              <Card.Description description={description} />
            </Card.Root>
          </div>
        ))}
      </div>
      <div
        class="absolute bg-accent h-full w-full -z-10 top-52"
        style={{ backgroundColor: color ?? "#F1F1F1" }}
      >
      </div>
    </div>
  );
}

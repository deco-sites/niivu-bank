import Icon, {
  AvailableIcons,
} from "site/components/ui/Icon.tsx";

interface Props {
  title?: string;
  id: AvailableIcons;
  description?: string;
}

export default function Card({ title, id, description }: Props) {
  return (
    <div class="w-full min-h-64 bg-white border border-[##E0E0E0] shadow-lg rounded-2xl md:rounded p-8 space-y-2">
      <Icon size={32} id={id} />
      <h1 class="text-base font-bold truncate">
        {title}
      </h1>
      <p class="h-full text-sm font-normal">
        {description}
      </p>
    </div>
  );
}

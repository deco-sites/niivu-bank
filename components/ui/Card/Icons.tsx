import Icon, {
  AvailableIcons,
} from "deco-sites/niivu-bank/components/ui/Icon.tsx";

interface Props {
  size?: number;
  id?: AvailableIcons;
}

export default function Icons({ size, id }: Props) {
  if (!id) {
    return <></>;
  }
  return <Icon size={size ?? 32} id={id} />;
}

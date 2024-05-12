interface Props {
  description?: string;
}
export default function Description({ description }: Props) {
  if (!description) return <></>;
  return (
    <p class="h-full text-sm font-normal">
      {description}
    </p>
  );
}

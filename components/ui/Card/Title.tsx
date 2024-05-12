interface Props {
  title?: string;
}

export default function Title({ title }: Props) {
  if (!title) return <></>;
  return (
    <h1 class="text-base font-bold truncate">
      {title}
    </h1>
  );
}

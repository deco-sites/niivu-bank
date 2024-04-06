interface Props {
  title: string;
  subTitle?: string;
  class?: string;
}

export default function Title({ title, subTitle, class: _class }: Props) {
  return (
    <div class={`text-primary ${_class}`}>
      <h1 class="font-bold leading-10 tracking-tight">
        {title}
      </h1>
      {subTitle &&
        (
          <h2 class="text-sm text-primary">
            {subTitle}
          </h2>
        )}
    </div>
  );
}

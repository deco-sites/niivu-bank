import { ComponentChildren } from "preact";

export interface Props {
  children: ComponentChildren;
}

function Container({ children }: Props) {
  return (
    <div class="flex flex-col lg:flex-row gap-5 flex-grow">
      {children}
    </div>
  );
}

export default Container;

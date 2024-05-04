import type { ComponentChildren } from "preact";

export interface Props {
  children: ComponentChildren;
  id: string;
}

const Container = ({ children, id }: Props) => {
  return (
    <div id={id} className="dropdown dropdown-bottom w-full z-50">
      {children}
    </div>
  );
};

export default Container;

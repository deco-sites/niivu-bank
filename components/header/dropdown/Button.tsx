import type { ComponentChildren } from "preact";

export interface Props {
    children?: ComponentChildren;
    id: string;
    class: string;
}

function Button({ children, id, class: _class }: Props) {

    return (
        <div tabindex={0} class={_class}
            onClick={() => {
                const parentElement = document.getElementById(id);
                parentElement!.classList.toggle('dropdown-open');
                (document!.activeElement as HTMLElement).blur();
            }} >
            {children}
        </div>
    );
}

export default Button;
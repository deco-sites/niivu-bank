import type { ComponentChildren } from "preact";
import Button from "deco-sites/niivu-bank/components/header/dropdown/Button.tsx";

export interface Props {
    children: ComponentChildren;
    id: string;
}

function Content({ children, id }: Props) {
    return (
        <div tabIndex={0} class="dropdown-content w-full overflow-hidden left-0">
            <>
                {children}
                <Button class="bg-black opacity-40 w-full h-screen" id={id} />
            </>
        </div>
    );
}

export default Content;
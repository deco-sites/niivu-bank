import type { ComponentChildren } from "preact";
import { invoke } from "$store/runtime.ts";

export interface Props {
  children: ComponentChildren;
}

function TestButton({ children }: Props) {
  return (
    <button
      onClick={async () =>
        console.log(
          await invoke({
            key: "deco-sites/niivu-bank/loaders/actions/singin.ts",
            props: {
              email: "galam89095@fashlend.com",
              password: "vx)Kp:Dv58[1",
            },
          }),
        )}
    >
      {children}
    </button>
  );
}

export default TestButton;

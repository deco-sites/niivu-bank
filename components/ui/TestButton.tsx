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
            key: "deco-sites/niivu-bank/loaders/actions/solicitation.ts",
            props: {
              "phone": "+1 (555) 123-4567",
              "zip_code": "12345678",
              "street": "123 Main Street",
              "number": "101",
              "complement": "Apartment 2B",
              "city": "Cityville",
              "state": "State",
              "email": "example@example.com",
              "full_name": "ABC Company",
              "cpf": "704.047.121-34",
              type: "CPF",
            },
          }),
        )}
    >
      {children}
    </button>
  );
}

export default TestButton;

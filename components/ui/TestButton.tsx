import type { ComponentChildren } from "preact";
import { useSupabase } from "$store/packs/hooks/useSupabase.ts";

export interface Props {
  onClick: () => void;
  children: ComponentChildren;
}

function TestButton({ onClick, children }: Props) {
  const { register } = useSupabase();
  return (
    <button
      onClick={async () =>
        console.log(
          await register({
            "phone": "+1 (555) 123-4567",
            address: {
              "zip_code": "12345678",
              "street": "123 Main Street",
              "number": "101",
              "complement": "Apartment 2B",
              "city": "Cityville",
              "state": "State",
            },
            "email": "example@example.com",
            "full_name": "ABC Company",
            "cpf": "12345678912",
            type: "CPF",
          }),
        )}
    >
      {children}
    </button>
  );
}

export default TestButton;

import Cep from "$store/islands/Cep.tsx";
import StandardInput from "$store/components/ui/inputs/Standard.tsx";
import Divider from "$store/components/ui/Divider.tsx";
import Container from "$store/components/ui/inputs/Container.tsx";
import { RefObject } from "preact";
import type { Inputs } from "./Solicitation.tsx";
import { useUI } from "deco-sites/niivu-bank/sdk/useUI.ts";
import {
  ERROR_REQUIRED,
  PLACEHOLDER_CITY,
  PLACEHOLDER_COMPLEMENT,
  PLACEHOLDER_NUMBER,
  PLACEHOLDER_STATE,
  PLACEHOLDER_STREET,
  PLACEHOLDER_ZIP_CODE,
} from "deco-sites/niivu-bank/components/solicitation/constants.ts";
export interface Props {
  formRef: RefObject<HTMLFormElement>;
  inputs?: Inputs;
}

function AddressForm({ formRef, inputs }: Props) {
  const { errosForm } = useUI();
  const { state, street, zip_code, city, complement, number } = errosForm.value;
  return (
    <>
      <p class="font-bold py-2">
        <span>Endereço</span>
      </p>
      <Divider />
      <div class="flex flex-col gap-4 py-8">
        <Container>
          <Cep
            placeholder={inputs?.cep.placeholder ?? PLACEHOLDER_ZIP_CODE}
            formRef={formRef}
            messageError={zip_code ? ERROR_REQUIRED : undefined}
          />

          <StandardInput
            labelText="Rua / Avenida"
            id="street"
            placeholder={inputs?.street.placeholder ?? PLACEHOLDER_STREET}
            required
            disabled
            messageError={street ? ERROR_REQUIRED : undefined}
          />
        </Container>

        <Container>
          <StandardInput
            labelText="Número"
            id="number"
            placeholder={inputs?.number.placeholder ?? PLACEHOLDER_NUMBER}
            required
            messageError={number ? ERROR_REQUIRED : undefined}
          />

          <StandardInput
            labelText="Complemento"
            id="complement"
            placeholder={inputs?.complement.placeholder ??
              PLACEHOLDER_COMPLEMENT}
            messageError={complement ? ERROR_REQUIRED : undefined}
          />
        </Container>

        <Container>
          <StandardInput
            labelText="Cidade"
            id="city"
            placeholder={inputs?.city.placeholder ?? PLACEHOLDER_CITY}
            required
            disabled
            messageError={city ? ERROR_REQUIRED : undefined}
          />

          <StandardInput
            labelText="Estado"
            id="state"
            placeholder={inputs?.state.placeholder ??
              PLACEHOLDER_STATE}
            maxlength={2}
            required
            disabled
            messageError={state ? ERROR_REQUIRED : undefined}
          />
        </Container>
      </div>
    </>
  );
}

export default AddressForm;

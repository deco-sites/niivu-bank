import Cep from "$store/islands/Cep.tsx";
import StandardInput from "$store/components/ui/inputs/Standard.tsx";
import Divider from "$store/components/ui/Divider.tsx";
import Container from "$store/components/ui/inputs/Container.tsx";
import { RefObject } from "preact";
import type { Inputs } from "./Solicitation.tsx";
export interface Props {
  formRef: RefObject<HTMLFormElement>;
  inputs?: Inputs;
}

function AddressForm({ formRef, inputs }: Props) {
  return (
    <>
      <p class="font-bold py-2">
        <span>Endereço</span>
      </p>
      <Divider />
      <div class="flex flex-col gap-4 py-8">
        <Container>
          <Cep
            placeholder={inputs?.cep.placeholder ?? "Digite Seu Cep Aqui"}
            formRef={formRef}
          />

          <StandardInput
            labelText="Rua / Avenida"
            id="street"
            placeholder={inputs?.street.placeholder ?? "Digite Sua Rua Aqui"}
            required
            disabled
          />
        </Container>

        <Container>
          <StandardInput
            labelText="Número"
            id="number"
            placeholder={inputs?.number.placeholder ?? "xxx"}
            required
          />

          <StandardInput
            labelText="Complemento"
            id="complement"
            placeholder={inputs?.complement.placeholder ??
              "Digite Seu Complemento Aqui"}
          />
        </Container>

        <Container>
          <StandardInput
            labelText="Cidade"
            id="city"
            placeholder={inputs?.city.placeholder ?? "Digite Sua Cidade Aqui"}
            required
            disabled
          />

          <StandardInput
            labelText="Estado"
            id="state"
            placeholder={inputs?.state.placeholder ??
              "Digite Seu Estado aqui. Ex: RJ"}
            maxlength={2}
            required
            disabled
          />
        </Container>
      </div>
    </>
  );
}

export default AddressForm;

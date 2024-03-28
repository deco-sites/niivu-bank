import LegalCep from "$store/islands/Cep.tsx";
import StandardInput from "$store/components/ui/inputs/Standard.tsx";
import Divider from "$store/components/ui/Divider.tsx";
import Container from "$store/components/ui/inputs/Container.tsx";
import { RefObject } from "preact";

export interface Props {
  formRef: RefObject<HTMLFormElement>;
}

function CorporationForm({ formRef }: Props) {
  return (
    <>
      <p class="font-bold py-2">
        <span>Dados da Empresa</span>
      </p>
      <Divider />
      <div class="flex flex-col gap-4 py-8">
        <Container>
          <StandardInput
            labelText="Razão Social"
            id="corporate-reason"
            placeholder="Digite a Razão Social Aqui"
            required
          />

          <StandardInput
            labelText="CNPJ"
            id="CNPJ"
            placeholder="Digite Seu CNPJ Aqui"
            required
          />
        </Container>

        <Container>
          <LegalCep formRef={formRef} prefix={"legal"} />

          <StandardInput
            labelText="Rua / Avenida"
            id="legal-street"
            placeholder="Digite Sua Rua Aqui"
            required
            disabled
          />
        </Container>

        <Container>
          <StandardInput
            labelText="Número"
            id="legal-number"
            placeholder="xxx"
            required
          />

          <StandardInput
            labelText="Complemento"
            id="legal-complement"
            placeholder="Digite Seu Complemento Aqui"
          />
        </Container>

        <Container>
          <StandardInput
            labelText="Cidade"
            id="legal-city"
            placeholder="Digite Sua Cidade Aqui"
            required
            disabled
          />

          <StandardInput
            labelText="Estado"
            id="legal-state"
            placeholder="Digite Seu Estado aqui. Ex: RJ"
            maxlength={2}
            required
            disabled
          />
        </Container>
      </div>
    </>
  );
}

export default CorporationForm;

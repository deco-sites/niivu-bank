import LegalCep from "$store/islands/Cep.tsx";
import StandardInput from "$store/components/ui/inputs/Standard.tsx";
import Divider from "$store/components/ui/Divider.tsx";
import Container from "$store/components/ui/inputs/Container.tsx";
import { RefObject } from "preact";
import Cnpj from "$store/islands/Cnpj.tsx";
import type { Inputs } from "./Solicitation.tsx";
import { useUI } from "deco-sites/niivu-bank/sdk/useUI.ts";
import {
  ERROR_REQUIRED,
  PLACEHOLDER_CITY,
  PLACEHOLDER_CNPJ,
  PLACEHOLDER_COMPLEMENT,
  PLACEHOLDER_CORPORATE_REASON,
  PLACEHOLDER_NUMBER,
  PLACEHOLDER_STREET,
  PLACEHOLDER_ZIP_CODE,
} from "deco-sites/niivu-bank/components/solicitation/constants.ts";

export interface Props {
  formRef: RefObject<HTMLFormElement>;
  inputs?: Inputs;
}

function CorporationForm({ formRef, inputs }: Props) {
  const { errosForm } = useUI();
  const {
    business_name,
    legal_city,
    legal_state,
    legal_number,
    legal_street,
    legal_zip_code,
    legal_complement,
    CNPJ,
  } = errosForm.value;
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
            id="business_name"
            placeholder={inputs?.corporateReason.placeholder ??
              PLACEHOLDER_CORPORATE_REASON}
            required
            messageError={business_name ? ERROR_REQUIRED : undefined}
          />

          <Cnpj
            placeholder={inputs?.cnpj.placeholder ?? PLACEHOLDER_CNPJ}
            messageError={CNPJ.empty
              ? ERROR_REQUIRED
              : CNPJ.invalid
              ? CNPJ.message
              : undefined}
          />
        </Container>

        <Container>
          <LegalCep
            placeholder={inputs?.cep.placeholder ?? PLACEHOLDER_ZIP_CODE}
            formRef={formRef}
            prefix={"legal"}
            messageError={legal_zip_code ? ERROR_REQUIRED : undefined}
          />

          <StandardInput
            labelText="Rua / Avenida"
            id="legal_street"
            placeholder={inputs?.street.placeholder ?? PLACEHOLDER_STREET}
            required
            disabled
            messageError={legal_street ? ERROR_REQUIRED : undefined}
          />
        </Container>

        <Container>
          <StandardInput
            labelText="Número"
            id="legal_number"
            placeholder={inputs?.number.placeholder ?? PLACEHOLDER_NUMBER}
            required
            messageError={legal_number ? ERROR_REQUIRED : undefined}
          />

          <StandardInput
            labelText="Complemento"
            id="legal_complement"
            placeholder={inputs?.complement.placeholder ??
              PLACEHOLDER_COMPLEMENT}
            messageError={legal_complement ? ERROR_REQUIRED : undefined}
          />
        </Container>

        <Container>
          <StandardInput
            labelText="Cidade"
            id="legal_city"
            placeholder={inputs?.city.placeholder ?? PLACEHOLDER_CITY}
            required
            disabled
            messageError={legal_city ? ERROR_REQUIRED : undefined}
          />

          <StandardInput
            labelText="Estado"
            id="legal_state"
            placeholder={inputs?.state.placeholder ??
              PLACEHOLDER_STREET}
            maxlength={2}
            required
            disabled
            messageError={legal_state ? ERROR_REQUIRED : undefined}
          />
        </Container>
      </div>
    </>
  );
}

export default CorporationForm;

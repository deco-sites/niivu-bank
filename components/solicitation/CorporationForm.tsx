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
import { showFormError } from "deco-sites/niivu-bank/utils/showFormError.ts";
import { useFormErrors } from "deco-sites/niivu-bank/sdk/useFormErros.tsx";

export interface Props {
  formRef: RefObject<HTMLFormElement>;
  inputs?: Inputs;
}

function CorporationForm({ formRef, inputs }: Props) {
  const { errors } = useFormErrors();
  const {
    business_name,
    legal_city,
    legal_state,
    legal_number,
    legal_street,
    legal_zip_code,
    legal_complement,
    CNPJ,
  } = errors.value;
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
            messageError={showFormError(business_name)}
          />

          <Cnpj
            placeholder={inputs?.cnpj.placeholder ?? PLACEHOLDER_CNPJ}
            messageError={showFormError(CNPJ)}
          />
        </Container>

        <Container>
          <LegalCep
            placeholder={inputs?.cep.placeholder ?? PLACEHOLDER_ZIP_CODE}
            formRef={formRef}
            prefix={"legal"}
            messageError={showFormError(legal_zip_code)}
          />

          <StandardInput
            labelText="Rua / Avenida"
            id="legal_street"
            placeholder={inputs?.street.placeholder ?? PLACEHOLDER_STREET}
            required
            disabled
            messageError={showFormError(legal_street)}
          />
        </Container>

        <Container>
          <StandardInput
            labelText="Número"
            id="legal_number"
            placeholder={inputs?.number.placeholder ?? PLACEHOLDER_NUMBER}
            required
            messageError={showFormError(legal_number)}
          />

          <StandardInput
            labelText="Complemento"
            id="legal_complement"
            placeholder={inputs?.complement.placeholder ??
              PLACEHOLDER_COMPLEMENT}
            messageError={showFormError(legal_complement)}
          />
        </Container>

        <Container>
          <StandardInput
            labelText="Cidade"
            id="legal_city"
            placeholder={inputs?.city.placeholder ?? PLACEHOLDER_CITY}
            required
            disabled
            messageError={showFormError(legal_city)}
          />

          <StandardInput
            labelText="Estado"
            id="legal_state"
            placeholder={inputs?.state.placeholder ??
              PLACEHOLDER_STREET}
            maxlength={2}
            required
            disabled
            messageError={showFormError(legal_state)}
          />
        </Container>
      </div>
    </>
  );
}

export default CorporationForm;

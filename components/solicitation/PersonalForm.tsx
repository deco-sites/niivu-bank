import StandardInput from "$store/components/ui/inputs/Standard.tsx";
import Divider from "$store/components/ui/Divider.tsx";
import Container from "$store/components/ui/inputs/Container.tsx";
import Cpf from "$store/islands/Cpf.tsx";
import type { Inputs } from "./Solicitation.tsx";
import {
  PLACEHOLDER_CPF,
  PLACEHOLDER_NAME,
  PLACEHOLDER_PHONE,
  PLACEHOLDER_RG,
} from "deco-sites/niivu-bank/components/solicitation/constants.ts";
import { useFormErrors } from "deco-sites/niivu-bank/sdk/useFormErros.tsx";
import { showFormError } from "deco-sites/niivu-bank/utils/showFormError.ts";
import PhoneFormatter from "deco-sites/niivu-bank/components/solicitation/Phone.tsx";

export interface Props {
  inputs?: Inputs;
}

function personalForm({ inputs }: Props) {
  const { errors } = useFormErrors();
  const { full_name, phone, cpf } = errors.value;
  return (
    <>
      <p class="font-bold py-2">
        <span class="font-bold py-2">Dados Pessoais</span>
      </p>
      <Divider />
      <div class="flex flex-col gap-4 py-8">
        <StandardInput
          labelText="Nome"
          id="full_name"
          placeholder={inputs?.name.placeholder ?? PLACEHOLDER_NAME}
          required
          messageError={showFormError(full_name)}
        />

        <Container>
          <Cpf
            placeholder={inputs?.cpf.placeholder ?? PLACEHOLDER_CPF}
            messageError={showFormError(cpf)}
          />

          <StandardInput
            labelText="RG"
            id="rg"
            maxLength={20}
            placeholder={inputs?.RG.placeholder ?? PLACEHOLDER_RG}
          />
        </Container>

        <PhoneFormatter
          placeholder={inputs?.phone.placeholder ?? PLACEHOLDER_PHONE}
          messageError={showFormError(phone)}
        />
      </div>
    </>
  );
}

export default personalForm;

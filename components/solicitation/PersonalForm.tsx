import StandardInput from "$store/components/ui/inputs/Standard.tsx";
import Divider from "$store/components/ui/Divider.tsx";
import Container from "$store/components/ui/inputs/Container.tsx";
import Cpf from "$store/islands/Cpf.tsx";
import type { Inputs } from "./Solicitation.tsx";

export interface Props {
  inputs?: Inputs;
}

function personalForm({ inputs }: Props) {
  return (
    <>
      <p class="font-bold py-2">
        <span class="font-bold py-2">Dados Pessoais</span>
      </p>
      <Divider />
      <div class="flex flex-col gap-4 py-8">
        <StandardInput
          labelText="Nome"
          id="name"
          placeholder={inputs?.name.placeholder ?? "Nome Completo"}
          required
        />

        <Container>
          <Cpf placeholder={inputs?.cpf.placeholder ?? "xxx.xxx.xxx-xx"} />

          <StandardInput
            labelText="RG"
            id="rg"
            placeholder={inputs?.RG.placeholder ?? "Digite seu RG aqui"}
          />
        </Container>

        <StandardInput
          labelText="Telefone"
          id="phone"
          placeholder={inputs?.phone.placeholder ?? "+55 (xx) xxxxx-xxxx"}
          required
        />
      </div>
    </>
  );
}

export default personalForm;

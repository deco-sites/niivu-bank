import StandardInput from "$store/components/ui/inputs/Standard.tsx";
import Divider from "$store/components/ui/Divider.tsx";
import Container from "$store/components/ui/inputs/Container.tsx";

function personalForm() {
  return (
    <>
      <p class="font-bold py-2"><span class="font-bold py-2">Dados Pessoais</span></p>
      <Divider />
      <div class="flex flex-col gap-4 py-8">
        <StandardInput
          labelText="Nome"
          id="name"
          placeholder="Nome Completo"
          required
        />

        <Container>
          <StandardInput
            labelText="CPF"
            id="cpf"
            placeholder="xxx.xxx.xxx-xx"
            required
          />

          <StandardInput
            labelText="RG"
            id="rg"
            placeholder="Digite seu RG aqui"
          />
        </Container>

        <StandardInput
          labelText="Telefone"
          id="phone"
          placeholder="+55 (xx) xxxxx-xxxx"
          required
        />
      </div>
    </>
  );
}

export default personalForm;

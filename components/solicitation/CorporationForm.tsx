import { LegalCep } from "$store/islands/Cep.tsx";
import StandardInput from "$store/components/ui/inputs/Standard.tsx";

function CorporationForm() {
  const divider = <div class="w-full h-[1px] bg-black bg-opacity-40" />;
  return (
    <>
      <span class="font-bold py-2">Dados da Empresa</span>
      {divider}
      <div class="flex flex-col gap-4 py-8">
        <div class="flex flex-col lg:flex-row gap-2 flex-grow">
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
        </div>

        <div class="flex flex-col lg:flex-row gap-2 flex-grow">
          <LegalCep />

          <StandardInput
            labelText="Rua / Avenida"
            id="legal-street"
            placeholder="Digite Sua Rua Aqui"
            required
          />
        </div>

        <div class="flex flex-col lg:flex-row gap-2 flex-grow">
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
            required
          />
        </div>

        <div class="flex flex-col lg:flex-row gap-2 flex-grow">
          <StandardInput
            labelText="Cidade"
            id="legal-city"
            placeholder="Digite Sua Cidade Aqui"
            required
          />

          <StandardInput
            labelText="Estado"
            id="legal-state"
            placeholder="Digite Seu Estado aqui"
            required
          />
        </div>
      </div>
    </>
  );
}

export default CorporationForm;

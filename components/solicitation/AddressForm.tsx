import { Cep } from "$store/islands/Cep.tsx";
import StandardInput from "$store/components/ui/inputs/Standard.tsx";

function AddressForm() {
  const divider = <div class="w-full h-[1px] bg-black bg-opacity-40" />;

  return (
    <>
      <span class="font-bold py-2">Endereço</span>
      {divider}
      <div class="flex flex-col gap-4 py-8">
        <div class="flex flex-col lg:flex-row gap-2 flex-grow">
          <Cep />

          <StandardInput
            labelText="Rua / Avenida"
            id="street"
            placeholder="Digite Sua Rua Aqui"
            required
          />
        </div>

        <div class="flex flex-col lg:flex-row gap-2 flex-grow">
          <StandardInput
            labelText="Número"
            id="number"
            placeholder="xxx"
            required
          />

          <StandardInput
            labelText="Complemento"
            id="complement"
            placeholder="Digite Seu Complemento Aqui"
          />
        </div>

        <div class="flex flex-col lg:flex-row gap-2 flex-grow">
          <StandardInput
            labelText="Cidade"
            id="city"
            placeholder="Digite Sua Cidade Aqui"
            required
          />

          <StandardInput
            labelText="Estado"
            id="state"
            placeholder="Digite Seu Estado aqui. Ex: RJ"
            maxlength={2}
            required
          />
        </div>
      </div>
    </>
  );
}

export default AddressForm;

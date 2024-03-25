import StandardInput from "$store/components/ui/inputs/Standard.tsx";

function personalForm() {
  const divider = <div class="w-full h-[1px] bg-black bg-opacity-40" />;
  return (
    <>
      <span class="font-bold py-2">Dados Pessoais</span>
      {divider}
      <div class="flex flex-col gap-4 py-8">
        <StandardInput
          labelText="Nome"
          id="name"
          placeholder="Nome Completo"
          required
        />

        <div class="flex flex-col lg:flex-row gap-2 flex-grow">
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
            required
          />
        </div>

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

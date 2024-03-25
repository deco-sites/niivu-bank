function personalForm() {
  const divider = <div class="w-full h-[1px] bg-black bg-opacity-40" />;
  return (
    <>
      <span class="font-bold py-2">Dados Pessoais</span>
      {divider}
      <div class="flex flex-col gap-4 py-8">
        <div class="flex flex-col gap-1 flex-grow">
          <label class="text-primary font-medium" htmlFor="name">
            <span>Nome</span>
          </label>
          <input
            class="input border border-black rounded-t-lg"
            type="text"
            id="name"
            name="name"
            placeholder="Nome Completo"
            required
          />
        </div>
        <div class="flex flex-col lg:flex-row gap-2 flex-grow">
          <div class="flex flex-col gap-1 flex-grow">
            <label class="text-primary font-medium" htmlFor="cpf">
              <span>CPF</span>
            </label>
            <input
              class="input border border-black rounded-t-lg"
              type="text"
              id="cpf"
              name="cpf"
              placeholder="xxx.xxx.xxx-xx"
              required
            />
          </div>

          <div class="flex flex-col gap-1 flex-grow">
            <label class="text-primary font-medium" htmlFor="rg">
              <span>RG</span>
            </label>
            <input
              class="input border border-black rounded-t-lg"
              type="text"
              id="rg"
              name="rg"
              placeholder="Digite seu RG aqui"
              required
            />
          </div>
        </div>
        <div class="flex flex-col lg:flex-row gap-2 flex-grow">
          <div class="flex flex-col gap-1 flex-grow">
            <label class="text-primary font-medium" htmlFor="phone">
              <span>Telefone</span>
            </label>
            <input
              class="input border border-black rounded-t-lg"
              type="text"
              id="phone"
              name="phone"
              placeholder="+55 (xx) xxxxx-xxxx"
              required
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default personalForm;

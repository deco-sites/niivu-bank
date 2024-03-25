import { LegalCep } from "$store/islands/Cep.tsx"

function CorporationForm() {
  const divider = <div class="w-full h-[1px] bg-black bg-opacity-40" />;
  return (
    <>
      <span class="font-bold py-2">Dados da Empresa</span>
      {divider}
      <div class="flex flex-col gap-4 py-8">
        <div class="flex flex-col lg:flex-row gap-2 flex-grow">
          <div class="flex flex-col gap-1 flex-grow">
            <label class="text-primary font-medium" htmlFor="corporate-reason">
              <span>Razão Social</span>
            </label>
            <input
              class="input border border-black rounded-t-lg"
              type="text"
              id="corporate-reason"
              name="corporate-reason"
              placeholder="Digite a Razão Social Aqui"
              required
            />
          </div>

          <div class="flex flex-col gap-1 flex-grow">
            <label class="text-primary font-medium" htmlFor="CNPJ">
              <span>CNPJ</span>
            </label>
            <input
              class="input border border-black rounded-t-lg"
              type="text"
              id="CNPJ"
              name="CNPJ"
              placeholder="Digite Seu CNPJ Aqui"
              required
            />
          </div>
        </div>

        <div class="flex flex-col lg:flex-row gap-2 flex-grow">
        <LegalCep />

          <div class="flex flex-col gap-1 flex-grow">
            <label class="text-primary font-medium" htmlFor="legal-street">
              <span>Rua / Avenida</span>
            </label>
            <input
              class="input border border-black rounded-t-lg"
              type="text"
              id="legal-street"
              name="legal-street"
              placeholder="Digite Sua Rua Aqui"
              required
            />
          </div>
        </div>

        <div class="flex flex-col lg:flex-row gap-2 flex-grow">
          <div class="flex flex-col gap-1 flex-grow">
            <label class="text-primary font-medium" htmlFor="legal-number">
              <span>Número</span>
            </label>
            <input
              class="input border border-black rounded-t-lg"
              type="text"
              id="legal-number"
              name="legal-number"
              placeholder="xxx"
              required
            />
          </div>

          <div class="flex flex-col gap-1 flex-grow">
            <label class="text-primary font-medium" htmlFor="legal-complement">
              <span>Complemento</span>
            </label>
            <input
              class="input border border-black rounded-t-lg"
              type="text"
              id="legal-complement"
              name="legal-complement"
              placeholder="Digite Seu Complemento Aqui"
              required
            />
          </div>
        </div>

        <div class="flex flex-col lg:flex-row gap-2 flex-grow">
          <div class="flex flex-col gap-1 flex-grow">
            <label class="text-primary font-medium" htmlFor="legal-city">
              <span>Cidade</span>
            </label>
            <input
              class="input border border-black rounded-t-lg"
              type="text"
              id="legal-city"
              name="legal-city"
              placeholder="Digite Sua Cidade Aqui"
              required
            />
          </div>

          <div class="flex flex-col gap-1 flex-grow">
            <label class="text-primary font-medium" htmlFor="legal-state">
              <span>Estado</span>
            </label>
            <input
              class="input border border-black rounded-t-lg"
              type="text"
              id="legal-state"
              name="legal-state"
              placeholder="Digite Seu Estado aqui"
              required
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CorporationForm;

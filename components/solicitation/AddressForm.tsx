import { Cep } from "$store/islands/Cep.tsx"

function AddressForm() {
  const divider = <div class="w-full h-[1px] bg-black bg-opacity-40" />;

  return (
    <>
      <span class="font-bold py-2">Endereço</span>
      {divider}
      <div class="flex flex-col gap-4 py-8">
        <div class="flex flex-col lg:flex-row gap-2 flex-grow">
          <Cep />

          <div class="flex flex-col gap-1 flex-grow">
            <label class="text-primary font-medium" htmlFor="street">
              <span>Rua / Avenida</span>
            </label>
            <input
              class="input border border-black rounded-t-lg"
              type="text"
              id="street"
              name="street"
              placeholder="Digite Sua Rua Aqui"
              required
            />
          </div>
        </div>

        <div class="flex flex-col lg:flex-row gap-2 flex-grow">
          <div class="flex flex-col gap-1 flex-grow">
            <label class="text-primary font-medium" htmlFor="number">
              <span>Número</span>
            </label>
            <input
              class="input border border-black rounded-t-lg"
              type="text"
              id="number"
              name="number"
              placeholder="xxx"
              required
            />
          </div>

          <div class="flex flex-col gap-1 flex-grow">
            <label class="text-primary font-medium" htmlFor="complement">
              <span>Complemento</span>
            </label>
            <input
              class="input border border-black rounded-t-lg"
              type="text"
              id="complement"
              name="complement"
              placeholder="Digite Seu Complemento Aqui"
              required
            />
          </div>
        </div>

        <div class="flex flex-col lg:flex-row gap-2 flex-grow">
          <div class="flex flex-col gap-1 flex-grow">
            <label class="text-primary font-medium" htmlFor="city">
              <span>Cidade</span>
            </label>
            <input
              class="input border border-black rounded-t-lg"
              type="text"
              id="city"
              name="city"
              placeholder="Digite Sua Cidade Aqui"
              required
            />
          </div>

          <div class="flex flex-col gap-1 flex-grow">
            <label class="text-primary font-medium" htmlFor="state">
              <span>Estado</span>
            </label>
            <input
              class="input border border-black rounded-t-lg"
              type="text"
              id="state"
              name="state"
              placeholder="Digite Seu Estado aqui"
              required
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default AddressForm;

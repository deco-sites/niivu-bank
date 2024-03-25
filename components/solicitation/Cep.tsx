import { invoke } from "$store/runtime.ts";

export function Cep() {
  const getCep = async (
    e: Event,
  ) => {
    const dataInput = (e.target as HTMLInputElement).value ?? "";
    const cep = dataInput.replace(/\D/g, "");

    if (cep.length === 8) {
      const response = await invoke({
        key: "deco-sites/niivu-bank/loaders/actions/getCep.ts",
        props: {
          cep,
        },
      });

      if (response?.status) {
        return;
      }

      (document.getElementById("cep") as HTMLInputElement)!.value =
        response.cep ?? "";
      (document.getElementById("street") as HTMLInputElement)!.value =
        response.street ?? "";
      (document.getElementById("complement") as HTMLInputElement)!.value =
        response.complement ?? "";
      (document.getElementById("city") as HTMLInputElement)!.value =
        response.city ?? "";
      (document.getElementById("state") as HTMLInputElement)!.value =
        response.state ?? "";
    }
  };
  return (
    <div class="flex flex-col gap-1 flex-grow">
      <label class="text-primary font-medium" htmlFor="cep">
        <span>CEP</span>
      </label>
      <input
        onInput={getCep}
        class="input border border-black rounded-t-lg"
        type="text"
        id="cep"
        name="cep"
        placeholder="Digite Seu Cep Aqui"
        required
      />
    </div>
  );
}

export function LegalCep() {
  const getCep = async (
    e: Event,
  ) => {
    const dataInput = (e.target as HTMLInputElement).value ?? "";
    const cep = dataInput.replace(/\D/g, "");

    if (cep.length === 8) {
      const response = await invoke({
        key: "deco-sites/niivu-bank/loaders/actions/getCep.ts",
        props: {
          cep,
        },
      });

      if (response?.status) {
        return;
      }

      (document.getElementById("legal-CEP") as HTMLInputElement)!.value =
        response.cep ?? "";
      (document.getElementById("legal-street") as HTMLInputElement)!.value =
        response.street ?? "";
      (document.getElementById("legal-complement") as HTMLInputElement)!.value =
        response.complement ?? "";
      (document.getElementById("legal-city") as HTMLInputElement)!.value =
        response.city ?? "";
      (document.getElementById("legal-state") as HTMLInputElement)!.value =
        response.state ?? "";
    }
  };
  return (
    <div class="flex flex-col gap-1 flex-grow">
      <label class="text-primary font-medium" htmlFor="legal-CEP">
        <span>CEP</span>
      </label>
      <input
        onInput={getCep}
        class="input border border-black rounded-t-lg"
        type="text"
        id="legal-CEP"
        name="legal-CEP"
        placeholder="Digite Seu Cep Aqui"
        required
      />
    </div>
  );
}

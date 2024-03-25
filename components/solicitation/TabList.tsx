function TabList() {
  return (
    <div role="tablist" class="tabs tabs-bordered m-auto">
      <input
        class="tab checked:text-secondary checked:!border-secondary"
        type="radio"
        name="my_tabs_1"
        id="physical-person"
        value="CPF"
        role="tab"
        aria-label="Pessoa Fisíca"
        checked
      />
      <input
        class="tab checked:text-secondary checked:!border-secondary"
        type="radio"
        name="my_tabs_1"
        id="legal-person"
        value="CNPJ"
        role="tab"
        aria-label="Pessoa Jurídica"
      />
    </div>
  );
}

export default TabList;

/**
 * Obtém os valores dos elementos de um formulário HTML.
 * @param {Event} e - O evento que acionou a função, geralmente um evento de submissão de formulário.
 * @returns {Record<string, string>} Um objeto contendo os valores dos elementos do formulário, onde as chaves são os nomes dos elementos e os valores são os seus valores correspondentes.
 */
export default function getFormValues(e: Event): Record<string, string> {
  const formValues: Record<string, string> = {};
  const formElements = (e.currentTarget as HTMLFormElement).elements;

  for (const element of formElements) {
    if (!(element instanceof HTMLInputElement)) continue;

    const { name, value, type } = element;
    if (!name) continue;
    if ((type === "checkbox" || type === "radio") && !element.checked) continue;

    formValues[name] = value;
  }

  return formValues;
}

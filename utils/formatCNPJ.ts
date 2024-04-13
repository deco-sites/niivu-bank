/**
 * Formats a CNPJ number into the standard format "XX.XXX.XXX.YYYY-ZZ".
 * @param {string} cnpj - The CNPJ number to be formatted.
 * @returns {string} The formatted CNPJ number.
 */

export default function formatCNPJ(cnpj: string) {
  const numericCnpj = cnpj.replace(/\D/g, "");

  const part1 = numericCnpj.slice(0, 2);
  const part2 = numericCnpj.slice(2, 5);
  const part3 = numericCnpj.slice(5, 8);
  const part4 = numericCnpj.slice(8, 12);
  const part5 = numericCnpj.slice(12, 14);

  return `${part1}.${part2}.${part3}.${part4}-${part5}`;
}

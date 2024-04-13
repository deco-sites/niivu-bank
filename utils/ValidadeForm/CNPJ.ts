/**
 * Validates a CNPJ number.
 * @param {string} cnpj The CNPJ to be validated, in the format "##.###.###/####-##".
 * @returns {boolean} True if the CNPJ is valid, false otherwise.
 */
export default function validateCNPJ(cnpj: string): boolean {
  const cleanCnpj = cnpj.replace(/\D/g, "");

  if (cleanCnpj.length !== 14 || /^(\d)\1{13}$/.test(cleanCnpj)) {
    return false;
  }

  const calcDigit = (slice: string, factor: number) => {
    let sum = 0;
    for (let i = 0; i < slice.length; i++) {
      sum += parseInt(slice[i]) * factor--;
      if (factor === 1) factor = 9;
    }
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const digit1 = calcDigit(cleanCnpj.slice(0, 12), 5);
  const digit2 = calcDigit(cleanCnpj.slice(0, 13), 6);

  return parseInt(cleanCnpj[12]) === digit1 &&
    parseInt(cleanCnpj[13]) === digit2;
}

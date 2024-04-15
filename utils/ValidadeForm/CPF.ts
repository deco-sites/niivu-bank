/**
 * Validates a CPF number.
 * @param {string} cpf The CPF to be validated, in the format "###.###.###-##".
 * @returns {boolean} True if the CPF is valid, false otherwise.
 */
export default function validateCPF(cpf: string): boolean {
  cpf = cpf.replace(/\D/g, "");

  if (cpf.length !== 11) {
    return false;
  }

  if (/^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  const sumDigit1 = cpf.split("")
    .slice(0, 9)
    .reduce((sum, digit, index) => sum + parseInt(digit) * (10 - index), 0);
  const remainder1 = sumDigit1 % 11;
  const digit1 = remainder1 < 2 ? 0 : 11 - remainder1;

  if (parseInt(cpf.charAt(9)) !== digit1) {
    return false;
  }

  const sumDigit2 = cpf.split("")
    .slice(0, 10)
    .reduce((sum, digit, index) => sum + parseInt(digit) * (11 - index), 0);
  const remainder2 = sumDigit2 % 11;
  const digit2 = remainder2 < 2 ? 0 : 11 - remainder2;

  if (parseInt(cpf.charAt(10)) !== digit2) {
    return false;
  }

  return true;
}

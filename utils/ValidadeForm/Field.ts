/**
 * Verifica se o valor de uma string atende ao comprimento mínimo especificado.
 * @param {string | undefined} value - O valor a ser validado.
 * @param {number} minLength - O comprimento mínimo esperado para o valor.
 * @returns {boolean} Retorna true se o valor atender ao comprimento mínimo especificado, caso contrário retorna false.
 */
export default function validateField(
  value: string | undefined,
  minLength: number,
): boolean {
  return !!value && value.length >= minLength;
}

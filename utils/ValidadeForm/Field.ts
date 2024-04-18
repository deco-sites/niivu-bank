/**
 * Checks if the value of a string meets the specified minimum length.
 * @param {string | undefined} value - The value to be validated.
 * @param {number} minLength - The minimum expected length for the value.
 * @returns {boolean} Returns true if the value meets the specified minimum length, otherwise returns false.
 */
export default function validateField(
  value: string | undefined,
  minLength: number,
): boolean {
  return !!value && value.length >= minLength;
}

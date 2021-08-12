export function parseInteger(input: string): number {
  if (!/^-?\d+$/.test(input)) {
    throw new Error(`Value is not integer: '${input}'`);
  }

  return Number.parseInt(input, 10);
}

export function padNonNegativeIntWithZeroes(
  value: number,
  maxLength: number
): string {
  if (!Number.isInteger(value) || value < 0) {
    throw new Error("'value' must be an integer greater or equal to zero");
  }

  if (!Number.isInteger(maxLength) || maxLength <= 0) {
    throw new Error("'maxLength' must be an positive greater than zero");
  }

  return value.toString().padStart(maxLength, '0');
}

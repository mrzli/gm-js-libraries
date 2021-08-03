export function parseInteger(input: string): number {
  if (!/^-?\d+$/.test(input)) {
    throw new Error(`Value is not integer: '${input}'`);
  }

  return Number.parseInt(input, 10);
}

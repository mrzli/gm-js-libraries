export function createArrayOfLength(length: number): readonly unknown[] {
  return [...new Array<undefined>(length)];
}

export function fillArrayOfLengthWithValue<T>(
  length: number,
  content: T
): readonly T[] {
  return createArrayOfLength(length).map(() => content);
}

export function fillArrayOfLengthWithValueMapper<T>(
  length: number,
  valueMapper: (index: number) => T
): readonly T[] {
  return createArrayOfLength(length).map((_, index) => valueMapper(index));
}

import { Nullish } from '../types';
import { isNotNullish } from '../generic';

export function transformIfExists<T, U>(
  value: Nullish<T>,
  transformer: (input: T) => U,
  defaultValue: Nullish<U>
): Nullish<U> {
  return isNotNullish(value) ? transformer(value) : defaultValue;
}

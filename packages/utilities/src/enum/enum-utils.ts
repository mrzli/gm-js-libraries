import { StringEnumLike, ValueOf } from '../types';

export function getEnumValues<T extends StringEnumLike>(
  enumType: T
): readonly ValueOf<T>[] {
  return Object.values(enumType) as unknown as readonly ValueOf<T>[];
}

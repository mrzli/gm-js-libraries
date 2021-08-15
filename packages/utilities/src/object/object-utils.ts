import { Except } from 'type-fest';
import { AnyObject } from '../types';

export function objectGetKeys<T extends AnyObject, K extends keyof T = keyof T>(
  obj: T
): readonly K[] {
  return Object.keys(obj) as unknown as readonly K[];
}

export function objectOmitFields<T extends AnyObject, K extends keyof T>(
  obj: T,
  fieldsToOmit: readonly K[]
): Except<T, K> {
  const fieldsToOmitSet = new Set<K>(fieldsToOmit);
  const result = objectGetKeys<T, K>(obj).reduce((acc, key) => {
    if (!fieldsToOmitSet.has(key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {} as Partial<T>);
  return result as Except<T, K>;
}

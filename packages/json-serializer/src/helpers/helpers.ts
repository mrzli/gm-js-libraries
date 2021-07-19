import {
  JsonEntryArray,
  JsonEntryField,
  JsonEntryObject,
  JsonEntryType
} from '../types/json-entry';
import { JsonValueType } from '../types/json-value';

export function entryFieldString(key: string, value: string): JsonEntryField {
  return {
    type: JsonEntryType.Field,
    key,
    value: { type: JsonValueType.String, value }
  };
}

export function entryFieldArray(
  key: string,
  value: readonly JsonEntryArray[]
): JsonEntryField {
  return {
    type: JsonEntryType.Field,
    key,
    value: { type: JsonValueType.Array, value }
  };
}

export function entryFieldObject(
  key: string,
  value: readonly JsonEntryObject[]
): JsonEntryField {
  return {
    type: JsonEntryType.Field,
    key,
    value: { type: JsonValueType.Object, value }
  };
}

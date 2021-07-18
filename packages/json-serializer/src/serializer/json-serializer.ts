import {
  JsonValue,
  JsonValueArray,
  JsonValueObject,
  JsonValueType
} from '../types/json-value';
import { JsonSerializerOptions } from '../types/json-serializer-options';
import {
  JsonEntry,
  JsonEntryField,
  JsonEntryObject,
  JsonEntryType
} from '../types/json-entry';
import {
  getArrayEndString,
  getArrayStartString,
  getEntryNonValueString,
  getEntryWithValueString,
  getIncrementedIndent,
  getObjectEndString,
  getObjectStartString,
  getPrimitiveValueString,
  JsonEntryWithValue
} from './json-serializer-helpers';
import {
  arrayFindLastIndexOfWithPredicate,
  arrayGetPrimitiveDuplicates,
  arrayHasPrimitiveDuplicates
} from '@mrzli/gm-js-libraries-utilities/array';

export function jsonSerialize(
  value: JsonValue,
  options: JsonSerializerOptions
): string {
  return jsonSerializeValue(value, options, 0).concat('\n');
}

function jsonSerializeValue(
  value: JsonValue,
  options: JsonSerializerOptions,
  currentIndent: number
): string {
  switch (value.type) {
    case JsonValueType.Null:
    case JsonValueType.String:
    case JsonValueType.Number:
    case JsonValueType.Boolean:
      return getPrimitiveValueString(value);
    case JsonValueType.Array:
      return jsonSerializeArray(value, options, currentIndent);
    case JsonValueType.Object:
      return jsonSerializeObject(value, options, currentIndent);
  }
}

function jsonSerializeArray(
  value: JsonValueArray,
  options: JsonSerializerOptions,
  currentIndent: number
): string {
  if (value.value.length === 0) {
    return '[]';
  }

  const entriesString = jsonSerializeEntries(value, options, currentIndent);
  return getArrayStartString()
    .concat(entriesString)
    .concat(getArrayEndString(currentIndent));
}

function jsonSerializeObject(
  value: JsonValueObject,
  options: JsonSerializerOptions,
  currentIndent: number
): string {
  const entries: readonly JsonEntryObject[] = value.value;
  if (entries.length === 0) {
    return '{}';
  }

  const keys = entries
    .filter((entry) => entry.type === JsonEntryType.Field)
    .map((entry) => (entry as JsonEntryField).key);

  const duplicateKeys: readonly string[] = arrayGetPrimitiveDuplicates(keys);
  if (duplicateKeys.length > 0) {
    throw new Error(
      `Duplicate field values: '${JSON.stringify(duplicateKeys)}'`
    );
  }

  const entriesString = jsonSerializeEntries(value, options, currentIndent);
  return getObjectStartString()
    .concat(entriesString)
    .concat(getObjectEndString(currentIndent));
}

function jsonSerializeEntries(
  value: JsonValueArray | JsonValueObject,
  options: JsonSerializerOptions,
  currentIndent: number
): string {
  const incrementedIndent = getIncrementedIndent(currentIndent, options);
  const entries: readonly JsonEntry[] = value.value;
  const lastEntryWithValueIndex = arrayFindLastIndexOfWithPredicate(
    entries,
    (entry) => entry.type !== JsonEntryType.NonValue
  );

  return entries.reduce((acc, entry, index) => {
    const isLastEntryWithValue = index === lastEntryWithValueIndex;
    const entryString = jsonSerializeEntry(
      entry,
      options,
      incrementedIndent,
      isLastEntryWithValue
    );
    return acc.concat(entryString).concat('\n');
  }, '');
}

function jsonSerializeEntry(
  entry: JsonEntry,
  options: JsonSerializerOptions,
  currentIndent: number,
  isLastEntryWithValue: boolean
): string {
  switch (entry.type) {
    case JsonEntryType.NonValue:
      return getEntryNonValueString(entry, options, currentIndent);
    case JsonEntryType.ArrayItem:
    case JsonEntryType.Field: {
      const meaningfulPayload = getEntryWithValueMeaningfulPayload(
        entry,
        options,
        currentIndent
      );
      return getEntryWithValueString(
        meaningfulPayload,
        entry,
        options,
        currentIndent,
        isLastEntryWithValue
      );
    }
  }
}

function getEntryWithValueMeaningfulPayload(
  entry: JsonEntryWithValue,
  options: JsonSerializerOptions,
  currentIndent: number
): string {
  switch (entry.type) {
    case JsonEntryType.ArrayItem:
      return jsonSerializeValue(entry.value, options, currentIndent);
    case JsonEntryType.Field:
      return `"${entry.key}": `.concat(
        jsonSerializeValue(entry.value, options, currentIndent)
      );
  }
}

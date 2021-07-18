import {
  JsonValue,
  JsonValueArray,
  JsonValueObject,
  JsonValueType
} from '../types/json-value';
import { JsonSerializerOptions } from '../types/json-serializer-options';
import { JsonEntry, JsonEntryArray, JsonEntryType } from '../types/json-entry';
import {
  createDelimiter,
  createIndent,
  getEntryNonValueString,
  getEntryWithValueString,
  getIncrementedIndent,
  getPrimitiveValueString,
  JsonEntryWithValue
} from './json-serializer-helpers';

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
  const incrementedIndent = getIncrementedIndent(currentIndent, options);
  const entries: readonly JsonEntryArray[] = value.value;
  // const lastEntryWithValueIndex = entries.lastIndexOf((entry) =>)
  return '[\n';
}

function jsonSerializeObject(
  value: JsonValueObject,
  options: JsonSerializerOptions,
  currentIndent: number
): string {
  return '';
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

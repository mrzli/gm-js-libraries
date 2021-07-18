import {
  JsonValueBoolean,
  JsonValueNull,
  JsonValueNumber,
  JsonValueString,
  JsonValueType
} from '../types/json-value';
import {
  JsonEntry,
  JsonEntryArrayItem,
  JsonEntryField,
  JsonEntryNonValue
} from '../types/json-entry';
import { JsonSerializerOptions } from '../types/json-serializer-options';

export type JsonPrimitiveValue =
  | JsonValueNull
  | JsonValueString
  | JsonValueNumber
  | JsonValueBoolean;

export function getPrimitiveValueString(value: JsonPrimitiveValue): string {
  switch (value.type) {
    case JsonValueType.Null:
      return `null`;
    case JsonValueType.String:
      return `"${value.value}"`;
    case JsonValueType.Number:
      return value.value.toString();
    case JsonValueType.Boolean:
      return value.value.toString();
  }
}

export function getEntryNonValueString(
  entry: JsonEntryNonValue,
  options: JsonSerializerOptions,
  currentIndent: number
): string {
  return hasEntryComment(entry, options)
    ? `${getIndent(currentIndent)}// ${entry.comment}`
    : '';
}

export type JsonEntryWithValue = JsonEntryArrayItem | JsonEntryField;

export function getEntryWithValueString(
  meaningfulValueString: string,
  entry: JsonEntryWithValue,
  options: JsonSerializerOptions,
  currentIndent: number,
  isLastEntryWithValue: boolean
) {
  return getIndent(currentIndent)
    .concat(meaningfulValueString)
    .concat(getDelimiter(isLastEntryWithValue))
    .concat(getEntryWithValueComment(entry, options));
}

function hasEntryComment(
  entry: JsonEntry,
  options: JsonSerializerOptions
): boolean {
  return options.allowComments && entry.comment !== undefined;
}

function getEntryWithValueComment(
  entry: JsonEntryWithValue,
  options: JsonSerializerOptions
): string {
  return hasEntryComment(entry, options) ? ` // ${entry.comment}` : '';
}

function getIndent(indentSize: number): string {
  if (indentSize === 0) {
    return '';
  } else {
    return ' '.repeat(indentSize);
  }
}

function getDelimiter(isLastEntryWithValue: boolean): string {
  return isLastEntryWithValue ? ',' : '';
}

export function getIncrementedIndent(
  currentIndent: number,
  options: JsonSerializerOptions
): number {
  return currentIndent + options.spaces;
}

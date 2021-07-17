import { JsonValueNull } from './specific/json-value-null';
import { JsonValueString } from './specific/json-value-string';
import { JsonValueNumber } from './specific/json-value-number';
import { JsonValueBoolean } from './specific/json-value-boolean';
import { JsonValueArray } from './specific/json-value-array';
import { JsonValueObject } from './specific/json-value-object';

export type JsonValue =
  | JsonValueNull
  | JsonValueString
  | JsonValueNumber
  | JsonValueBoolean
  | JsonValueArray
  | JsonValueObject;

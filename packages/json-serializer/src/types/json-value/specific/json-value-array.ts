import { JsonValueType } from '../json-value-type';
import { JsonValueBase } from '../json-value-base';
import { JsonEntryArray } from '../../json-entry';

export interface JsonValueArray extends JsonValueBase {
  readonly type: JsonValueType.SingleLineArray;
  readonly value: readonly JsonEntryArray[];
}

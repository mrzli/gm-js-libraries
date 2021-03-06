import { JsonValueType } from '../json-value-type';
import { JsonValueBase } from '../json-value-base';
import { JsonEntryObject } from '../../json-entry';

export interface JsonValueObject extends JsonValueBase {
  readonly type: JsonValueType.Object;
  readonly value: readonly JsonEntryObject[];
}

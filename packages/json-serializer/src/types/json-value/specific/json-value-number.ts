import { JsonValueType } from '../json-value-type';
import { JsonValueBase } from '../json-value-base';

export interface JsonValueNumber extends JsonValueBase {
  readonly type: JsonValueType.Number;
  readonly value: number;
}

import { JsonValueType } from '../json-value-type';
import { JsonValueBase } from '../json-value-base';

export interface JsonValueString extends JsonValueBase {
  readonly type: JsonValueType.String;
  readonly value: string;
}

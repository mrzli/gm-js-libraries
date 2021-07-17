import { JsonValueType } from '../json-value-type';
import { JsonValueBase } from '../json-value-base';

export interface JsonValueBoolean extends JsonValueBase {
  readonly type: JsonValueType.Boolean;
  readonly value: boolean;
}

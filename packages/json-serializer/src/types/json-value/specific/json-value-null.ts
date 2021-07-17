import { JsonValueType } from '../json-value-type';
import { JsonValueBase } from '../json-value-base';

export interface JsonValueNull extends JsonValueBase {
  readonly type: JsonValueType.Null;
}

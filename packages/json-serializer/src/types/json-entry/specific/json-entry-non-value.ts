import { JsonEntryType } from '../json-entry-type';
import { JsonEntryBase } from '../json-entry-base';

export interface JsonEntryNonValue extends JsonEntryBase {
  readonly type: JsonEntryType.NonValue;
}

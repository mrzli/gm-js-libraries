import { JsonValue } from '../../json-value';
import { JsonEntryType } from '../json-entry-type';
import { JsonEntryBase } from '../json-entry-base';

export interface JsonEntryArrayItem extends JsonEntryBase {
  readonly type: JsonEntryType.ArrayItem;
  readonly value: JsonValue;
}

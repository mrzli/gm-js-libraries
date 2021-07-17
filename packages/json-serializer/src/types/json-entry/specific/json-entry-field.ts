import { JsonValue } from '../../json-value';
import { JsonEntryType } from '../json-entry-type';
import { JsonEntryBase } from '../json-entry-base';

export interface JsonEntryField extends JsonEntryBase {
  readonly type: JsonEntryType.Field;
  readonly key: string;
  readonly value: JsonValue;
}

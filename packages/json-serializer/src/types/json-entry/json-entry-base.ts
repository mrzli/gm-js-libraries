import { JsonEntryType } from './json-entry-type';

export interface JsonEntryBase {
  readonly type: JsonEntryType;
  readonly comment?: string;
}

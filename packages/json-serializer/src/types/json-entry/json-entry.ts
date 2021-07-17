import { JsonEntryNonValue } from './specific/json-entry-non-value';
import { JsonEntryArrayItem } from './specific/json-entry-array-item';
import { JsonEntryField } from './specific/json-entry-field';

export type JsonEntryArray = JsonEntryNonValue | JsonEntryArrayItem;

export type JsonEntryObject = JsonEntryNonValue | JsonEntryField;

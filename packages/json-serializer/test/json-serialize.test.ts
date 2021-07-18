import { jsonSerialize } from '../src/serializer/json-serializer';
import { JsonSerializerOptions } from '../src/types/json-serializer-options';
import {
  JsonValue,
  JsonValueArray,
  JsonValueObject,
  JsonValueType
} from '../src/types/json-value';
import { JsonEntryType } from '../src/types/json-entry';

describe('json-serialize', () => {
  describe('jsonSerialize()', () => {
    const DEFAULT_OPTIONS: JsonSerializerOptions = {
      allowComments: true,
      spaces: 2
    };

    describe('primitive values', () => {
      interface Example {
        readonly input: JsonValue;
        readonly expected: string;
      }

      const EXAMPLES: readonly Example[] = [
        {
          input: { type: JsonValueType.Null },
          expected: 'null\n'
        },
        {
          input: { type: JsonValueType.String, value: 'some string' },
          expected: '"some string"\n'
        },
        {
          input: { type: JsonValueType.Number, value: 15 },
          expected: '15\n'
        },
        {
          input: { type: JsonValueType.Boolean, value: true },
          expected: 'true\n'
        }
      ];

      EXAMPLES.forEach((example) => {
        it(JSON.stringify(example), () => {
          expect(jsonSerialize(example.input, DEFAULT_OPTIONS)).toEqual(
            example.expected
          );
        });
      });
    });

    describe('simple array', () => {
      interface Example {
        readonly input: JsonValueArray;
        readonly expected: string;
      }

      const EXAMPLES: readonly Example[] = [
        {
          input: {
            type: JsonValueType.Array,
            value: [
              {
                type: JsonEntryType.ArrayItem,
                value: { type: JsonValueType.String, value: 'string 01' }
              },
              {
                type: JsonEntryType.ArrayItem,
                value: { type: JsonValueType.String, value: 'string 02' }
              },
              {
                type: JsonEntryType.ArrayItem,
                value: { type: JsonValueType.String, value: 'string 03' }
              }
            ]
          },
          expected: '[\n  "string 01",\n  "string 02",\n  "string 03"\n]\n'
        }
      ];

      EXAMPLES.forEach((example) => {
        it(JSON.stringify(example), () => {
          expect(jsonSerialize(example.input, DEFAULT_OPTIONS)).toEqual(
            example.expected
          );
        });
      });
    });

    describe('simple object', () => {
      interface Example {
        readonly input: JsonValueObject;
        readonly expected: string;
      }

      const EXAMPLES: readonly Example[] = [
        {
          input: {
            type: JsonValueType.Object,
            value: [
              {
                type: JsonEntryType.Field,
                key: 'field1',
                value: { type: JsonValueType.String, value: 'string 01' }
              },
              {
                type: JsonEntryType.Field,
                key: 'field2',
                value: { type: JsonValueType.String, value: 'string 02' }
              },
              {
                type: JsonEntryType.Field,
                key: 'field3',
                value: { type: JsonValueType.String, value: 'string 03' }
              }
            ]
          },
          expected:
            '{\n  "field1": "string 01",\n  "field2": "string 02",\n  "field3": "string 03"\n]\n'
        }
      ];

      EXAMPLES.forEach((example) => {
        it(JSON.stringify(example), () => {
          expect(jsonSerialize(example.input, DEFAULT_OPTIONS)).toEqual(
            example.expected
          );
        });
      });
    });

    // TODO GM: test for duplicate fields (requires validation in serializer, and a separate utility project and method in it that checks for primitive duplicates)
  });
});

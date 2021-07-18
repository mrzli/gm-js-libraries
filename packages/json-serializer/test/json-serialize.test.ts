import { jsonSerialize } from '../src/serializer/json-serializer';
import { JsonSerializerOptions } from '../src/types/json-serializer-options';
import {
  JsonValue,
  JsonValueArray,
  JsonValueObject,
  JsonValueType
} from '../src/types/json-value';
import { JsonEntryType } from '../src/types/json-entry';
import { readFileAsString } from '@mrzli/gm-js-libraries-file-system/file-system';
import { resolvePath } from '@mrzli/gm-js-libraries-file-system/path';

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
            '{\n  "field1": "string 01",\n  "field2": "string 02",\n  "field3": "string 03"\n}\n'
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

    describe('complex examples', () => {
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
                type: JsonEntryType.NonValue,
                comment: 'comment in root'
              },
              {
                type: JsonEntryType.NonValue
              },
              {
                type: JsonEntryType.Field,
                key: 'fieldNull',
                value: { type: JsonValueType.Null }
              },
              {
                type: JsonEntryType.Field,
                key: 'fieldString',
                value: { type: JsonValueType.String, value: 'string in root' },
                comment: 'comment in root, next to string'
              },
              {
                type: JsonEntryType.Field,
                key: 'fieldNumber',
                value: { type: JsonValueType.Number, value: 11 }
              },
              {
                type: JsonEntryType.Field,
                key: 'fieldBoolean',
                value: { type: JsonValueType.Boolean, value: true }
              },
              {
                type: JsonEntryType.Field,
                key: 'fieldEmptyArray',
                value: { type: JsonValueType.Array, value: [] }
              },
              {
                type: JsonEntryType.Field,
                key: 'fieldEmptyObject',
                value: { type: JsonValueType.Object, value: [] }
              },
              {
                type: JsonEntryType.Field,
                key: 'fieldArray',
                value: {
                  type: JsonValueType.Array,
                  value: [
                    {
                      type: JsonEntryType.NonValue,
                      comment: 'comment in nested array'
                    },
                    {
                      type: JsonEntryType.NonValue
                    },
                    {
                      type: JsonEntryType.ArrayItem,
                      value: { type: JsonValueType.Null }
                    },
                    {
                      type: JsonEntryType.ArrayItem,
                      value: {
                        type: JsonValueType.String,
                        value: 'string in nested array'
                      },
                      comment: 'comment in nested array, next to string'
                    },
                    {
                      type: JsonEntryType.ArrayItem,
                      value: { type: JsonValueType.Number, value: 12 }
                    },
                    {
                      type: JsonEntryType.ArrayItem,
                      value: { type: JsonValueType.Boolean, value: false }
                    },
                    {
                      type: JsonEntryType.ArrayItem,
                      value: { type: JsonValueType.Array, value: [] }
                    },
                    {
                      type: JsonEntryType.ArrayItem,
                      value: { type: JsonValueType.Object, value: [] }
                    },
                    {
                      type: JsonEntryType.ArrayItem,
                      value: {
                        type: JsonValueType.Array,
                        value: [
                          {
                            type: JsonEntryType.ArrayItem,
                            value: {
                              type: JsonValueType.String,
                              value: 'string in double nested array'
                            }
                          }
                        ]
                      }
                    },
                    {
                      type: JsonEntryType.ArrayItem,
                      value: {
                        type: JsonValueType.Object,
                        value: [
                          {
                            type: JsonEntryType.Field,
                            key: 'nestedInArrayField',
                            value: {
                              type: JsonValueType.String,
                              value: 'nested in array string'
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              {
                type: JsonEntryType.Field,
                key: 'fieldObject',
                value: {
                  type: JsonValueType.Object,
                  value: [
                    {
                      type: JsonEntryType.Field,
                      key: 'nestedField',
                      value: {
                        type: JsonValueType.String,
                        value: 'nested string'
                      }
                    }
                  ]
                }
              }
            ]
          },
          expected: 'complex-example001.txt'
        }
      ];

      EXAMPLES.forEach((example) => {
        it(JSON.stringify(example), async () => {
          const path = resolvePath(
            __dirname,
            `./json-serialize-test-expected/${example.expected}`
          );
          const expected = await readFileAsString(path);
          expect(jsonSerialize(example.input, DEFAULT_OPTIONS)).toEqual(
            expected
          );
        });
      });
    });

    describe('throws', () => {
      interface Example {
        readonly input: JsonValueObject;
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
                key: 'field1',
                value: { type: JsonValueType.String, value: 'string 03' }
              }
            ]
          }
        }
      ];

      EXAMPLES.forEach((example) => {
        it(JSON.stringify(example), () => {
          const call = (): string =>
            jsonSerialize(example.input, DEFAULT_OPTIONS);
          expect(call).toThrow();
        });
      });
    });
  });
});

import { objectGetKeys, objectOmitFields } from '../../../src/object';
import { AnyObject } from '../../../dist/types';

describe('object-utils', () => {
  interface ObjectType {
    readonly field1: string;
    readonly field2: string;
    readonly field3: number;
  }

  const INPUT_OBJECT: ObjectType = {
    field1: 'value1',
    field2: 'value2',
    field3: 3,
  };

  const COPY_OF_INPUT_OBJECT = { ...INPUT_OBJECT };

  describe('objectGetKeys()', () => {
    it('example', () => {
      const actual: readonly (keyof ObjectType)[] = objectGetKeys(INPUT_OBJECT);
      expect(actual).toEqual(['field1', 'field2', 'field3']);
    });
  });

  describe('objectOmitFields()', () => {
    interface Example {
      readonly input: {
        readonly fieldsToOmit: readonly (keyof ObjectType)[];
      };
      readonly expected: AnyObject;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: {
          fieldsToOmit: ['field1'],
        },
        expected: { field2: 'value2', field3: 3 },
      },
      {
        input: {
          fieldsToOmit: ['field1', 'field3'],
        },
        expected: { field2: 'value2' },
      },
      {
        input: {
          fieldsToOmit: ['field1', 'field2', 'field3'],
        },
        expected: {},
      },
    ];

    EXAMPLES.forEach((example) => {
      it(JSON.stringify(example), () => {
        const actual = objectOmitFields(
          INPUT_OBJECT,
          example.input.fieldsToOmit
        );
        expect(INPUT_OBJECT).toEqual(COPY_OF_INPUT_OBJECT);
        expect(actual).toEqual(example.expected);
        for (const field of example.input.fieldsToOmit) {
          expect((actual as ObjectType)[field]).toBeUndefined();
          expect(Object.prototype.hasOwnProperty.call(actual, field)).toEqual(
            false
          );
        }
      });
    });
  });
});

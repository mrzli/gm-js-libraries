import { objectGetKeys, objectOmitFields } from '../../../src/object';
import { AnyObject } from '../../../src/types';
import { objectPickFields } from '../../../src/object/object-utils';

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
          fieldsToOmit: [],
        },
        expected: { field1: 'value1', field2: 'value2', field3: 3 },
      },
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

  describe('objectPickFields()', () => {
    interface Example {
      readonly input: {
        readonly fieldsToPick: readonly (keyof ObjectType)[];
      };
      readonly expected: AnyObject;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: {
          fieldsToPick: [],
        },
        expected: {},
      },
      {
        input: {
          fieldsToPick: ['field2'],
        },
        expected: { field2: 'value2' },
      },
      {
        input: {
          fieldsToPick: ['field2', 'field3'],
        },
        expected: { field2: 'value2', field3: 3 },
      },
      {
        input: {
          fieldsToPick: ['field1', 'field2', 'field3'],
        },
        expected: { field1: 'value1', field2: 'value2', field3: 3 },
      },
    ];

    EXAMPLES.forEach((example) => {
      it(JSON.stringify(example), () => {
        const actual = objectPickFields(
          INPUT_OBJECT,
          example.input.fieldsToPick
        );
        expect(INPUT_OBJECT).toEqual(COPY_OF_INPUT_OBJECT);
        expect(actual).toEqual(example.expected);

        const fieldsToOmit = (
          Object.keys(INPUT_OBJECT) as (keyof ObjectType)[]
        ).filter((key) => !example.input.fieldsToPick.includes(key));

        for (const field of fieldsToOmit) {
          expect((actual as ObjectType)[field]).toBeUndefined();
          expect(Object.prototype.hasOwnProperty.call(actual, field)).toEqual(
            false
          );
        }
      });
    });
  });
});

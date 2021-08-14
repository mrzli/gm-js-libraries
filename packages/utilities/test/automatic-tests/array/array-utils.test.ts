import { SimpleValue } from '../../../src/types';
import { arrayGetPrimitiveDuplicates } from '../../../src/array';
import { Nullish } from '../../../src/types/generic';

describe('array-utils', () => {
  describe('arrayGetPrimitiveDuplicates()', () => {
    interface Example {
      readonly input: readonly Nullish<SimpleValue>[];
      readonly expected: readonly Nullish<SimpleValue>[];
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: [],
        expected: [],
      },
      {
        input: [0, false, '', undefined, null],
        expected: [],
      },
      {
        input: [1, '1'],
        expected: [],
      },
      {
        input: [1, 2, 3],
        expected: [],
      },
      {
        input: ['a', 'b', 'c'],
        expected: [],
      },
      {
        input: [true, false],
        expected: [],
      },
      {
        input: ['', ' '],
        expected: [],
      },
      {
        input: [1, 2, 1],
        expected: [1],
      },
      {
        input: [true, false, true],
        expected: [true],
      },
      {
        input: ['a', 'b', 'a'],
        expected: ['a'],
      },
      {
        input: [1, 2, 1, 1],
        expected: [1],
      },
      {
        input: [1, 2, 1, 2],
        expected: [1, 2],
      },
      {
        input: [2, 1, 2, 1],
        expected: [2, 1],
      },
    ];

    EXAMPLES.forEach((example) => {
      it(JSON.stringify(example), () => {
        expect(arrayGetPrimitiveDuplicates(example.input)).toEqual(
          example.expected
        );
      });
    });
  });
});

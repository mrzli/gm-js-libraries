import { parseInteger } from '../../../src/number/number-utils';

describe('number-utils', () => {
  describe('parseInteger()', () => {
    describe('valid', () => {
      interface Example {
        readonly input: string;
        readonly expected: number;
      }

      const EXAMPLES: readonly Example[] = [
        {
          input: '0',
          expected: 0
        },
        {
          input: '1',
          expected: 1
        },
        {
          input: '5',
          expected: 5
        },
        {
          input: '55',
          expected: 55
        },
        {
          input: '-1',
          expected: -1
        },
        {
          input: '-55',
          expected: -55
        }
      ];

      EXAMPLES.forEach((example) => {
        it(JSON.stringify(example), () => {
          expect(parseInteger(example.input)).toEqual(example.expected);
        });
      });
    });
  });

  describe('throws', () => {
    interface Example {
      readonly input: string;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: ''
      },
      {
        input: ' '
      },
      {
        input: 'a'
      },
      {
        input: '11a'
      },
      {
        input: '11.'
      },
      {
        input: '11.0'
      },
      {
        input: '11.1'
      },
      {
        input: 'a11'
      },
      {
        input: ' 11'
      }
    ];

    EXAMPLES.forEach((example) => {
      it(JSON.stringify(example), () => {
        expect(() => parseInteger(example.input)).toThrowError();
      });
    });
  });
});

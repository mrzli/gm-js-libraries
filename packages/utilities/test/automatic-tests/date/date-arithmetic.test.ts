import {
  dateToIsoStringPreciseUtc,
  isoStringPreciseUtcToDate,
} from '../../../src/date';
import { addTime, TimeUnit } from '../../../src/date/date-arithmetic';

describe('date-arithmetic', () => {
  describe('addTime()', () => {
    interface Example {
      readonly input: {
        readonly date: string;
        readonly amount: number;
        readonly timeUnit: TimeUnit;
      };
      readonly expected: string;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: {
          date: '2020-03-31T08:19:42.300Z',
          amount: 3,
          timeUnit: TimeUnit.Year,
        },
        expected: '2023-03-31T08:19:42.300Z',
      },
      {
        input: {
          date: '2020-03-31T08:19:42.300Z',
          amount: -2,
          timeUnit: TimeUnit.Year,
        },
        expected: '2018-03-31T08:19:42.300Z',
      },
      {
        input: {
          date: '2020-03-31T08:19:42.300Z',
          amount: 0,
          timeUnit: TimeUnit.Year,
        },
        expected: '2020-03-31T08:19:42.300Z',
      },
      {
        input: {
          date: '2020-03-31T08:19:42.300Z',
          amount: 2.3, // floor value used (2)
          timeUnit: TimeUnit.Year,
        },
        expected: '2022-03-31T08:19:42.300Z',
      },
      {
        input: {
          date: '2020-03-31T08:19:42.300Z',
          amount: -2.3, // floor value used (-3)
          timeUnit: TimeUnit.Year,
        },
        expected: '2017-03-31T08:19:42.300Z',
      },
      {
        input: {
          date: '2020-03-31T08:19:42.300Z',
          amount: 3,
          timeUnit: TimeUnit.Month,
        },
        expected: '2020-06-30T08:19:42.300Z', // there is no 2020-06-31
      },
      {
        input: {
          date: '2020-03-31T08:19:42.300Z',
          amount: 3,
          timeUnit: TimeUnit.Day,
        },
        expected: '2020-04-03T08:19:42.300Z',
      },
      {
        input: {
          date: '2020-03-31T08:19:42.300Z',
          amount: 3,
          timeUnit: TimeUnit.Hour,
        },
        expected: '2020-03-31T11:19:42.300Z',
      },
      {
        input: {
          date: '2020-03-31T08:19:42.300Z',
          amount: 3,
          timeUnit: TimeUnit.Minute,
        },
        expected: '2020-03-31T08:22:42.300Z',
      },
      {
        input: {
          date: '2020-03-31T08:19:42.300Z',
          amount: 3,
          timeUnit: TimeUnit.Second,
        },
        expected: '2020-03-31T08:19:45.300Z',
      },
      {
        input: {
          date: '2020-03-31T08:19:42.300Z',
          amount: 3,
          timeUnit: TimeUnit.Millisecond,
        },
        expected: '2020-03-31T08:19:42.303Z',
      },
      {
        input: {
          date: '2021-01-01T00:00:00.000Z',
          amount: -3,
          timeUnit: TimeUnit.Hour,
        },
        expected: '2020-12-31T21:00:00.000Z',
      },
    ];

    EXAMPLES.forEach((example) => {
      it(JSON.stringify(example), () => {
        const actual = dateToIsoStringPreciseUtc(
          addTime(
            isoStringPreciseUtcToDate(example.input.date),
            example.input.amount,
            example.input.timeUnit
          )
        );
        expect(actual).toEqual(example.expected);
      });
    });
  });
});

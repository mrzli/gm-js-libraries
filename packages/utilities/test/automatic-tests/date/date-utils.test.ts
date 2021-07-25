import { ReadonlyTuple2 } from '../../../src/types';
import {
  dateToIsoStringUtc,
  dateToMillisecondsSinceEpoch,
  isoStringToMillisecondsSinceEpoch,
  isoStringUtcToDate,
  millisecondSinceEpochToDate,
  millisecondsSinceEpochToIsoStringUtc
} from '../../../src/date';

describe('date-utils', () => {
  const EXAMPLE_ISO_DATES: readonly string[] = [
    '2021-01-01T00:00:00.000Z',
    '2022-12-19T19:43:33.000Z',
    '1985-03-20T10:33:13.015Z',
    '2020-03-31T08:19:42.300Z',
    '1997-12-04T18:38:06.000Z',
    '2011-08-21T10:56:02.000Z',
    '2005-08-16T16:24:11.000Z',
    '1996-09-16T20:53:40.000Z',
    '2017-02-09T11:14:05.000Z',
    '2005-03-11T00:17:14.000Z',
    '1996-03-26T11:44:26.000Z'
  ];

  const EXAMPLE_TIMESTAMPS: readonly number[] = [
    1609459200000, 1671479013000, 480162793015, 1585642782300, 881260686000,
    1313924162000, 1124209451000, 842907220000, 1486638845000, 1110500234000,
    827840666000
  ];

  const EXAMPLE_INVALID_ISO_UTC_DATES: readonly string[] = [
    '',
    ' ',
    '1',
    'a',
    'some random string',
    '2020',
    '2020-01-01',
    '2020-01-01T00:00:00',
    '2020-01-01T00:00:00Z',
    '2020-01-01T00:00:00.000',
    '2020-01-01T00:00:00.000+00:00',
    '2020-01-01T00:00:00.000+01:00',
    '2020-01-01T00:00:00.000+0100'
  ];

  const EXAMPLE_ISO_DATE_TIMESTAMP_PAIRS: readonly ReadonlyTuple2<
    string,
    number
  >[] = EXAMPLE_ISO_DATES.map((_value, index) => {
    return [
      EXAMPLE_ISO_DATES[index] as string,
      EXAMPLE_TIMESTAMPS[index] as number
    ];
  });

  describe('millisecondSinceEpochToDate()', () => {
    interface Example {
      readonly input: number;
      readonly expected: Date;
    }

    const EXAMPLES: readonly Example[] = EXAMPLE_ISO_DATE_TIMESTAMP_PAIRS.map(
      (pair) => ({ input: pair[1], expected: new Date(pair[0]) })
    );

    EXAMPLES.forEach((example) => {
      it(JSON.stringify(example), () => {
        const actual = millisecondSinceEpochToDate(example.input);
        expect(actual).toEqual(example.expected);
      });
    });
  });

  describe('millisecondsSinceEpochToIsoStringUtc()', () => {
    interface Example {
      readonly input: number;
      readonly expected: string;
    }

    const EXAMPLES: readonly Example[] = EXAMPLE_ISO_DATE_TIMESTAMP_PAIRS.map(
      (pair) => ({ input: pair[1], expected: pair[0] })
    );

    EXAMPLES.forEach((example) => {
      it(JSON.stringify(example), () => {
        const actual = millisecondsSinceEpochToIsoStringUtc(example.input);
        expect(actual).toEqual(example.expected);
      });
    });
  });

  describe('isoStringToMillisecondsSinceEpoch()', () => {
    describe('valid', () => {
      interface Example {
        readonly input: string;
        readonly expected: number;
      }

      const EXAMPLES: readonly Example[] = EXAMPLE_ISO_DATE_TIMESTAMP_PAIRS.map(
        (pair) => ({ input: pair[0], expected: pair[1] })
      );

      EXAMPLES.forEach((example) => {
        it(JSON.stringify(example), () => {
          const actual = isoStringToMillisecondsSinceEpoch(example.input);
          expect(actual).toEqual(example.expected);
        });
      });
    });

    describe('throws', () => {
      interface Example {
        readonly input: string;
      }

      const EXAMPLES: readonly Example[] = EXAMPLE_INVALID_ISO_UTC_DATES.map(
        (str) => ({ input: str })
      );

      EXAMPLES.forEach((example) => {
        it(JSON.stringify(example), () => {
          const call = (): number =>
            isoStringToMillisecondsSinceEpoch(example.input);
          expect(call).toThrow();
        });
      });
    });
  });

  describe('isoStringUtcToDate()', () => {
    describe('valid', () => {
      interface Example {
        readonly input: string;
        readonly expected: Date;
      }

      const EXAMPLES: readonly Example[] = EXAMPLE_ISO_DATE_TIMESTAMP_PAIRS.map(
        (pair) => ({ input: pair[0], expected: new Date(pair[0]) })
      );

      EXAMPLES.forEach((example) => {
        it(JSON.stringify(example), () => {
          const actual = isoStringUtcToDate(example.input);
          expect(actual).toEqual(example.expected);
        });
      });
    });

    describe('throws', () => {
      interface Example {
        readonly input: string;
      }

      const EXAMPLES: readonly Example[] = EXAMPLE_INVALID_ISO_UTC_DATES.map(
        (str) => ({ input: str })
      );

      EXAMPLES.forEach((example) => {
        it(JSON.stringify(example), () => {
          const call = (): Date => isoStringUtcToDate(example.input);
          expect(call).toThrow();
        });
      });
    });
  });

  describe('dateToMillisecondsSinceEpoch()', () => {
    interface Example {
      readonly input: Date;
      readonly expected: number;
    }

    const EXAMPLES: readonly Example[] = EXAMPLE_ISO_DATE_TIMESTAMP_PAIRS.map(
      (pair) => ({ input: new Date(pair[0]), expected: pair[1] })
    );

    EXAMPLES.forEach((example) => {
      it(JSON.stringify(example), () => {
        const actual = dateToMillisecondsSinceEpoch(example.input);
        expect(actual).toEqual(example.expected);
      });
    });
  });

  describe('dateToIsoStringUtc()', () => {
    interface Example {
      readonly input: Date;
      readonly expected: string;
    }

    const EXAMPLES: readonly Example[] = EXAMPLE_ISO_DATE_TIMESTAMP_PAIRS.map(
      (pair) => ({ input: new Date(pair[0]), expected: pair[0] })
    );

    EXAMPLES.forEach((example) => {
      it(JSON.stringify(example), () => {
        const actual = dateToIsoStringUtc(example.input);
        expect(actual).toEqual(example.expected);
      });
    });
  });
});

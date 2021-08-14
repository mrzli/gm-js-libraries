import {
  dateToIsoStringPreciseUtc,
  dateToMillisecondsSinceEpoch,
  isoStringToMillisecondsSinceEpoch,
  isoStringPreciseUtcToDate,
  millisecondSinceEpochToDate,
  millisecondsSinceEpochToIsoStringPreciseUtc,
  isoStringPreciseUtcToIsoStringNonPreciseUtc,
  isoStringNonPreciseUtcToIsoStringPreciseUtc,
  dateToHttpFormat,
} from '../../../src/date';

describe('date-utils', () => {
  const EXAMPLE_ISO_PRECISE_DATES: readonly string[] = [
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
    '1996-03-26T11:44:26.000Z',
  ];

  const EXAMPLE_ISO_PRECISE_DATES_WITH_ZERO_MILLISECONDS: readonly string[] = [
    '2021-01-01T00:00:00.000Z',
    '2022-12-19T19:43:33.000Z',
    '1985-03-20T10:33:13.000Z',
    '2020-03-31T08:19:42.000Z',
    '1997-12-04T18:38:06.000Z',
    '2011-08-21T10:56:02.000Z',
    '2005-08-16T16:24:11.000Z',
    '1996-09-16T20:53:40.000Z',
    '2017-02-09T11:14:05.000Z',
    '2005-03-11T00:17:14.000Z',
    '1996-03-26T11:44:26.000Z',
  ];

  const EXAMPLE_ISO_NON_PRECISE_DATES: readonly string[] = [
    '2021-01-01T00:00:00Z',
    '2022-12-19T19:43:33Z',
    '1985-03-20T10:33:13Z',
    '2020-03-31T08:19:42Z',
    '1997-12-04T18:38:06Z',
    '2011-08-21T10:56:02Z',
    '2005-08-16T16:24:11Z',
    '1996-09-16T20:53:40Z',
    '2017-02-09T11:14:05Z',
    '2005-03-11T00:17:14Z',
    '1996-03-26T11:44:26Z',
  ];

  const EXAMPLE_TIMESTAMPS: readonly number[] = [
    1609459200000, 1671479013000, 480162793015, 1585642782300, 881260686000,
    1313924162000, 1124209451000, 842907220000, 1486638845000, 1110500234000,
    827840666000,
  ];

  const EXAMPLE_INVALID_ISO_PRECISE_UTC_DATES: readonly string[] = [
    '',
    ' ',
    '1',
    'a',
    'some random string',
    '2020',
    '2020-01-01',
    '2020-01-01T00:00:00',
    '2020-01-01T00:00:00Z',
    '2020-01-01T00:00:00+00:00',
    '2020-01-01T00:00:00+01:00',
    '2020-01-01T00:00:00+0100',
    '2020-01-01T00:00:00.000',
    // '2020-01-01T00:00:00.000Z', // this one is ok
    '2020-01-01T00:00:00.000+00:00',
    '2020-01-01T00:00:00.000+01:00',
    '2020-01-01T00:00:00.000+0100',
  ];

  const EXAMPLE_INVALID_ISO_NON_PRECISE_UTC_DATES: readonly string[] = [
    '',
    ' ',
    '1',
    'a',
    'some random string',
    '2020',
    '2020-01-01',
    '2020-01-01T00:00:00',
    // '2020-01-01T00:00:00Z', // this one is ok
    '2020-01-01T00:00:00+00:00',
    '2020-01-01T00:00:00+01:00',
    '2020-01-01T00:00:00+0100',
    '2020-01-01T00:00:00.000',
    '2020-01-01T00:00:00.000Z',
    '2020-01-01T00:00:00.000+00:00',
    '2020-01-01T00:00:00.000+01:00',
    '2020-01-01T00:00:00.000+0100',
  ];

  interface IsoTimestampPair {
    readonly iso: string;
    readonly timestamp: number;
  }

  const EXAMPLE_ISO_DATE_TIMESTAMP_PAIRS: readonly IsoTimestampPair[] =
    EXAMPLE_ISO_PRECISE_DATES.map((_value, index) => {
      return {
        iso: EXAMPLE_ISO_PRECISE_DATES[index] as string,
        timestamp: EXAMPLE_TIMESTAMPS[index] as number,
      };
    });

  interface IsoPrecisionTuple {
    readonly precise: string;
    readonly nonPrecise: string;
    readonly preciseWithZeroMilliseconds: string;
  }

  const EXAMPLE_ISO_PRECISION_TUPLE: readonly IsoPrecisionTuple[] =
    EXAMPLE_ISO_PRECISE_DATES.map((_value, index) => {
      return {
        precise: EXAMPLE_ISO_PRECISE_DATES[index] as string,
        nonPrecise: EXAMPLE_ISO_NON_PRECISE_DATES[index] as string,
        preciseWithZeroMilliseconds:
          EXAMPLE_ISO_PRECISE_DATES_WITH_ZERO_MILLISECONDS[index] as string,
      };
    });

  describe('millisecondSinceEpochToDate()', () => {
    interface Example {
      readonly input: number;
      readonly expected: Date;
    }

    const EXAMPLES: readonly Example[] = EXAMPLE_ISO_DATE_TIMESTAMP_PAIRS.map(
      (pair) => ({ input: pair.timestamp, expected: new Date(pair.iso) })
    );

    EXAMPLES.forEach((example) => {
      it(JSON.stringify(example), () => {
        const actual = millisecondSinceEpochToDate(example.input);
        expect(actual).toEqual(example.expected);
      });
    });
  });

  describe('millisecondsSinceEpochToIsoStringPreciseUtc()', () => {
    interface Example {
      readonly input: number;
      readonly expected: string;
    }

    const EXAMPLES: readonly Example[] = EXAMPLE_ISO_DATE_TIMESTAMP_PAIRS.map(
      (pair) => ({ input: pair.timestamp, expected: pair.iso })
    );

    EXAMPLES.forEach((example) => {
      it(JSON.stringify(example), () => {
        const actual = millisecondsSinceEpochToIsoStringPreciseUtc(
          example.input
        );
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
        (pair) => ({ input: pair.iso, expected: pair.timestamp })
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

      const EXAMPLES: readonly Example[] =
        EXAMPLE_INVALID_ISO_PRECISE_UTC_DATES.map((str) => ({ input: str }));

      EXAMPLES.forEach((example) => {
        it(JSON.stringify(example), () => {
          const call = (): number =>
            isoStringToMillisecondsSinceEpoch(example.input);
          expect(call).toThrow();
        });
      });
    });
  });

  describe('isoStringPreciseUtcToDate()', () => {
    describe('valid', () => {
      interface Example {
        readonly input: string;
        readonly expected: Date;
      }

      const EXAMPLES: readonly Example[] = EXAMPLE_ISO_DATE_TIMESTAMP_PAIRS.map(
        (pair) => ({ input: pair.iso, expected: new Date(pair.iso) })
      );

      EXAMPLES.forEach((example) => {
        it(JSON.stringify(example), () => {
          const actual = isoStringPreciseUtcToDate(example.input);
          expect(actual).toEqual(example.expected);
        });
      });
    });

    describe('throws', () => {
      interface Example {
        readonly input: string;
      }

      const EXAMPLES: readonly Example[] =
        EXAMPLE_INVALID_ISO_PRECISE_UTC_DATES.map((str) => ({ input: str }));

      EXAMPLES.forEach((example) => {
        it(JSON.stringify(example), () => {
          const call = (): Date => isoStringPreciseUtcToDate(example.input);
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
      (pair) => ({ input: new Date(pair.iso), expected: pair.timestamp })
    );

    EXAMPLES.forEach((example) => {
      it(JSON.stringify(example), () => {
        const actual = dateToMillisecondsSinceEpoch(example.input);
        expect(actual).toEqual(example.expected);
      });
    });
  });

  describe('dateToIsoStringPreciseUtc()', () => {
    interface Example {
      readonly input: Date;
      readonly expected: string;
    }

    const EXAMPLES: readonly Example[] = EXAMPLE_ISO_DATE_TIMESTAMP_PAIRS.map(
      (pair) => ({ input: new Date(pair.iso), expected: pair.iso })
    );

    EXAMPLES.forEach((example) => {
      it(JSON.stringify(example), () => {
        const actual = dateToIsoStringPreciseUtc(example.input);
        expect(actual).toEqual(example.expected);
      });
    });
  });

  describe('dateToHttpFormat()', () => {
    const EXAMPLE_HTTP_DATES: readonly string[] = [
      'Fri, 01 Jan 2021 00:00:00 GMT',
      'Mon, 19 Dec 2022 19:43:33 GMT',
      'Wed, 20 Mar 1985 10:33:13 GMT',
      'Tue, 31 Mar 2020 08:19:42 GMT',
      'Thu, 04 Dec 1997 18:38:06 GMT',
      'Sun, 21 Aug 2011 10:56:02 GMT',
      'Tue, 16 Aug 2005 16:24:11 GMT',
      'Mon, 16 Sep 1996 20:53:40 GMT',
      'Thu, 09 Feb 2017 11:14:05 GMT',
      'Fri, 11 Mar 2005 00:17:14 GMT',
      'Tue, 26 Mar 1996 11:44:26 GMT',
    ];

    interface Example {
      readonly input: Date;
      readonly expected: string;
    }

    const EXAMPLES: readonly Example[] = EXAMPLE_ISO_PRECISE_DATES.map(
      (_isoDate, index) => ({
        input: new Date(EXAMPLE_ISO_PRECISE_DATES[index] as string),
        expected: EXAMPLE_HTTP_DATES[index] as string,
      })
    );

    EXAMPLES.forEach((example) => {
      it(JSON.stringify(example), () => {
        const actual = dateToHttpFormat(example.input);
        expect(actual).toEqual(example.expected);
      });
    });
  });

  describe('isoStringPreciseUtcToIsoStringNonPreciseUtc()', () => {
    describe('valid', () => {
      interface Example {
        readonly input: string;
        readonly expected: string;
      }

      const EXAMPLES: readonly Example[] = EXAMPLE_ISO_PRECISION_TUPLE.map(
        (tuple) => ({ input: tuple.precise, expected: tuple.nonPrecise })
      );

      EXAMPLES.forEach((example) => {
        it(JSON.stringify(example), () => {
          const actual = isoStringPreciseUtcToIsoStringNonPreciseUtc(
            example.input
          );
          expect(actual).toEqual(example.expected);
        });
      });
    });

    describe('throws', () => {
      interface Example {
        readonly input: string;
      }

      const EXAMPLES: readonly Example[] =
        EXAMPLE_INVALID_ISO_PRECISE_UTC_DATES.map((str) => ({ input: str }));

      EXAMPLES.forEach((example) => {
        it(JSON.stringify(example), () => {
          const call = (): string =>
            isoStringPreciseUtcToIsoStringNonPreciseUtc(example.input);
          expect(call).toThrow();
        });
      });
    });
  });

  describe('isoStringNonPreciseUtcToIsoStringPreciseUtc()', () => {
    describe('valid', () => {
      interface Example {
        readonly input: string;
        readonly expected: string;
      }

      const EXAMPLES: readonly Example[] = EXAMPLE_ISO_PRECISION_TUPLE.map(
        (tuple) => ({
          input: tuple.nonPrecise,
          expected: tuple.preciseWithZeroMilliseconds,
        })
      );

      EXAMPLES.forEach((example) => {
        it(JSON.stringify(example), () => {
          const actual = isoStringNonPreciseUtcToIsoStringPreciseUtc(
            example.input
          );
          expect(actual).toEqual(example.expected);
        });
      });
    });

    describe('throws', () => {
      interface Example {
        readonly input: string;
      }

      const EXAMPLES: readonly Example[] =
        EXAMPLE_INVALID_ISO_NON_PRECISE_UTC_DATES.map((str) => ({
          input: str,
        }));

      EXAMPLES.forEach((example) => {
        it(JSON.stringify(example), () => {
          const call = (): string =>
            isoStringNonPreciseUtcToIsoStringPreciseUtc(example.input);
          expect(call).toThrow();
        });
      });
    });
  });
});

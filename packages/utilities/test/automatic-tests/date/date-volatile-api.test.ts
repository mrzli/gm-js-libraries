import { DateVolatileApiImpl } from '../../../src/date/date-volatile-api';

describe('date-volatile-api', () => {
  const TEST_MILLISECONDS = 1_600_000_000_000; // 2020-09-13T12:26:40.000Z
  const DATE_VOLATILE_API = new DateVolatileApiImpl({
    getCurrentMilliseconds: () => TEST_MILLISECONDS,
  });

  it('systemTimeZone() should return a valid time zone', () => {
    const actual = DATE_VOLATILE_API.systemTimeZone();

    expect(typeof actual).toEqual('string');
    expect(() =>
      Intl.DateTimeFormat(undefined, { timeZone: 'invalid time zone' })
    ).toThrow();
    expect(() =>
      Intl.DateTimeFormat(undefined, { timeZone: actual })
    ).not.toThrow();
  });

  // a bit circular
  it('millisecondsSinceEpoch() should return proper result', () => {
    const actual = DATE_VOLATILE_API.millisecondsSinceEpoch();
    expect(actual).toEqual(1_600_000_000_000);
  });
});

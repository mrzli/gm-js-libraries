import { Fn0 } from '../types';

export function createVolatileDateTimeApi(): DateVolatileApi {
  const millisecondsGetter: InternalNowMillisecondsSinceEpochGetter = {
    getCurrentMilliseconds: (): number => {
      return Date.now();
    },
  };
  return new DateVolatileApiImpl(millisecondsGetter);
}

export interface DateVolatileApi {
  readonly systemTimeZone: Fn0<string>;
  readonly millisecondsSinceEpoch: Fn0<number>;
}

// not to be exported outside of project, just used for internal testing
export interface InternalNowMillisecondsSinceEpochGetter {
  readonly getCurrentMilliseconds: Fn0<number>;
}

// not to be exported outside of project, just used for internal testing
export class DateVolatileApiImpl implements DateVolatileApi {
  constructor(
    private readonly millisecondsGetter: InternalNowMillisecondsSinceEpochGetter
  ) {}

  public systemTimeZone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  public millisecondsSinceEpoch(): number {
    return this.millisecondsGetter.getCurrentMilliseconds();
  }
}

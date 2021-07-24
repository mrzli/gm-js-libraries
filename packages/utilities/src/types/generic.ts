export type SimpleValue = string | number | boolean;

export type EmptyObject = {
  readonly // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in any]: never;
};

export type NumberMapOfValues<TValue> = {
  readonly [key: number]: TValue;
};

export type StringMapOfValues<TValue> = {
  readonly [key: string]: TValue;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ReadonlyRecord<K extends keyof any, T> = Readonly<Record<K, T>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyObject = Record<string, any>;

export type Nullish<TValue> = TValue | null | undefined;

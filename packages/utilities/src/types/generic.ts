export type SimpleValue = string | number | boolean;

export type EmptyObject = {
  readonly [K in any]: never; // eslint-disable-line @typescript-eslint/no-explicit-any
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

export type ReadonlyTuple2<T1, T2> = readonly [T1, T2];
export type ReadonlyTuple3<T1, T2, T3> = readonly [T1, T2, T3];
export type ReadonlyTuple4<T1, T2, T3, T4> = readonly [T1, T2, T3, T4];

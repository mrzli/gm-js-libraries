const ISO_UTC_FORMAT = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/;

export function millisecondSinceEpochToDate(
  millisecondsSinceEpoch: number
): Date {
  return new Date(millisecondsSinceEpoch);
}

export function millisecondsSinceEpochToIsoStringUtc(
  millisecondsSinceEpoch: number
): string {
  return dateToIsoStringUtc(
    millisecondSinceEpochToDate(millisecondsSinceEpoch)
  );
}

export function isoStringToMillisecondsSinceEpoch(isoString: string): number {
  return dateToMillisecondsSinceEpoch(isoStringUtcToDate(isoString));
}

export function isoStringUtcToDate(isoString: string): Date {
  if (!ISO_UTC_FORMAT.test(isoString)) {
    throw new Error(`Invalid format, expected ISO UTC: '${isoString}'`);
  }
  return new Date(isoString);
}

export function dateToMillisecondsSinceEpoch(date: Date): number {
  return date.getTime();
}

export function dateToIsoStringUtc(date: Date): string {
  return date.toISOString();
}

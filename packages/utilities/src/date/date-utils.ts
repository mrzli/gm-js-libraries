const ISO_PRECISE_UTC_FORMAT = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/;
const ISO_NON_PRECISE_UTC_FORMAT = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z/;

export function millisecondSinceEpochToDate(
  millisecondsSinceEpoch: number
): Date {
  return new Date(millisecondsSinceEpoch);
}

export function millisecondsSinceEpochToIsoStringPreciseUtc(
  millisecondsSinceEpoch: number
): string {
  return dateToIsoStringPreciseUtc(
    millisecondSinceEpochToDate(millisecondsSinceEpoch)
  );
}

export function isoStringToMillisecondsSinceEpoch(isoString: string): number {
  return dateToMillisecondsSinceEpoch(isoStringPreciseUtcToDate(isoString));
}

export function isoStringPreciseUtcToDate(isoString: string): Date {
  if (!ISO_PRECISE_UTC_FORMAT.test(isoString)) {
    throw new Error(`Invalid format, expected ISO precise UTC: '${isoString}'`);
  }
  return new Date(isoString);
}

export function dateToMillisecondsSinceEpoch(date: Date): number {
  return date.getTime();
}

export function dateToIsoStringPreciseUtc(date: Date): string {
  return date.toISOString();
}

export function isoStringPreciseUtcToIsoStringNonPreciseUtc(
  isoString: string
): string {
  if (!ISO_PRECISE_UTC_FORMAT.test(isoString)) {
    throw new Error(`Invalid format, expected ISO precise UTC: '${isoString}'`);
  }
  // TODO GM: find a more robust way of doing this
  return isoString.replace(/\.\d{3}Z$/, 'Z');
}

export function isoStringNonPreciseUtcToIsoStringPreciseUtc(
  isoString: string
): string {
  if (!ISO_NON_PRECISE_UTC_FORMAT.test(isoString)) {
    throw new Error(
      `Invalid format, expected ISO non-precise UTC: '${isoString}'`
    );
  }
  return new Date(isoString).toISOString();
}

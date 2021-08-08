import {
  LocationObject,
  LocationWrapper,
  SearchObject
} from '../types/location-wrapper';
import {
  ReadonlyTuple2,
  StringMapOfValues
} from '@mrzli/gm-js-libraries-utilities/types';

export function createLocationWrapper(): LocationWrapper {
  const location = window.location;

  return {
    getHref: () => location.href,
    getProtocol: () => location.protocol.slice(0, -1),
    getHost: () => location.host,
    getHostname: () => location.hostname,
    getPort: () => location.port,
    getPathname: () => location.pathname,
    getSearch: () => skipFirst(location.search),
    getHash: () => skipFirst(location.hash),
    getLocationObject: () => getLocationObject(location),
    getSearchObject: () => getSearchObject(location),
    setHref: (href: string) => {
      location.href = href;
    },
    setPathname: (pathname: string) => {
      location.pathname = pathname;
      location.reload();
    },
    setSearch: (searchParams: StringMapOfValues<string>) => {
      location.search = searchParamsToSearchString(searchParams);
      location.reload();
    },
    setPathNameAndSearch: (
      pathname: string,
      searchParams: StringMapOfValues<string>
    ) => {
      location.pathname = pathname;
      location.search = searchParamsToSearchString(searchParams);
      location.reload();
    },
    reloadPage: () => {
      location.reload();
    }
  };
}

function getLocationObject(location: Location): LocationObject {
  return {
    href: location.href,
    protocol: location.protocol.slice(0, -1),
    host: location.host,
    hostname: location.hostname,
    port: location.port,
    pathname: location.pathname,
    search: skipFirst(location.search),
    hash: skipFirst(location.hash)
  };
}

function getSearchObject(location: Location): SearchObject {
  const search = skipFirst(location.search);
  const searchPairs: readonly ReadonlyTuple2<string, string>[] = search
    .split('&')
    .map(
      (item) => item.split('=') as unknown as ReadonlyTuple2<string, string>
    );
  const keys = searchPairs.map((pair) => pair[0]);

  const entries = searchPairs.reduce((acc, pair) => {
    acc[pair[0]] = decodeURIComponent(pair[1]);
    return acc;
  }, {} as { [key: string]: string });

  return {
    keys,
    entries
  };
}

function searchParamsToSearchString(
  searchParams: StringMapOfValues<string>
): string {
  const pairsString = Object.keys(searchParams)
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(
          searchParams[key] ?? ''
        )}`
    )
    .join('&');
  return `?${pairsString}`;
}

function skipFirst(value: string): string {
  return value.length > 0 ? value.slice(1) : value;
}

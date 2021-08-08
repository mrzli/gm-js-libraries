import urlParse from 'url-parse';
import {
  LocationObject,
  LocationWrapper,
  SearchObject
} from '../types/location-wrapper';
import { StringMapOfValues } from '@mrzli/gm-js-libraries-utilities/types';
import URLParse from 'url-parse';

export function createLocationWrapper(): LocationWrapper {
  const location = window.location;

  return {
    getHref: () => getUrlObject(location).href,
    getProtocol: () => getUrlObject(location).protocol.slice(0, -1),
    getHost: () => getUrlObject(location).host,
    getHostname: () => getUrlObject(location).hostname,
    getPort: () => getUrlObject(location).port,
    getPathname: () => getUrlObject(location).pathname,
    getHash: () => skipFirst(getUrlObject(location).hash),
    getLocationObject: () => getLocationObject(location),
    getSearchObject: () => getSearchObject(getUrlObject(location)),
    setHref: (href: string, forceReload?: boolean) => {
      if (forceReload || href !== location.href) {
        location.href = href;
      }
    },
    setPathname: (pathname: string, forceReload?: boolean) => {
      const urlObject = getUrlObject(location);
      urlObject.set('pathname', pathname);
      setHref(location, urlObject, forceReload ?? false);
    },
    setSearch: (
      searchParams: StringMapOfValues<string>,
      forceReload?: boolean
    ) => {
      const urlObject = getUrlObject(location);
      urlObject.set('query', toQueryObject(searchParams));
      setHref(location, urlObject, forceReload ?? false);
    },
    setPathnameAndSearch: (
      pathname: string,
      searchParams: StringMapOfValues<string>,
      forceReload?: boolean
    ) => {
      const urlObject = getUrlObject(location);
      urlObject.set('pathname', pathname);
      urlObject.set('query', toQueryObject(searchParams));
      setHref(location, urlObject, forceReload ?? false);
    },
    reloadPage: () => {
      location.reload();
    }
  };
}

function getUrlObject(location: Location): URLParse {
  return urlParse(location.href, true);
}

function getLocationObject(location: Location): LocationObject {
  const urlObject = getUrlObject(location);
  return {
    href: urlObject.href,
    protocol: urlObject.protocol.slice(0, -1),
    host: urlObject.host,
    hostname: urlObject.hostname,
    port: urlObject.port,
    pathname: urlObject.pathname,
    hash: skipFirst(urlObject.hash),
    searchObject: getSearchObject(urlObject)
  };
}

interface ObjectWithStrings {
  [key: string]: string;
}

function getSearchObject(urlObject: URLParse): SearchObject {
  const queryObject = urlObject.query;
  const keys = Object.keys(queryObject);

  const entries = keys.reduce((acc, key) => {
    acc[key] = queryObject[key] ?? '';
    return acc;
  }, {} as ObjectWithStrings);

  return {
    keys,
    entries
  };
}

function toQueryObject(
  searchParams: StringMapOfValues<string>
): ObjectWithStrings {
  return Object.keys(searchParams).reduce((acc, key) => {
    acc[key] = searchParams[key] ?? '';
    return acc;
  }, {} as ObjectWithStrings);
}

function skipFirst(value: string): string {
  return value.length > 0 ? value.slice(1) : value;
}

function setHref(
  location: Location,
  urlObject: URLParse,
  force: boolean
): void {
  if (force || urlObject.href !== location.href) {
    location.href = urlObject.href;
  }
}

import { StringMapOfValues } from '@mrzli/gm-js-libraries-utilities/types';

export interface LocationWrapper {
  readonly getHref: () => string;
  readonly getProtocol: () => string;
  readonly getHost: () => string;
  readonly getHostname: () => string;
  readonly getPort: () => string;
  readonly getPathname: () => string;
  readonly getHash: () => string;
  readonly getLocationObject: () => LocationObject;
  readonly getSearchObject: () => SearchObject;
  readonly setHref: (href: string, forceReload?: boolean) => void;
  readonly setPathname: (pathname: string, forceReload?: boolean) => void;
  readonly setSearch: (
    searchParams: StringMapOfValues<string>,
    forceReload?: boolean
  ) => void;
  readonly setPathnameAndSearch: (
    pathname: string,
    searchParams: StringMapOfValues<string>,
    forceReload?: boolean
  ) => void;
  readonly reloadPage: () => void;
}

export interface LocationObject {
  readonly href: string; // always present
  readonly protocol: string; // always present, here without ':'
  readonly host: string; // always present
  readonly hostname: string; // always present
  readonly port: string; // can be an empty string
  readonly pathname: string; // can be an empty string
  readonly hash: string; // can be an empty string, here without '#'
  readonly searchObject: SearchObject;
}

export type SearchObject = {
  readonly keys: readonly string[];
  readonly entries: StringMapOfValues<string>;
};

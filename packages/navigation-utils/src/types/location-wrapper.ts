import { StringMapOfValues } from '@mrzli/gm-js-libraries-utilities/types';

export interface LocationWrapper {
  readonly getHref: () => string;
  readonly getProtocol: () => string;
  readonly getHost: () => string;
  readonly getHostname: () => string;
  readonly getPort: () => string;
  readonly getPathname: () => string;
  readonly getSearch: () => string;
  readonly getHash: () => string;
  readonly getLocationObject: () => LocationObject;
  readonly getSearchObject: () => SearchObject;
  readonly setHref: (href: string) => void;
  readonly setPathname: (pathname: string) => void;
  readonly setSearch: (searchParams: StringMapOfValues<string>) => void;
  readonly setPathNameAndSearch: (
    pathname: string,
    searchParams: StringMapOfValues<string>
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
  readonly search: string; // can be an empty string, here without '?'
  readonly hash: string; // can be an empty string, here without '#'
}

export type SearchObject = {
  readonly keys: readonly string[];
  readonly entries: StringMapOfValues<string>;
};

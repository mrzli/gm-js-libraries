import { match } from 'path-to-regexp';

export function isRouteMatch(
  path: string,
  route: string,
  exact: boolean
): boolean {
  const matchFn = match(route, { decode: decodeURIComponent, end: exact });
  const matchResult = matchFn(path);
  console.log(path, route, matchResult);
  return matchResult !== false;
}

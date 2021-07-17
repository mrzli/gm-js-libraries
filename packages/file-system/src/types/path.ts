export interface Path {
  readonly resolvePath: (...pathSegments: readonly string[]) => string;
  readonly resolvePathFromCwd: (pathToResolve: string) => string;
}

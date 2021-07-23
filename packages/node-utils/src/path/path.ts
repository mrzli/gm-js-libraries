import process from 'process';
import path from 'path';

export function resolvePath(...pathSegments: readonly string[]): string {
  return path.resolve(...pathSegments);
}

export function resolvePathFromCwd(...pathSegments: readonly string[]): string {
  const cwd = process.cwd();
  return resolvePath(cwd, ...pathSegments);
}

import process from 'process';
import path from 'path';
import { Path } from '../types/path';

export function createPath(): Path {
  return {
    resolvePath,
    resolvePathFromCwd
  };
}

function resolvePath(...pathSegments: readonly string[]): string {
  return path.resolve(...pathSegments);
}

function resolvePathFromCwd(pathToResolve: string): string {
  const cwd = process.cwd();
  return resolvePath(cwd, pathToResolve);
}

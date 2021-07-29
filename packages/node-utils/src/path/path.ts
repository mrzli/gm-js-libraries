import process from 'process';
import path from 'path';

export function resolvePath(...pathSegments: readonly string[]): string {
  return path.resolve(...pathSegments);
}

export function resolvePathFromCwd(...pathSegments: readonly string[]): string {
  const cwd = process.cwd();
  return resolvePath(cwd, ...pathSegments);
}

export function joinPath(...pathSegments: readonly string[]): string {
  return path.join(...pathSegments);
}

export function getFileDirectory(filePath: string): string {
  return path.dirname(filePath);
}

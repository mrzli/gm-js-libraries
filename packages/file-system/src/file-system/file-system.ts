import { resolve } from 'path';
import { promises as fsPromises } from 'fs';
import fsExtra from 'fs-extra';
import { FileSystem } from '../types/file-system';
import minimatch from 'minimatch';
import copyfiles from 'copyfiles';

export function createFileSystem(): FileSystem {
  return {
    makeDirectory,
    removeFileSystemEntry,
    removeFileSystemEntries,
    removeFileSystemEntriesInDirectory,
    copyDirectory,
    copyDirectorySubset
  };
}

async function makeDirectory(dirPath: string): Promise<void> {
  await fsPromises.mkdir(dirPath, { recursive: true });
}

async function removeFileSystemEntry(
  fileSystemEntryPath: string
): Promise<void> {
  await fsPromises.rm(fileSystemEntryPath, { recursive: true });
}

async function removeFileSystemEntries(
  fileSystemEntryPaths: readonly string[]
): Promise<void> {
  await Promise.all(
    fileSystemEntryPaths.map((fileSystemEntryPath) =>
      removeFileSystemEntry(fileSystemEntryPath)
    )
  );
}

async function removeFileSystemEntriesInDirectory(
  dirPath: string,
  relativeFileSystemEntryPaths: readonly string[]
): Promise<void> {
  const fullPaths = relativeFileSystemEntryPaths.map((relativePath) =>
    resolve(dirPath, relativePath)
  );
  await removeFileSystemEntries(fullPaths);
}

async function copyDirectory(
  sourceDirPath: string,
  destinationDirPath: string
): Promise<void> {
  const isDir = await isDirectory(sourceDirPath);
  if (!isDir) {
    throw new Error(`Path '${sourceDirPath}' is not a directory`);
  }
  await fsExtra.copy(sourceDirPath, destinationDirPath, {
    recursive: true,
    overwrite: true
  });
}

async function copyDirectorySubset(
  sourceDirPath: string,
  globs: readonly string[],
  destinationDirPath: string
): Promise<void> {
  const source = sourceDirPath.endsWith('/')
    ? sourceDirPath
    : sourceDirPath.concat('/');
  const sourceGlobs = globs.map((glob) => source.concat(glob));
  const sourceDirSegments = sourceDirPath.split('/').length;
  const paths = sourceGlobs.concat(destinationDirPath);
  return new Promise((resolve, reject) => {
    copyfiles(paths, { up: sourceDirSegments }, (error) => {
      if (error) {
        reject(error);
      }

      resolve();
    });
  });
}

async function isDirectory(dirPath: string): Promise<boolean> {
  const stats = await fsPromises.lstat(dirPath);
  return stats.isDirectory();
}

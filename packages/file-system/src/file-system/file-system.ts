import { resolve } from 'path';
import { promises as fsPromises } from 'fs';
import fsExtra from 'fs-extra';
import copyfiles from 'copyfiles';

export async function readFileAsString(filePath: string): Promise<string> {
  return fsPromises.readFile(filePath, { encoding: 'utf-8' });
}

export async function writeStringToFile(
  filePath: string,
  data: string
): Promise<void> {
  await fsPromises.writeFile(filePath, data, { encoding: 'utf-8' });
}

export async function makeDirectory(dirPath: string): Promise<void> {
  await fsPromises.mkdir(dirPath, { recursive: true });
}

export async function removeFileSystemEntry(
  fileSystemEntryPath: string
): Promise<void> {
  await fsPromises.rm(fileSystemEntryPath, { recursive: true });
}

export async function removeFileSystemEntries(
  fileSystemEntryPaths: readonly string[]
): Promise<void> {
  await Promise.all(
    fileSystemEntryPaths.map((fileSystemEntryPath) =>
      removeFileSystemEntry(fileSystemEntryPath)
    )
  );
}

export async function removeFileSystemEntriesInDirectory(
  dirPath: string,
  relativeFileSystemEntryPaths: readonly string[]
): Promise<void> {
  const fullPaths = relativeFileSystemEntryPaths.map((relativePath) =>
    resolve(dirPath, relativePath)
  );
  await removeFileSystemEntries(fullPaths);
}

export async function copyDirectory(
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

export async function copyDirectorySubset(
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

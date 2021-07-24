import { promises as fsPromises } from 'fs';
import { isDirectory } from './file-system';
import { joinPath, resolvePath } from '../path';
import {
  compareFnStringAsc,
  sortArray
} from '@mrzli/gm-js-libraries-utilities/array';

export enum GetFilePathsUnderDirectoryRecursivelySortOrder {
  Alphabetically = 'Alphabetically',
  DirectoriesFirst = 'DirectoriesFirst',
  FilesFirst = 'FilesFirst'
}

export interface GetFilePathsUnderDirectoryRecursivelyOptions {
  readonly returnAbsolutePaths: boolean;
  readonly sortOrder: GetFilePathsUnderDirectoryRecursivelySortOrder;
}

const DEFAULT_OPTIONS: GetFilePathsUnderDirectoryRecursivelyOptions = {
  returnAbsolutePaths: false,
  sortOrder: GetFilePathsUnderDirectoryRecursivelySortOrder.Alphabetically
};

export async function getDirectoryFilePaths(
  dirPath: string,
  options?: Partial<GetFilePathsUnderDirectoryRecursivelyOptions>
): Promise<readonly string[]> {
  const finalOptions =
    options !== undefined
      ? { ...DEFAULT_OPTIONS, ...options }
      : DEFAULT_OPTIONS;
  const relativePaths = await getDirectoryFilePathsImpl(
    dirPath,
    '.',
    finalOptions
  );

  if (finalOptions.returnAbsolutePaths) {
    return relativePaths.map((rp) => resolvePath(dirPath, rp));
  } else {
    return relativePaths;
  }
}

interface PathData {
  readonly entryPath: string;
  readonly isDirectory: boolean;
}

async function getDirectoryFilePathsImpl(
  baseDirPath: string,
  subDirPath: string,
  options: GetFilePathsUnderDirectoryRecursivelyOptions
): Promise<readonly string[]> {
  const fileSystemEntries = await fsPromises.readdir(
    resolvePath(baseDirPath, subDirPath)
  );
  const pathDataList: readonly PathData[] = await Promise.all(
    fileSystemEntries.map((entry) =>
      getPathData(baseDirPath, subDirPath, entry)
    )
  );

  const sortedPathList = sortPathData(pathDataList, options.sortOrder);
  const result: string[] = [];
  for (const pathData of sortedPathList) {
    if (pathData.isDirectory) {
      const currentSubDirEntries = await getDirectoryFilePathsImpl(
        baseDirPath,
        joinPath(subDirPath, pathData.entryPath),
        options
      );
      result.push(...currentSubDirEntries);
    } else {
      result.push(pathData.entryPath);
    }
  }
  return result;
}

async function getPathData(
  baseDirPath: string,
  subDirPath: string,
  entry: string
): Promise<PathData> {
  const isDir = await isDirectory(resolvePath(baseDirPath, subDirPath, entry));
  return {
    entryPath: joinPath(subDirPath, entry),
    isDirectory: isDir
  };
}

function sortPathData(
  pathDataList: readonly PathData[],
  sortOrder: GetFilePathsUnderDirectoryRecursivelySortOrder
): readonly PathData[] {
  const alphabeticallySorted = sortArray(pathDataList, (pd1, pd2) =>
    compareFnStringAsc(pd1.entryPath, pd2.entryPath)
  );
  switch (sortOrder) {
    case GetFilePathsUnderDirectoryRecursivelySortOrder.Alphabetically:
      return alphabeticallySorted;
    case GetFilePathsUnderDirectoryRecursivelySortOrder.DirectoriesFirst:
      return alphabeticallySorted
        .filter((pd) => pd.isDirectory)
        .concat(alphabeticallySorted.filter((pd) => !pd.isDirectory));
    case GetFilePathsUnderDirectoryRecursivelySortOrder.FilesFirst:
      return alphabeticallySorted
        .filter((pd) => !pd.isDirectory)
        .concat(alphabeticallySorted.filter((pd) => pd.isDirectory));
  }
}

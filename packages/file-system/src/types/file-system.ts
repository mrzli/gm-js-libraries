export interface FileSystem {
  readonly makeDirectory: (dirPath: string) => Promise<void>;
  readonly removeFileSystemEntry: (
    fileSystemEntryPath: string
  ) => Promise<void>;
  readonly removeFileSystemEntries: (
    fileSystemEntryPaths: readonly string[]
  ) => Promise<void>;
  readonly removeFileSystemEntriesInDirectory: (
    dirPath: string,
    relativeFileSystemEntryPaths: readonly string[]
  ) => Promise<void>;
  readonly copyDirectory: (
    sourceDirPath: string,
    destinationDirPath: string
  ) => Promise<void>;
  readonly copyDirectorySubset: (
    sourceDirPath: string,
    globs: readonly string[],
    destinationDirPath: string
  ) => Promise<void>;
}

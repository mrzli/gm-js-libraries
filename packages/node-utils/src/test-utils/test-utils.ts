import { getRandomUuid } from '@mrzli/gm-js-libraries-utilities/uuid';
import { resolvePath } from '../path';
import { makeDirectory, removeFileSystemEntry } from '../file-system';

export type TestDirectoryDoWork = (dirPath: string) => Promise<void>;

export interface TestDirectoryManager {
  usingTemporaryDirectory: (doWork: TestDirectoryDoWork) => Promise<void>;
}

export function createTestDirectoryManager(
  parentDir: string
): TestDirectoryManager {
  return new TestDirectoryManagerImpl(parentDir);
}

class TestDirectoryManagerImpl implements TestDirectoryManager {
  constructor(private readonly parentDir: string) {}

  public async usingTemporaryDirectory(
    doWork: TestDirectoryDoWork
  ): Promise<void> {
    await usingTemporaryDirectoryImpl(this.parentDir, doWork);
  }
}

async function usingTemporaryDirectoryImpl(
  parentDir: string,
  doWork: TestDirectoryDoWork
): Promise<void> {
  let tempDirPath: string | undefined;
  try {
    const tempDir = getRandomUuid();
    tempDirPath = resolvePath(parentDir, tempDir);
    await makeDirectory(tempDirPath);
    await doWork(tempDirPath);
  } finally {
    if (tempDirPath !== undefined) {
      await removeFileSystemEntry(tempDirPath);
    }
  }
}

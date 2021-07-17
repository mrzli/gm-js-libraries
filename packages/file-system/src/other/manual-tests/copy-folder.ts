import { createFileSystem } from '../../file-system/file-system';
import { createPath } from '../../file-system/path';

async function test(): Promise<void> {
  const path = createPath();
  const fileSystem = createFileSystem();
  const testDataDir = path.resolvePathFromCwd('test-data');

  const inputDir = path.resolvePath(testDataDir, 'input-dir');
  const outputDir = path.resolvePath(testDataDir, 'output-dir');

  // await fileSystem.copyDirectory(inputDir, outputDir);
  await fileSystem.copyDirectorySubset(inputDir, ['**/*.txt'], outputDir);
}

test().finally(() => {
  console.log('test ended');
});

import { resolvePath, resolvePathFromCwd } from '../../path';
import { copyDirectorySubset } from '../../file-system';

async function test(): Promise<void> {
  const testDataDir = resolvePathFromCwd('test-data');

  const inputDir = resolvePath(testDataDir, 'input-dir');
  const outputDir = resolvePath(testDataDir, 'output-dir');

  // await copyDirectory(inputDir, outputDir);
  await copyDirectorySubset(inputDir, ['**/*.txt'], outputDir);
}

test().finally(() => {
  console.log('test ended');
});

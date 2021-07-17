import {
  createFileSystem,
  createPath
} from '@mrzli/gm-js-libraries-file-system';
import process from 'process';

async function setupDistForPublish(): Promise<void> {
  const path = createPath();
  const fileSystem = createFileSystem();
  const distDir = path.resolvePathFromCwd('dist');
  await fileSystem.removeFileSystemEntriesInDirectory(distDir, ['other']);
  await fileSystem.copyDirectorySubset(
    process.cwd(),
    ['package.json'],
    distDir
  );
}

setupDistForPublish().finally(() => {
  console.log("'dist' folder setup for publishing");
});

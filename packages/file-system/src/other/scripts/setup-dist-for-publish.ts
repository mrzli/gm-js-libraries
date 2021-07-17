import process from 'process';
import {
  copyDirectorySubset,
  removeFileSystemEntriesInDirectory
} from '../../file-system';
import { resolvePathFromCwd } from '../../path';

async function setupDistForPublish(): Promise<void> {
  const distDir = resolvePathFromCwd('dist');
  await removeFileSystemEntriesInDirectory(distDir, ['other']);
  await copyDirectorySubset(process.cwd(), ['package.json'], distDir);
}

setupDistForPublish().finally(() => {
  console.log("'dist' folder setup for publishing");
});

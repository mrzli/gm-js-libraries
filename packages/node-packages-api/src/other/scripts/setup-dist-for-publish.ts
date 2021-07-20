import {
  copyDirectorySubset,
  removeFileSystemEntriesInDirectory
} from '@mrzli/gm-js-libraries-file-system/file-system';
import { resolvePathFromCwd } from '@mrzli/gm-js-libraries-file-system/path';
import process from 'process';

async function setupDistForPublish(): Promise<void> {
  const distDir = resolvePathFromCwd('dist');
  await removeFileSystemEntriesInDirectory(distDir, ['other']);
  await copyDirectorySubset(process.cwd(), ['package.json'], distDir);
}

setupDistForPublish().finally(() => {
  console.log("'dist' folder setup for publishing");
});

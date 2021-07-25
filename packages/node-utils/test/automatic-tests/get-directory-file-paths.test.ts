import { resolvePathFromCwd } from '../../src/path';
import {
  getDirectoryFilePaths,
  GetFilePathsUnderDirectoryRecursivelyOptions,
  GetFilePathsUnderDirectoryRecursivelySortOrder
} from '../../src/file-system/get-directory-file-paths';

describe('get-directory-file-paths', () => {
  describe('getDirectoryFilePaths()', () => {
    const TEST_DIR_PATH = resolvePathFromCwd('test/test-data/input-dir');

    const ALPHABETIC_ORDERING: readonly string[] = [
      'file001.txt',
      'file002.txt',
      'file003.txt',
      'md001.md',
      'other-name001.txt',
      'sub-dir/file004.txt',
      'sub-dir/md002.md',
      'sub-dir/other-name002.txt',
      'sub-dir/sub-dir-level-2/file005.txt',
      'sub-dir/zfile002.txt',
      'zfile001.txt'
    ];

    const DIRECTORIES_FIRST_ORDERING: readonly string[] = [
      'sub-dir/sub-dir-level-2/file005.txt',
      'sub-dir/file004.txt',
      'sub-dir/md002.md',
      'sub-dir/other-name002.txt',
      'sub-dir/zfile002.txt',
      'file001.txt',
      'file002.txt',
      'file003.txt',
      'md001.md',
      'other-name001.txt',
      'zfile001.txt'
    ];

    const FILES_FIRST_ORDERING: readonly string[] = [
      'file001.txt',
      'file002.txt',
      'file003.txt',
      'md001.md',
      'other-name001.txt',
      'zfile001.txt',
      'sub-dir/file004.txt',
      'sub-dir/md002.md',
      'sub-dir/other-name002.txt',
      'sub-dir/zfile002.txt',
      'sub-dir/sub-dir-level-2/file005.txt'
    ];

    function toAbsolutePath(relativePath: string): string {
      return TEST_DIR_PATH + '/' + relativePath;
    }

    describe('works', () => {
      interface Example {
        readonly input: {
          readonly options:
            | Partial<GetFilePathsUnderDirectoryRecursivelyOptions>
            | undefined;
        };
        readonly expected: readonly string[];
      }

      const EXAMPLES: readonly Example[] = [
        {
          input: {
            options: undefined
          },
          expected: ALPHABETIC_ORDERING
        },
        {
          input: {
            options: {}
          },
          expected: ALPHABETIC_ORDERING
        },
        {
          input: {
            options: {
              sortOrder:
                GetFilePathsUnderDirectoryRecursivelySortOrder.Alphabetically
            }
          },
          expected: ALPHABETIC_ORDERING
        },
        {
          input: {
            options: {
              returnAbsolutePaths: false,
              sortOrder:
                GetFilePathsUnderDirectoryRecursivelySortOrder.Alphabetically
            }
          },
          expected: ALPHABETIC_ORDERING
        },
        {
          input: {
            options: {
              returnAbsolutePaths: true,
              sortOrder:
                GetFilePathsUnderDirectoryRecursivelySortOrder.Alphabetically
            }
          },
          expected: ALPHABETIC_ORDERING.map(toAbsolutePath)
        },
        {
          input: {
            options: {
              returnAbsolutePaths: false,
              sortOrder:
                GetFilePathsUnderDirectoryRecursivelySortOrder.DirectoriesFirst
            }
          },
          expected: DIRECTORIES_FIRST_ORDERING
        },
        {
          input: {
            options: {
              returnAbsolutePaths: true,
              sortOrder:
                GetFilePathsUnderDirectoryRecursivelySortOrder.DirectoriesFirst
            }
          },
          expected: DIRECTORIES_FIRST_ORDERING.map(toAbsolutePath)
        },
        {
          input: {
            options: {
              returnAbsolutePaths: false,
              sortOrder:
                GetFilePathsUnderDirectoryRecursivelySortOrder.FilesFirst
            }
          },
          expected: FILES_FIRST_ORDERING
        },
        {
          input: {
            options: {
              returnAbsolutePaths: true,
              sortOrder:
                GetFilePathsUnderDirectoryRecursivelySortOrder.FilesFirst
            }
          },
          expected: FILES_FIRST_ORDERING.map(toAbsolutePath)
        }
      ];

      EXAMPLES.forEach((example) => {
        it(JSON.stringify(example.input), async () => {
          const actual = await getDirectoryFilePaths(
            TEST_DIR_PATH,
            example.input.options
          );
          expect(actual).toEqual(example.expected);
        });
      });
    });
  });
});

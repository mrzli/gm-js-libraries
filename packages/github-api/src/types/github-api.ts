import { GithubUserData } from './output/github-user-data';
import { CreateRepositoryParams } from './input/create-repository-params';
import { GithubRepositoryData } from './output/github-repository-data';
import { DeleteRepositoryParams } from './input/delete-repository-params';

export interface GithubApi {
  readonly getUser: () => Promise<GithubUserData>;
  readonly createRepository: (
    input: CreateRepositoryParams
  ) => Promise<GithubRepositoryData | undefined>;
  readonly deleteRepository: (input: DeleteRepositoryParams) => Promise<void>;
}

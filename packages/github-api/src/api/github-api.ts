import { GithubUserData } from '../types/output/github-user-data';
import { GithubRepositoryData } from '../types/output/github-repository-data';
import { createGithubClientRest } from './github-client-rest';
import { createGithubClientGraphql } from './github-client-graphql';
import {
  CreateRepository,
  CreateRepositoryMutation,
  CreateRepositoryMutationVariables,
  GithubUser,
  GithubUserQuery
} from '../graphql/generated/graphql';
import { ApolloClient } from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { AxiosInstance } from 'axios';
import { CreateRepositoryParams } from '../types/input/create-repository-params';
import { DeleteRepositoryParams } from '../types/input/delete-repository-params';

export class GithubApi {
  private readonly clientGraphQl: ApolloClient<NormalizedCacheObject>;
  private readonly clientRest: AxiosInstance;

  constructor(private readonly githubToken: string) {
    this.clientGraphQl = createGithubClientGraphql(githubToken);
    this.clientRest = createGithubClientRest(githubToken);
  }

  public async getUser(): Promise<GithubUserData> {
    const result = await this.clientGraphQl.query<GithubUserQuery>({
      query: GithubUser
    });
    return result.data.viewer;
  }

  public async createRepository(
    input: CreateRepositoryParams
  ): Promise<GithubRepositoryData | undefined> {
    const result = await this.clientGraphQl.mutate<
      CreateRepositoryMutation,
      CreateRepositoryMutationVariables
    >({
      mutation: CreateRepository,
      variables: {
        ownerId: input.ownerId,
        repositoryName: input.repositoryName,
        repositoryDescription: input.repositoryDescription
      }
    });
    return result.data?.createRepository?.repository;
  }

  public async deleteRepository(input: DeleteRepositoryParams): Promise<void> {
    await this.clientRest.delete(
      `/repos/${input.userName}/${input.repositoryName}`
    );
  }
}

import axios, { AxiosInstance as GithubClientRest } from 'axios';
import { createAuthorizationHeader } from './helpers';

export function createGithubClientRest(githubToken: string): GithubClientRest {
  return axios.create({
    baseURL: 'https://api.github.com',
    headers: {
      ...createAuthorizationHeader(githubToken),
      Accept: 'application/vnd.github.v3+json',
    },
  });
}

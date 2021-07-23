import { createAuthorizationHeader } from './helpers';

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';

export function createGithubClientGraphql(
  githubToken: string
): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    link: new HttpLink({
      uri: 'https://api.github.com/graphql',
      headers: {
        ...createAuthorizationHeader(githubToken)
      }
    }),
    cache: new InMemoryCache()
  });
}

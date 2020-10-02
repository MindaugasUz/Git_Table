import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { InMemoryCache } from "apollo-cache-inmemory";

function createClient() {
  let apiUrl = "https://api.github.com/graphql";

  if (!apiUrl) {
    throw new Error(
      `App was started without github API URL passed in the env variable`
    );
  }

  const httpLink = new HttpLink({
    uri: apiUrl,
    headers: {
      authorization: `Bearer ${process.env.REACT_APP_GITHUB_API_KEY}`,
    },
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  });

  const link = ApolloLink.from([errorLink, httpLink]);

  const cache = new InMemoryCache();

  const client = new ApolloClient({
    link,
    cache,
  });

  return client;
}

export default createClient;

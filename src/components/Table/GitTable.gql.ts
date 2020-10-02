import gql from "graphql-tag";

export const GET_GIT_REPOS = gql`
  query myOrgRepos($queryString: String!) {
    search(query: $queryString, type: REPOSITORY, first: 10) {
      edges {
        node {
          ... on Repository {
            name
            stargazers {
              totalCount
            }
            forks {
              totalCount
            }
          }
        }
      }
    }
  }
`;

import { MockedProvider, MockedResponse, wait } from "@apollo/react-testing";
import React from "react";
import GitTable from "../../Table/GitTable";
import { render, screen } from "@testing-library/react";
import { GET_GIT_REPOS } from "../../Table/GitTable.gql";

interface TestConfig {
  apolloMocks?: MockedResponse[];
}

export const ApolloWrapper = ({ apolloMocks = [] }: TestConfig) => ({
  children,
}: any) => {
  return <MockedProvider mocks={apolloMocks}>{children}</MockedProvider>;
};

const mocks = [
  {
    request: {
      query: GET_GIT_REPOS,
      variables: {
        name: "react",
      },
    },
    result: {
      data: {
        search: {
          edges: {
            node: {
              name: "react",
              stargazers: { totalCount: 29661 },
              forks: { totalCount: 156758 },
            },
          },
        },
      },
    },
  },
];

describe("<GitTable />", () => {
  it("renders loading messege", async () => {
    const { getByTestId, getByText } = render(<GitTable />, {
      wrapper: ApolloWrapper({ apolloMocks: mocks }),
    });

    expect(screen.getByText("Loading...")).toBeTruthy();
  });

  it("renders git table", async () => {
    const { getByTestId, getByText } = render(<GitTable />, {
      wrapper: ApolloWrapper({ apolloMocks: mocks }),
    });

    // @ts-ignore
    await wait(() => {
      console.debug(screen.getByTestId(/git-table/i));
      expect(screen.getByTestId(/git-table/i)).toContain("Table");
    });
  });
});

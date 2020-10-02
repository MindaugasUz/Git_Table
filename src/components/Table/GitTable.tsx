import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import { StyledTableCell, StyledTableRow } from "./utils";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { GET_GIT_REPOS } from "./GitTable.gql";

const GitTable = () => {
  const classes = useStyles();
  const [inputString, setInputString] = useState("");
  const [queryTerm, setQueryTerm] = useState("react");

  const { loading, error, data } = useQuery(GET_GIT_REPOS, {
    variables: {
      queryString: queryTerm,
    },
  });

  if (loading) {
    return <LoadingMessage>Loading...</LoadingMessage>;
  }
  if (error || !data) {
    return <LoadingMessage>Error...</LoadingMessage>;
  }

  const rows = data.search.edges;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputString(event.target.value);
  };

  const onSubmit = () => {
    setQueryTerm(inputString);
  };

  interface Row {
    node: {
      name: String,
      stargazers: {
        totalCount: number
      }
      forks: {
        totalCount: number
      }
    }
  }

  return (
    <TableWrap>
      <label>
        Search Repos:
        <input type="text" value={inputString} onChange={handleChange} />
        <input type="submit" value="search" onClick={onSubmit} />
      </label>
      <div data-testid="git-table">
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="right">Name</StyledTableCell>
              <StyledTableCell align="right">
                <span role="img" aria-label="stars">
                  {" "}
                  🌟
                </span>{" "}
                Stars
              </StyledTableCell>
              <StyledTableCell align="right">
                <span role="img" aria-label="forks">
                  🍴
                </span>{" "}
                Forks
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: Row) => (
              <StyledTableRow key={row.node.stargazers.totalCount}>
                <StyledTableCell align="right">{row.node.name}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.node.stargazers.totalCount}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.node.forks.totalCount}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </TableWrap>
  );
};

export default GitTable;

const TableWrap = styled.div`
  padding: 50px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoadingMessage = styled.div`
  width: 100%;
  color: red;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const useStyles = makeStyles({
  table: {
    width: "500px",
    outline: "1px solid grey",
  },
});

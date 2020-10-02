import React, { FunctionComponent } from "react";
import GitTable from "./components/Table/GitTable";
import { ApolloProvider } from "react-apollo";
import createClient from "./apollo/createClient";

const App: FunctionComponent = () => {
  return (
    <ApolloProvider client={createClient()}>
      <div className="App">
        <GitTable />
      </div>
    </ApolloProvider>
  );
};

export default App;

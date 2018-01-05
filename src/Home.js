import React, { Component } from "react";
import Paper from "material-ui/Paper";
import PageTitle from "./components/PageTitle";

class Home extends Component {
  render() {
    return (
      <div>
        <PageTitle>Welcome to DHIS2 Analyzer</PageTitle>
        <Paper style={{ padding: "20px", margin: "20px" }}>
          <p>Use the sidebar to start navigating.</p>
        </Paper>
      </div>
    );
  }
}

export default Home;

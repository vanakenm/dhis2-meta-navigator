import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import PageTitle from './components/PageTitle';
import Typography from 'material-ui/Typography';

class Home extends Component {
  render() {
    return (
      <div>
        <PageTitle>Welcome to DHIS2 Meta Navigator</PageTitle>
        <Paper style={{ padding: '20px', margin: '20px' }}>
          <p>
            This app aim to make it easier to search, view and navigate through
            DHIS2 so called "meta" - Data Elements, Org Units and so on.
          </p>
          <p>
            It effectively make possible for a non admin user to check this
            information without requiring knowledge of the API
          </p>
          <p>Use the sidebar to start navigating.</p>

          <b>Features</b>
          <ul>
            <li>List metas</li>
            <li>Search on any field</li>
            <li>Show any field</li>
            <li>Navigate on click</li>
            <li>Export lists as XLS</li>
          </ul>
        </Paper>
      </div>
    );
  }
}

export default Home;

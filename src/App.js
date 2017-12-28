import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Api from './lib/Api';
import NavigationBar from './NavigationBar'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {dataElements: []};
  }

  async componentDidMount() {
    let dataElements = await Api.getDataElements();
    this.setState({dataElements: dataElements});
  }
  render() {
    console.log(this.state.dataElements);

    let paperStyle = { width: '80%', marginLeft: '10%', marginTop: '20px', padding: "50px" }
    let items = []
    this.state.dataElements.forEach(de => items.push(<ListItem primaryText={de.displayName} rightIcon={<ActionInfo />}/>));

    return (
      <MuiThemeProvider>
          <div>
            <NavigationBar />
            <Paper zDepth={1} style={paperStyle} >
                <h2>Welcome to React</h2>
                <h3>Data Elements</h3>
                <List>
                  { items }
                </List>
            </Paper>
          </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

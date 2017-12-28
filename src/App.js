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
    this.state = { models: [] };
  }

  async componentDidMount() {
    let types = await Api.getTypes();
    const models = await this.collectModels(types);

    this.setState({ models: models });
  }

  async collectModels(types) {
    const approvedModels = ['dataElement', 'organisationUnit', 'dataSet', 'organisationUnitGroup', 'dataElementGroup'];
    let models = [];

    for(let entry of Object.entries(types)) {
      let key = entry[0];
      let value = entry[1];

      if(approvedModels.includes(key)) {
        let values = await Api.getAny(key);
        console.log(`${key} ${value}`);

        models.push({ name: key, data: values, count: values.pager.total })
      }
    };
    return models;
  }

  render() {
    let paperStyle = { width: '80%', marginLeft: '10%', marginTop: '20px', padding: "50px" }
    let items = []

    this.state.models.forEach(model => items.push(<ListItem key={model.name} primaryText={`${model.name} (${model.count})`} rightIcon={<ActionInfo />}/>));

    return (
      <MuiThemeProvider>
          <div>
            <NavigationBar />
            <Paper zDepth={1} style={paperStyle} >
                <h2>Welcome to React</h2>
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

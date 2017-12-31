import React, { Component } from "react";
import { Route } from "react-router-dom";
import Grid from "material-ui/Grid";
import Paper from 'material-ui/Paper'
import Api from "./lib/Api";
import Home from "./Home";
import NavigationBar from "./NavigationBar";
import SideBar from "./SideBar";
import Collection from "./Collection";
import Item from "./Item";
import { humanize } from "./lib/Utils";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { models: [] };
  }

  async componentDidMount() {
    let metas = await Api.getMetas();
    this.collectModels(metas);
  }

  async collectModels(types) {
    const rejectedModels = [
      "externalFileResource",
      "api",
      "validationCriteria",
      "mapView",
      "chart",
      "reportTable"
    ];
    let sortedKeys = Object.keys(types).sort();

    for (let key of sortedKeys) {
      if (
        !key.endsWith("s") &&
        !rejectedModels.includes(key) &&
        key.startsWith("organisation")
      ) {
        console.log(key);
        let models = this.state.models;
        models.push({ name: key, label: humanize(key) });
        this.setState({ models: models });
      }
    }
  }

  render() {
    return (
        <div style={{ height: '100%' }}>
          <NavigationBar />
          <Grid container spacing={24} style={{ height: '100%' }}>
            <Grid item xs={3}>
              <SideBar items={this.state.models} />
            </Grid>
            <Grid item xs={9} style={{ height: '100%' }}>
              <Paper style={{ padding: '20px', margin: '20px' }}>
                <Route
                  exact
                  path={"/"}
                  render={() => <Home items={this.state.models} />}
                />
                <Route path={"/collection/:modelname/:id"} component={Item} />
                <Route
                  exact
                  path={"/collection/:modelname"}
                  component={Collection}
                />
              </Paper>
            </Grid>
          </Grid>
        </div>
    );
  }
}

export default App;

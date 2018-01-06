import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Grid from "material-ui/Grid";
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
    let sortedKeys = Object.keys(types).sort();

    for (let key of sortedKeys) {
      if (
        !key.endsWith("s") &&
        (key.startsWith("organisation") ||
          key.startsWith("indicator") ||
          key.startsWith("dataElement"))
      ) {
        let models = this.state.models;
        models.push({ name: key, label: humanize(key) });
        this.setState({ models: models });
      }
    }
  }

  render() {
    return (
      <div style={{ height: "100%" }}>
        <NavigationBar />
        <Grid container spacing={24} style={{ height: "100%" }}>
          <Grid item xs={3}>
            <SideBar items={this.state.models} />
          </Grid>
          <Grid item xs={9} style={{ height: "100%" }}>
            <Switch>
              <Route
                exact
                path={"/"}
                render={() => <Home items={this.state.models} />}
              />
              <Route exact path={"/collection/:modelname/:id"} component={Item} />
              <Route
                exact
                path={"/collection/:modelname"}
                component={Collection}
              />
            </Switch>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;

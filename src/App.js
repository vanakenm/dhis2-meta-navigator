import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Paper from "material-ui/Paper";
import Api from "./lib/Api";
import Home from "./Home";
import NavigationBar from "./NavigationBar";
import Collection from "./Collection";
import Item from "./Item";
import { Route } from "react-router-dom";
import theme from "./utils/theme";

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
        let values = await Api.getAny(key);
        console.log(`${key} ${values}`);

        let models = this.state.models;
        models.push({ name: key, data: values, count: values.pager.total });
        this.setState({ models: models });
      }
    }
  }

  render() {
    let paperStyle = {
      width: "80%",
      marginLeft: "10%",
      marginTop: "20px",
      padding: "50px"
    };

    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <NavigationBar />
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
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

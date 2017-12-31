import React, { Component } from "react";
import List, { ListItem } from "material-ui/List";
import Paper from 'material-ui/Paper'
import { withRouter } from "react-router-dom";

class SideBar extends Component {
  handleClick(modelname) {
    this.props.history.push('/collection/' + modelname);
  }

  render() {
    let items = [];
    this.props.items.forEach(model =>
      items.push(
        <ListItem
          button
          key={model.name}
          onClick={() => this.handleClick(model.name)}
        >
          {model.name}
        </ListItem>
      )
    );

    return (
      <Paper className={'shadow1'} style={{ height: "100%" }}>
        <List>{items}</List>
      </Paper>
    );
  }
}

export default withRouter(SideBar);

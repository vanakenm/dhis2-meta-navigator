import React, { Component } from "react";
import List, { ListItem } from "material-ui/List";
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
          {model.label}
        </ListItem>
      )
    );

    return (
        <List>{items}</List>
    );
  }
}

export default withRouter(SideBar);

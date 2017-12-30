import React, { Component } from "react";
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { Link } from "react-router-dom";

class SideBar extends Component {
  render() {
    let items = [];
    this.props.items.forEach(model =>
      items.push(
        <Link key={model.name} to={`/collection/${model.name}`}>
          <ListItem rightIcon={<span>{model.count}</span>}>
            {model.name}
          </ListItem>
        </Link>
      )
    );

    return (
      <List>
        {items}
      </List>
    );
  }
}

export default SideBar;

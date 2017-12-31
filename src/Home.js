import React, { Component } from "react";
import List, { ListItem } from 'material-ui/List';
import { Link } from "react-router-dom";
import { CircularProgress } from 'material-ui/Progress';

class Home extends Component {
  render() {
    let items = [];
    this.props.items.forEach(model =>
      items.push(
        <Link key={model.name} to={`/collection/${model.name}`}>
          <ListItem>
            {model.name}
          </ListItem>
        </Link>
      )
    );

    return (
      <div>
        <h2>Welcome to DHIS2 Analyzer</h2>
        {items.length === 0 ? (
          <CircularProgress size={80} thickness={5} />
        ) : (
          <List>{items}</List>
        )}
      </div>
    );
  }
}

export default Home;

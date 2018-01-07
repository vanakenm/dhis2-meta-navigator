import React, { Component } from "react";
import List, { ListItem, ListSubheader } from "material-ui/List";
import { humanize } from "./lib/Utils";
import { withRouter } from "react-router-dom";

const GROUPS = ['organisationUnit', 'dataElement', 'indicator', 'dataSet'];

class SideBar extends Component {
  handleClick(modelname) {
    this.props.history.push('/collection/' + modelname);
  }

  renderGroup(group) {
    let elements = [];
    this.props.items.forEach(model => {
      if(model.name.startsWith(group)) {
        elements.push(
          <ListItem
            button
            key={model.name}
            onClick={() => this.handleClick(model.name)}
          >
            {model.label}
          </ListItem>
        )
      }
    });
    return  <List key={group} subheader={<ListSubheader>{ humanize(group) }</ListSubheader>}>{elements}</List>
  }

  render() {
    let groups = []
    GROUPS.forEach(group => groups.push(this.renderGroup(group)));

    return (
      <div>{groups}</div>
    );
  }
}

export default withRouter(SideBar);

import React, { Component } from 'react';
import List, { ListItem, ListSubheader } from 'material-ui/List';
import { humanize } from './lib/Utils';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

class SideBar extends Component {
  handleClick(section, modelname) {
    this.props.history.push(`/collection/${section}/${modelname}`);
  }

  renderSection(section, models) {
    let elements = [];
    models.forEach(model => {
      elements.push(
        <ListItem
          button
          key={model}
          onClick={() => this.handleClick(section, model)}
        >
          {model}
        </ListItem>
      );
    });
    return (
      <List
        key={section}
        subheader={<ListSubheader>{humanize(section)}</ListSubheader>}
      >
        {elements}
      </List>
    );
  }

  render() {
    let sections = [];
    _.forOwn(this.props.items, (models, section) =>
      sections.push(this.renderSection(section, models))
    );

    return <div>{sections}</div>;
  }
}

export default withRouter(SideBar);

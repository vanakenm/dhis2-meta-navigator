import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class Collection extends Component {
    constructor(props) {
    super(props);
    console.log(props);

    let modelName = props.location.pathname.split("/").pop();
    console.log(modelName);
    let collection = props.items.find((model) => model.name === modelName);
    this.state = { modelName: modelName, collection: collection ? collection.data : [] };
  }

  render() {
    console.log(this.state);

    let items = [];
    this.state.collection.forEach(item => items.push(
      <TableRow key={item.id}>
        <TableRowColumn>{item.id}</TableRowColumn>
        <TableRowColumn>{item.displayName}</TableRowColumn>
      </TableRow>
    ));

    return (
      <div>
      <h3>{this.state.modelName}</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>id</TableHeaderColumn>
            <TableHeaderColumn>name</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items}
        </TableBody>
      </Table>
      </div>
    );
  }
}

export default Collection;
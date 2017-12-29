import React, { Component } from 'react';
import Api from './lib/Api';
import CircularProgress from 'material-ui/CircularProgress';

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

    let modelName = props.location.pathname.split("/").pop();
    console.log(modelName);


    this.state = { modelName: modelName, collection: [] };
  }

  async componentDidMount() {
    let collection = await Api.getAny(this.state.modelName);
    this.setState({collection: collection});
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
      { 
        (items.length === 0)
        ? 
        <div>
          <h3>{this.state.modelName} (loading)</h3>
          <CircularProgress size={80} thickness={5} />
        </div>
        : 
        <div>
          <h3>{this.state.modelName} ({items.length})</h3>
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
      } 
      
      </div>
    );
  }
}

export default Collection;
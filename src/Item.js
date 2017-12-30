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

class Item extends Component {
    constructor(props) {
    super(props);

    let modelName = props.match.params.modelname;
    let id = props.match.params.id;

    this.state = { modelName: modelName, id: id, meta: {} };
  }

  async componentDidMount() {
    let meta = await Api.getMeta(this.state.modelName, this.state.id);
    this.setState({meta: meta});
  }

  render() {
    console.log(this.state);

    let sortedKeys = Object.keys(this.state.meta).sort();

    let items = [];

    sortedKeys.forEach((key) => {
      let value = this.state.meta[key];
      
      if(typeof value === 'string' || typeof value === 'number' || typeof value === "boolean") {
        items.push(
          <TableRow key={key}>
            <TableRowColumn>{key}</TableRowColumn>
            <TableRowColumn>{value.toString()}</TableRowColumn>
          </TableRow>
        );
      } else {
        console.log(key);    
        console.log(value); 
        console.log(typeof value);
      }
    });

    return (
      <div>
      { 
        (items.length === 0)
        ? 
        <div>
          <h3>{this.state.modelName} {this.state.id}</h3>
          <CircularProgress size={80} thickness={5} />
        </div>
        : 
        <div>
          <h3>{this.state.modelName} {this.state.id}</h3>
          <Table>
            <TableHeader displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>name</TableHeaderColumn>
                <TableHeaderColumn>value</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {items}
            </TableBody>
          </Table>
        </div>
      } 
      
      </div>
    );
  }
}

export default Item;
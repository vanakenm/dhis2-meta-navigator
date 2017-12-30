import React, { Component } from "react";
import { Link } from "react-router-dom";
import Api from "./lib/Api";
import { CircularProgress } from 'material-ui/Progress';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

class Collection extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    let modelName = props.match.params.modelname;
    console.log(modelName);

    this.state = { modelName: modelName, collection: [] };
  }

  async componentDidMount() {
    let collection = await Api.getAny(this.state.modelName);
    this.setState({ collection: collection });
  }

  render() {
    console.log(this.state);

    let items = [];
    this.state.collection.forEach(item =>
      items.push(
        <TableRow key={item.id}>
          <TableCell>{item.id}</TableCell>
          <TableCell>
            <Link to={`/collection/${this.state.modelName}/${item.id}`}>
              {item.displayName}
            </Link>
          </TableCell>
        </TableRow>
      )
    );

    return (
      <div>
        {items.length === 0 ? (
          <div>
            <h3>{this.state.modelName} (loading)</h3>
            <CircularProgress size={80} thickness={5} />
          </div>
        ) : (
          <div>
            <h3>
              {this.state.modelName} ({items.length})
            </h3>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell>name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{items}</TableBody>
            </Table>
          </div>
        )}
      </div>
    );
  }
}

export default Collection;

import React, { Component } from "react";
import Api from "./lib/Api";
import { CircularProgress } from 'material-ui/Progress';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { withRouter } from "react-router-dom";

class Collection extends Component {
  constructor(props) {
    super(props);
    let modelName = props.match.params.modelname;
    this.state = { modelName: modelName, collection: [] };
  }

  async componentWillReceiveProps(nextProps) {
    let modelName = nextProps.match.params.modelname;
    let collection = await Api.getAny(modelName);
    this.setState({ modelName: modelName, collection: collection });
  }

  handleClick(id) {
    const modelname = this.state.modelName;
    this.props.history.push('/collection/' + modelname + '/' + id);
  }

  render() {
    let items = [];
    this.state.collection.forEach(item =>
      items.push(
        <TableRow key={item.id} hover onClick={() => this.handleClick(item.id)}>
          <TableCell>{item.id}</TableCell>
          <TableCell>
              {item.displayName}
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

export default withRouter(Collection);

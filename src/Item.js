import React, { Component } from "react";
import Api from "./lib/Api";
import Value from "./Value";
import { humanize } from "./lib/Utils";
import PageTitle from "./components/PageTitle";
import { CircularProgress } from "material-ui/Progress";
import Paper from "material-ui/Paper";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table";

class Item extends Component {
  constructor(props) {
    super(props);
    let modelName = props.match.params.modelname;
    let id = props.match.params.id;

    this.state = {
      modelName: modelName,
      id: id,
      label: humanize(modelName),
      meta: {}
    };
  }

  async componentWillMount() {
    await this.updateState(this.props);
  }

  async componentWillReceiveProps(nextProps) {
    await this.updateState(nextProps);
  }

  async updateState(props) {
    let modelName = props.match.params.modelname;
    let id = props.match.params.id;

    let schema = await Api.getSchema(modelName);
    let meta = await Api.getMeta(modelName, id);

    let properties = {};

    schema.properties.forEach(property => {
      properties[property["fieldName"]] = property;
    });

    this.setState({
      modelName: modelName,
      label: humanize(modelName),
      id: id,
      meta: meta,
      schema: schema,
      properties: properties
    });
  }

  render() {
    let sortedKeys = Object.keys(this.state.meta).sort();
    let items = [];

    console.log(this.state.meta.level);
    if (this.state.properties) {
      console.log(this.state.properties);
    }

    sortedKeys.forEach(key => {
      let value = this.state.meta[key];
      items.push(
        <TableRow key={key}>
          <TableCell>{key}</TableCell>
          <TableCell>
            <Value
              value={value}
              name={key}
              property={this.state.properties[key]}
            />
          </TableCell>
        </TableRow>
      );
    });

    return (
      <div>
        {items.length === 0 ? (
          <div>
            <PageTitle>
              {this.state.label} > ({this.state.id})
            </PageTitle>
            <Paper style={{ padding: "20px", margin: "20px" }}>
              <CircularProgress size={80} thickness={5} />
            </Paper>
          </div>
        ) : (
          <div>
            <PageTitle>
              {this.state.label} > {this.state.meta.displayName} ({this.state.id})
            </PageTitle>
            <Paper style={{ padding: "20px", margin: "20px" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{items}</TableBody>
              </Table>
            </Paper>
          </div>
        )}
      </div>
    );
  }
}

export default Item;

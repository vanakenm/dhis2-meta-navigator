import React, { Component } from "react";
import Api from "./lib/Api";
import PageTitle from "./components/PageTitle";
import { humanize } from "./lib/Utils";
import { CircularProgress } from "material-ui/Progress";
import Paper from "material-ui/Paper";
import { withRouter } from "react-router-dom";
import { PagingState, CustomPaging } from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  ColumnChooser,
  TableColumnVisibility,
  Toolbar
} from "@devexpress/dx-react-grid-material-ui";

class Collection extends Component {
  constructor(props) {
    super(props);
    let modelName = props.match.params.modelname;
    this.state = {
      modelName: modelName,
      label: humanize(modelName),
      collection: [],
      hiddenColumnNames: []
    };
  }

  async updateState(props) {
    let modelName = props.match.params.modelname;
    let collection = await Api.getAny(modelName);
    let schema = await Api.getSchema(modelName);

    let rows = [];
    collection.forEach(item => rows.push(item));

    let fieldNames = schema.properties
      .filter(prop => {
        return (
          prop.simple && (prop.fieldName !== undefined && prop.fieldName !== "")
        );
      })
      .map(prop => {
        return prop.fieldName;
      });

    fieldNames.unshift("id");

    let columns = fieldNames.map(field => {
      return { name: field, title: field };
    });

    let hiddenColumnNames = fieldNames.filter(
      f => !["id", "displayName"].includes(f)
    );

    this.setState({
      modelName,
      label: humanize(modelName),
      collection,
      schema,
      rows,
      columns,
      fieldNames,
      hiddenColumnNames
    });
  }

  async componentWillMount() {
    await this.updateState(this.props);
  }

  async componentWillReceiveProps(nextProps) {
    await this.updateState(nextProps);
  }

  handleClick(row) {
    const modelname = this.state.modelName;
    this.props.history.push("/collection/" + modelname + "/" + row.id);
  }

  changePage(currentPage) {
    this.state.collection.pager.goToPage(currentPage + 1).then(collection => {
      let rows = [];
      collection.forEach(item => rows.push(item));
      this.setState({ collection, rows });
    });
  }

  render() {
    const TableRow = ({ row, ...restProps }) => (
      <Table.Row
        {...restProps}
        // eslint-disable-next-line no-alert
        onClick={() => this.handleClick(row)}
        style={{
          cursor: "pointer"
        }}
      />
    );

    if (this.state.rows === undefined) {
      return (
        <div>
          <div>
            <PageTitle>{this.state.label}s</PageTitle>
            <Paper style={{ padding: "20px", margin: "20px" }}>
              <CircularProgress size={80} thickness={5} />
            </Paper>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div>
          <PageTitle>{this.state.label}s</PageTitle>
          <Paper style={{ padding: "20px", margin: "20px" }}>
            <Grid rows={this.state.rows} columns={this.state.columns}>
              <PagingState
                currentPage={this.state.collection.pager.page - 1}
                onCurrentPageChange={nextPage => this.changePage(nextPage)}
                pageSize={50}
              />
              <CustomPaging totalCount={this.state.collection.pager.total} />
              <Table rowComponent={TableRow} />
              <TableHeaderRow />
              <TableColumnVisibility
                defaultHiddenColumnNames={this.state.hiddenColumnNames}
              />
              <Toolbar />
              <ColumnChooser />
              <PagingPanel pageSizes={[50]} />
            </Grid>
          </Paper>
        </div>
      </div>
    );
  }
}

export default withRouter(Collection);

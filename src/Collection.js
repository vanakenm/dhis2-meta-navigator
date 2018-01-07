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
  PagingPanel
} from "@devexpress/dx-react-grid-material-ui";

class Collection extends Component {
  constructor(props) {
    super(props);
    let modelName = props.match.params.modelname;
    this.state = {
      modelName: modelName,
      label: humanize(modelName),
      collection: []
    };
  }

  async updateState(props) {
    let modelName = props.match.params.modelname;
    let collection = await Api.getAny(modelName);
    this.setState({
      modelName: modelName,
      label: humanize(modelName),
      collection: collection
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
    this.state.collection.pager
      .goToPage(currentPage + 1)
      .then(organisationUnitCollection => {
        this.setState({ collection: organisationUnitCollection });
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
    let rows = [];
    this.state.collection.forEach(item =>
      rows.push({ id: item.id, displayName: item.displayName })
    );

    return (
      <div>
        {rows.length === 0 ? (
          <div>
            <PageTitle>{this.state.label} (loading)</PageTitle>
            <Paper style={{ padding: "20px", margin: "20px" }}>
              <CircularProgress size={80} thickness={5} />
            </Paper>
          </div>
        ) : (
          <div>
            <PageTitle>{this.state.label}</PageTitle>
            <Paper style={{ padding: "20px", margin: "20px" }}>
              <Grid
                rows={rows}
                columns={[
                  { name: "id", title: "ID" },
                  { name: "displayName", title: "Display Name" }
                ]}
              >
                <PagingState
                  currentPage={this.state.collection.pager.page - 1}
                  onCurrentPageChange={nextPage => this.changePage(nextPage)}
                  pageSize={50}
                />
                <CustomPaging totalCount={this.state.collection.pager.total} />
                <Table rowComponent={TableRow} />
                <TableHeaderRow />
                <PagingPanel pageSizes={[50]} />
              </Grid>
            </Paper>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Collection);

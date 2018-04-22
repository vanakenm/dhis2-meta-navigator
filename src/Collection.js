import React, { Component } from 'react';
import Api from './lib/Api';
import PageTitle from './components/PageTitle';
import FilterPanel from './components/FilterPanel';
import { humanize } from './lib/Utils';
import { CircularProgress } from 'material-ui/Progress';
import Paper from 'material-ui/Paper';
import { withRouter } from 'react-router-dom';
import { PagingState, CustomPaging } from '@devexpress/dx-react-grid';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog';
import { CSVLink } from 'react-csv';
import Button from 'material-ui/Button';
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  ColumnChooser,
  TableColumnVisibility,
  Toolbar
} from '@devexpress/dx-react-grid-material-ui';

class Collection extends Component {
  constructor(props) {
    super(props);
    let modelName = props.match.params.modelname;
    this.state = {
      modelName: modelName,
      label: humanize(modelName),
      collection: [],
      hiddenColumnNames: [],
      openDialog: false,
      allRows: []
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
          prop.simple && (prop.fieldName !== undefined && prop.fieldName !== '')
        );
      })
      .map(prop => {
        return prop.fieldName;
      });

    fieldNames.unshift('id');

    let columns = fieldNames.map(field => {
      return { name: field, title: field };
    });

    let hiddenColumnNames = fieldNames.filter(
      f => !['id', 'displayName'].includes(f)
    );

    this.setState({
      modelName,
      label: humanize(modelName),
      collection,
      schema,
      rows,
      columns,
      fieldNames,
      hiddenColumnNames,
      filter: null
    });
  }

  loadAllRows = async () => {
    let collection = await Api.getAny(this.state.modelName, {
      paging: false,
      filter: this.state.filter
    });
    let allRows = [];
    collection.forEach(item => allRows.push(item));
    this.setState({ allRows });
  };

  async componentWillMount() {
    await this.updateState(this.props);
  }

  async componentWillReceiveProps(nextProps) {
    await this.updateState(nextProps);
  }

  handleClick(row) {
    const modelname = this.state.modelName;
    this.props.history.push('/collection/' + modelname + '/' + row.id);
  }

  changePage(currentPage) {
    this.state.collection.pager.goToPage(currentPage + 1).then(collection => {
      let rows = [];
      collection.forEach(item => rows.push(item));
      this.setState({ collection, rows });
    });
  }

  openDialog = () => {
    this.loadAllRows();
    this.setState({ openDialog: true });
  };

  closeDialog = () => {
    this.setState({ openDialog: false });
  };

  cancelFilter = async () => {
    await this.setState({});
    let collection = await Api.getAny(this.state.modelName);
    let rows = [];
    collection.forEach(item => rows.push(item));
    this.setState({ rows, collection, filter: null });
  };

  applyFilter = async (field, operator, value) => {
    this.setState({ filter: { field, operator, value } });
    let collection = await Api.getAny(this.state.modelName, {
      filter: {
        field,
        operator,
        value
      },
      paging: true
    });
    let rows = [];
    collection.forEach(item => rows.push(item));
    this.setState({ rows, collection });
  };

  render() {
    const TableRow = ({ row, ...restProps }) => (
      <Table.Row
        {...restProps}
        // eslint-disable-next-line no-alert
        onClick={() => this.handleClick(row)}
        style={{
          cursor: 'pointer'
        }}
      />
    );

    if (this.state.rows === undefined) {
      return (
        <div>
          <div>
            <PageTitle>{this.state.label}s</PageTitle>
            <Paper style={{ padding: '20px', margin: '20px' }}>
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
          <Paper style={{ padding: '20px', margin: '20px' }}>
            <FilterPanel
              fields={this.state.fieldNames}
              applyFilter={this.applyFilter}
              cancelFilter={this.cancelFilter}
            />
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
            <Button color="primary" variant="raised" onClick={this.openDialog}>
              Download
            </Button>

            <Dialog
              aria-labelledby="simple-dialog-title"
              open={this.state.openDialog}
            >
              <DialogTitle id="simple-dialog-title">Download</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {this.state.allRows.length === 0 ? (
                    <p>Fetching data...</p>
                  ) : (
                    <CSVLink
                      data={this.state.allRows}
                      headers={this.state.columns.map(c => c.name)}
                      filename={`${this.state.modelName}s.csv`}
                      target="_blank"
                    >
                      <Button color="primary" variant="raised">
                        Download as Excel
                      </Button>
                    </CSVLink>
                  )}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.closeDialog} color="primary" autoFocus>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </Paper>
        </div>
      </div>
    );
  }
}

export default withRouter(Collection);

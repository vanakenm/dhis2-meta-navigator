import React, { Component } from "react";
import Api from "./lib/Api";
import PageTitle from "./components/PageTitle";
import { humanize } from "./lib/Utils";
import { CircularProgress } from "material-ui/Progress";
import Button from "material-ui/Button";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table";
import Paper from "material-ui/Paper";
import { withRouter } from "react-router-dom";

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

  handleClick(id) {
    const modelname = this.state.modelName;
    this.props.history.push("/collection/" + modelname + "/" + id);
  }

  nextPage() {
    this.state.collection.pager
      .getNextPage()
      .then(organisationUnitCollection => {
        this.setState({ collection: organisationUnitCollection });
      });
  }

  previousPage() {
    this.state.collection.pager
      .getPreviousPage()
      .then(organisationUnitCollection => {
        this.setState({ collection: organisationUnitCollection });
      });
  }

  render() {
    console.log(this.state.collection);
    let items = [];
    this.state.collection.forEach(item =>
      items.push(
        <TableRow key={item.id} hover onClick={() => this.handleClick(item.id)}>
          <TableCell>{item.id}</TableCell>
          <TableCell>{item.displayName}</TableCell>
        </TableRow>
      )
    );

    return (
      <div>
        {items.length === 0 ? (
          <div>
            <PageTitle>{this.state.label} (loading)</PageTitle>
            <Paper style={{ padding: "20px", margin: "20px" }}>
              <CircularProgress size={80} thickness={5} />
            </Paper>
          </div>
        ) : (
          <div>
            <PageTitle>
              {this.state.label} ({items.length}/{
                this.state.collection.pager.total
              })
            </PageTitle>
            <Paper style={{ padding: "20px", margin: "20px" }}>
              <Button
                raised
                color="primary"
                onClick={() => this.previousPage()}
              >
                Previous
              </Button>
              <Button raised color="primary" onClick={() => this.nextPage()}>
                Next
              </Button>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell>name</TableCell>
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

export default withRouter(Collection);

import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

const OPERATORS = ['eq', 'like', 'ilike', 'gt', 'lt'];

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

class FilterPanel extends Component {
  state = {
    field: 'id',
    operator: 'eq'
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  cancelFilter = () => {
    this.setState({ value: '' });
    this.props.cancelFilter();
  };

  handleFilter = () => {
    this.props.applyFilter(
      this.state.field,
      this.state.operator,
      this.state.value
    );
  };

  render() {
    const { classes, fields } = this.props;
    return (
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="field">Field</InputLabel>
          <Select
            name="field"
            value={this.state.field}
            onChange={this.handleChange}
            inputProps={{ name: 'field', id: 'field' }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {fields.map(field => <MenuItem value={field}>{field}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="operator">Operator</InputLabel>
          <Select
            name="operator"
            value={this.state.operator}
            onChange={this.handleChange}
            inputProps={{ name: 'operator', id: 'operator' }}
          >
            {OPERATORS.map(op => <MenuItem value={op}>{op}</MenuItem>)}
          </Select>
        </FormControl>
        <TextField
          id="value"
          name="value"
          label="Value"
          className={classes.textField}
          value={this.state.value}
          onChange={this.handleChange}
          margin="normal"
        />
        <Button color="primary" variant="raised" onClick={this.handleFilter}>
          Apply
        </Button>
        <Button color="secondary" variant="raised" onClick={this.cancelFilter}>
          Cancel
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(FilterPanel);

import React, { Component } from "react";
import Paper from "material-ui/Paper";
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Typography from 'material-ui/Typography';

class SearchBox extends Component {
  render() {
    return(
       <Paper style={{ padding: "20px", margin: "20px" }}>
        <Typography type="display1" gutterBottom style={{ padding: "20px" }}>Search</Typography>
        <FormControl>
          <Input
            id="search-id"
            endAdornment={<InputAdornment position="end">Eq</InputAdornment>}
          />
          <FormHelperText>Id</FormHelperText>
        </FormControl>
        <FormControl>
          <Input
            id="search-name"
            endAdornment={<InputAdornment position="end">Like</InputAdornment>}
          />
          <FormHelperText>Display Name</FormHelperText>
        </FormControl>
      </Paper>
      );
  }
}

export default SearchBox;



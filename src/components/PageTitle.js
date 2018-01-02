import React, { Component } from "react";
import Typography from 'material-ui/Typography';

class PageTitle extends Component {
  render() {
    return <Typography type="display1" gutterBottom style={{ padding: "20px" }}>{this.props.children}</Typography>;
  }
}

export default PageTitle;

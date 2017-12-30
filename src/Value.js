import { Component } from "react";

class Value extends Component {
  isBasicType(value) {
    return typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean";
  }

  render() {
    const value = this.props.value;
    if (value == null) {
      return " - ";
    }

    if (this.isBasicType(value)) {
      return value.toString();
    } else {
      return "";
    }
  }
}

export default Value;
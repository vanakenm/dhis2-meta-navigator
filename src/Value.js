import React, { Component } from "react";
import { Link } from "react-router-dom";
import { timeAgo } from "./lib/Utils";

class Value extends Component {
  isBasicType(value) {
    return typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean";
  }

  model(property) {
    return property.relativeApiEndpoint.slice(1,-1);
  }

  render() {
    const value = this.props.value;
    if (value == null || this.props.property == null) {
      return " - ";
    }

    if (this.props.name === 'id' || (this.props.property.simple === true && this.props.property.propertyType !== 'ĈOLLECTION')) {
      if (this.props.property.propertyType === 'DATE') {
        return `${value} (${timeAgo(new Date(value))})`;
      } else {
        return value.toString();
      }
    } 

    if(this.props.property.propertyType === 'REFERENCE') {
      const model = this.model(this.props.property);
      return <span><Link to={`/collection/${model}/${value.id}`}>({value.id})</Link> ({model})</span>;
    } 
    if(this.props.property.propertyType === 'COLLECTION' && this.props.property.itemPropertyType === 'REFERENCE') {
      const model = this.model(this.props.property);
      let values = [];
      value.forEach((v) => {
        values.push(<span key={v.id}><Link to={`/collection/${model}/${v.id}`}>{v.id}</Link> </span>);
      });

      return <div>{values} ({model})</div>;
    }
    else {
     return "";
    }
  }
}

export default Value;
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { timeAgo } from "./lib/Utils";

import ClearIcon from 'material-ui-icons/Clear';
import DoneIcon from 'material-ui-icons/Done';
import BlockIcon from 'material-ui-icons/Block';

class Value extends Component {
  model(property) {
    return property.relativeApiEndpoint.slice(1,-1);
  }

  render() {
    const value = this.props.value;
    const property = this.props.property;
    
    if (value == null || property == null) {
      return <BlockIcon />;
    }

    if (this.props.name === 'id' || (property.simple === true && property.propertyType !== 'ĈOLLECTION')) {
      if (property.propertyType === 'DATE') {
        return `${value} (${timeAgo(new Date(value))})`;
      } else if (typeof value === "boolean") {
        return value ? <DoneIcon /> : <ClearIcon />;
      }
      else {
        return value.toString();
      }
    } 

    if(property.propertyType === 'REFERENCE') {
      const model = this.model(property);
      return <span><Link to={`/collection/${model}/${value.id}`}>({value.id})</Link> ({model})</span>;
    } 
    
    if(property.propertyType === 'COLLECTION' && property.itemPropertyType === 'REFERENCE') {
      const model = this.model(property);
      let values = [];
      value.forEach((v) => {
        values.push(<span key={v.id}><Link to={`/collection/${model}/${v.id}`}>{v.id}</Link> </span>);
      });

      return <div>{values} ({model})</div>;
    }
    else {
      console.log("Not shown yet");
      console.log(value);
      console.log(property);
     return "";
    }
  }
}

export default Value;
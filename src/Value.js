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

  renderBoolean(boolvalue) {
    return boolvalue ? <DoneIcon /> : <ClearIcon />;
  } 

  render() {
    const value = this.props.value;
    const property = this.props.property;
    
    if (value == null || property == null) {
      return <BlockIcon />;
    }

    if (Array.isArray(value) && value.length === 0) {
      return "(empty)";
    }

    if (this.props.name === 'id' || (property.simple === true && property.propertyType !== 'ĈOLLECTION')) {
      if (property.propertyType === 'DATE') {
        return `${value} (${timeAgo(new Date(value))})`;
      } else if (typeof value === "boolean") {
        return this.renderBoolean(value);
      }
      else {
        return value.toString();
      }
    } 

    if(property.propertyType === 'REFERENCE') {
      console.log(this.props.name);
      console.log(property);
      console.log(value);
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

    if(this.props.name === 'access') {
      let access = [];
      Object.entries(value).forEach(([key, value]) => {
        access.push(<span key={key}>{key} {this.renderBoolean(value)}</span>);
      });
      return <span>{access}</span>;
    }

    if(this.props.name === 'translations') {
      let translations = value.map((t) => { return `'${t.value} (${t.locale})'` });
      return <span>{translations.join(" ")}</span>      
    }
      
    console.log("Not shown yet for " + this.props.name);
    console.log(value);
    console.log(property);
    return "";
  }
}

export default Value;
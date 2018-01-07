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

  renderSimple(property, value) {
    if (property !== null && property !== undefined && property.propertyType === 'DATE') {
      return `${value} (${timeAgo(new Date(value))})`;
    } else if (typeof value === "boolean") {
      return this.renderBoolean(value);
    } else {
      return value.toString();
    }
  }

  renderReferences(property, value) {
    const model = this.model(property);
    let values = [];
    if(this.props.links) {
      this.props.links[`${model}s`].forEach((l) => {
        values.push(<span key={l.id}><Link to={`/collection/${model}/${l.id}`}>{l.displayName}</Link> </span>);
      });
      if(value.length > this.props.links.length) {
        values.push(<span key="more">... ({value.length - this.props.links.length} more)</span>);
      }
    } else {
      value.forEach((v) => {
        values.push(<span key={v.id}><Link to={`/collection/${model}/${v.id}`}>{v.id}</Link> </span>);
      })
    }
    return <div>{values} ({model})</div>;
  }

  renderAccess(property, value) {
    let access = [];
    Object.entries(value).forEach(([key, value]) => {
      access.push(<span key={key}>{key} {this.renderBoolean(value)}</span>);
    });
    return <span>{access}</span>;
  }

  renderReference(property, value) {
    const model = this.model(property);
    if(this.props.links) {
      return <span><Link to={`/collection/${model}/${value.id}`}>{this.props.links.displayName}</Link> ({model})</span>;
    } else {
      return <span><Link to={`/collection/${model}/${value.id}`}>{value.id}</Link> ({model})</span>;
    }
  }

  render() {
    const value = this.props.value;
    const property = this.props.property;

    console.log(this.props.name);
    console.log(this.props.value);
    console.log(this.props.property);
    console.log(this.props.links);

    if (Array.isArray(value) && value.length === 0) {
      return "(empty)";
    }

    if (this.props.name === 'id' || this.props.name === 'level') {
      return this.renderSimple(property, value);
    }


    if (value == null || property == null) {
      return <BlockIcon />;
    }

    if (property.simple === true && property.propertyType !== 'ĈOLLECTION') {
      return this.renderSimple(property, value);
    } 

    if(property.propertyType === 'REFERENCE') {
      return this.renderReference(property, value);
    } 
    
    if(property.propertyType === 'COLLECTION' && property.itemPropertyType === 'REFERENCE') {
      return this.renderReferences(property, value);
    }

    if(this.props.name === 'access') {
      return this.renderAccess(property, value);
    }

    if(this.props.name === 'translations') {
      let translations = value.map((t) => { return `'${t.value} (${t.locale})'` });
      return <span>{translations.join(" ")}</span>      
    }
      
    return "";
  }
}

export default Value;
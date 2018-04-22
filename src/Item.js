import React, { Component } from 'react';
import Api from './lib/Api';
import Value from './Value';
import { humanize } from './lib/Utils';
import PageTitle from './components/PageTitle';
import { CircularProgress } from 'material-ui/Progress';
import Paper from 'material-ui/Paper';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from 'material-ui/Table';

class Item extends Component {
  constructor(props) {
    super(props);
    let modelName = props.match.params.modelname;
    let sectionName = props.match.params.sectionname;
    let id = props.match.params.id;

    this.state = {
      modelName,
      sectionName,
      id,
      label: humanize(modelName),
      meta: {}
    };
  }

  async componentWillMount() {
    await this.updateState(this.props);
  }

  async componentWillReceiveProps(nextProps) {
    await this.updateState(nextProps);
  }

  async getLink(property, meta) {
    const id = meta[property.collectionName || property.fieldName].id;
    const model = property.relativeApiEndpoint.slice(1, -1);
    const link = await Api.getMeta(model, id);
    return link;
  }

  async getLinks(property, meta) {
    const ids = [];

    meta[property.collectionName || property.fieldName].forEach(v => {
      ids.push(v.id);
    });

    const model = property.relativeApiEndpoint.slice(1, -1);
    const links = await Api.getMultipleMetas(model, ids.slice(0, 49));
    return links;
  }

  async updateState(props) {
    let modelName = props.match.params.modelname;
    let id = props.match.params.id;

    let schema = await Api.getSchema(modelName);
    let meta = await Api.getMeta(modelName, id);

    let properties = {};

    let links = {};

    for (let property of schema.properties) {
      if (
        property.propertyType === 'REFERENCE' &&
        property.relativeApiEndpoint &&
        (meta[property.fieldName] || meta[property.collectionName])
      ) {
        links[
          property.collectionName || property.fieldName
        ] = await this.getLink(property, meta);
      }
      if (
        property.propertyType === 'COLLECTION' &&
        property.itemPropertyType === 'REFERENCE' &&
        property.relativeApiEndpoint &&
        (meta[property.fieldName] || meta[property.collectionName])
      ) {
        links[
          property.collectionName || property.fieldName
        ] = await this.getLinks(property, meta);
      }
      properties[property.collectionName || property.fieldName] = property;
    }

    this.setState({
      modelName: modelName,
      label: humanize(modelName),
      id: id,
      meta: meta,
      schema: schema,
      properties: properties,
      links: links
    });
  }

  render() {
    let sortedKeys = Object.keys(this.state.meta).sort();
    let items = [];

    sortedKeys.forEach(key => {
      let value = this.state.meta[key];
      items.push(
        <TableRow key={key}>
          <TableCell>{key}</TableCell>
          <TableCell>
            <Value
              value={value}
              name={key}
              property={this.state.properties[key]}
              links={this.state.links[key]}
            />
          </TableCell>
        </TableRow>
      );
    });

    let editUrl = `${Api.getUrl()}/dhis-web-maintenance/#/edit/${
      this.state.sectionName
    }/${this.state.modelName}/${this.state.id}`;
    return (
      <div>
        {items.length === 0 ? (
          <div>
            <PageTitle>
              {this.state.label} > ({this.state.id})
            </PageTitle>
            <Paper style={{ padding: '20px', margin: '20px' }}>
              <CircularProgress size={80} thickness={5} />
            </Paper>
          </div>
        ) : (
          <div>
            <PageTitle>
              {this.state.label} > {this.state.meta.displayName} ({
                this.state.id
              })
            </PageTitle>
            <a href={editUrl} target="_blank">
              Edit in DHIS2
            </a>
            <Paper style={{ padding: '20px', margin: '20px' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Value</TableCell>
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

export default Item;

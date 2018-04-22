import { init, getInstance, getManifest } from 'd2/lib/d2';
import _ from 'lodash';

const API_URL = 'https://play.dhis2.org/2.28/';

const SECTIONS = {
  categorySection: [
    'categoryOption',
    'category',
    'categoryCombo',
    'categoryOptionCombo',
    'categoryOptionGroup',
    'categoryOptionGroupSet'
  ],
  dataElementSection: [
    'dataElement',
    'dataElementGroup',
    'dataElementGroupSet'
  ],
  dataSetSection: ['dataSet'],
  organisationUnitSection: [
    'organisationUnit',
    'organisationUnitGroup',
    'organisationUnitGroupSet',
    'organisationUnitLevel'
  ],
  indicatorSection: [
    'indicator',
    'indicatorGroup',
    'indicatorType',
    'indicatorGroupSet'
  ],
  otherSection: ['attribute']
};

const ITEMS_PER_SECTION = {
  categoryOption: 'categorySection',
  category: 'categorySection',
  categoryCombo: 'categorySection',
  categoryOptionCombo: 'categorySection',
  categoryOptionGroup: 'categorySection',
  categoryOptionGroupSet: 'categorySection',
  dataElement: 'dataElement',
  dataElementGroup: 'dataElement',
  dataElementGroupSet: 'dataElement',
  dataSet: 'dataSetSection',
  organisationUnit: 'organisationUnitSection',
  organisationUnitGroup: 'organisationUnitSection',
  organisationUnitGroupSet: 'organisationUnitSection',
  organisationUnitLevel: 'organisationUnitSection',
  indicator: 'indicatorSection',
  indicatorGroup: 'indicatorSection',
  indicatorType: 'indicatorSection',
  indicatorGroupSet: 'indicatorSection',
  attribute: 'otherSection'
};

class Api {
  /**
   * @param url API endpoint url
   * @param auth Authentication HTTP header content
   */
  constructor(url) {
    this.url = url;
    this.cache = [];
    this.userId = '';
    this.baseUrl = '..';
    this.ignoredStores = [''];
  }

  /**
   * Initialized the Api to a d2 instance.
   * @returns {Api}
   */
  initialize() {
    let headers =
      process.env.NODE_ENV === 'development'
        ? { Authorization: 'Basic YWRtaW46ZGlzdHJpY3Q=' }
        : null;
    this.d2 = getManifest('./manifest.webapp')
      .then(manifest => {
        const baseUrl =
          process.env.NODE_ENV === 'production'
            ? manifest.getBaseUrl()
            : this.url;
        console.info('Using URL: ' + baseUrl);
        console.info(`Loading: ${manifest.name} v${manifest.version}`);
        console.info(`Built ${manifest.manifest_generated_at}`);
        this.baseUrl = baseUrl;
        return baseUrl + '/api';
      })
      .catch(e => {
        return this.url;
      })
      .then(baseUrl => {
        init({ baseUrl, headers }).then(
          d2 => (this.userId = d2.currentUser.username)
        );
      });
    this.getSchema = _.memoize(this.getSchema);
    return this;
  }

  getSchema(model) {
    return getInstance().then(d2 => d2.Api.getApi().get(`schemas/${model}`));
  }

  getMeta(type, id) {
    return getInstance().then(d2 => d2.models[type].get(id));
  }

  getUrl() {
    return this.baseUrl;
  }

  getMultipleMetas(type, ids) {
    return getInstance().then(d2 =>
      d2.Api.getApi().get(`${type}s?filter=id:in:[${ids.join(',')}]`)
    );
  }

  getAny(type, params = { paging: true, filter: null }) {
    if (
      params.filter !== undefined &&
      params.filter !== null &&
      params.filter.field !== undefined
    )
      return getInstance().then(d2 =>
        d2.models[type].list({
          fields: ':all',
          paging: params.paging,
          filter: `${params.filter.field}:${params.filter.operator}:${
            params.filter.value
          }`
        })
      );
    else {
      return getInstance().then(d2 =>
        d2.models[type].list({ fields: ':all', paging: params.paging })
      );
    }
  }

  /**
   * Make sure the response status code is 2xx
   * @param response
   */
  successOnly(response) {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    }
    return Promise.reject(response);
  }
}

export { SECTIONS, ITEMS_PER_SECTION };
export default (() => new Api(API_URL).initialize())();

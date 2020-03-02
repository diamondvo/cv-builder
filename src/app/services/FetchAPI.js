import APISchema from './APISchema';
import BaseUrlSchema from './BaseUrlSchema';

export class FetchAPI {
  constructor(service) {
    this.service = service;
    // Get base URL for the service
    const baseUrlClass = new BaseUrlSchema();
    this.baseURL = baseUrlClass.schema[service];

    // Get the CRUDSchema
    const rootAPI = new APISchema(this.baseURL);
    this.ApiSchema = rootAPI.GenericSchema;

    // If service has custom API then append to ApiSchema
    if (service in rootAPI.CustomSchemaByService) {
      let customSchema = rootAPI.CustomSchemaByService[service];
      this.ApiSchema = {
        ...rootAPI.GenericSchema,
        ...customSchema,
      };
    }
  }

  fetchRequest = (url, payload) => {
    return fetch(url, payload).then(function(response) {
      // Check if the request is 200
      if (response.ok) {
        try {
          return response.json();
        } catch (error) {
          // console.log("Json serilize response error: " , error);
          return response;
        }
      }
      return new Promise((resolve, reject) => {
        response.text().then(response_text => {
          try {
            const response_json = JSON.parse(response_text);
            reject(response_json);
          } catch (err) {
            reject(response_text);
          }
        });
      });
    });
  };

  fetch = fetchOptions => {
    const url = this.getURL(fetchOptions);
    const payload = this.getPayload(fetchOptions);
    return this.fetchRequest(url, payload);
  };

  getPayload = fetchOptions => {
    const { type, body } = fetchOptions;
    let payload = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    if (type in this.ApiSchema) {
      payload.method = this.ApiSchema[type]['method'];
    }
    if (body && payload.method !== 'GET') {
      payload.body = JSON.stringify(body);
    }

    return payload;
  };

  getURL = fetchOptions => {
    const { type, queryParams } = fetchOptions;
    let path = this.ApiSchema[type]['path'];
    if ('id' in fetchOptions && !('id2' in fetchOptions)) {
      path = path(fetchOptions.id);
    } else if ('id' in fetchOptions && 'id2' in fetchOptions) {
      path = path(fetchOptions.id, fetchOptions.id2);
    }

    let url = path + this.query(queryParams);

    return url;
  };

  query = queryParams => {
    let q = '',
      i = 0;
    if (queryParams) {
      for (var key in queryParams) {
        q = q + `${i > 0 ? '&' : '?'}${key}=${queryParams[key]}`;
        i += 1;
      }
    }
    return q;
  };
}

export default FetchAPI;

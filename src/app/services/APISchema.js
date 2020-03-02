export class APISchema {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.GenericSchema = {
      get: { path: `${this.baseURL}/`, method: 'GET' }
    };
    this.CustomSchemaByService = {};
  }
}

export default APISchema;

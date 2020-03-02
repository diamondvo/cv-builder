export class BaseUrlSchema {
  constructor() {
    this.API_HOST = 'http://localhost:5000';
    this.schema = {
      resume: `${this.API_HOST}/resume`
    };
  }
}

export default BaseUrlSchema;

import axios from 'axios';
import _ from 'lodash';
class Base {
  constructor() {
    // tools
    this._ = _;

    // plugins
    this.axios = axios;

    // params
    this.serverBaseURL = '';
    this.pathURL = '';
    this.timeOut = 2000;
  }

  async get(params) {
    const URL = this.serverBaseURL + this.pathURL;
    const result = await axios.get(URL, {
      method: 'GET',
      params,
    });

    return result && result.data;
  }
}

export default Base;

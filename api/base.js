const axios = require('axios');
const _ = require('lodash');

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

  async get(url, params = {}, field = '') {
    const headers = {
      'Content-Type': 'application/json',
      Referer: 'https://www.bilibili.com',
      Connection: 'keep-alive',
      'User-Agent': this.userAgent,
      Cookie: this.cookie,
    };

    const result = await axios.get(url, {
      headers,
      params,
    });

    return field === '' ? result.data : this._.get(result.data, field);
  }

  async post(url, params = {}, field = '') {
    const headers = {
      Referer: 'https://www.bilibili.com',
      Connection: 'keep-alive',
      'User-Agent': this.userAgent,
      Cookie: this.cookie,
    };

    const result = await axios.post(url, {
      headers,
      params,
    });

    return field === '' ? result.data : this._.get(result.data, field);
  }
}

module.exports = Base;

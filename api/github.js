import Base from './base';

class Github extends Base {
  constructor(args) {
    super(args);
    this.serverBaseURL = 'https://api.github.com';
  }

  async getStaredList({ username, page }) {
    const URL = `${this.serverBaseURL}/users/${username}/starred`;

    const rs = await this.axios.get(URL, {
      params: { per_page: 10, page },
      headers: { Accept: 'application/vnd.github.v3+json' },
    });
    return rs && rs.data;
  }
}

export default Github;

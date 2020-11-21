import Base from './base';
import ReqConfAPI from './reqConf';

class Recommend extends Base {
  constructor(args) {
    super(args);
    this.serverBaseURL = 'https://new.i.atips.cn/api/v1';
    this.pathURL = '/commonRecommands';
    this.reqConfAPI = new ReqConfAPI();
  }

  async getRecommendByType(params) {
    if (!params.type) {
      console.error('----- [error] type is not found -----');
      return;
    }

    const URL = `${this.serverBaseURL}/commonRecommands/types/${params.type}`;
    const rs = await this.axios.get(URL, {
      params,
    });

    return rs && rs.data;
  }

  convertData(list, parseJSON) {
    debugger;
    const keys = Object.keys(parseJSON);
    return [...list].map((item) => {
      return keys.reduce((acc, key) => {
        this._.set(acc, key, _.get(item, parseJSON[key]) || parseJSON[key]);
        return acc;
      }, {});
    });
  }

  async getNewRecommend(params) {
    const parseJSON = await this.reqConfAPI.getReqConfByType(params.type);

    const recommendList = await this.getRecommendByType(params);
    const rs = this.convertData(recommendList.data.content, parseJSON);
    return rs;
  }
}

export default Recommend;

import Base from './base';

class ReqConf extends Base {
  constructor(args) {
    super(args);
    this.serverBaseURL = 'https://new.i.atips.cn/api/v1';
    this.pathURL = '/reqConfs';
  }

  async getReqConfByType(type) {
    const rs = await this.get({
      type,
    });

    return this._.get(rs, 'data.list[0].parse');
  }
}

export default ReqConf;

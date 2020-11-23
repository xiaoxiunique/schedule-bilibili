const _ = require('lodash');
const fs = require('fs');
const Request = require('./../api/base');
const request = new Request();
class Task {
  constructor(jct, sessData, userId) {
    this.jct = jct;
    this.sessData = sessData;
    this.userId = userId;

    // util
    this._ = _;
  }
  getTaskName() {
    throw new Error('getTaskName() Must be implement');
  }

  async run() {
    throw new Error('run() Must be implement');
  }

  order() {
    throw new Error('order() Must be implement');
  }

  /**
   * 读取用户信息
   */
  getUserStatus() {
    const userStr = fs.readFileSync(__dirname + '/userStatus.json', {
      encoding: 'utf-8',
    });
    const user = JSON.parse(userStr);
    return user;
  }

  /**
   * 设置用户信息
   * @param {用户信息}} userInfo
   */
  setUserStatus(userInfo) {
    const oldUser = this.getUserStatus();
    userInfo = Object.assign({}, oldUser, userInfo);

    fs.writeFileSync(__dirname + '/userStatus.json', JSON.stringify(userInfo), {
      encoding: 'utf-8',
    });
  }

  async getVideoTitle(bvid) {
    const videoViewURL =
      'https://api.bilibili.com/x/web-interface/view?bvid=' + bvid;

    let title = '未能获取到标题';
    const result = await request.get(videoViewURL);
    if (+result.code === 0) {
      const owner = this._.get(result, 'data.owner.name');
      return owner + ' ' + result.data.title;
    }
    return title;
  }

  /**
   * 返回会员类型
   * 0: 无会员
   * 1: 月会员
   * 2: 年会员
   */
  queryVipStatusType() {
    const user = this.getUserStatus();
    if (user.vipStatus === 1) {
      return user.vipType;
    }
    return 0;
  }
}

module.exports = Task;

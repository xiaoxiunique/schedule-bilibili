const base = require('./base');
const Request = require('../api/base');
const qs = require('qs');
const fs = require('fs');

/**
 * 给自己充电
 */
class liveCheckIn extends base {
  order() {
    return 7;
  }

  async run() {
    console.info(
      '----- [用这个工程的应该都是白嫖用户，不会是年度大会员吧，就不实现这个任务了吧] -----'
    );
  }

  getTaskName() {
    return '为自己充电任务';
  }
}

module.exports = liveCheckIn;

const base = require('./base');
const qs = require('qs');
const fs = require('fs');

/**
 * 漫画签到
 */
class dayTask extends base {
  constructor(args) {
    super(args);
  }

  order() {
    return 1;
  }

  async run() {
    const dayTaskURL = 'https://api.bilibili.com/x/member/web/exp/reward';
    let result = await this.get(dayTaskURL);
    console.log('result: ', result);
    if (+result.code === 0) {
      console.info('----- 请求本日任务状态成功 -----');
      this.setUserStatus(result.data);
    } else {
      // 偶发性失败，在请求一次
      console.error(`----- [error] ${result.message} -----`);
      result = await this.get(dayTaskURL);
      this.setUserStatus(result.data);
    }
  }

  getTaskName() {
    return '用户任务完成状态检查';
  }
}

module.exports = dayTask;

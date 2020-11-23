const base = require('./base');
const Request = require('./../api/base');
const qs = require('qs');

/**
 * 漫画签到
 */
class mangaSign extends base {
  constructor(args) {
    super(args);
    this.mangaSignURL = `https://manga.bilibili.com/twirp/activity.v1.Activity/ClockIn`;
    this.request = new Request();
  }

  async run() {
    const result = await this.request.post(
      this.mangaSignURL,
      qs.stringify({ platform: 'ios' })
    );
    if (result === null) {
      console.info('----- 哔哩哔哩漫画已经签到过了 ----');
    } else {
      console.info('----- 完成漫画签到 ----');
    }
  }

  getTaskName() {
    return '漫画签到任务';
  }
}

module.exports = mangaSign;

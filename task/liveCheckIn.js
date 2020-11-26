const base = require('./base');
const qs = require('qs');
const fs = require('fs');

/**
 * 漫画签到
 */
class liveCheckIn extends base {
  order() {
    return 6;
  }

  async run() {
    const liveCheckInURL =
      'https://api.live.bilibili.com/xlive/web-ucenter/v1/sign/DoSign';
    let result = await this.request.get(liveCheckInURL);
    if (+result.code === 0) {
      console.info(
        '----- [直播签到成功，本次获得] -----' + result.data.text.specialText
      );
    } else {
      console.info('----- [直播签到失败] ----- ' + result.message);
    }
  }

  getTaskName() {
    return '直播签到';
  }
}

module.exports = liveCheckIn;

const base = require('./base');
const qs = require('qs');

/**
 * 漫画签到
 */
class silverToCoin extends base {
  constructor(args) {
    super(args);
    this.silverToCoinURL = `https://api.live.bilibili.com/pay/v1/Exchange/silver2coin`;
    // 查询银瓜子兑换状态
    this.silverToCoinStatusURL =
      'https://api.live.bilibili.com/pay/v1/Exchange/getStatus';
  }

  order() {
    return 4;
  }

  async run() {
    const result = await this.request.get(this.silverToCoinURL);
    if (result.code === 0) {
      console.info('----- [银瓜子兑换硬币成功] -----');
    } else {
      console.info(`----- [银瓜子兑换硬币失败 原因是: ${result.msg}] -----`);
    }

    const queryCoinStatus = await this.request.get(
      this.silverToCoinStatusURL,
      {},
      'data'
    );
    console.info(`----- [当前银瓜子余额：${queryCoinStatus.silver}] -----`);
  }

  getTaskName() {
    return '银瓜子换硬币';
  }
}

module.exports = silverToCoin;

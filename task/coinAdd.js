const base = require('./base');
const qs = require('qs');

/**
 * 漫画签到
 */
class coinAdd extends base {
  constructor(args) {
    super(args);
    this.coinAddURL = `https://api.live.bilibili.com/pay/v1/Exchange/silver2coin`;
  }

  order() {
    return 5;
  }

  async run() {
    const user = this.getUserStatus();
    //投币最多操作数 解决csrf校验失败时死循环的问题
    let addCoinOperateCount = 0;
    //安全检查，最多投币数
    let maxNumberOfCoins = 0;
    //已投的硬币
    let useCoin = 0;

    console.info('----- [投币任务开始] -----');
    while (useCoin < maxNumberOfCoins) {
      addCoinOperateCount++;

      const bvid =
        user.rankList[parseInt(Math.random() * user.rankList.length)];
      const title = await this.getVideoTitle(bvid);
      const coinFlag = await this.coinAdd(bvid, 1, 1);

      if (!coinFlag) {
        useCoin++;
        break;
      }

      // 程序暂停 5s
      this.pauseTime(2000);
      if (addCoinOperateCount > 15) {
        console.info('----- [尝试投币/投币失败次数太多] -----');
        break;
      }
    }

    console.info(`----- 程序当前已投: ${useCoin} -----`);
  }

  pauseTime(millTime) {
    var start = Date.now();
    while (true) {
      var nowTime = Date.now();
      var offset = nowTime - start;
      if (offset >= millTime) break;
    }
  }

  /**
   * 投币
   * @param {AV 号} bvid
   * @param {投币数量} multiply
   * @param {是否点赞} selectLike
   */
  async coinAdd(bvid, multiply, selectLike) {
    const user = this.getUserStatus();
    const coinAddURL = 'https://api.bilibili.com/x/web-interface/coin/add';
    const params = {
      bvid,
      multiply,
      select_like: selectLike,
      cross_domain: true,
      csrf: user.jct,
    };

    const videoTitle = await this.getVideoTitle(bvid);
    const isCoin = await this.isCoin(bvid);
    if (isCoin) {
      console.info('已经为' + videoTitle + '投过币了');
      return false;
    }

    const result = await this.request.post(coinAddURL, qs.stringify(params));
    if (+result.code === 0) {
      console.info('----- [投币成功] -----');
      return false;
    }

    console.info(`----- [投币失败] message: ${result} -----`);
    return false;
  }

  /**
   * 是否对视频投过币
   * @param {AV 编号}} bvid
   */
  async isCoin(bvid) {
    const isCoinURL =
      'https://api.bilibili.com/x/web-interface/archive/coins?bvid=' + bvid;

    const result = await this.request.get(isCoinURL, {}, 'data');
    const multiply = result.multiply;
    if (multiply <= 0) {
      return false;
    }
    console.info(`----- [之前已经为av ${bvid} 投过 ${multiply} 硬币啦] -----`);
    return true;
  }

  getTaskName() {
    return '投币';
  }
}

module.exports = coinAdd;

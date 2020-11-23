const Base = require('./base');
const qs = require('qs');

class Bilibili extends Base {
  constructor(args) {
    super(args);
  }
  /**
   * 登录检查，检查登录是否有效
   * @param {用户信息}} payload
   */
  async loginCheck(payload) {
    const URL = 'https://api.bilibili.com/x/web-interface/nav';
    const result = await this.get(URL);
    const isLogin = this._.get(result, 'data.isLogin');
    const username = this._.get(result, 'data.uname');
    const money = this._.get(result, 'data.money');
    if (isLogin) {
      this.userInfo = result.data;

      console.info('----- login success -----');
      console.info('----- [username] - ' + username);
      console.info('----- [金币余额] - ' + money);
    } else {
      console.info('----- login fail -----');
    }
  }

  /**
   * 获取本日任务完成状态
   * @param {*} payload
   */
  async reward(payload) {
    const URL = 'https://api.bilibili.com/x/member/web/exp/reward';
    const result = await this.get(URL);
    if (+result.code === 0) {
      console.info('----- 请求本日任务状态成功 -----');
      return result.data;
    } else {
      // 偶发性失败，在请求一次
      console.error(`----- [error] ${result.message} -----`);
      return (await this.get(URL)).data;
    }
  }

  /**
   * 查询 存在哪些视频
   */
  async queryDynamicNew() {
    const dynamicNewURL =
      'https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/dynamic_new';

    const params = {
      uid: this.userId,
      type_list: 8,
      from: '',
      platform: 'web',
    };

    const cards = await this.get(dynamicNewURL, params, 'data.cards');
    if (cards !== null && cards.length !== 0) {
      return cards.reduce((acc, card) => {
        return acc.concat(this._.get(card, 'desc.bvid'));
      }, []);
    }
    return [];
  }

  async getRegionRank() {
    const RegionRankingURL =
      'https://api.bilibili.com/x/web-interface/ranking/region';

    const params = {
      rid: this.__randomRegion(),
      day: 3,
    };

    const result = await this.get(RegionRankingURL, params, 'data');
    return result.map((e) => e.bvid);
  }

  async videoHeartBeat(bvid) {
    const videoHeartbeatURL =
      'https://api.bilibili.com/x/click-interface/web/heartbeat';

    const result = await this.post(
      videoHeartbeatURL,
      qs.stringify({
        bvid,
        csrf: this.jct,
      })
    );
    if (result.code === 0) {
      console.info('----- 视频播放成功 -----');
    } else {
      console.error('----- error 视频播放失败 -----' + result.message);
    }
    return result;
  }

  async videoShare(bvid) {
    const URL = `https://api.bilibili.com/x/web-interface/share/add`;
    const result = await this.post(
      URL,
      require('qs').stringify({
        bvid,
        csrf: this.jct,
      })
    );

    if (result.code === 0) {
      console.info('----- 视频分享成功 -----');
    } else {
      console.error('----- error 视频分享失败 -----' + result.message);
    }
  }

  async Manga() {
    const URL = `https://manga.bilibili.com/twirp/activity.v1.Activity/ClockIn?platform=ios`;
    const result = await this.post(URL);
    return result;
  }

  __randomRegion() {
    const regions = [1, 3, 4, 5, 160, 22, 119];
    return regions[parseInt(Math.random() * regions.length)];
  }
}

module.exports = Bilibili;

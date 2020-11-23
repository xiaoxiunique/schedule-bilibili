const base = require('./base');
const Request = require('../api/base');
const qs = require('qs');
const fs = require('fs');

/**
 * 视频观看 分享
 */
class videoWatch extends base {
  constructor(args) {
    super(args);
    this.request = new Request();
  }

  order() {
    return 2;
  }

  async run() {
    const followUpVideoList = await this.queryDynamicNew();
    this.setUserStatus({ followUpVideoList });
    const rankList = await this.getRegionRank();
    this.setUserStatus({ rankList });

    const user = this.getUserStatus();

    // 如果观看任务没有完成
    if (!user.watch) {
      await this.videoHeartBeat(
        user.rankList[parseInt(Math.random() * user.rankList.length)]
      );
    } else {
      console.info(
        '----- 本日观看视频任务已经完成了，不需要再观看视频了 -----'
      );
    }

    // 分享任务
    if (!user.share) {
      await this.videoShare(
        user.rankList[parseInt(Math.random() * user.rankList.length)]
      );
    } else {
      console.info(
        '----- 本日分享视频任务已经完成了，不需要再分享视频了 -----'
      );
    }
  }

  /**
   * 查询 存在哪些视频
   */
  async queryDynamicNew() {
    const userInfo = this.getUserStatus();
    const dynamicNewURL =
      'https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/dynamic_new';

    const params = {
      uid: userInfo.userId,
      type_list: 8,
      from: '',
      platform: 'web',
    };

    const cards = await this.request.get(dynamicNewURL, params, 'data.cards');
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

    const result = await this.request.get(RegionRankingURL, params, 'data');
    return result.map((e) => e.bvid);
  }

  __randomRegion() {
    const regions = [1, 3, 4, 5, 160, 22, 119];
    return regions[parseInt(Math.random() * regions.length)];
  }

  async videoHeartBeat(bvid) {
    const user = this.getUserStatus();
    const videoHeartbeatURL =
      'https://api.bilibili.com/x/click-interface/web/heartbeat';

    const result = await this.request.post(
      videoHeartbeatURL,
      qs.stringify({
        bvid,
        csrf: user.jct,
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
    const user = this.getUserStatus();
    const URL = `https://api.bilibili.com/x/web-interface/share/add`;
    const result = await this.request.post(
      URL,
      require('qs').stringify({
        bvid,
        csrf: user.jct,
      })
    );

    if (result.code === 0) {
      console.info('----- 视频分享成功 -----');
    } else {
      console.error('----- error 视频分享失败 -----' + result.message);
    }
  }

  getTaskName() {
    return '用户任务完成状态检查';
  }
}

module.exports = videoWatch;

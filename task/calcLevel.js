const base = require('./base');
const qs = require('qs');
const fs = require('fs');

/**
 * 漫画签到
 */
class calcLevel extends base {
  order() {
    return 8;
  }

  async run() {
    const user = this.getUserStatus();
    const needExp = user.level_info.next_exp - user.level_info.current_exp;
    const todayExp = 15;
    console.info(`----- [今日获取得到总经验值为: ${todayExp}] -----`);
    const currLevel = user.level_info.current_level;
    if (currLevel < 6) {
      await this.send(
        `----- [按照当前进度升级到 Lv${currLevel}] 还需要${
          needExp / todayExp
        } 天 -----`
      );
    }
  }

  getTaskName() {
    return '等级计算';
  }
}

module.exports = calcLevel;

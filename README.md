<div align="center">
<h1 align="center">
SCHEDULE-BILIBILI
</h1>
</div>

# 工具简介

这是一个利用 GitHub Action 等方式实现哔哩哔哩（Bilibili）每日任务投币，点赞，分享视频，直播签到，银瓜子兑换硬币，漫画每日签到，简单配置即可每日轻松获取 65 经验值，快来和我一起成为 Lv6 吧~~~~

**如果觉得好用，顺手点个 Star 吧 ❤**

这个项目作为自己的学习项目，目前是用 JavaScript 进行实现的，后续可能会使用 TypeScript 来实现，也算是学习的一个路径。

## 功能列表

**本项目不会增加类似于自动转发抽奖，秒杀，下载版权受限视频等侵犯 UP 主/B 站权益的功能，开发这个应用的目的是单纯的技术分享。下游分支开发者/使用者也请不要滥用相关功能。**

**本项目欢迎其他开发者参与贡献，基于本工具的二次开发，使用其他语言重写都没有什么问题，能在技术上给你带来帮助和收获就很好**

- [x] 每天上午 9 点 10 分自动开始任务。_【运行时间可自定义】_
- [x] 哔哩哔哩漫画每日自动签到 。
- [x] 每日自动从热门视频中随机观看 1 个视频，分享一个视频。
- [x] 每日从热门视频中选取 5 个进行智能投币 _【如果投币不能获得经验，默认不投币】_
- [x] 投币支持下次一定啦，可自定义每日投币数量。_【如果检测到你已经投过币了，则不会投币】_
- [ ] 大会员月底使用快到期的 B 币券，给自己充电，一点也不会浪费哦，默认开启。_【可配置】_
- [ ] 大会员月初 1 号自动领取每月 5 张 B 币券 和福利。
- [x] 每日哔哩哔哩直播自动签到，领取签到奖励。_【直播你可以不看，但是奖励咱们一定要领】_
- [ ] 通过 server 酱推送执行结果到微信。
- [ ] Linux 用户支持自定义配置了。
- [x] 投币策略更新可配置投币喜好。_【可配置优先给关注的 up 投币】_

# 使用说明

## 一、Actions 方式

1. **Fork 本项目**
2. **获取 Bilibili Cookies**

- 浏览器打开并登录 [bilibili 网站](https://www.bilibili.com/)
- 按 F12 找到 Network 在搜索框中 搜索 nav
- 复制 nav 请求的 cookie

![](https://gitee.com/xiaoxiunique/picgo-image/raw/master/atips/20201229162832.png)

3. **点击项目 Settings -> Secrets -> New Secrets 添加 Cookie Secrets。**

| Name   | Value           |
| ------ | --------------- | --- |
| COOKIE | 获取到的 cookie |     |

![](https://gitee.com/xiaoxiunique/picgo-image/raw/master/atips/20201229163048.png)







1. **开启 Actions 并触发每日自动执行**

**Github Actions 默认处于关闭状态，还大家请手动开启 Actions ，执行一次工作流，验证是否可以正常工作。**

**Fork 仓库后，GitHub 默认不自动执行 Actions 任务，请修改 `./github/trigger.json` 文件,将 `trigger` 的值改为 `1`，这样每天就会自动执行定时任务了。**

```patch
{
- "trigger": 0
+ "trigger": 1
}
```

如果需要修改每日任务执行的时间，请修改 `.github/workflows/auto_task_bilili.yml`，在第 12 行左右位置找到下如下配置。

```yml
schedule:
  - cron: '30 10 * * *'
  # cron表达式，Actions时区是UTC时间，所以下午18点要往前推8个小时。
  # 示例： 每天晚上22点30执行 '30 14 * * *'
```

本工具的 Actions 自动构建配置了缓存，平均运行时间在 20s 左右。

\*如果收到了 GitHub Action 的错误邮件，请检查 Cookies 是不是失效了，用户主动清除浏览器缓存，会导致 `BILI_JCT` 和 `DEDEUSERID` 失效

# API 参考列表

- [SocialSisterYi/bilibili-API-collect](https://github.com/SocialSisterYi/bilibili-API-collect)
- [happy888888/BiliExp](https://github.com/happy888888/BiliExp)

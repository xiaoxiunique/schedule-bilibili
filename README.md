<div align="center">
<h1 align="center">
SCHEDULE-BILIBILI
</h1>
</div>


# 工具简介

这是一个利用 GitHub Action 等方式实现哔哩哔哩（Bilibili）每日任务投币，点赞，分享视频，直播签到，银瓜子兑换硬币，漫画每日签到，简单配置即可每日轻松获取 65 经验值，快来和我一起成为 Lv6 吧~~~~

**如果觉得好用，顺手点个 Star 吧 ❤**

**仓库地址：[xiaoxiunique/schedule-bilibili](https://github.com/xiaoxiunique/schedule-bilibili)**



本项目开发参考项目 [BILIBILI-HELPER](https://github.com/JunzhouLiu/BILIBILI-HELPER)，原本是为了使用 Github Actions 利用 Server 酱的推送能力实现一些新闻推送的，后面遇到蛮多坑，也是在本周日的时候 出于好玩 Clone BILIBILI-HELPER 的代码，后尝试用 Node.js 用户了一天时间 重写了 原本由 Java 实现的 BILIBILI-HELPER.



作为一个终极白嫖用户，我对其支持的功能进行了过滤，有的功能直接不支持，有的需要年度大会员才能用的（丢。。。这谁顶得住）。

功能对比：

|                                      | Schedule-Bilibili        | Bilibili-Helper |
| ------------------------------------ | ------------------------ | --------------- |
| 自动运行任务                         | 👍                        | 👍               |
| 漫画每日签到                         | 👍                        | 👍               |
| 随机观看视频，分享视频               | 👍                        | 👍               |
| 投币（目前本项目一次只支持投 一 个） | 👍                        | 👍               |
| 直播签到                             | 👍                        | 👍               |
| 大会员 B 币                          | 下次一定                 | 👍               |
| 大会员 领券                          | 下次一定                 | 👍               |
| Server 酱                            | [目前不支持，但可以支持] | 👍               |
| Linux                                |                          | 👍               |



这个项目作为自己的学习项目，目前是用 JavaScript 进行实现的，后续可能会使用 TypeScript 来实现，也算是学习的一个路径。

## 功能列表

**本项目不会增加类似于自动转发抽奖，秒杀，下载版权受限视频等侵犯UP主/B站权益的功能，开发这个应用的目的是单纯的技术分享。下游分支开发者/使用者也请不要滥用相关功能。**

**本项目欢迎其他开发者参与贡献，基于本工具的二次开发，使用其他语言重写都没有什么问题，能在技术上给你带来帮助和收获就很好**





* [x] 每天上午 9 点 10 分自动开始任务。*【运行时间可自定义】*
* [x] 哔哩哔哩漫画每日自动签到 。
* [x] 每日自动从热门视频中随机观看 1 个视频，分享一个视频。
* [x] 每日从热门视频中选取 5 个进行智能投币 *【如果投币不能获得经验，默认不投币】*
* [x] 投币支持下次一定啦，可自定义每日投币数量。*【如果检测到你已经投过币了，则不会投币】*
* [ ] 大会员月底使用快到期的 B币券，给自己充电，一点也不会浪费哦，默认开启。*【可配置】*
* [ ] 大会员月初 1 号自动领取每月 5 张 B币券 和福利。
* [x] 每日哔哩哔哩直播自动签到，领取签到奖励。*【直播你可以不看，但是奖励咱们一定要领】*
* [ ] 通过server酱推送执行结果到微信。
* [ ] Linux用户支持自定义配置了。
* [x] 投币策略更新可配置投币喜好。*【可配置优先给关注的up投币】*
  



# 使用说明

## 一、Actions 方式

1. **Fork 本项目**
2. **获取 Bilibili Cookies**
- 浏览器打开并登录 [bilibili 网站](https://www.bilibili.com/)
- 按 F12 打开 「开发者工具」 找到 应用程序/Application -> 存储 -> Cookies
- 找到 `bili_jct` `SESSDATA` `DEDEUSERID` 三项，并复制值，创建对应的 GitHub Secrets。

3. **点击项目 Settings -> Secrets -> New Secrets 添加以下 3 个 Secrets。**

| Name       | Value            |
| ---------- | ---------------- |
| DEDEUSERID | 从 Cookie 中获取 |
| SESSDATA   | 从 Cookie 中获取 |
| BILI_JCT   | 从 Cookie 中获取 |



4. **开启 Actions 并触发每日自动执行**

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

*如果收到了 GitHub Action 的错误邮件，请检查 Cookies 是不是失效了，用户主动清除浏览器缓存，会导致 `BILI_JCT` 和 `DEDEUSERID` 失效



# API 参考列表

- [SocialSisterYi/bilibili-API-collect](https://github.com/SocialSisterYi/bilibili-API-collect)
- [happy888888/BiliExp](https://github.com/happy888888/BiliExp)


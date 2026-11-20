# Account（账号）对象

18 个平台的 40 个接口都返回 Account（账号）对象，11 个字段名完全一样，给一个平台写的代码不用改就能读其他平台。每次调用 $0.0004 到 $0.84525。

给机器读：[account schema](https://dataxapi.com/openapi.json#/components/schemas/account)、[openapi.json](https://dataxapi.com/openapi.json)、[对象表（JSON）](https://api.dataxapi.com/v1/catalog/objects)、[llms.txt](https://dataxapi.com/zh/llms.txt)

账号（Account）是平台上的一个用户、频道、主页或公众号：账号名、显示名、简介，以及粉丝数、关注数、发布数。账号资料、用户搜索，还有粉丝、点赞者、转推者、成员这些列表，返回的都是它。

内容和评论的 `author` 用 `id` 和 `username` 指向账号。星图、蒲公英上的达人是另一个对象“达人”，用 `account_id` 指向它的平台账号。

## 字段

平台给不了的字段不会出现在这条数据里，而是写在 `meta.unavailable` 里。不会用猜的数或 0 顶上。

| 字段 | 类型 | 起始档位 | 说明 |
| --- | --- | --- | --- |
| `id` | 文本 | `compact` | 编号 |
| `username` | 文本 | `compact` | 账号名 |
| `name` | 文本 | `compact` | 显示名 |
| `url` | 链接 | `compact` | 主页链接 |
| `bio` | 文本 | `compact` | 简介 |
| `avatar_url` | 链接 | `standard` | 头像 |
| `verified` | 是否 | `standard` | 是否认证 |
| `created_at` | 时间 | `standard` | 账号创建时间 |
| `metrics` | 对象 | `compact` | 账号的数字 |
| `metrics.followers` | 整数 | `compact` | 粉丝数 |
| `metrics.following` | 整数 | `compact` | 关注数 |
| `metrics.posts` | 整数 | `compact` | 发布的内容数 |

## 每个数取的是平台上的哪个数

同一个字段名，在不同平台上对应的动作不完全一样。这张表写明这个字段取的是平台自己的哪个数。

| 字段 | 在那里是什么 | 平台 |
| --- | --- | --- |
| `id` | 公众号原始编号，大多 gh_ 开头，也有别的开头的；可以直接传给 wechat_mp.accounts.articles.list 和 wechat_mp.accounts.get | 微信搜一搜 |
| `username` | 微信号：在微信里搜索添加时输入的那个；没设的为 null | 微信公众号、微信搜一搜 |
| `verified` | 有没有认证标，任何颜色都算：蓝标（付费订阅）、金标（企业）、灰标（政府和官方机构）都是 true，不能当成付费订阅的标志 | X（推特） |
| `created_at` | 主页创建的日期，只到天 | Facebook |
| `metrics.followers` | 订阅数 | Telegram |
| `metrics.followers` | 关注主页的人数，平台从一千起只给约数 | Facebook |
| `metrics.followers` | 订阅数，平台只显示三位有效数字 | YouTube |
| `metrics.posts` | 投稿的视频数 | B站 |
| `metrics.posts` | 视频数 | YouTube |

## 哪些平台给不了哪些字段

一个平台的所有接口都给不了某个字段时，它才列在那个字段后面。

| 字段 | 给不了的平台 |
| --- | --- |
| `id` | Telegram |
| `username` | 微博、微信视频号 |
| `url` | 快手、微信视频号、微信公众号、微信搜一搜 |
| `bio` | 微信公众号 |
| `verified` | Facebook、LinkedIn、微信公众号 |
| `created_at` | B站、抖音、快手、Telegram、LinkedIn、Threads、Instagram、小红书、微信视频号、微信公众号、微信搜一搜、知乎 |
| `metrics.followers` | LinkedIn、微信视频号、微信公众号、微信搜一搜、Reddit |
| `metrics.following` | Telegram、Facebook、LinkedIn、Threads、YouTube、微信视频号、微信公众号、微信搜一搜、Reddit、知乎 |
| `metrics.posts` | Telegram、Facebook、LinkedIn、Threads、Instagram、微信公众号、微信搜一搜、知乎 |

同一个平台上，可能一个接口给不了、另一个接口能给：每个接口的页面列着它给不了的字段，每次返回也都写在 `meta.unavailable` 里。

## 返回 Account（账号）的接口

### B站

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [B站用户资料](https://dataxapi.com/zh/apis/bilibili/users/get.md) | `GET /v1/bilibili/users/get` | 账号 | $0.0020 / 次 |

### 抖音

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [抖音用户资料](https://dataxapi.com/zh/apis/douyin/users/get.md) | `GET /v1/douyin/users/get` | 账号 | $0.0020 / 次 |
| [抖音用户搜索](https://dataxapi.com/zh/apis/douyin/users/search.md) | `GET /v1/douyin/users/search` | 账号列表 | $0.0020 / 次 |

### 快手

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [快手用户资料](https://dataxapi.com/zh/apis/kuaishou/users/get.md) | `GET /v1/kuaishou/users/get` | 账号 | $0.0200 / 次 |
| [快手用户搜索](https://dataxapi.com/zh/apis/kuaishou/users/search.md) | `GET /v1/kuaishou/users/search` | 账号列表 | $0.0200 / 次 |

### Telegram

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Telegram 频道资料](https://dataxapi.com/zh/apis/telegram/channels/get.md) | `GET /v1/telegram/channels/get` | 账号 | $0.0020 / 次 |

### Facebook

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Facebook 主页资料](https://dataxapi.com/zh/apis/facebook/pages/get.md) | `GET /v1/facebook/pages/get` | 账号 | $0.0020 / 次 |

### LinkedIn

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [LinkedIn 公司主页](https://dataxapi.com/zh/apis/linkedin/companies/get.md) | `GET /v1/linkedin/companies/get` | 账号 | $0.0020 / 次 |

### Threads

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Threads 用户资料](https://dataxapi.com/zh/apis/threads/users/get.md) | `GET /v1/threads/users/get` | 账号 | $0.0020 / 次 |

### Instagram

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Instagram 用户资料](https://dataxapi.com/zh/apis/instagram/users/get.md) | `GET /v1/instagram/users/get` | 账号 | $0.0020 / 次 |
| [Instagram 用户搜索](https://dataxapi.com/zh/apis/instagram/users/search.md) | `GET /v1/instagram/users/search` | 账号列表 | $0.0040 / 次 |

### TikTok

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [TikTok 用户资料](https://dataxapi.com/zh/apis/tiktok/users/get.md) | `GET /v1/tiktok/users/get` | 账号 | $0.0020 / 次 |
| [TikTok 用户搜索](https://dataxapi.com/zh/apis/tiktok/users/search.md) | `GET /v1/tiktok/users/search` | 账号列表 | $0.0020 / 次 |
| [TikTok 用户粉丝列表](https://dataxapi.com/zh/apis/tiktok/users/followers/list.md) | `GET /v1/tiktok/users/followers/list` | 账号列表 | $0.0020 / 次 |

### 微博

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [微博点赞用户](https://dataxapi.com/zh/apis/weibo/posts/likers/list.md) | `GET /v1/weibo/posts/likers/list` | 账号列表 | $0.0020 / 次 |
| [微博用户粉丝列表](https://dataxapi.com/zh/apis/weibo/users/followers/list.md) | `GET /v1/weibo/users/followers/list` | 账号列表 | $0.0020 / 次 |
| [微博用户资料](https://dataxapi.com/zh/apis/weibo/users/get.md) | `GET /v1/weibo/users/get` | 账号 | $0.0020 / 次 |
| [微博用户搜索](https://dataxapi.com/zh/apis/weibo/users/search.md) | `GET /v1/weibo/users/search` | 账号列表 | $0.0020 / 次 |

### X（推特）

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [X 帖子转推用户](https://dataxapi.com/zh/apis/x/posts/retweeters/list.md) | `GET /v1/x/posts/retweeters/list` | 账号列表 | $0.0020 / 次 |
| [X 用户粉丝列表](https://dataxapi.com/zh/apis/x/users/followers/list.md) | `GET /v1/x/users/followers/list` | 账号列表 | $0.0001 / 条 |
| [X 用户关注列表](https://dataxapi.com/zh/apis/x/users/following/list.md) | `GET /v1/x/users/following/list` | 账号列表 | $0.0001 / 条 |
| [X 用户资料](https://dataxapi.com/zh/apis/x/users/get.md) | `GET /v1/x/users/get` | 账号 | $0.0004 / 条 |
| [X 用户搜索](https://dataxapi.com/zh/apis/x/users/search.md) | `GET /v1/x/users/search` | 账号列表 | $0.0004 / 条 |
| [X 社群成员](https://dataxapi.com/zh/apis/x/communities/members/list.md) | `GET /v1/x/communities/members/list` | 账号列表 | $0.0004 / 条 |
| [X 列表关注者](https://dataxapi.com/zh/apis/x/lists/followers/list.md) | `GET /v1/x/lists/followers/list` | 账号列表 | $0.0004 / 条 |
| [X 列表成员](https://dataxapi.com/zh/apis/x/lists/members/list.md) | `GET /v1/x/lists/members/list` | 账号列表 | $0.0004 / 条 |

### 小红书

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [小红书用户资料](https://dataxapi.com/zh/apis/xiaohongshu/users/get.md) | `GET /v1/xiaohongshu/users/get` | 账号 | $0.0200 / 次 |
| [小红书用户搜索](https://dataxapi.com/zh/apis/xiaohongshu/users/search.md) | `GET /v1/xiaohongshu/users/search` | 账号列表 | $0.0200 / 次 |

### YouTube

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [YouTube 频道资料](https://dataxapi.com/zh/apis/youtube/channels/get.md) | `GET /v1/youtube/channels/get` | 账号 | $0.0020 / 次 |
| [YouTube 频道搜索](https://dataxapi.com/zh/apis/youtube/channels/search.md) | `GET /v1/youtube/channels/search` | 账号列表 | $0.0020 / 次 |

### 微信视频号

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [微信视频号账号资料](https://dataxapi.com/zh/apis/wechat_channels/users/get.md) | `GET /v1/wechat_channels/users/get` | 账号 | $0.0200 / 次 |
| [微信视频号账号资料（备用版）](https://dataxapi.com/zh/apis/wechat_channels/backup/users/get.md) | `GET /v1/wechat_channels/backup/users/get` | 账号 | $0.0300 / 次 |
| [微信视频号账号搜索](https://dataxapi.com/zh/apis/wechat_channels/users/search.md) | `GET /v1/wechat_channels/users/search` | 账号列表 | $0.0600 / 次 |

### 微信公众号

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [微信公众号资料](https://dataxapi.com/zh/apis/wechat_mp/accounts/get.md) | `GET /v1/wechat_mp/accounts/get` | 账号 | $0.0200 / 次 |
| [微信公众号账号搜索](https://dataxapi.com/zh/apis/wechat_mp/accounts/search.md) | `GET /v1/wechat_mp/accounts/search` | 账号列表 | $0.05635 / 条 |

### 微信搜一搜

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [微信公众号实时查找](https://dataxapi.com/zh/apis/wechat/accounts/search.md) | `GET /v1/wechat/accounts/search` | 账号列表 | $0.0200 / 次 |

### Reddit

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Reddit 用户资料](https://dataxapi.com/zh/apis/reddit/users/get.md) | `GET /v1/reddit/users/get` | 账号 | $0.0020 / 次 |

### 知乎

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [知乎用户粉丝列表](https://dataxapi.com/zh/apis/zhihu/users/followers/list.md) | `GET /v1/zhihu/users/followers/list` | 账号列表 | $0.0020 / 次 |
| [知乎用户资料](https://dataxapi.com/zh/apis/zhihu/users/get.md) | `GET /v1/zhihu/users/get` | 账号 | $0.0020 / 次 |
| [知乎用户搜索](https://dataxapi.com/zh/apis/zhihu/users/search.md) | `GET /v1/zhihu/users/search` | 账号列表 | $0.0020 / 次 |

## 示例

`bilibili.users.get` 返回的一条，录制于 2026-10-12 18:43 UTC。名字、正文和编号是示例，链接也是；数字是原样。

```jsonc
{
  "id": "396928023",
  "username": null,
  "name": "橘子汽水不加冰",
  "url": "https://space.bilibili.com/396928023",
  "bio": "只说真话的装备测评，不接硬广",
  "avatar_url": "https://i0.hdslb.com/bfs/face/9c13ec3ca22ca7b557313d2b.jpg",
  "verified": true,
  "metrics": { "followers": 18634887, "following": 686, "posts": 933 }
}
```

[完整的返回在这个接口的页面上 →](https://dataxapi.com/zh/apis/bilibili/users/get.md)

## 相关

- [账号资料 API](https://dataxapi.com/zh/roles/accounts-get/): 同一种动作在 17 个平台上的接口，带各平台的字段对照。
- [账号搜索 API](https://dataxapi.com/zh/roles/accounts-search/): 同一种动作在 12 个平台上的接口，带各平台的字段对照。
- [粉丝列表 API](https://dataxapi.com/zh/roles/accounts-followers-list/): 同一种动作在 4 个平台上的接口，带各平台的字段对照。
- [全部接口](https://dataxapi.com/zh/apis/): 目录里写明每个接口返回什么对象、多少钱。

## 其他对象

[Post（内容）对象](https://dataxapi.com/zh/docs/objects/post/)、[Comment（评论）对象](https://dataxapi.com/zh/docs/objects/comment/)、[Trend（热点）对象](https://dataxapi.com/zh/docs/objects/trend/)、[Transcript（逐字稿）对象](https://dataxapi.com/zh/docs/objects/transcript/)、[Creator rates（达人报价）对象](https://dataxapi.com/zh/docs/objects/creator_rates/)、[Community（社区）对象](https://dataxapi.com/zh/docs/objects/community/)、[Product（商品）对象](https://dataxapi.com/zh/docs/objects/product/)、[Review（评价）对象](https://dataxapi.com/zh/docs/objects/review/)、[Keyword index history（关键词指数历史）对象](https://dataxapi.com/zh/docs/objects/keyword_history/)、[Related keyword（关联词）对象](https://dataxapi.com/zh/docs/objects/keyword_related/)、[Keyword audience（关键词人群画像）对象](https://dataxapi.com/zh/docs/objects/keyword_audience/)、[Account recent change（账号近期变化）对象](https://dataxapi.com/zh/docs/objects/account_history/)、[Brand index history（品牌指数历史）对象](https://dataxapi.com/zh/docs/objects/brand_history/)、[Brand index averages（品牌指数均值）对象](https://dataxapi.com/zh/docs/objects/brand_metrics/)、[Creator（达人）对象](https://dataxapi.com/zh/docs/objects/creator/)、[Audience（粉丝画像）对象](https://dataxapi.com/zh/docs/objects/audience/)、[Xingtu creator metrics（星图达人传播数据）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_metrics/)、[Xingtu creator video（星图达人作品）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_post/)、[PGY creator metrics（蒲公英博主数据表现）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_metrics/)、[PGY creator note（蒲公英博主笔记）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_post/)、[PGY note detail（蒲公英笔记详情）对象](https://dataxapi.com/zh/docs/objects/pgy_note/)、[Ad（广告）对象](https://dataxapi.com/zh/docs/objects/ad/)、[Advertiser（广告主）对象](https://dataxapi.com/zh/docs/objects/advertiser/)、[Douyin trend-index creator metrics（巨量算数达人核心指标）对象](https://dataxapi.com/zh/docs/objects/index_creator_metrics/)、[Xingtu creator content keywords（星图达人内容热词）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_keywords/)、[Xingtu creator scores（星图达人指数）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_scores/)、[Xingtu creator content mix（星图达人内容分布）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_content_mix/)、[Xingtu creator conversion（星图达人转化能力）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_conversion/)、[Xingtu campaign（星图营销活动）对象](https://dataxapi.com/zh/docs/objects/xingtu_campaign/)、[Channels collection（视频号合集）对象](https://dataxapi.com/zh/docs/objects/channels_collection/)、[Channels share link（视频号分享链接）对象](https://dataxapi.com/zh/docs/objects/channels_share_link/)、[Topic（话题）对象](https://dataxapi.com/zh/docs/objects/topic/)、[Account owner（账号主体）对象](https://dataxapi.com/zh/docs/objects/account_owner/)、[Mini program（小程序）对象](https://dataxapi.com/zh/docs/objects/miniprogram/)、[Follower history（粉丝数变化）对象](https://dataxapi.com/zh/docs/objects/follower_history/)、[PGY creator costs and summary（蒲公英博主合作成本和数据概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_costs/)、[PGY creator follower summary（蒲公英博主粉丝概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_followers/)、[PGY creator core figures history（蒲公英博主核心数据趋势）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_cost_history/)

---

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/docs/objects/account/)

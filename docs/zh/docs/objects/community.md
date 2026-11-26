# Community（社区）对象

2 个平台的 3 个接口都返回 Community（社区）对象，8 个字段名完全一样，给一个平台写的代码不用改就能读其他平台。每次调用 $0.0004 到 $0.0020。它是预览结构，之后可能调整。

给机器读：[community schema](https://dataxapi.com/openapi.json#/components/schemas/community)、[openapi.json](https://dataxapi.com/openapi.json)、[对象表（JSON）](https://api.dataxapi.com/v1/catalog/objects)、[llms.txt](https://dataxapi.com/zh/llms.txt)

社区（Community）是人们加入、在里面发帖的地方：Reddit 的子版块（subreddit），X 的社群。它有名称、简介，`metrics.members` 是成员数。

`id` 可以原样传给取社区资料和取社区帖子的接口；Reddit 的社区编号就是社区名。社区里的帖子按内容对象返回，X 社群的成员按账号对象返回。

## 字段

平台给不了的字段不会出现在这条数据里，而是写在 `meta.unavailable` 里。不会用猜的数或 0 顶上。

| 字段 | 类型 | 起始档位 | 说明 |
| --- | --- | --- | --- |
| `id` | 文本 | `compact` | 编号，可原样传给取社区资料和取社区帖子的接口 |
| `name` | 文本 | `compact` | 社区的名称 |
| `url` | 链接 | `compact` | 能直接打开的链接 |
| `description` | 文本 | `compact` | 社区的简介 |
| `avatar_url` | 链接 | `standard` | 社区的图标 |
| `nsfw` | 是否 | `standard` | 是否标为成人内容 |
| `created_at` | 时间 | `standard` | 社区创建时间 |
| `metrics` | 对象 | `compact` | 社区的数字 |
| `metrics.members` | 整数 | `compact` | 成员数 |

## 每个数取的是平台上的哪个数

同一个字段名，在不同平台上对应的动作不完全一样。这张表写明这个字段取的是平台自己的哪个数。

| 字段 | 在那里是什么 | 平台 |
| --- | --- | --- |
| `id` | 社区名：Reddit 的社区凭名字定位，社区帖子接口收的也是它 | Reddit |
| `id` | 社区名，可原样传给社区资料和社区帖子接口 | Reddit |
| `name` | 社区名，不带 r/；版主写的标题在 ext.title | Reddit |
| `name` | 社区名，不带 r/ | Reddit |
| `metrics.members` | 订阅这个社区的人数 | Reddit |

## 哪些平台给不了哪些字段

一个平台的所有接口都给不了某个字段时，它才列在那个字段后面。

| 字段 | 给不了的平台 |
| --- | --- |
| `avatar_url` | X（推特） |

同一个平台上，可能一个接口给不了、另一个接口能给：每个接口的页面列着它给不了的字段，每次返回也都写在 `meta.unavailable` 里。

## 返回 Community（社区）的接口

### Reddit

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Reddit 社区资料](https://dataxapi.com/zh/apis/reddit/subreddits/get.md) | `GET /v1/reddit/subreddits/get` | 社区 | $0.0020 / 次 |
| [Reddit 用户活跃社区](https://dataxapi.com/zh/apis/reddit/users/subreddits/list.md) | `GET /v1/reddit/users/subreddits/list` | 社区列表 | $0.0020 / 次 |

### X（推特）

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [X 社群资料](https://dataxapi.com/zh/apis/x/communities/get.md) | `GET /v1/x/communities/get` | 社区 | $0.0004 / 次 |

## 示例

`reddit.subreddits.get` 返回的一条，录制于 2026-10-12 22:02 UTC。名字、正文和编号是示例，链接也是；数字是原样。

```jsonc
{
  "id": "t5_q2zdmb",
  "name": "Weekendhiking",
  "url": "https://www.reddit.com/r/hannahwphoto/",
  "description": "Photos, trails and too much coffee.",
  "avatar_url": "https://styles.redditmedia.com/t5_q9lkec/styles/profileIcon_4x7pgnjzbu4u4.png",
  "nsfw": false,
  "created_at": "2008-05-10T16:54:23.304Z",
  "metrics": { "members": 127858 }
}
```

[完整的返回在这个接口的页面上 →](https://dataxapi.com/zh/apis/reddit/subreddits/get.md)

## 相关

- [社区资料 API](https://dataxapi.com/zh/roles/communities-get/): 同一种动作在 2 个平台上的接口，带各平台的字段对照。
- [全部接口](https://dataxapi.com/zh/apis/): 目录里写明每个接口返回什么对象、多少钱。

## 其他对象

[Post（内容）对象](https://dataxapi.com/zh/docs/objects/post/)、[Comment（评论）对象](https://dataxapi.com/zh/docs/objects/comment/)、[Account（账号）对象](https://dataxapi.com/zh/docs/objects/account/)、[Trend（热点）对象](https://dataxapi.com/zh/docs/objects/trend/)、[Transcript（逐字稿）对象](https://dataxapi.com/zh/docs/objects/transcript/)、[Media files（视频和图片文件）对象](https://dataxapi.com/zh/docs/objects/media/)、[Music（音乐）对象](https://dataxapi.com/zh/docs/objects/music/)、[Creator rates（达人报价）对象](https://dataxapi.com/zh/docs/objects/creator_rates/)、[Product（商品）对象](https://dataxapi.com/zh/docs/objects/product/)、[Review（评价）对象](https://dataxapi.com/zh/docs/objects/review/)、[Keyword index history（关键词指数历史）对象](https://dataxapi.com/zh/docs/objects/keyword_history/)、[Related keyword（关联词）对象](https://dataxapi.com/zh/docs/objects/keyword_related/)、[Keyword audience（关键词人群画像）对象](https://dataxapi.com/zh/docs/objects/keyword_audience/)、[Account recent change（账号近期变化）对象](https://dataxapi.com/zh/docs/objects/account_history/)、[Brand index history（品牌指数历史）对象](https://dataxapi.com/zh/docs/objects/brand_history/)、[Brand index averages（品牌指数均值）对象](https://dataxapi.com/zh/docs/objects/brand_metrics/)、[Creator（达人）对象](https://dataxapi.com/zh/docs/objects/creator/)、[Audience（粉丝画像）对象](https://dataxapi.com/zh/docs/objects/audience/)、[Xingtu creator metrics（星图达人传播数据）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_metrics/)、[Xingtu creator video（星图达人作品）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_post/)、[PGY creator metrics（蒲公英博主数据表现）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_metrics/)、[PGY creator note（蒲公英博主笔记）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_post/)、[PGY note detail（蒲公英笔记详情）对象](https://dataxapi.com/zh/docs/objects/pgy_note/)、[Ad（广告）对象](https://dataxapi.com/zh/docs/objects/ad/)、[Advertiser（广告主）对象](https://dataxapi.com/zh/docs/objects/advertiser/)、[Douyin trend-index creator metrics（巨量算数达人核心指标）对象](https://dataxapi.com/zh/docs/objects/index_creator_metrics/)、[Xingtu creator content keywords（星图达人内容热词）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_keywords/)、[Xingtu creator scores（星图达人指数）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_scores/)、[Xingtu creator content mix（星图达人内容分布）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_content_mix/)、[Xingtu creator conversion（星图达人转化能力）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_conversion/)、[Xingtu campaign（星图营销活动）对象](https://dataxapi.com/zh/docs/objects/xingtu_campaign/)、[Channels collection（视频号合集）对象](https://dataxapi.com/zh/docs/objects/channels_collection/)、[Channels share link（视频号分享链接）对象](https://dataxapi.com/zh/docs/objects/channels_share_link/)、[Topic（话题）对象](https://dataxapi.com/zh/docs/objects/topic/)、[Account owner（账号主体）对象](https://dataxapi.com/zh/docs/objects/account_owner/)、[Mini program（小程序）对象](https://dataxapi.com/zh/docs/objects/miniprogram/)、[Follower history（粉丝数变化）对象](https://dataxapi.com/zh/docs/objects/follower_history/)、[PGY creator costs and summary（蒲公英博主合作成本和数据概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_costs/)、[PGY creator follower summary（蒲公英博主粉丝概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_followers/)、[PGY creator core figures history（蒲公英博主核心数据趋势）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_cost_history/)

---

最后核对于 2026-11-26 12:17 UTC。目录修订号 0051cce45e9530b9。 [网页版](https://dataxapi.com/zh/docs/objects/community/)

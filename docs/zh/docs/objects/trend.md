# Trend（热点）对象

8 个平台的 10 个接口都返回 Trend（热点）对象，4 个字段名完全一样，给一个平台写的代码不用改就能读其他平台。每次调用 $0.0020 到 $0.0300。

给机器读：[trend schema](https://dataxapi.com/openapi.json#/components/schemas/trend)、[openapi.json](https://dataxapi.com/openapi.json)、[对象表（JSON）](https://api.dataxapi.com/v1/catalog/objects)、[llms.txt](https://dataxapi.com/zh/llms.txt)

热点（Trend）是平台热榜上的一条：一个搜索词、一个话题或一个问题，平台给的话带名次 `rank` 和平台自己的热度值 `heat`。各平台的热榜都返回这个对象；一个平台有几个榜时，用 `board` 选。

热点不是每个平台都有编号，靠 `name` 认它；把名称当 `query` 传给同平台的搜索，就能看到它背后的内容。知乎热榜上一条的 `id` 就是那个问题的编号。

## 字段

平台给不了的字段不会出现在这条数据里，而是写在 `meta.unavailable` 里。不会用猜的数或 0 顶上。

| 字段 | 类型 | 起始档位 | 说明 |
| --- | --- | --- | --- |
| `id` | 文本 | `compact` | 平台给这个热点的编号 |
| `name` | 文本 | `compact` | 热点的名称 |
| `rank` | 整数 | `compact` | 榜上的名次，从 1 起；置顶条没有名次 |
| `heat` | 整数 | `compact` | 平台给的热度值 |

## 每个数取的是平台上的哪个数

同一个字段名，在不同平台上对应的动作不完全一样。这张表写明这个字段取的是平台自己的哪个数。

| 字段 | 在那里是什么 | 平台 |
| --- | --- | --- |
| `name` | 搜索词：点这一条时搜的词，不一定是榜单上显示的那句（那句在 ext.display_name） | B站 |
| `heat` | 巨量算数的热点指数 | 抖音 |

## 哪些平台给不了哪些字段

一个平台的所有接口都给不了某个字段时，它才列在那个字段后面。

| 字段 | 给不了的平台 |
| --- | --- |
| `id` | B站、微博、X（推特）、Reddit |
| `rank` | 小红书 |
| `heat` | X（推特）、Reddit |

同一个平台上，可能一个接口给不了、另一个接口能给：每个接口的页面列着它给不了的字段，每次返回也都写在 `meta.unavailable` 里。

## 返回 Trend（热点）的接口

### B站

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [B站热搜榜](https://dataxapi.com/zh/apis/bilibili/trends/list.md) | `GET /v1/bilibili/trends/list` | 热点列表 | $0.0020 / 次 |

### 抖音

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [抖音巨量算数实时热点](https://dataxapi.com/zh/apis/douyin/index/trends/list.md) | `GET /v1/douyin/index/trends/list` | 热点列表 | $0.0020 / 次 |
| [抖音热榜](https://dataxapi.com/zh/apis/douyin/trends/list.md) | `GET /v1/douyin/trends/list` | 热点列表 | $0.0020 / 次 |

### 快手

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [快手热榜](https://dataxapi.com/zh/apis/kuaishou/trends/list.md) | `GET /v1/kuaishou/trends/list` | 热点列表 | $0.0020 / 次 |

### 微博

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [微博热搜榜](https://dataxapi.com/zh/apis/weibo/trends/list.md) | `GET /v1/weibo/trends/list` | 热点列表 | $0.0020 / 次 |
| [微博热搜榜（备用版）](https://dataxapi.com/zh/apis/weibo/backup/trends/list.md) | `GET /v1/weibo/backup/trends/list` | 热点列表 | $0.0300 / 次 |

### X（推特）

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [X 趋势榜](https://dataxapi.com/zh/apis/x/trends/list.md) | `GET /v1/x/trends/list` | 热点列表 | $0.0090 / 次 |

### 小红书

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [小红书热点](https://dataxapi.com/zh/apis/xiaohongshu/trends/list.md) | `GET /v1/xiaohongshu/trends/list` | 热点列表 | $0.0200 / 次 |

### Reddit

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Reddit 趋势搜索词](https://dataxapi.com/zh/apis/reddit/trends/list.md) | `GET /v1/reddit/trends/list` | 热点列表 | $0.0020 / 次 |

### 知乎

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [知乎热榜](https://dataxapi.com/zh/apis/zhihu/trends/list.md) | `GET /v1/zhihu/trends/list` | 热点列表 | $0.0020 / 次 |

## 示例

`bilibili.trends.list` 返回的一条，录制于 2026-10-12 18:42 UTC。名字、正文和编号是示例，链接也是；数字是原样。

```jsonc
{ "name": "国庆周末露营去哪儿", "rank": 1, "heat": 2038305 }
```

[完整的返回在这个接口的页面上 →](https://dataxapi.com/zh/apis/bilibili/trends/list.md)

## 相关

- [热榜 API](https://dataxapi.com/zh/roles/trends-list/): 同一种动作在 8 个平台上的接口，带各平台的字段对照。
- [全部接口](https://dataxapi.com/zh/apis/): 目录里写明每个接口返回什么对象、多少钱。

## 其他对象

[Post（内容）对象](https://dataxapi.com/zh/docs/objects/post/)、[Comment（评论）对象](https://dataxapi.com/zh/docs/objects/comment/)、[Account（账号）对象](https://dataxapi.com/zh/docs/objects/account/)、[Transcript（逐字稿）对象](https://dataxapi.com/zh/docs/objects/transcript/)、[Creator rates（达人报价）对象](https://dataxapi.com/zh/docs/objects/creator_rates/)、[Community（社区）对象](https://dataxapi.com/zh/docs/objects/community/)、[Product（商品）对象](https://dataxapi.com/zh/docs/objects/product/)、[Review（评价）对象](https://dataxapi.com/zh/docs/objects/review/)、[Keyword index history（关键词指数历史）对象](https://dataxapi.com/zh/docs/objects/keyword_history/)、[Related keyword（关联词）对象](https://dataxapi.com/zh/docs/objects/keyword_related/)、[Keyword audience（关键词人群画像）对象](https://dataxapi.com/zh/docs/objects/keyword_audience/)、[Account recent change（账号近期变化）对象](https://dataxapi.com/zh/docs/objects/account_history/)、[Brand index history（品牌指数历史）对象](https://dataxapi.com/zh/docs/objects/brand_history/)、[Brand index averages（品牌指数均值）对象](https://dataxapi.com/zh/docs/objects/brand_metrics/)、[Creator（达人）对象](https://dataxapi.com/zh/docs/objects/creator/)、[Audience（粉丝画像）对象](https://dataxapi.com/zh/docs/objects/audience/)、[Xingtu creator metrics（星图达人传播数据）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_metrics/)、[Xingtu creator video（星图达人作品）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_post/)、[PGY creator metrics（蒲公英博主数据表现）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_metrics/)、[PGY creator note（蒲公英博主笔记）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_post/)、[PGY note detail（蒲公英笔记详情）对象](https://dataxapi.com/zh/docs/objects/pgy_note/)、[Ad（广告）对象](https://dataxapi.com/zh/docs/objects/ad/)、[Advertiser（广告主）对象](https://dataxapi.com/zh/docs/objects/advertiser/)、[Douyin trend-index creator metrics（巨量算数达人核心指标）对象](https://dataxapi.com/zh/docs/objects/index_creator_metrics/)、[Xingtu creator content keywords（星图达人内容热词）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_keywords/)、[Xingtu creator scores（星图达人指数）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_scores/)、[Xingtu creator content mix（星图达人内容分布）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_content_mix/)、[Xingtu creator conversion（星图达人转化能力）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_conversion/)、[Xingtu campaign（星图营销活动）对象](https://dataxapi.com/zh/docs/objects/xingtu_campaign/)、[Channels collection（视频号合集）对象](https://dataxapi.com/zh/docs/objects/channels_collection/)、[Channels share link（视频号分享链接）对象](https://dataxapi.com/zh/docs/objects/channels_share_link/)、[Topic（话题）对象](https://dataxapi.com/zh/docs/objects/topic/)、[Account owner（账号主体）对象](https://dataxapi.com/zh/docs/objects/account_owner/)、[Mini program（小程序）对象](https://dataxapi.com/zh/docs/objects/miniprogram/)、[Follower history（粉丝数变化）对象](https://dataxapi.com/zh/docs/objects/follower_history/)、[PGY creator costs and summary（蒲公英博主合作成本和数据概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_costs/)、[PGY creator follower summary（蒲公英博主粉丝概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_followers/)、[PGY creator core figures history（蒲公英博主核心数据趋势）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_cost_history/)

---

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/docs/objects/trend/)

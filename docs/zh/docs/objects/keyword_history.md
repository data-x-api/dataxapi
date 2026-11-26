# Keyword index history（关键词指数历史）对象

3 个平台的 3 个接口都返回 Keyword index history（关键词指数历史）对象，8 个字段名完全一样，给一个平台写的代码不用改就能读其他平台。每次调用 $0.0060 到 $0.1。它是预览结构，之后可能调整。

给机器读：[keyword_history schema](https://dataxapi.com/openapi.json#/components/schemas/keyword_history)、[openapi.json](https://dataxapi.com/openapi.json)、[对象表（JSON）](https://api.dataxapi.com/v1/catalog/objects)、[llms.txt](https://dataxapi.com/zh/llms.txt)

关键词指数历史（Keyword index history）是一个词逐日的指数，来自平台自己的关键词工具：抖音的巨量算数或小红书的蒲公英。`points` 每一项是中国时间的一天，带当天的 `search_index`，这是指数，不是搜索次数；抖音另有 `composite_index`，小红书另有当天的笔记数、曝光数、阅读数和互动数。

靠 `keyword` 认它。关联词告诉你接下来还该盯哪些词，抖音上还有关键词人群画像说明是谁在搜；两个平台的指数不在一个尺度上，只拿一个词和自己比，或者和同平台的另一个词比。

## 字段

平台给不了的字段不会出现在这条数据里，而是写在 `meta.unavailable` 里。不会用猜的数或 0 顶上。

| 字段 | 类型 | 起始档位 | 说明 |
| --- | --- | --- | --- |
| `keyword` | 文本 | `compact` | 关键词 |
| `points` | 对象列表 | `compact` | 逐日的数，一天一项，从早到晚 |
| `points[].date` | 时间 | `compact` | 日期：中国时间（UTC+8）的一个自然日，写成这个日期的 UTC 零点（北京时间当天 8 点）；原样传给 since、until 取的就是这一天 |
| `points[].search_index` | 整数 | `compact` | 这一天的搜索指数：平台按搜索热度算出的指数，不是搜索次数 |
| `points[].composite_index` | 整数 | `compact` | 这一天的综合指数：平台把这个词相关内容的热度合起来算出的指数，不是次数 |
| `points[].notes` | 整数 | `standard` | 这一天和这个词有关的内容数 |
| `points[].impressions` | 整数 | `standard` | 这些内容这一天的曝光数 |
| `points[].views` | 整数 | `standard` | 这些内容这一天的阅读数 |
| `points[].engagements` | 整数 | `standard` | 这些内容这一天的互动数 |

## 每个数取的是平台上的哪个数

同一个字段名，在不同平台上对应的动作不完全一样。这张表写明这个字段取的是平台自己的哪个数。

| 字段 | 在那里是什么 | 平台 |
| --- | --- | --- |
| `keyword` | 平台的写法：英文一律小写 | 抖音 |
| `points.search_index` | 平台没有公布算法。同一个词的历史值不会被重新换算，可以跨日比较；不同词之间不保证是同一刻度 | 小红书 |
| `points.composite_index` | 这一天的微信指数 | 微信搜一搜 |
| `points.notes` | 不等于当天新发布的笔记数：同一篇笔记会被计入多天 | 小红书 |
| `points.engagements` | 这一天的点赞、收藏、评论之和，不含分享和关注 | 小红书 |

## 哪些平台给不了哪些字段

一个平台的所有接口都给不了某个字段时，它才列在那个字段后面。

| 字段 | 给不了的平台 |
| --- | --- |
| `points[].search_index` | 微信搜一搜 |
| `points[].composite_index` | 小红书 |
| `points[].notes` | 抖音、微信搜一搜 |
| `points[].impressions` | 抖音、微信搜一搜 |
| `points[].views` | 抖音、微信搜一搜 |
| `points[].engagements` | 抖音、微信搜一搜 |

同一个平台上，可能一个接口给不了、另一个接口能给：每个接口的页面列着它给不了的字段，每次返回也都写在 `meta.unavailable` 里。

## 返回 Keyword index history（关键词指数历史）的接口

### 抖音

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [抖音巨量算数关键词热度趋势](https://dataxapi.com/zh/apis/douyin/index/keywords/history.md) | `GET /v1/douyin/index/keywords/history` | 关键词指数历史列表 | $0.0060 / 次 |

### 小红书

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [小红书蒲公英关键词逐日搜索指数](https://dataxapi.com/zh/apis/xiaohongshu/pgy/keywords/history.md) | `GET /v1/xiaohongshu/pgy/keywords/history` | 关键词指数历史 | $0.0400 / 次 |

### 微信搜一搜

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [微信指数](https://dataxapi.com/zh/apis/wechat/index/keywords/history.md) | `GET /v1/wechat/index/keywords/history` | 关键词指数历史列表 | $0.1 / 次 |

## 示例

`douyin.index.keywords.history` 返回的一条，录制于 2026-10-12 21:47 UTC。名字、正文和编号是示例，链接也是；数字是原样。

```jsonc
{
  "keyword": "咖啡",
  "points": [
    {
      "date": "2026-09-01T00:00:00Z",
      "search_index": 4542097,
      "composite_index": 1627826
    },
    {
      "date": "2026-09-02T00:00:00Z",
      "search_index": 4430237,
      "composite_index": 1603543
    },
    {
      "date": "2026-09-03T00:00:00Z",
      "search_index": 4439049,
      "composite_index": 1606224
    },
    {
      "date": "2026-09-04T00:00:00Z",
      "search_index": 4590172,
      "composite_index": 1648872
    },
    {
      "date": "2026-09-05T00:00:00Z",
      "search_index": 5608382,
      "composite_index": 1966637
    },
    {
      "date": "2026-09-06T00:00:00Z",
      "search_index": 5341970,
      "composite_index": 1888380
    },
    {
      "date": "2026-09-07T00:00:00Z",
      "search_index": 5098808,
      "composite_index": 1808789
    },
    // … 另有 23 条
  ]
}
```

[完整的返回在这个接口的页面上 →](https://dataxapi.com/zh/apis/douyin/index/keywords/history.md)

## 相关

- [全部接口](https://dataxapi.com/zh/apis/): 目录里写明每个接口返回什么对象、多少钱。

## 其他对象

[Post（内容）对象](https://dataxapi.com/zh/docs/objects/post/)、[Comment（评论）对象](https://dataxapi.com/zh/docs/objects/comment/)、[Account（账号）对象](https://dataxapi.com/zh/docs/objects/account/)、[Trend（热点）对象](https://dataxapi.com/zh/docs/objects/trend/)、[Transcript（逐字稿）对象](https://dataxapi.com/zh/docs/objects/transcript/)、[Media files（视频和图片文件）对象](https://dataxapi.com/zh/docs/objects/media/)、[Music（音乐）对象](https://dataxapi.com/zh/docs/objects/music/)、[Creator rates（达人报价）对象](https://dataxapi.com/zh/docs/objects/creator_rates/)、[Community（社区）对象](https://dataxapi.com/zh/docs/objects/community/)、[Product（商品）对象](https://dataxapi.com/zh/docs/objects/product/)、[Review（评价）对象](https://dataxapi.com/zh/docs/objects/review/)、[Related keyword（关联词）对象](https://dataxapi.com/zh/docs/objects/keyword_related/)、[Keyword audience（关键词人群画像）对象](https://dataxapi.com/zh/docs/objects/keyword_audience/)、[Account recent change（账号近期变化）对象](https://dataxapi.com/zh/docs/objects/account_history/)、[Brand index history（品牌指数历史）对象](https://dataxapi.com/zh/docs/objects/brand_history/)、[Brand index averages（品牌指数均值）对象](https://dataxapi.com/zh/docs/objects/brand_metrics/)、[Creator（达人）对象](https://dataxapi.com/zh/docs/objects/creator/)、[Audience（粉丝画像）对象](https://dataxapi.com/zh/docs/objects/audience/)、[Xingtu creator metrics（星图达人传播数据）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_metrics/)、[Xingtu creator video（星图达人作品）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_post/)、[PGY creator metrics（蒲公英博主数据表现）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_metrics/)、[PGY creator note（蒲公英博主笔记）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_post/)、[PGY note detail（蒲公英笔记详情）对象](https://dataxapi.com/zh/docs/objects/pgy_note/)、[Ad（广告）对象](https://dataxapi.com/zh/docs/objects/ad/)、[Advertiser（广告主）对象](https://dataxapi.com/zh/docs/objects/advertiser/)、[Douyin trend-index creator metrics（巨量算数达人核心指标）对象](https://dataxapi.com/zh/docs/objects/index_creator_metrics/)、[Xingtu creator content keywords（星图达人内容热词）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_keywords/)、[Xingtu creator scores（星图达人指数）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_scores/)、[Xingtu creator content mix（星图达人内容分布）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_content_mix/)、[Xingtu creator conversion（星图达人转化能力）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_conversion/)、[Xingtu campaign（星图营销活动）对象](https://dataxapi.com/zh/docs/objects/xingtu_campaign/)、[Channels collection（视频号合集）对象](https://dataxapi.com/zh/docs/objects/channels_collection/)、[Channels share link（视频号分享链接）对象](https://dataxapi.com/zh/docs/objects/channels_share_link/)、[Topic（话题）对象](https://dataxapi.com/zh/docs/objects/topic/)、[Account owner（账号主体）对象](https://dataxapi.com/zh/docs/objects/account_owner/)、[Mini program（小程序）对象](https://dataxapi.com/zh/docs/objects/miniprogram/)、[Follower history（粉丝数变化）对象](https://dataxapi.com/zh/docs/objects/follower_history/)、[PGY creator costs and summary（蒲公英博主合作成本和数据概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_costs/)、[PGY creator follower summary（蒲公英博主粉丝概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_followers/)、[PGY creator core figures history（蒲公英博主核心数据趋势）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_cost_history/)

---

最后核对于 2026-11-26 12:17 UTC。目录修订号 0051cce45e9530b9。 [网页版](https://dataxapi.com/zh/docs/objects/keyword_history/)

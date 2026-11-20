# Brand index history（品牌指数历史）对象

Brand index history（品牌指数历史）对象有 6 个字段，由抖音的 1 个接口返回。每次调用 $0.0020。它是预览结构，之后可能调整。

给机器读：[brand_history schema](https://dataxapi.com/openapi.json#/components/schemas/brand_history)、[openapi.json](https://dataxapi.com/openapi.json)、[对象表（JSON）](https://api.dataxapi.com/v1/catalog/objects)、[llms.txt](https://dataxapi.com/zh/llms.txt)

品牌指数历史（Brand index history）是一个品牌在抖音巨量算数上逐日的三个指数：搜索指数 `search_index`、内容指数 `content_index`、传播指数 `spread_index`。它们是平台算的分，不是次数；一天是中国时间的一个自然日。

`brand` 是平台收录的品牌名写法，`category` 是平台把它归在的行业。品牌指数均值给的是同样三个指数在一段时间里的日均值，并带同行业头部品牌作参照。

## 字段

平台给不了的字段不会出现在这条数据里，而是写在 `meta.unavailable` 里。不会用猜的数或 0 顶上。

| 字段 | 类型 | 起始档位 | 说明 |
| --- | --- | --- | --- |
| `brand` | 文本 | `compact` | 品牌名 |
| `category` | 文本 | `compact` | 平台把这个品牌归在哪个行业，平台的原话 |
| `points` | 对象列表 | `compact` | 逐日的指数，一天一项，从早到晚 |
| `points[].date` | 时间 | `compact` | 日期：中国时间（UTC+8）的一个自然日，写成这个日期的 UTC 零点（北京时间当天 8 点）；原样传给 since、until 取的就是这一天 |
| `points[].search_index` | 整数 | `compact` | 搜索指数：人们搜这个品牌的热度，不是搜索次数 |
| `points[].content_index` | 整数 | `compact` | 内容指数：和这个品牌有关的内容的热度，不是内容数 |
| `points[].spread_index` | 整数 | `compact` | 传播指数：这些内容被观看和互动的热度，不是次数 |

## 返回 Brand index history（品牌指数历史）的接口

### 抖音

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [抖音巨量算数品牌指数趋势](https://dataxapi.com/zh/apis/douyin/index/brands/history.md) | `GET /v1/douyin/index/brands/history` | 品牌指数历史 | $0.0020 / 次 |

## 示例

`douyin.index.brands.history` 返回的一条，录制于 2026-10-12 21:56 UTC。名字、正文和编号是示例，链接也是；数字是原样。

```jsonc
{
  "brand": "泡泡玛特",
  "category": "母婴",
  "points": [
    {
      "date": "2026-09-01T00:00:00Z",
      "search_index": 121864,
      "content_index": 41224,
      "spread_index": 75601
    },
    {
      "date": "2026-09-02T00:00:00Z",
      "search_index": 122413,
      "content_index": 46057,
      "spread_index": 77637
    },
    {
      "date": "2026-09-03T00:00:00Z",
      "search_index": 122213,
      "content_index": 45504,
      "spread_index": 77642
    },
    {
      "date": "2026-09-04T00:00:00Z",
      "search_index": 122205,
      "content_index": 54042,
      "spread_index": 78337
    },
    {
      "date": "2026-09-05T00:00:00Z",
      "search_index": 124682,
      "content_index": 42229,
      "spread_index": 77377
    },
    {
      "date": "2026-09-06T00:00:00Z",
      "search_index": 124155,
      "content_index": 42738,
      "spread_index": 76569
    },
    {
      "date": "2026-09-07T00:00:00Z",
      "search_index": 121751,
      "content_index": 41525,
      "spread_index": 76108
    },
    // … 另有 23 条
  ]
}
```

[完整的返回在这个接口的页面上 →](https://dataxapi.com/zh/apis/douyin/index/brands/history.md)

## 相关

- [全部接口](https://dataxapi.com/zh/apis/): 目录里写明每个接口返回什么对象、多少钱。

## 其他对象

[Post（内容）对象](https://dataxapi.com/zh/docs/objects/post/)、[Comment（评论）对象](https://dataxapi.com/zh/docs/objects/comment/)、[Account（账号）对象](https://dataxapi.com/zh/docs/objects/account/)、[Trend（热点）对象](https://dataxapi.com/zh/docs/objects/trend/)、[Transcript（逐字稿）对象](https://dataxapi.com/zh/docs/objects/transcript/)、[Creator rates（达人报价）对象](https://dataxapi.com/zh/docs/objects/creator_rates/)、[Community（社区）对象](https://dataxapi.com/zh/docs/objects/community/)、[Product（商品）对象](https://dataxapi.com/zh/docs/objects/product/)、[Review（评价）对象](https://dataxapi.com/zh/docs/objects/review/)、[Keyword index history（关键词指数历史）对象](https://dataxapi.com/zh/docs/objects/keyword_history/)、[Related keyword（关联词）对象](https://dataxapi.com/zh/docs/objects/keyword_related/)、[Keyword audience（关键词人群画像）对象](https://dataxapi.com/zh/docs/objects/keyword_audience/)、[Account recent change（账号近期变化）对象](https://dataxapi.com/zh/docs/objects/account_history/)、[Brand index averages（品牌指数均值）对象](https://dataxapi.com/zh/docs/objects/brand_metrics/)、[Creator（达人）对象](https://dataxapi.com/zh/docs/objects/creator/)、[Audience（粉丝画像）对象](https://dataxapi.com/zh/docs/objects/audience/)、[Xingtu creator metrics（星图达人传播数据）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_metrics/)、[Xingtu creator video（星图达人作品）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_post/)、[PGY creator metrics（蒲公英博主数据表现）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_metrics/)、[PGY creator note（蒲公英博主笔记）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_post/)、[PGY note detail（蒲公英笔记详情）对象](https://dataxapi.com/zh/docs/objects/pgy_note/)、[Ad（广告）对象](https://dataxapi.com/zh/docs/objects/ad/)、[Advertiser（广告主）对象](https://dataxapi.com/zh/docs/objects/advertiser/)、[Douyin trend-index creator metrics（巨量算数达人核心指标）对象](https://dataxapi.com/zh/docs/objects/index_creator_metrics/)、[Xingtu creator content keywords（星图达人内容热词）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_keywords/)、[Xingtu creator scores（星图达人指数）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_scores/)、[Xingtu creator content mix（星图达人内容分布）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_content_mix/)、[Xingtu creator conversion（星图达人转化能力）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_conversion/)、[Xingtu campaign（星图营销活动）对象](https://dataxapi.com/zh/docs/objects/xingtu_campaign/)、[Channels collection（视频号合集）对象](https://dataxapi.com/zh/docs/objects/channels_collection/)、[Channels share link（视频号分享链接）对象](https://dataxapi.com/zh/docs/objects/channels_share_link/)、[Topic（话题）对象](https://dataxapi.com/zh/docs/objects/topic/)、[Account owner（账号主体）对象](https://dataxapi.com/zh/docs/objects/account_owner/)、[Mini program（小程序）对象](https://dataxapi.com/zh/docs/objects/miniprogram/)、[Follower history（粉丝数变化）对象](https://dataxapi.com/zh/docs/objects/follower_history/)、[PGY creator costs and summary（蒲公英博主合作成本和数据概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_costs/)、[PGY creator follower summary（蒲公英博主粉丝概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_followers/)、[PGY creator core figures history（蒲公英博主核心数据趋势）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_cost_history/)

---

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/docs/objects/brand_history/)

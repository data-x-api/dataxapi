# PGY creator core figures history（蒲公英博主核心数据趋势）对象

PGY creator core figures history（蒲公英博主核心数据趋势）对象有 21 个字段，由小红书的 1 个接口返回。每次调用 $0.0400。它是预览结构，之后可能调整。

给机器读：[pgy_creator_cost_history schema](https://dataxapi.com/openapi.json#/components/schemas/pgy_creator_cost_history)、[openapi.json](https://dataxapi.com/openapi.json)、[对象表（JSON）](https://api.dataxapi.com/v1/catalog/objects)、[llms.txt](https://dataxapi.com/zh/llms.txt)

## 字段

平台给不了的字段不会出现在这条数据里，而是写在 `meta.unavailable` 里。不会用猜的数或 0 顶上。

| 字段 | 类型 | 起始档位 | 说明 |
| --- | --- | --- | --- |
| `creator_id` | 文本 | `compact` | 蒲公英博主编号 |
| `days` | 整数 | `compact` | 统计的是最近多少天 |
| `currency` | 文本 | `compact` | 各项花费的货币 |
| `date` | 时间 | `compact` | 整段的数算到哪一天：中国时间（UTC+8）的一个自然日，写成这个日期的 UTC 零点 |
| `cpm` | 金额 | `compact` | CPM：每千次曝光的花费，人民币元；没有时为 null |
| `cpe` | 金额 | `compact` | CPE：每次互动的花费，人民币元；没有时为 null |
| `cpv` | 金额 | `compact` | CPV：每次阅读的花费，人民币元，蒲公英趋势图上的算法；没有时为 null |
| `shop_visit_cost` | 金额 | `compact` | 外溢进店单价：笔记带来的每一位进店访客的花费，人民币元；没有时为 null |
| `median_impressions` | 整数 | `compact` | 单篇笔记曝光数的中位数 |
| `median_reads` | 整数 | `compact` | 单篇笔记阅读数的中位数 |
| `median_engagements` | 整数 | `compact` | 单篇笔记互动数的中位数 |
| `median_shop_visits` | 整数 | `compact` | 单篇笔记带来的外溢进店人数的中位数；没有外溢进店的笔记算 0 |
| `points` | 对象列表 | `compact` | 逐日的数，一天一项，从早到晚：每一项是蒲公英那一天算出的数 |
| `points[].date` | 时间 | `compact` | 日期：中国时间（UTC+8）的一个自然日，写成这个日期的 UTC 零点 |
| `points[].cpm` | 金额 | `compact` | CPM：每千次曝光的花费，人民币元；没有时为 null |
| `points[].cpe` | 金额 | `compact` | CPE：每次互动的花费，人民币元；没有时为 null |
| `points[].cpv` | 金额 | `compact` | CPV：每次阅读的花费，人民币元，蒲公英趋势图上的算法；没有时为 null |
| `points[].shop_visit_cost` | 金额 | `compact` | 外溢进店单价：笔记带来的每一位进店访客的花费，人民币元；没有时为 null |
| `points[].median_impressions` | 整数 | `compact` | 单篇笔记曝光数的中位数 |
| `points[].median_reads` | 整数 | `compact` | 单篇笔记阅读数的中位数 |
| `points[].median_engagements` | 整数 | `compact` | 单篇笔记互动数的中位数 |
| `points[].median_shop_visits` | 整数 | `compact` | 单篇笔记带来的外溢进店人数的中位数；没有外溢进店的笔记算 0 |

## 返回 PGY creator core figures history（蒲公英博主核心数据趋势）的接口

### 小红书

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [小红书蒲公英博主核心数据趋势](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/costs/history.md) | `GET /v1/xiaohongshu/pgy/creators/costs/history` | 蒲公英博主核心数据趋势 | $0.0400 / 次 |

## 示例

`xiaohongshu.pgy.creators.costs.history` 返回的一条，录制于 2026-11-10 09:54 UTC。名字、正文和编号是示例，链接也是；数字是原样。

```jsonc
{
  "creator_id": "6db7d6c4000000008ff2aa80",
  "days": 30,
  "currency": "CNY",
  "date": "2026-11-09T00:00:00Z",
  "cpm": "6.2482",
  "cpe": "0.8591",
  "cpv": "0.0153",
  "shop_visit_cost": null,
  "median_impressions": 4801380,
  "median_reads": 4570345,
  "median_engagements": 34920,
  "median_shop_visits": 0,
  "points": [
    {
      "date": "2026-10-11T00:00:00Z",
      "cpm": "4.4683",
      "cpe": "0.8324",
      "cpv": "0.0108",
      "shop_visit_cost": null,
      "median_impressions": 6713899,
      "median_reads": 6511479,
      "median_engagements": 36041,
      "median_shop_visits": 0
    },
    {
      "date": "2026-10-12T00:00:00Z",
      "cpm": "4.1886",
      "cpe": "0.5148",
      "cpv": "0.0104",
      "shop_visit_cost": null,
      "median_impressions": 7162338,
      "median_reads": 6749230,
      "median_engagements": 58279,
      "median_shop_visits": 0
    },
    // … 另有 28 条
  ]
}
```

[完整的返回在这个接口的页面上 →](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/costs/history.md)

## 相关

- [全部接口](https://dataxapi.com/zh/apis/): 目录里写明每个接口返回什么对象、多少钱。

## 其他对象

[Post（内容）对象](https://dataxapi.com/zh/docs/objects/post/)、[Comment（评论）对象](https://dataxapi.com/zh/docs/objects/comment/)、[Account（账号）对象](https://dataxapi.com/zh/docs/objects/account/)、[Trend（热点）对象](https://dataxapi.com/zh/docs/objects/trend/)、[Transcript（逐字稿）对象](https://dataxapi.com/zh/docs/objects/transcript/)、[Creator rates（达人报价）对象](https://dataxapi.com/zh/docs/objects/creator_rates/)、[Community（社区）对象](https://dataxapi.com/zh/docs/objects/community/)、[Product（商品）对象](https://dataxapi.com/zh/docs/objects/product/)、[Review（评价）对象](https://dataxapi.com/zh/docs/objects/review/)、[Keyword index history（关键词指数历史）对象](https://dataxapi.com/zh/docs/objects/keyword_history/)、[Related keyword（关联词）对象](https://dataxapi.com/zh/docs/objects/keyword_related/)、[Keyword audience（关键词人群画像）对象](https://dataxapi.com/zh/docs/objects/keyword_audience/)、[Account recent change（账号近期变化）对象](https://dataxapi.com/zh/docs/objects/account_history/)、[Brand index history（品牌指数历史）对象](https://dataxapi.com/zh/docs/objects/brand_history/)、[Brand index averages（品牌指数均值）对象](https://dataxapi.com/zh/docs/objects/brand_metrics/)、[Creator（达人）对象](https://dataxapi.com/zh/docs/objects/creator/)、[Audience（粉丝画像）对象](https://dataxapi.com/zh/docs/objects/audience/)、[Xingtu creator metrics（星图达人传播数据）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_metrics/)、[Xingtu creator video（星图达人作品）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_post/)、[PGY creator metrics（蒲公英博主数据表现）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_metrics/)、[PGY creator note（蒲公英博主笔记）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_post/)、[PGY note detail（蒲公英笔记详情）对象](https://dataxapi.com/zh/docs/objects/pgy_note/)、[Ad（广告）对象](https://dataxapi.com/zh/docs/objects/ad/)、[Advertiser（广告主）对象](https://dataxapi.com/zh/docs/objects/advertiser/)、[Douyin trend-index creator metrics（巨量算数达人核心指标）对象](https://dataxapi.com/zh/docs/objects/index_creator_metrics/)、[Xingtu creator content keywords（星图达人内容热词）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_keywords/)、[Xingtu creator scores（星图达人指数）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_scores/)、[Xingtu creator content mix（星图达人内容分布）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_content_mix/)、[Xingtu creator conversion（星图达人转化能力）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_conversion/)、[Xingtu campaign（星图营销活动）对象](https://dataxapi.com/zh/docs/objects/xingtu_campaign/)、[Channels collection（视频号合集）对象](https://dataxapi.com/zh/docs/objects/channels_collection/)、[Channels share link（视频号分享链接）对象](https://dataxapi.com/zh/docs/objects/channels_share_link/)、[Topic（话题）对象](https://dataxapi.com/zh/docs/objects/topic/)、[Account owner（账号主体）对象](https://dataxapi.com/zh/docs/objects/account_owner/)、[Mini program（小程序）对象](https://dataxapi.com/zh/docs/objects/miniprogram/)、[Follower history（粉丝数变化）对象](https://dataxapi.com/zh/docs/objects/follower_history/)、[PGY creator costs and summary（蒲公英博主合作成本和数据概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_costs/)、[PGY creator follower summary（蒲公英博主粉丝概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_followers/)

---

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/docs/objects/pgy_creator_cost_history/)

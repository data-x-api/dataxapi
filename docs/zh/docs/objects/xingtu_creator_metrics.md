# Xingtu creator metrics（星图达人传播数据）对象

Xingtu creator metrics（星图达人传播数据）对象有 15 个字段，由抖音的 1 个接口返回。每次调用 $0.0040。它是预览结构，之后可能调整。

给机器读：[xingtu_creator_metrics schema](https://dataxapi.com/openapi.json#/components/schemas/xingtu_creator_metrics)、[openapi.json](https://dataxapi.com/openapi.json)、[对象表（JSON）](https://api.dataxapi.com/v1/catalog/objects)、[llms.txt](https://dataxapi.com/zh/llms.txt)

星图达人传播数据（Xingtu creator metrics）是一位抖音达人近 30 天或 90 天视频的表现，按星图的统计：播放中位数，平均点赞、评论、分享，互动率和完播率。它还给预期的千次播放成本（植入视频 `cpm_integrated`、定制视频 `cpm_custom`）和单次互动成本，货币见 `currency`。

`creator_id` 是星图达人搜索返回的达人编号。和达人报价一起看要花多少钱，和星图达人指数一起看星图给他排在哪。

## 字段

平台给不了的字段不会出现在这条数据里，而是写在 `meta.unavailable` 里。不会用猜的数或 0 顶上。

| 字段 | 类型 | 起始档位 | 说明 |
| --- | --- | --- | --- |
| `creator_id` | 文本 | `compact` | 星图达人编号 |
| `videos` | 整数 | `compact` | 统计周期内的视频数 |
| `median_views` | 整数 | `compact` | 播放数的中位数 |
| `average_likes` | 整数 | `compact` | 平均点赞数 |
| `average_comments` | 整数 | `compact` | 平均评论数 |
| `average_shares` | 整数 | `compact` | 平均分享数 |
| `engagement_rate` | 数字 | `compact` | 互动率，0 到 1 |
| `engagement_rate_percentile` | 数字 | `standard` | 互动率超过了多少同类达人，0 到 1 |
| `completion_rate` | 数字 | `compact` | 完播率，0 到 1 |
| `completion_rate_percentile` | 数字 | `standard` | 完播率超过了多少同类达人，0 到 1 |
| `currency` | 文本 | `compact` | 下面几个金额的货币 |
| `cpm_integrated` | 金额 | `compact` | 植入视频的预期千次播放成本 |
| `cpm_custom` | 金额 | `compact` | 定制视频的预期千次播放成本 |
| `cpe_integrated` | 金额 | `compact` | 植入视频的预期单次互动成本 |
| `cpe_custom` | 金额 | `compact` | 定制视频的预期单次互动成本 |

## 返回 Xingtu creator metrics（星图达人传播数据）的接口

### 抖音

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [抖音星图达人传播数据](https://dataxapi.com/zh/apis/douyin/xingtu/creators/metrics.md) | `GET /v1/douyin/xingtu/creators/metrics` | 星图达人传播数据 | $0.0040 / 次 |

## 示例

`douyin.xingtu.creators.metrics` 返回的一条，录制于 2026-10-12 21:49 UTC。名字、正文和编号是示例，链接也是；数字是原样。

```jsonc
{
  "creator_id": "6660491594420292860",
  "videos": 763,
  "median_views": 237059,
  "average_likes": 11712,
  "average_comments": 993,
  "average_shares": 938,
  "engagement_rate": 0.0148,
  "engagement_rate_percentile": 0.512,
  "completion_rate": 0.2377,
  "completion_rate_percentile": 0.7391,
  "currency": "CNY",
  "cpm_integrated": "537.29",
  "cpm_custom": "2238.73",
  "cpe_integrated": "36.92",
  "cpe_custom": "153.84"
}
```

[完整的返回在这个接口的页面上 →](https://dataxapi.com/zh/apis/douyin/xingtu/creators/metrics.md)

## 相关

- [达人数据表现 API](https://dataxapi.com/zh/roles/creators-metrics/): 同一种动作在 2 个平台上的接口，带各平台的字段对照。
- [全部接口](https://dataxapi.com/zh/apis/): 目录里写明每个接口返回什么对象、多少钱。

## 其他对象

[Post（内容）对象](https://dataxapi.com/zh/docs/objects/post/)、[Comment（评论）对象](https://dataxapi.com/zh/docs/objects/comment/)、[Account（账号）对象](https://dataxapi.com/zh/docs/objects/account/)、[Trend（热点）对象](https://dataxapi.com/zh/docs/objects/trend/)、[Transcript（逐字稿）对象](https://dataxapi.com/zh/docs/objects/transcript/)、[Media files（视频和图片文件）对象](https://dataxapi.com/zh/docs/objects/media/)、[Music（音乐）对象](https://dataxapi.com/zh/docs/objects/music/)、[Creator rates（达人报价）对象](https://dataxapi.com/zh/docs/objects/creator_rates/)、[Community（社区）对象](https://dataxapi.com/zh/docs/objects/community/)、[Product（商品）对象](https://dataxapi.com/zh/docs/objects/product/)、[Review（评价）对象](https://dataxapi.com/zh/docs/objects/review/)、[Keyword index history（关键词指数历史）对象](https://dataxapi.com/zh/docs/objects/keyword_history/)、[Related keyword（关联词）对象](https://dataxapi.com/zh/docs/objects/keyword_related/)、[Keyword audience（关键词人群画像）对象](https://dataxapi.com/zh/docs/objects/keyword_audience/)、[Account recent change（账号近期变化）对象](https://dataxapi.com/zh/docs/objects/account_history/)、[Brand index history（品牌指数历史）对象](https://dataxapi.com/zh/docs/objects/brand_history/)、[Brand index averages（品牌指数均值）对象](https://dataxapi.com/zh/docs/objects/brand_metrics/)、[Creator（达人）对象](https://dataxapi.com/zh/docs/objects/creator/)、[Audience（粉丝画像）对象](https://dataxapi.com/zh/docs/objects/audience/)、[Xingtu creator video（星图达人作品）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_post/)、[PGY creator metrics（蒲公英博主数据表现）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_metrics/)、[PGY creator note（蒲公英博主笔记）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_post/)、[PGY note detail（蒲公英笔记详情）对象](https://dataxapi.com/zh/docs/objects/pgy_note/)、[Ad（广告）对象](https://dataxapi.com/zh/docs/objects/ad/)、[Advertiser（广告主）对象](https://dataxapi.com/zh/docs/objects/advertiser/)、[Douyin trend-index creator metrics（巨量算数达人核心指标）对象](https://dataxapi.com/zh/docs/objects/index_creator_metrics/)、[Xingtu creator content keywords（星图达人内容热词）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_keywords/)、[Xingtu creator scores（星图达人指数）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_scores/)、[Xingtu creator content mix（星图达人内容分布）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_content_mix/)、[Xingtu creator conversion（星图达人转化能力）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_conversion/)、[Xingtu campaign（星图营销活动）对象](https://dataxapi.com/zh/docs/objects/xingtu_campaign/)、[Channels collection（视频号合集）对象](https://dataxapi.com/zh/docs/objects/channels_collection/)、[Channels share link（视频号分享链接）对象](https://dataxapi.com/zh/docs/objects/channels_share_link/)、[Topic（话题）对象](https://dataxapi.com/zh/docs/objects/topic/)、[Account owner（账号主体）对象](https://dataxapi.com/zh/docs/objects/account_owner/)、[Mini program（小程序）对象](https://dataxapi.com/zh/docs/objects/miniprogram/)、[Follower history（粉丝数变化）对象](https://dataxapi.com/zh/docs/objects/follower_history/)、[PGY creator costs and summary（蒲公英博主合作成本和数据概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_costs/)、[PGY creator follower summary（蒲公英博主粉丝概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_followers/)、[PGY creator core figures history（蒲公英博主核心数据趋势）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_cost_history/)

---

最后核对于 2026-11-26 12:17 UTC。目录修订号 0051cce45e9530b9。 [网页版](https://dataxapi.com/zh/docs/objects/xingtu_creator_metrics/)

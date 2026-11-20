# Xingtu creator scores（星图达人指数）对象

Xingtu creator scores（星图达人指数）对象有 25 个字段，由抖音的 1 个接口返回。每次调用 $0.0080。它是预览结构，之后可能调整。

给机器读：[xingtu_creator_scores schema](https://dataxapi.com/openapi.json#/components/schemas/xingtu_creator_scores)、[openapi.json](https://dataxapi.com/openapi.json)、[对象表（JSON）](https://api.dataxapi.com/v1/catalog/objects)、[llms.txt](https://dataxapi.com/zh/llms.txt)

星图达人指数（Xingtu creator scores）是星图给一位抖音达人打的六项分：综合，以及传播、种草、转化、合作、性价比。每项 0 到 100 分，带同类达人的平均分 `average`、名次 `rank`，以及排在前多大比例 `rank_share`。

`creator_id` 是星图达人编号。这些分是星图自己算的，只适合在星图的达人之间比；传播和带货的具体数字，看星图达人传播数据和星图达人转化能力。

## 字段

平台给不了的字段不会出现在这条数据里，而是写在 `meta.unavailable` 里。不会用猜的数或 0 顶上。

| 字段 | 类型 | 起始档位 | 说明 |
| --- | --- | --- | --- |
| `creator_id` | 文本 | `compact` | 星图达人编号 |
| `overall` | 对象 | `compact` | 星图指数（综合） |
| `overall.score` | 数字 | `compact` | 得分，0 到 100 |
| `overall.average` | 数字 | `compact` | 同类达人这一项的平均分 |
| `overall.rank` | 整数 | `compact` | 这一项的名次，1 是最高 |
| `overall.rank_share` | 数字 | `compact` | 名次排在前多大比例，0 到 1：0.05 是前 5%。保留四位小数，名次在前一百名左右的是 0 |
| `reach` | 对象 | `compact` | 传播指数 |
| `reach.score` | 数字 | `compact` | 得分，0 到 100 |
| `reach.average` | 数字 | `compact` | 同类达人这一项的平均分 |
| `reach.rank` | 整数 | `compact` | 这一项的名次，1 是最高 |
| `reach.rank_share` | 数字 | `compact` | 名次排在前多大比例，0 到 1：0.05 是前 5%。保留四位小数，名次在前一百名左右的是 0 |
| `seeding` | 对象 | `compact` | 种草指数 |
| `seeding.score` | 数字 | `compact` | 得分，0 到 100 |
| `seeding.average` | 数字 | `compact` | 同类达人这一项的平均分 |
| `seeding.rank` | 整数 | `compact` | 这一项的名次，1 是最高 |
| `seeding.rank_share` | 数字 | `compact` | 名次排在前多大比例，0 到 1：0.05 是前 5%。保留四位小数，名次在前一百名左右的是 0 |
| `conversion` | 对象 | `compact` | 转化指数 |
| `conversion.score` | 数字 | `compact` | 得分，0 到 100 |
| `conversion.average` | 数字 | `compact` | 同类达人这一项的平均分 |
| `conversion.rank` | 整数 | `compact` | 这一项的名次，1 是最高 |
| `conversion.rank_share` | 数字 | `compact` | 名次排在前多大比例，0 到 1：0.05 是前 5%。保留四位小数，名次在前一百名左右的是 0 |
| `cooperation` | 对象 | `compact` | 合作指数 |
| `cooperation.score` | 数字 | `compact` | 得分，0 到 100 |
| `cooperation.average` | 数字 | `compact` | 同类达人这一项的平均分 |
| `cooperation.rank` | 整数 | `compact` | 这一项的名次，1 是最高 |
| `cooperation.rank_share` | 数字 | `compact` | 名次排在前多大比例，0 到 1：0.05 是前 5%。保留四位小数，名次在前一百名左右的是 0 |
| `value_for_money` | 对象 | `compact` | 性价比指数 |
| `value_for_money.score` | 数字 | `compact` | 得分，0 到 100 |
| `value_for_money.average` | 数字 | `compact` | 同类达人这一项的平均分 |
| `value_for_money.rank` | 整数 | `compact` | 这一项的名次，1 是最高 |
| `value_for_money.rank_share` | 数字 | `compact` | 名次排在前多大比例，0 到 1：0.05 是前 5%。保留四位小数，名次在前一百名左右的是 0 |

## 返回 Xingtu creator scores（星图达人指数）的接口

### 抖音

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [抖音星图达人星图指数](https://dataxapi.com/zh/apis/douyin/xingtu/creators/scores/get.md) | `GET /v1/douyin/xingtu/creators/scores/get` | 星图达人指数 | $0.0080 / 次 |

## 示例

`douyin.xingtu.creators.scores.get` 返回的一条，录制于 2026-10-13 03:26 UTC。名字、正文和编号是示例，链接也是；数字是原样。

```jsonc
{
  "creator_id": "6119837728404143577",
  "overall": { "score": 90.9, "average": 56.2, "rank": 12, "rank_share": 0 },
  "reach": {
    "score": 98.77,
    "average": 53.08,
    "rank": 232,
    "rank_share": 0.0001
  },
  "seeding": {
    "score": 98.68,
    "average": 53.26,
    "rank": 280,
    "rank_share": 0.0001
  },
  "conversion": {
    "score": 98.92,
    "average": 55.24,
    "rank": 164,
    "rank_share": 0.0001
  },
  "cooperation": {
    "score": 89.49,
    "average": 75.55,
    "rank": 1038,
    "rank_share": 0.0005
  },
  "value_for_money": {
    "score": 68.64,
    "average": 64.09,
    "rank": 50209,
    "rank_share": 0.023
  }
}
```

[完整的返回在这个接口的页面上 →](https://dataxapi.com/zh/apis/douyin/xingtu/creators/scores/get.md)

## 相关

- [全部接口](https://dataxapi.com/zh/apis/): 目录里写明每个接口返回什么对象、多少钱。

## 其他对象

[Post（内容）对象](https://dataxapi.com/zh/docs/objects/post/)、[Comment（评论）对象](https://dataxapi.com/zh/docs/objects/comment/)、[Account（账号）对象](https://dataxapi.com/zh/docs/objects/account/)、[Trend（热点）对象](https://dataxapi.com/zh/docs/objects/trend/)、[Transcript（逐字稿）对象](https://dataxapi.com/zh/docs/objects/transcript/)、[Creator rates（达人报价）对象](https://dataxapi.com/zh/docs/objects/creator_rates/)、[Community（社区）对象](https://dataxapi.com/zh/docs/objects/community/)、[Product（商品）对象](https://dataxapi.com/zh/docs/objects/product/)、[Review（评价）对象](https://dataxapi.com/zh/docs/objects/review/)、[Keyword index history（关键词指数历史）对象](https://dataxapi.com/zh/docs/objects/keyword_history/)、[Related keyword（关联词）对象](https://dataxapi.com/zh/docs/objects/keyword_related/)、[Keyword audience（关键词人群画像）对象](https://dataxapi.com/zh/docs/objects/keyword_audience/)、[Account recent change（账号近期变化）对象](https://dataxapi.com/zh/docs/objects/account_history/)、[Brand index history（品牌指数历史）对象](https://dataxapi.com/zh/docs/objects/brand_history/)、[Brand index averages（品牌指数均值）对象](https://dataxapi.com/zh/docs/objects/brand_metrics/)、[Creator（达人）对象](https://dataxapi.com/zh/docs/objects/creator/)、[Audience（粉丝画像）对象](https://dataxapi.com/zh/docs/objects/audience/)、[Xingtu creator metrics（星图达人传播数据）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_metrics/)、[Xingtu creator video（星图达人作品）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_post/)、[PGY creator metrics（蒲公英博主数据表现）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_metrics/)、[PGY creator note（蒲公英博主笔记）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_post/)、[PGY note detail（蒲公英笔记详情）对象](https://dataxapi.com/zh/docs/objects/pgy_note/)、[Ad（广告）对象](https://dataxapi.com/zh/docs/objects/ad/)、[Advertiser（广告主）对象](https://dataxapi.com/zh/docs/objects/advertiser/)、[Douyin trend-index creator metrics（巨量算数达人核心指标）对象](https://dataxapi.com/zh/docs/objects/index_creator_metrics/)、[Xingtu creator content keywords（星图达人内容热词）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_keywords/)、[Xingtu creator content mix（星图达人内容分布）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_content_mix/)、[Xingtu creator conversion（星图达人转化能力）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_conversion/)、[Xingtu campaign（星图营销活动）对象](https://dataxapi.com/zh/docs/objects/xingtu_campaign/)、[Channels collection（视频号合集）对象](https://dataxapi.com/zh/docs/objects/channels_collection/)、[Channels share link（视频号分享链接）对象](https://dataxapi.com/zh/docs/objects/channels_share_link/)、[Topic（话题）对象](https://dataxapi.com/zh/docs/objects/topic/)、[Account owner（账号主体）对象](https://dataxapi.com/zh/docs/objects/account_owner/)、[Mini program（小程序）对象](https://dataxapi.com/zh/docs/objects/miniprogram/)、[Follower history（粉丝数变化）对象](https://dataxapi.com/zh/docs/objects/follower_history/)、[PGY creator costs and summary（蒲公英博主合作成本和数据概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_costs/)、[PGY creator follower summary（蒲公英博主粉丝概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_followers/)、[PGY creator core figures history（蒲公英博主核心数据趋势）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_cost_history/)

---

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/docs/objects/xingtu_creator_scores/)

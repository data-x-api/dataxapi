# Douyin trend-index creator metrics（巨量算数达人核心指标）对象

Douyin trend-index creator metrics（巨量算数达人核心指标）对象有 17 个字段，由抖音的 1 个接口返回。每次调用 $0.0020。它是预览结构，之后可能调整。

给机器读：[index_creator_metrics schema](https://dataxapi.com/openapi.json#/components/schemas/index_creator_metrics)、[openapi.json](https://dataxapi.com/openapi.json)、[对象表（JSON）](https://api.dataxapi.com/v1/catalog/objects)、[llms.txt](https://dataxapi.com/zh/llms.txt)

巨量算数达人核心指标（Douyin trend-index creator metrics）是一个抖音账号最近一周和最近一个月平均每天新增多少，按巨量算数的统计：点赞、分享、评论，和平台口径的涨粉数（不是粉丝净增）。`change_7d` 和 `change_30d` 是和上一个时间段相比的变化比例。

`creator_id` 是抖音账号的数字编号（uid）：不是星图达人编号，也不是账号资料接口用的那个。同一个 uid 还能从巨量算数读这个账号的粉丝画像和热门视频。

## 字段

平台给不了的字段不会出现在这条数据里，而是写在 `meta.unavailable` 里。不会用猜的数或 0 顶上。

| 字段 | 类型 | 起始档位 | 说明 |
| --- | --- | --- | --- |
| `creator_id` | 文本 | `compact` | 账号的数字编号（抖音的 uid），就是请求里给的那个 |
| `average_7d` | 对象 | `compact` | 最近一周的日均值 |
| `average_7d.likes` | 数字 | `compact` | 最近一周平均每天新增的点赞数 |
| `average_7d.follows` | 数字 | `compact` | 最近一周平均每天的涨粉数，平台的口径，不是粉丝净增：同一平台给的同类数字比按粉丝净增算出来的日均数大 2 到 10 倍，粉丝净减的账号也是正数。平台没说明怎么算，适合看趋势、比账号，别当净增用 |
| `average_7d.shares` | 数字 | `compact` | 最近一周平均每天新增的分享数 |
| `average_7d.comments` | 数字 | `compact` | 最近一周平均每天新增的评论数 |
| `average_30d` | 对象 | `compact` | 最近一个月的日均值 |
| `average_30d.likes` | 数字 | `compact` | 最近一个月平均每天新增的点赞数 |
| `average_30d.follows` | 数字 | `compact` | 最近一个月平均每天的涨粉数，平台的口径，同上：不是粉丝净增 |
| `average_30d.shares` | 数字 | `compact` | 最近一个月平均每天新增的分享数 |
| `average_30d.comments` | 数字 | `compact` | 最近一个月平均每天新增的评论数 |
| `change_7d` | 对象 | `compact` | 最近一周的日均值和上一周相比的变化比例：0.3 是多了三成，-0.5 是少了一半 |
| `change_7d.likes` | 数字 | `compact` | 日均新增点赞数的变化比例 |
| `change_7d.follows` | 数字 | `compact` | 日均涨粉数（平台的口径，不是粉丝净增）的变化比例 |
| `change_7d.shares` | 数字 | `compact` | 日均新增分享数的变化比例 |
| `change_7d.comments` | 数字 | `compact` | 日均新增评论数的变化比例 |
| `change_30d` | 对象 | `compact` | 最近一个月的日均值和上一个月相比的变化比例，写法同上 |
| `change_30d.likes` | 数字 | `compact` | 日均新增点赞数的变化比例 |
| `change_30d.follows` | 数字 | `compact` | 日均涨粉数（平台的口径，不是粉丝净增）的变化比例 |
| `change_30d.shares` | 数字 | `compact` | 日均新增分享数的变化比例 |
| `change_30d.comments` | 数字 | `compact` | 日均新增评论数的变化比例 |

## 返回 Douyin trend-index creator metrics（巨量算数达人核心指标）的接口

### 抖音

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [抖音巨量算数达人核心指标](https://dataxapi.com/zh/apis/douyin/index/creators/metrics.md) | `GET /v1/douyin/index/creators/metrics` | 巨量算数达人核心指标 | $0.0020 / 次 |

## 示例

`douyin.index.creators.metrics` 返回的一条，录制于 2026-10-13 03:24 UTC。名字、正文和编号是示例，链接也是；数字是原样。

```jsonc
{
  "creator_id": "62430445852",
  "average_7d": {
    "likes": 157100.7142857143,
    "follows": 3588,
    "shares": 14715.42857142857,
    "comments": 3879.8571428571427
  },
  "average_30d": {
    "likes": 300077.7,
    "follows": 6233.6,
    "shares": 17969.833333333332,
    "comments": 7351.466666666666
  },
  "change_7d": {
    "likes": -0.20028666505711482,
    "follows": -0.1607298001737619,
    "shares": 0.8577740905729795,
    "comments": -0.28813692598028945
  },
  "change_30d": {
    "likes": -0.12000717497205526,
    "follows": -0.1316211058123174,
    "shares": -0.1697698557902584,
    "comments": -0.23841359186421957
  }
}
```

[完整的返回在这个接口的页面上 →](https://dataxapi.com/zh/apis/douyin/index/creators/metrics.md)

## 相关

- [全部接口](https://dataxapi.com/zh/apis/): 目录里写明每个接口返回什么对象、多少钱。

## 其他对象

[Post（内容）对象](https://dataxapi.com/zh/docs/objects/post/)、[Comment（评论）对象](https://dataxapi.com/zh/docs/objects/comment/)、[Account（账号）对象](https://dataxapi.com/zh/docs/objects/account/)、[Trend（热点）对象](https://dataxapi.com/zh/docs/objects/trend/)、[Transcript（逐字稿）对象](https://dataxapi.com/zh/docs/objects/transcript/)、[Creator rates（达人报价）对象](https://dataxapi.com/zh/docs/objects/creator_rates/)、[Community（社区）对象](https://dataxapi.com/zh/docs/objects/community/)、[Product（商品）对象](https://dataxapi.com/zh/docs/objects/product/)、[Review（评价）对象](https://dataxapi.com/zh/docs/objects/review/)、[Keyword index history（关键词指数历史）对象](https://dataxapi.com/zh/docs/objects/keyword_history/)、[Related keyword（关联词）对象](https://dataxapi.com/zh/docs/objects/keyword_related/)、[Keyword audience（关键词人群画像）对象](https://dataxapi.com/zh/docs/objects/keyword_audience/)、[Account recent change（账号近期变化）对象](https://dataxapi.com/zh/docs/objects/account_history/)、[Brand index history（品牌指数历史）对象](https://dataxapi.com/zh/docs/objects/brand_history/)、[Brand index averages（品牌指数均值）对象](https://dataxapi.com/zh/docs/objects/brand_metrics/)、[Creator（达人）对象](https://dataxapi.com/zh/docs/objects/creator/)、[Audience（粉丝画像）对象](https://dataxapi.com/zh/docs/objects/audience/)、[Xingtu creator metrics（星图达人传播数据）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_metrics/)、[Xingtu creator video（星图达人作品）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_post/)、[PGY creator metrics（蒲公英博主数据表现）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_metrics/)、[PGY creator note（蒲公英博主笔记）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_post/)、[PGY note detail（蒲公英笔记详情）对象](https://dataxapi.com/zh/docs/objects/pgy_note/)、[Ad（广告）对象](https://dataxapi.com/zh/docs/objects/ad/)、[Advertiser（广告主）对象](https://dataxapi.com/zh/docs/objects/advertiser/)、[Xingtu creator content keywords（星图达人内容热词）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_keywords/)、[Xingtu creator scores（星图达人指数）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_scores/)、[Xingtu creator content mix（星图达人内容分布）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_content_mix/)、[Xingtu creator conversion（星图达人转化能力）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_conversion/)、[Xingtu campaign（星图营销活动）对象](https://dataxapi.com/zh/docs/objects/xingtu_campaign/)、[Channels collection（视频号合集）对象](https://dataxapi.com/zh/docs/objects/channels_collection/)、[Channels share link（视频号分享链接）对象](https://dataxapi.com/zh/docs/objects/channels_share_link/)、[Topic（话题）对象](https://dataxapi.com/zh/docs/objects/topic/)、[Account owner（账号主体）对象](https://dataxapi.com/zh/docs/objects/account_owner/)、[Mini program（小程序）对象](https://dataxapi.com/zh/docs/objects/miniprogram/)、[Follower history（粉丝数变化）对象](https://dataxapi.com/zh/docs/objects/follower_history/)、[PGY creator costs and summary（蒲公英博主合作成本和数据概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_costs/)、[PGY creator follower summary（蒲公英博主粉丝概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_followers/)、[PGY creator core figures history（蒲公英博主核心数据趋势）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_cost_history/)

---

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/docs/objects/index_creator_metrics/)

# Xingtu creator conversion（星图达人转化能力）对象

Xingtu creator conversion（星图达人转化能力）对象有 14 个字段，由抖音的 1 个接口返回。每次调用 $0.0040。它是预览结构，之后可能调整。

给机器读：[xingtu_creator_conversion schema](https://dataxapi.com/openapi.json#/components/schemas/xingtu_creator_conversion)、[openapi.json](https://dataxapi.com/openapi.json)、[对象表（JSON）](https://api.dataxapi.com/v1/catalog/objects)、[llms.txt](https://dataxapi.com/zh/llms.txt)

星图达人转化能力（Xingtu creator conversion）是一位抖音达人带货视频卖得怎么样，按星图的统计：统计到的视频数、播放中位数、推荐过的商品数和带货品类。销售额、千次播放成交额（GPM）、商品价格、点击成本、点击次数给的是平台原话的区间，不是精确值。

`creator_id` 是星图达人编号；没有带货数据的达人返回 `not_found`。`currency` 写明金额区间的货币。

## 字段

平台给不了的字段不会出现在这条数据里，而是写在 `meta.unavailable` 里。不会用猜的数或 0 顶上。

| 字段 | 类型 | 起始档位 | 说明 |
| --- | --- | --- | --- |
| `creator_id` | 文本 | `compact` | 星图达人编号 |
| `videos` | 整数 | `compact` | 统计到的带货相关视频数 |
| `median_views` | 整数 | `compact` | 这些视频播放数的中位数 |
| `products` | 整数 | `compact` | 推荐过的商品数 |
| `currency` | 文本 | `compact` | 下面几个金额区间的货币 |
| `sales_range` | 文本 | `compact` | 平均每条视频的销售额区间，平台的原话 |
| `gpm_range` | 文本 | `compact` | 千次播放成交额（GPM）区间，平台的原话 |
| `product_price_range` | 文本 | `compact` | 推荐商品的价格区间，平台的原话 |
| `click_cost_range` | 文本 | `compact` | 单次点击成本（CPC）区间，平台的原话 |
| `clicks_range` | 文本 | `compact` | 视频里商品组件的点击次数区间，平台的原话 |
| `click_rate_range` | 文本 | `compact` | 商品组件的点击率区间，平台的原话 |
| `categories` | 对象列表 | `compact` | 带货的商品品类，一类一项 |
| `categories[].name` | 文本 | `compact` | 品类名称，平台的原话 |
| `categories[].share` | 数字 | `compact` | 这一品类的占比，0 到 1 |
| `categories[].sales_range` | 文本 | `compact` | 这一品类的销售额区间，平台的原话 |

## 返回 Xingtu creator conversion（星图达人转化能力）的接口

### 抖音

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [抖音星图达人转化能力](https://dataxapi.com/zh/apis/douyin/xingtu/creators/conversion/get.md) | `GET /v1/douyin/xingtu/creators/conversion/get` | 星图达人转化能力 | $0.0040 / 次 |

## 示例

`douyin.xingtu.creators.conversion.get` 返回的一条，录制于 2026-10-13 03:26 UTC。名字、正文和编号是示例，链接也是；数字是原样。

```jsonc
{
  "creator_id": "6077931603440616010",
  "videos": 3,
  "median_views": 3276730,
  "products": 2,
  "currency": "CNY",
  "sales_range": "1w-5w",
  "gpm_range": "100-500",
  "product_price_range": "50-100",
  "click_cost_range": "0.5-1",
  "clicks_range": "1k-5k",
  "click_rate_range": "1%-3%",
  "categories": [
    { "name": "美食", "share": 1, "sales_range": "1w-5w" }
  ]
}
```

[完整的返回在这个接口的页面上 →](https://dataxapi.com/zh/apis/douyin/xingtu/creators/conversion/get.md)

## 相关

- [全部接口](https://dataxapi.com/zh/apis/): 目录里写明每个接口返回什么对象、多少钱。

## 其他对象

[Post（内容）对象](https://dataxapi.com/zh/docs/objects/post/)、[Comment（评论）对象](https://dataxapi.com/zh/docs/objects/comment/)、[Account（账号）对象](https://dataxapi.com/zh/docs/objects/account/)、[Trend（热点）对象](https://dataxapi.com/zh/docs/objects/trend/)、[Transcript（逐字稿）对象](https://dataxapi.com/zh/docs/objects/transcript/)、[Creator rates（达人报价）对象](https://dataxapi.com/zh/docs/objects/creator_rates/)、[Community（社区）对象](https://dataxapi.com/zh/docs/objects/community/)、[Product（商品）对象](https://dataxapi.com/zh/docs/objects/product/)、[Review（评价）对象](https://dataxapi.com/zh/docs/objects/review/)、[Keyword index history（关键词指数历史）对象](https://dataxapi.com/zh/docs/objects/keyword_history/)、[Related keyword（关联词）对象](https://dataxapi.com/zh/docs/objects/keyword_related/)、[Keyword audience（关键词人群画像）对象](https://dataxapi.com/zh/docs/objects/keyword_audience/)、[Account recent change（账号近期变化）对象](https://dataxapi.com/zh/docs/objects/account_history/)、[Brand index history（品牌指数历史）对象](https://dataxapi.com/zh/docs/objects/brand_history/)、[Brand index averages（品牌指数均值）对象](https://dataxapi.com/zh/docs/objects/brand_metrics/)、[Creator（达人）对象](https://dataxapi.com/zh/docs/objects/creator/)、[Audience（粉丝画像）对象](https://dataxapi.com/zh/docs/objects/audience/)、[Xingtu creator metrics（星图达人传播数据）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_metrics/)、[Xingtu creator video（星图达人作品）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_post/)、[PGY creator metrics（蒲公英博主数据表现）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_metrics/)、[PGY creator note（蒲公英博主笔记）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_post/)、[PGY note detail（蒲公英笔记详情）对象](https://dataxapi.com/zh/docs/objects/pgy_note/)、[Ad（广告）对象](https://dataxapi.com/zh/docs/objects/ad/)、[Advertiser（广告主）对象](https://dataxapi.com/zh/docs/objects/advertiser/)、[Douyin trend-index creator metrics（巨量算数达人核心指标）对象](https://dataxapi.com/zh/docs/objects/index_creator_metrics/)、[Xingtu creator content keywords（星图达人内容热词）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_keywords/)、[Xingtu creator scores（星图达人指数）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_scores/)、[Xingtu creator content mix（星图达人内容分布）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_content_mix/)、[Xingtu campaign（星图营销活动）对象](https://dataxapi.com/zh/docs/objects/xingtu_campaign/)、[Channels collection（视频号合集）对象](https://dataxapi.com/zh/docs/objects/channels_collection/)、[Channels share link（视频号分享链接）对象](https://dataxapi.com/zh/docs/objects/channels_share_link/)、[Topic（话题）对象](https://dataxapi.com/zh/docs/objects/topic/)、[Account owner（账号主体）对象](https://dataxapi.com/zh/docs/objects/account_owner/)、[Mini program（小程序）对象](https://dataxapi.com/zh/docs/objects/miniprogram/)、[Follower history（粉丝数变化）对象](https://dataxapi.com/zh/docs/objects/follower_history/)、[PGY creator costs and summary（蒲公英博主合作成本和数据概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_costs/)、[PGY creator follower summary（蒲公英博主粉丝概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_followers/)、[PGY creator core figures history（蒲公英博主核心数据趋势）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_cost_history/)

---

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/docs/objects/xingtu_creator_conversion/)

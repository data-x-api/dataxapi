# Creator rates（达人报价）对象

Creator rates（达人报价）对象有 6 个字段，由抖音的 1 个接口返回。每次调用 $0.0400。它是预览结构，之后可能调整。

给机器读：[creator_rates schema](https://dataxapi.com/openapi.json#/components/schemas/creator_rates)、[openapi.json](https://dataxapi.com/openapi.json)、[对象表（JSON）](https://api.dataxapi.com/v1/catalog/objects)、[llms.txt](https://dataxapi.com/zh/llms.txt)

达人报价（Creator rates）是达人每种合作形式要多少钱，按平台自己的达人营销平台挂出来的样子：现在来自抖音星图。`rates` 每一项是一种合作形式，带平台原话的名称和结算方式、报价 `amount`（没有固定报价时为 `null`），以及现在接不接这种合作 `open`。

`creator_id` 是星图达人搜索返回的达人编号，星图其他达人接口用的也是它；`currency` 写明报价的货币。小红书蒲公英的报价不在这个对象里，而是在达人对象自己的 `ext.rate_image_note` 和 `ext.rate_video_note`。

## 字段

平台给不了的字段不会出现在这条数据里，而是写在 `meta.unavailable` 里。不会用猜的数或 0 顶上。

| 字段 | 类型 | 起始档位 | 说明 |
| --- | --- | --- | --- |
| `creator_id` | 文本 | `compact` | 达人编号 |
| `currency` | 文本 | `compact` | 报价的货币 |
| `rates` | 对象列表 | `compact` | 各种合作形式的报价 |
| `rates[].name` | 文本 | `compact` | 合作形式，平台的原话 |
| `rates[].amount` | 金额 | `compact` | 报价；这种形式没有固定报价时为 null |
| `rates[].settlement` | 文本 | `compact` | 结算方式，平台的原话 |
| `rates[].open` | 是否 | `compact` | 现在是否接这种合作 |

## 返回 Creator rates（达人报价）的接口

### 抖音

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [抖音星图达人商业报价](https://dataxapi.com/zh/apis/douyin/xingtu/creators/rates/get.md) | `GET /v1/douyin/xingtu/creators/rates/get` | 达人报价 | $0.0400 / 次 |

## 示例

`douyin.xingtu.creators.rates.get` 返回的一条，录制于 2026-10-10 14:02 UTC。名字、正文和编号是示例，链接也是；数字是原样。

```jsonc
{
  "creator_id": "6187694769211204659",
  "currency": "CNY",
  "rates": [
    {
      "name": "植入视频",
      "amount": "400000",
      "settlement": "固定价格",
      "open": true
    },
    {
      "name": "定制视频",
      "amount": "500000",
      "settlement": "固定价格",
      "open": true
    },
    // … 另有 4 条
  ]
}
```

[完整的返回在这个接口的页面上 →](https://dataxapi.com/zh/apis/douyin/xingtu/creators/rates/get.md)

## 相关

- [全部接口](https://dataxapi.com/zh/apis/): 目录里写明每个接口返回什么对象、多少钱。

## 其他对象

[Post（内容）对象](https://dataxapi.com/zh/docs/objects/post/)、[Comment（评论）对象](https://dataxapi.com/zh/docs/objects/comment/)、[Account（账号）对象](https://dataxapi.com/zh/docs/objects/account/)、[Trend（热点）对象](https://dataxapi.com/zh/docs/objects/trend/)、[Transcript（逐字稿）对象](https://dataxapi.com/zh/docs/objects/transcript/)、[Media files（视频和图片文件）对象](https://dataxapi.com/zh/docs/objects/media/)、[Music（音乐）对象](https://dataxapi.com/zh/docs/objects/music/)、[Community（社区）对象](https://dataxapi.com/zh/docs/objects/community/)、[Product（商品）对象](https://dataxapi.com/zh/docs/objects/product/)、[Review（评价）对象](https://dataxapi.com/zh/docs/objects/review/)、[Keyword index history（关键词指数历史）对象](https://dataxapi.com/zh/docs/objects/keyword_history/)、[Related keyword（关联词）对象](https://dataxapi.com/zh/docs/objects/keyword_related/)、[Keyword audience（关键词人群画像）对象](https://dataxapi.com/zh/docs/objects/keyword_audience/)、[Account recent change（账号近期变化）对象](https://dataxapi.com/zh/docs/objects/account_history/)、[Brand index history（品牌指数历史）对象](https://dataxapi.com/zh/docs/objects/brand_history/)、[Brand index averages（品牌指数均值）对象](https://dataxapi.com/zh/docs/objects/brand_metrics/)、[Creator（达人）对象](https://dataxapi.com/zh/docs/objects/creator/)、[Audience（粉丝画像）对象](https://dataxapi.com/zh/docs/objects/audience/)、[Xingtu creator metrics（星图达人传播数据）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_metrics/)、[Xingtu creator video（星图达人作品）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_post/)、[PGY creator metrics（蒲公英博主数据表现）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_metrics/)、[PGY creator note（蒲公英博主笔记）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_post/)、[PGY note detail（蒲公英笔记详情）对象](https://dataxapi.com/zh/docs/objects/pgy_note/)、[Ad（广告）对象](https://dataxapi.com/zh/docs/objects/ad/)、[Advertiser（广告主）对象](https://dataxapi.com/zh/docs/objects/advertiser/)、[Douyin trend-index creator metrics（巨量算数达人核心指标）对象](https://dataxapi.com/zh/docs/objects/index_creator_metrics/)、[Xingtu creator content keywords（星图达人内容热词）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_keywords/)、[Xingtu creator scores（星图达人指数）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_scores/)、[Xingtu creator content mix（星图达人内容分布）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_content_mix/)、[Xingtu creator conversion（星图达人转化能力）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_conversion/)、[Xingtu campaign（星图营销活动）对象](https://dataxapi.com/zh/docs/objects/xingtu_campaign/)、[Channels collection（视频号合集）对象](https://dataxapi.com/zh/docs/objects/channels_collection/)、[Channels share link（视频号分享链接）对象](https://dataxapi.com/zh/docs/objects/channels_share_link/)、[Topic（话题）对象](https://dataxapi.com/zh/docs/objects/topic/)、[Account owner（账号主体）对象](https://dataxapi.com/zh/docs/objects/account_owner/)、[Mini program（小程序）对象](https://dataxapi.com/zh/docs/objects/miniprogram/)、[Follower history（粉丝数变化）对象](https://dataxapi.com/zh/docs/objects/follower_history/)、[PGY creator costs and summary（蒲公英博主合作成本和数据概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_costs/)、[PGY creator follower summary（蒲公英博主粉丝概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_followers/)、[PGY creator core figures history（蒲公英博主核心数据趋势）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_cost_history/)

---

最后核对于 2026-11-26 12:17 UTC。目录修订号 0051cce45e9530b9。 [网页版](https://dataxapi.com/zh/docs/objects/creator_rates/)

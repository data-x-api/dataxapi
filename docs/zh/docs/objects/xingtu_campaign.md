# Xingtu campaign（星图营销活动）对象

Xingtu campaign（星图营销活动）对象有 10 个字段，由抖音的 1 个接口返回。每次调用 $0.0040。它是预览结构，之后可能调整。

给机器读：[xingtu_campaign schema](https://dataxapi.com/openapi.json#/components/schemas/xingtu_campaign)、[openapi.json](https://dataxapi.com/openapi.json)、[对象表（JSON）](https://api.dataxapi.com/v1/catalog/objects)、[llms.txt](https://dataxapi.com/zh/llms.txt)

星图营销活动（Xingtu campaign）是星图营销日历上的一条：平台大事件、电商节点、情绪节点、创意营销或行业活动，品牌和达人都能参加。它带活动进行到哪一步 `stage`，以及招商和活动的起止时间。

它是独立的：没有达人或账号指向它。日历按 `since`、`until` 一段时间一起取，一次给全，不翻页。

## 字段

平台给不了的字段不会出现在这条数据里，而是写在 `meta.unavailable` 里。不会用猜的数或 0 顶上。

| 字段 | 类型 | 起始档位 | 说明 |
| --- | --- | --- | --- |
| `id` | 文本 | `compact` | 活动编号 |
| `name` | 文本 | `compact` | 活动名称 |
| `description` | 文本 | `compact` | 活动介绍 |
| `category` | 文本 | `compact` | 活动类型：星图大事件、电商节点、情绪节点、创意营销、行业活动：`platform_event`、`ecommerce`、`seasonal`、`creative`、`industry` |
| `stage` | 文本 | `compact` | 活动进行到哪一步：筹备中、招商中、资源上线、已结束：`preparing`、`open`、`live`、`ended` |
| `signup_starts_at` | 时间 | `compact` | 招商开始时间 |
| `signup_ends_at` | 时间 | `compact` | 招商结束时间 |
| `starts_at` | 时间 | `compact` | 活动开始时间 |
| `ends_at` | 时间 | `compact` | 活动结束时间 |
| `image_url` | 链接 | `standard` | 活动主图 |

## 返回 Xingtu campaign（星图营销活动）的接口

### 抖音

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [抖音星图营销活动日历](https://dataxapi.com/zh/apis/douyin/xingtu/campaigns/list.md) | `GET /v1/douyin/xingtu/campaigns/list` | 星图营销活动列表 | $0.0040 / 次 |

## 示例

`douyin.xingtu.campaigns.list` 返回的一条，录制于 2026-10-13 03:26 UTC。名字、正文和编号是示例，链接也是；数字是原样。

```jsonc
{
  "id": "7632957782936535670",
  "name": "周末露营季节限定合作",
  "description": "周末的周末露营日常，随手记录一下",
  "category": "ecommerce",
  "stage": "open",
  "signup_starts_at": "2026-09-29T02:29:20.000Z",
  "signup_ends_at": "2026-10-31T02:29:20.000Z",
  "starts_at": "2026-10-10T02:29:04.000Z",
  "ends_at": "2026-11-20T02:29:04.000Z",
  "image_url": "https://p3-pc-sign.douyinpic.com/tos-cn-i-0813/a5ac1ffb2df94f6c3a16~tplv-dy-resize.jpeg"
}
```

[完整的返回在这个接口的页面上 →](https://dataxapi.com/zh/apis/douyin/xingtu/campaigns/list.md)

## 相关

- [全部接口](https://dataxapi.com/zh/apis/): 目录里写明每个接口返回什么对象、多少钱。

## 其他对象

[Post（内容）对象](https://dataxapi.com/zh/docs/objects/post/)、[Comment（评论）对象](https://dataxapi.com/zh/docs/objects/comment/)、[Account（账号）对象](https://dataxapi.com/zh/docs/objects/account/)、[Trend（热点）对象](https://dataxapi.com/zh/docs/objects/trend/)、[Transcript（逐字稿）对象](https://dataxapi.com/zh/docs/objects/transcript/)、[Media files（视频和图片文件）对象](https://dataxapi.com/zh/docs/objects/media/)、[Music（音乐）对象](https://dataxapi.com/zh/docs/objects/music/)、[Creator rates（达人报价）对象](https://dataxapi.com/zh/docs/objects/creator_rates/)、[Community（社区）对象](https://dataxapi.com/zh/docs/objects/community/)、[Product（商品）对象](https://dataxapi.com/zh/docs/objects/product/)、[Review（评价）对象](https://dataxapi.com/zh/docs/objects/review/)、[Keyword index history（关键词指数历史）对象](https://dataxapi.com/zh/docs/objects/keyword_history/)、[Related keyword（关联词）对象](https://dataxapi.com/zh/docs/objects/keyword_related/)、[Keyword audience（关键词人群画像）对象](https://dataxapi.com/zh/docs/objects/keyword_audience/)、[Account recent change（账号近期变化）对象](https://dataxapi.com/zh/docs/objects/account_history/)、[Brand index history（品牌指数历史）对象](https://dataxapi.com/zh/docs/objects/brand_history/)、[Brand index averages（品牌指数均值）对象](https://dataxapi.com/zh/docs/objects/brand_metrics/)、[Creator（达人）对象](https://dataxapi.com/zh/docs/objects/creator/)、[Audience（粉丝画像）对象](https://dataxapi.com/zh/docs/objects/audience/)、[Xingtu creator metrics（星图达人传播数据）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_metrics/)、[Xingtu creator video（星图达人作品）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_post/)、[PGY creator metrics（蒲公英博主数据表现）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_metrics/)、[PGY creator note（蒲公英博主笔记）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_post/)、[PGY note detail（蒲公英笔记详情）对象](https://dataxapi.com/zh/docs/objects/pgy_note/)、[Ad（广告）对象](https://dataxapi.com/zh/docs/objects/ad/)、[Advertiser（广告主）对象](https://dataxapi.com/zh/docs/objects/advertiser/)、[Douyin trend-index creator metrics（巨量算数达人核心指标）对象](https://dataxapi.com/zh/docs/objects/index_creator_metrics/)、[Xingtu creator content keywords（星图达人内容热词）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_keywords/)、[Xingtu creator scores（星图达人指数）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_scores/)、[Xingtu creator content mix（星图达人内容分布）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_content_mix/)、[Xingtu creator conversion（星图达人转化能力）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_conversion/)、[Channels collection（视频号合集）对象](https://dataxapi.com/zh/docs/objects/channels_collection/)、[Channels share link（视频号分享链接）对象](https://dataxapi.com/zh/docs/objects/channels_share_link/)、[Topic（话题）对象](https://dataxapi.com/zh/docs/objects/topic/)、[Account owner（账号主体）对象](https://dataxapi.com/zh/docs/objects/account_owner/)、[Mini program（小程序）对象](https://dataxapi.com/zh/docs/objects/miniprogram/)、[Follower history（粉丝数变化）对象](https://dataxapi.com/zh/docs/objects/follower_history/)、[PGY creator costs and summary（蒲公英博主合作成本和数据概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_costs/)、[PGY creator follower summary（蒲公英博主粉丝概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_followers/)、[PGY creator core figures history（蒲公英博主核心数据趋势）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_cost_history/)

---

最后核对于 2026-11-26 12:17 UTC。目录修订号 0051cce45e9530b9。 [网页版](https://dataxapi.com/zh/docs/objects/xingtu_campaign/)

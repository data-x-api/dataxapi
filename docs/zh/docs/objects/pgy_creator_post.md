# PGY creator note（蒲公英博主笔记）对象

PGY creator note（蒲公英博主笔记）对象有 12 个字段，由小红书的 1 个接口返回。每次调用 $0.0400。它是预览结构，之后可能调整。

给机器读：[pgy_creator_post schema](https://dataxapi.com/openapi.json#/components/schemas/pgy_creator_post)、[openapi.json](https://dataxapi.com/openapi.json)、[对象表（JSON）](https://api.dataxapi.com/v1/catalog/objects)、[llms.txt](https://dataxapi.com/zh/llms.txt)

蒲公英博主笔记（PGY creator note）是蒲公英博主页上列出的一篇小红书笔记，从新到旧：标题、图文还是视频、发布日期、阅读、点赞、收藏。`is_sponsored` 和 `brand` 写明是不是商业合作笔记、给哪个品牌做的。

它是一种专用结构，不是内容对象，列表按蒲公英博主编号取。`published_at` 只到日，写成北京时间那一天的零点。

## 字段

平台给不了的字段不会出现在这条数据里，而是写在 `meta.unavailable` 里。不会用猜的数或 0 顶上。

| 字段 | 类型 | 起始档位 | 说明 |
| --- | --- | --- | --- |
| `id` | 文本 | `compact` | 笔记编号 |
| `title` | 文本 | `compact` | 笔记标题 |
| `type` | 文本 | `compact` | 图文还是视频：`image`、`video` |
| `published_at` | 时间 | `compact` | 发布日期（平台只给到日，按北京时间那一天的零点给） |
| `cover_url` | 链接 | `standard` | 封面图地址 |
| `is_sponsored` | 是否 | `compact` | 是否商业合作笔记：有合作品牌（brand）的就是 |
| `brand` | 文本 | `compact` | 合作的品牌，平台的原话；不是合作笔记则为 null |
| `is_promoted` | 是否 | `compact` | 这篇笔记是否带过付费推广流量（蒲公英标“含推广流量”）。和是不是合作笔记无关：合作笔记可以没有，日常笔记也可以有 |
| `metrics` | 对象 | `compact` | 这篇笔记的数字 |
| `metrics.views` | 整数 | `compact` | 阅读数 |
| `metrics.likes` | 整数 | `compact` | 点赞数 |
| `metrics.favorites` | 整数 | `compact` | 收藏数 |
| `metrics.shop_visits` | 整数 | `standard` | 外溢进店人数：这篇笔记带到品牌店铺的人数；只有跨域合作笔记才有，别的笔记是 0 |

## 返回 PGY creator note（蒲公英博主笔记）的接口

### 小红书

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [小红书蒲公英博主笔记](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/notes/list.md) | `GET /v1/xiaohongshu/pgy/creators/notes/list` | 蒲公英博主笔记列表 | $0.0400 / 次 |

## 示例

`xiaohongshu.pgy.creators.notes.list` 返回的一条，录制于 2026-10-12 21:53 UTC。名字、正文和编号是示例，链接也是；数字是原样。

```jsonc
{
  "id": "61ee962b00000000afb45a20",
  "title": "周末露营入门指南：一篇讲清楚",
  "type": "video",
  "published_at": "2026-10-09T16:00:00.000Z",
  "cover_url": "https://sns-webpic-qc.xhscdn.com/20261012/f8dcf3e698e1b1893a9f!nd_dft_wlteh_webp_3",
  "is_sponsored": false,
  "brand": null,
  "is_promoted": false,
  "metrics": { "views": 75, "likes": 5, "favorites": 1, "shop_visits": 0 }
}
```

[完整的返回在这个接口的页面上 →](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/notes/list.md)

## 相关

- [达人作品 API](https://dataxapi.com/zh/roles/creators-posts-list/): 同一种动作在 2 个平台上的接口，带各平台的字段对照。
- [全部接口](https://dataxapi.com/zh/apis/): 目录里写明每个接口返回什么对象、多少钱。

## 其他对象

[Post（内容）对象](https://dataxapi.com/zh/docs/objects/post/)、[Comment（评论）对象](https://dataxapi.com/zh/docs/objects/comment/)、[Account（账号）对象](https://dataxapi.com/zh/docs/objects/account/)、[Trend（热点）对象](https://dataxapi.com/zh/docs/objects/trend/)、[Transcript（逐字稿）对象](https://dataxapi.com/zh/docs/objects/transcript/)、[Media files（视频和图片文件）对象](https://dataxapi.com/zh/docs/objects/media/)、[Music（音乐）对象](https://dataxapi.com/zh/docs/objects/music/)、[Creator rates（达人报价）对象](https://dataxapi.com/zh/docs/objects/creator_rates/)、[Community（社区）对象](https://dataxapi.com/zh/docs/objects/community/)、[Product（商品）对象](https://dataxapi.com/zh/docs/objects/product/)、[Review（评价）对象](https://dataxapi.com/zh/docs/objects/review/)、[Keyword index history（关键词指数历史）对象](https://dataxapi.com/zh/docs/objects/keyword_history/)、[Related keyword（关联词）对象](https://dataxapi.com/zh/docs/objects/keyword_related/)、[Keyword audience（关键词人群画像）对象](https://dataxapi.com/zh/docs/objects/keyword_audience/)、[Account recent change（账号近期变化）对象](https://dataxapi.com/zh/docs/objects/account_history/)、[Brand index history（品牌指数历史）对象](https://dataxapi.com/zh/docs/objects/brand_history/)、[Brand index averages（品牌指数均值）对象](https://dataxapi.com/zh/docs/objects/brand_metrics/)、[Creator（达人）对象](https://dataxapi.com/zh/docs/objects/creator/)、[Audience（粉丝画像）对象](https://dataxapi.com/zh/docs/objects/audience/)、[Xingtu creator metrics（星图达人传播数据）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_metrics/)、[Xingtu creator video（星图达人作品）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_post/)、[PGY creator metrics（蒲公英博主数据表现）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_metrics/)、[PGY note detail（蒲公英笔记详情）对象](https://dataxapi.com/zh/docs/objects/pgy_note/)、[Ad（广告）对象](https://dataxapi.com/zh/docs/objects/ad/)、[Advertiser（广告主）对象](https://dataxapi.com/zh/docs/objects/advertiser/)、[Douyin trend-index creator metrics（巨量算数达人核心指标）对象](https://dataxapi.com/zh/docs/objects/index_creator_metrics/)、[Xingtu creator content keywords（星图达人内容热词）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_keywords/)、[Xingtu creator scores（星图达人指数）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_scores/)、[Xingtu creator content mix（星图达人内容分布）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_content_mix/)、[Xingtu creator conversion（星图达人转化能力）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_conversion/)、[Xingtu campaign（星图营销活动）对象](https://dataxapi.com/zh/docs/objects/xingtu_campaign/)、[Channels collection（视频号合集）对象](https://dataxapi.com/zh/docs/objects/channels_collection/)、[Channels share link（视频号分享链接）对象](https://dataxapi.com/zh/docs/objects/channels_share_link/)、[Topic（话题）对象](https://dataxapi.com/zh/docs/objects/topic/)、[Account owner（账号主体）对象](https://dataxapi.com/zh/docs/objects/account_owner/)、[Mini program（小程序）对象](https://dataxapi.com/zh/docs/objects/miniprogram/)、[Follower history（粉丝数变化）对象](https://dataxapi.com/zh/docs/objects/follower_history/)、[PGY creator costs and summary（蒲公英博主合作成本和数据概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_costs/)、[PGY creator follower summary（蒲公英博主粉丝概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_followers/)、[PGY creator core figures history（蒲公英博主核心数据趋势）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_cost_history/)

---

最后核对于 2026-11-26 12:17 UTC。目录修订号 0051cce45e9530b9。 [网页版](https://dataxapi.com/zh/docs/objects/pgy_creator_post/)

# Transcript（逐字稿）对象

7 个平台的 7 个接口都返回 Transcript（逐字稿）对象，6 个字段名完全一样，给一个平台写的代码不用改就能读其他平台。每次调用 $0.0020。

给机器读：[transcript schema](https://dataxapi.com/openapi.json#/components/schemas/transcript)、[openapi.json](https://dataxapi.com/openapi.json)、[对象表（JSON）](https://api.dataxapi.com/v1/catalog/objects)、[llms.txt](https://dataxapi.com/zh/llms.txt)

逐字稿（Transcript）是一条视频里说的话，转成文字。TikTok、YouTube、Reddit 还按时间分段给 `segments`，每段带开始和结束的秒数 `start`、`end`；其他平台只给一整段文字。

它没有自己的编号：`post_id` 是它所属内容的编号，和取内容的接口用的是同一个。Meta 广告库里的视频属于一条广告，这时 `post_id` 是这条广告的广告库编号。

## 字段

平台给不了的字段不会出现在这条数据里，而是写在 `meta.unavailable` 里。不会用猜的数或 0 顶上。

| 字段 | 类型 | 起始档位 | 说明 |
| --- | --- | --- | --- |
| `post_id` | 文本 | `compact` | 所属内容的编号 |
| `lang` | 文本 | `compact` | 语言代码 |
| `text` | 文本 | `compact` | 全文 |
| `segments` | 对象列表 | `standard` | 带时间的分段 |
| `segments[].start` | 数字 | `standard` | 开始时间，秒 |
| `segments[].end` | 数字 | `standard` | 结束时间，秒 |
| `segments[].text` | 文本 | `standard` | 这一段的文字 |

## 每个数取的是平台上的哪个数

同一个字段名，在不同平台上对应的动作不完全一样。这张表写明这个字段取的是平台自己的哪个数。

| 字段 | 在那里是什么 | 平台 |
| --- | --- | --- |
| `post_id` | 所属广告的广告库编号 | Meta 广告库 |
| `lang` | 所取字幕文件的语言 | Reddit |

## 哪些平台给不了哪些字段

一个平台的所有接口都给不了某个字段时，它才列在那个字段后面。

| 字段 | 给不了的平台 |
| --- | --- |
| `lang` | Meta 广告库、Instagram、TikTok、LinkedIn、X（推特） |
| `segments[].start` | Meta 广告库、Instagram、LinkedIn、X（推特） |
| `segments[].end` | Meta 广告库、Instagram、LinkedIn、X（推特） |
| `segments[].text` | Meta 广告库、Instagram、LinkedIn、X（推特） |

同一个平台上，可能一个接口给不了、另一个接口能给：每个接口的页面列着它给不了的字段，每次返回也都写在 `meta.unavailable` 里。

## 返回 Transcript（逐字稿）的接口

### Meta 广告库

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Meta 广告视频字幕](https://dataxapi.com/zh/apis/meta/ads/transcript/get.md) | `GET /v1/meta/ads/transcript/get` | 逐字稿 | $0.0020 / 次 |

### Instagram

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Instagram 视频字幕](https://dataxapi.com/zh/apis/instagram/posts/transcript/get.md) | `GET /v1/instagram/posts/transcript/get` | 逐字稿 | $0.0020 / 次 |

### TikTok

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [TikTok 视频字幕](https://dataxapi.com/zh/apis/tiktok/videos/transcript/get.md) | `GET /v1/tiktok/videos/transcript/get` | 逐字稿 | $0.0020 / 次 |

### YouTube

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [YouTube 视频字幕](https://dataxapi.com/zh/apis/youtube/videos/transcript/get.md) | `GET /v1/youtube/videos/transcript/get` | 逐字稿 | $0.0020 / 次 |

### LinkedIn

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [LinkedIn 视频字幕](https://dataxapi.com/zh/apis/linkedin/posts/transcript/get.md) | `GET /v1/linkedin/posts/transcript/get` | 逐字稿 | $0.0020 / 次 |

### Reddit

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Reddit 视频字幕](https://dataxapi.com/zh/apis/reddit/posts/transcript/get.md) | `GET /v1/reddit/posts/transcript/get` | 逐字稿 | $0.0020 / 次 |

### X（推特）

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [X 视频字幕](https://dataxapi.com/zh/apis/x/posts/transcript/get.md) | `GET /v1/x/posts/transcript/get` | 逐字稿 | $0.0020 / 次 |

## 示例

`meta.ads.transcript.get` 返回的一条，录制于 2026-10-25 15:10 UTC。名字、正文和编号是示例，链接也是；数字是原样。

```jsonc
{
  "post_id": "1060625109666930",
  "text": "Hey everyone, today I am going through what I packed for weekend hiking. Short version: light, fits in one bag, hard to break. Let's go piece by piece."
}
```

[完整的返回在这个接口的页面上 →](https://dataxapi.com/zh/apis/meta/ads/transcript/get.md)

## 相关

- [视频转文字 API](https://dataxapi.com/zh/roles/transcripts-get/): 同一种动作在 7 个平台上的接口，带各平台的字段对照。
- [全部接口](https://dataxapi.com/zh/apis/): 目录里写明每个接口返回什么对象、多少钱。

## 其他对象

[Post（内容）对象](https://dataxapi.com/zh/docs/objects/post/)、[Comment（评论）对象](https://dataxapi.com/zh/docs/objects/comment/)、[Account（账号）对象](https://dataxapi.com/zh/docs/objects/account/)、[Trend（热点）对象](https://dataxapi.com/zh/docs/objects/trend/)、[Creator rates（达人报价）对象](https://dataxapi.com/zh/docs/objects/creator_rates/)、[Community（社区）对象](https://dataxapi.com/zh/docs/objects/community/)、[Product（商品）对象](https://dataxapi.com/zh/docs/objects/product/)、[Review（评价）对象](https://dataxapi.com/zh/docs/objects/review/)、[Keyword index history（关键词指数历史）对象](https://dataxapi.com/zh/docs/objects/keyword_history/)、[Related keyword（关联词）对象](https://dataxapi.com/zh/docs/objects/keyword_related/)、[Keyword audience（关键词人群画像）对象](https://dataxapi.com/zh/docs/objects/keyword_audience/)、[Account recent change（账号近期变化）对象](https://dataxapi.com/zh/docs/objects/account_history/)、[Brand index history（品牌指数历史）对象](https://dataxapi.com/zh/docs/objects/brand_history/)、[Brand index averages（品牌指数均值）对象](https://dataxapi.com/zh/docs/objects/brand_metrics/)、[Creator（达人）对象](https://dataxapi.com/zh/docs/objects/creator/)、[Audience（粉丝画像）对象](https://dataxapi.com/zh/docs/objects/audience/)、[Xingtu creator metrics（星图达人传播数据）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_metrics/)、[Xingtu creator video（星图达人作品）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_post/)、[PGY creator metrics（蒲公英博主数据表现）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_metrics/)、[PGY creator note（蒲公英博主笔记）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_post/)、[PGY note detail（蒲公英笔记详情）对象](https://dataxapi.com/zh/docs/objects/pgy_note/)、[Ad（广告）对象](https://dataxapi.com/zh/docs/objects/ad/)、[Advertiser（广告主）对象](https://dataxapi.com/zh/docs/objects/advertiser/)、[Douyin trend-index creator metrics（巨量算数达人核心指标）对象](https://dataxapi.com/zh/docs/objects/index_creator_metrics/)、[Xingtu creator content keywords（星图达人内容热词）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_keywords/)、[Xingtu creator scores（星图达人指数）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_scores/)、[Xingtu creator content mix（星图达人内容分布）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_content_mix/)、[Xingtu creator conversion（星图达人转化能力）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_conversion/)、[Xingtu campaign（星图营销活动）对象](https://dataxapi.com/zh/docs/objects/xingtu_campaign/)、[Channels collection（视频号合集）对象](https://dataxapi.com/zh/docs/objects/channels_collection/)、[Channels share link（视频号分享链接）对象](https://dataxapi.com/zh/docs/objects/channels_share_link/)、[Topic（话题）对象](https://dataxapi.com/zh/docs/objects/topic/)、[Account owner（账号主体）对象](https://dataxapi.com/zh/docs/objects/account_owner/)、[Mini program（小程序）对象](https://dataxapi.com/zh/docs/objects/miniprogram/)、[Follower history（粉丝数变化）对象](https://dataxapi.com/zh/docs/objects/follower_history/)、[PGY creator costs and summary（蒲公英博主合作成本和数据概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_costs/)、[PGY creator follower summary（蒲公英博主粉丝概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_followers/)、[PGY creator core figures history（蒲公英博主核心数据趋势）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_cost_history/)

---

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/docs/objects/transcript/)

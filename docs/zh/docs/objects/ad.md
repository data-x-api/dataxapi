# Ad（广告）对象

4 个平台的 11 个接口都返回 Ad（广告）对象，14 个字段名完全一样，给一个平台写的代码不用改就能读其他平台。每次调用 $0.0020。它是预览结构，之后可能调整。

给机器读：[ad schema](https://dataxapi.com/openapi.json#/components/schemas/ad)、[openapi.json](https://dataxapi.com/openapi.json)、[对象表（JSON）](https://api.dataxapi.com/v1/catalog/objects)、[llms.txt](https://dataxapi.com/zh/llms.txt)

广告（Ad）是平台公开广告库，或 TikTok 创意中心的热门广告里列出的一条广告：素材形态、标题、文案、图片和视频、落地页、广告主，广告库里还有开始和最近投放的时间。标准字段里没有花了多少钱；展示量区间、互动数、定向，平台给的话放在 `ext`。

`advertiser` 是投这条广告的人，有编号的广告库还带 `id`；按名称查到的广告主可以列出它的广告。Meta 广告库里视频广告说的话，用逐字稿取。

## 字段

平台给不了的字段不会出现在这条数据里，而是写在 `meta.unavailable` 里。不会用猜的数或 0 顶上。

| 字段 | 类型 | 起始档位 | 说明 |
| --- | --- | --- | --- |
| `id` | 文本 | `compact` | 编号，可原样传给取广告详情的接口 |
| `url` | 链接 | `compact` | 这条广告在平台广告库里的页面 |
| `format` | 文本 | `compact` | 素材形态；other 是平台自己的其他形式：`video`、`image`、`carousel`、`text`、`other` |
| `title` | 文本 | `compact` | 标题 |
| `text` | 文本 | `compact` | 文案 |
| `landing_url` | 链接 | `standard` | 点击后去的地址 |
| `advertiser` | 对象 | `compact` | 广告主 |
| `advertiser.id` | 文本 | `compact` | 广告主编号 |
| `advertiser.name` | 文本 | `compact` | 广告主名称 |
| `advertiser.url` | 链接 | `standard` | 广告主在平台上的主页 |
| `advertiser.avatar_url` | 链接 | `standard` | 广告主的头像或标志 |
| `images` | 链接列表 | `standard` | 图片素材的地址 |
| `videos` | 链接列表 | `full` | 视频素材的地址，会过期 |
| `first_shown_at` | 时间 | `compact` | 开始投放的时间 |
| `last_shown_at` | 时间 | `compact` | 最近一次投放的时间；还在投的广告是平台最近一次看到它的时间 |

## 哪些平台给不了哪些字段

一个平台的所有接口都给不了某个字段时，它才列在那个字段后面。

| 字段 | 给不了的平台 |
| --- | --- |
| `advertiser.url` | Google 广告、TikTok |
| `advertiser.avatar_url` | Google 广告、TikTok |

同一个平台上，可能一个接口给不了、另一个接口能给：每个接口的页面列着它给不了的字段，每次返回也都写在 `meta.unavailable` 里。

## 返回 Ad（广告）的接口

### Google 广告

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Google 广告详情](https://dataxapi.com/zh/apis/google/ads/get.md) | `GET /v1/google/ads/get` | 广告 | $0.0020 / 次 |
| [Google 广告主的广告](https://dataxapi.com/zh/apis/google/advertisers/ads/list.md) | `GET /v1/google/advertisers/ads/list` | 广告列表 | $0.0020 / 次 |

### LinkedIn

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [LinkedIn 广告详情](https://dataxapi.com/zh/apis/linkedin/ads/get.md) | `GET /v1/linkedin/ads/get` | 广告 | $0.0020 / 次 |
| [LinkedIn 广告库搜索](https://dataxapi.com/zh/apis/linkedin/ads/search.md) | `GET /v1/linkedin/ads/search` | 广告列表 | $0.0020 / 次 |

### Meta 广告库

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Meta 广告详情](https://dataxapi.com/zh/apis/meta/ads/get.md) | `GET /v1/meta/ads/get` | 广告 | $0.0020 / 次 |
| [Meta 广告库搜索](https://dataxapi.com/zh/apis/meta/ads/search.md) | `GET /v1/meta/ads/search` | 广告列表 | $0.0020 / 次 |
| [Meta 广告主的广告](https://dataxapi.com/zh/apis/meta/advertisers/ads/list.md) | `GET /v1/meta/advertisers/ads/list` | 广告列表 | $0.0020 / 次 |

### TikTok

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [TikTok 广告库搜索](https://dataxapi.com/zh/apis/tiktok/ads/search.md) | `GET /v1/tiktok/ads/search` | 广告列表 | $0.0020 / 次 |
| [TikTok 广告库广告详情](https://dataxapi.com/zh/apis/tiktok/ads/get.md) | `GET /v1/tiktok/ads/get` | 广告 | $0.0020 / 次 |
| [TikTok 创意中心热门广告详情](https://dataxapi.com/zh/apis/tiktok/creative_center/ads/get.md) | `GET /v1/tiktok/creative_center/ads/get` | 广告 | $0.0020 / 次 |
| [TikTok 创意中心热门广告搜索](https://dataxapi.com/zh/apis/tiktok/creative_center/ads/search.md) | `GET /v1/tiktok/creative_center/ads/search` | 广告列表 | $0.0020 / 次 |

## 示例

`google.ads.get` 返回的一条，录制于 2026-10-12 21:59 UTC。名字、正文和编号是示例，链接也是；数字是原样。

```jsonc
{
  "id": "AR16957588921303948228/CR14623979096670259597",
  "url": "https://adstransparency.google.com/advertiser/AR16957588921303948228/creative/CR14623979096670259597",
  "format": "text",
  "title": "Weekend hiking essentials, 20% off this week only",
  "text": "Weekend hiking essentials, 20% off this week only",
  "landing_url": null,
  "advertiser": { "id": "AR12673385717193703136" },
  "images": [
    "https://tpc.googlesyndication.com/simgad/10334992425704947224",
    "https://tpc.googlesyndication.com/simgad/13598759742669398477",
    // … 另有 1 条
  ],
  "first_shown_at": "2024-05-06T00:00:00.000Z",
  "last_shown_at": "2026-10-12T21:34:42.000Z"
}
```

[完整的返回在这个接口的页面上 →](https://dataxapi.com/zh/apis/google/ads/get.md)

## 相关

- [广告详情 API](https://dataxapi.com/zh/roles/ads-get/): 同一种动作在 4 个平台上的接口，带各平台的字段对照。
- [广告库搜索 API](https://dataxapi.com/zh/roles/ads-search/): 同一种动作在 3 个平台上的接口，带各平台的字段对照。
- [广告主的广告 API](https://dataxapi.com/zh/roles/advertisers-ads-list/): 同一种动作在 2 个平台上的接口，带各平台的字段对照。
- [全部接口](https://dataxapi.com/zh/apis/): 目录里写明每个接口返回什么对象、多少钱。

## 其他对象

[Post（内容）对象](https://dataxapi.com/zh/docs/objects/post/)、[Comment（评论）对象](https://dataxapi.com/zh/docs/objects/comment/)、[Account（账号）对象](https://dataxapi.com/zh/docs/objects/account/)、[Trend（热点）对象](https://dataxapi.com/zh/docs/objects/trend/)、[Transcript（逐字稿）对象](https://dataxapi.com/zh/docs/objects/transcript/)、[Media files（视频和图片文件）对象](https://dataxapi.com/zh/docs/objects/media/)、[Music（音乐）对象](https://dataxapi.com/zh/docs/objects/music/)、[Creator rates（达人报价）对象](https://dataxapi.com/zh/docs/objects/creator_rates/)、[Community（社区）对象](https://dataxapi.com/zh/docs/objects/community/)、[Product（商品）对象](https://dataxapi.com/zh/docs/objects/product/)、[Review（评价）对象](https://dataxapi.com/zh/docs/objects/review/)、[Keyword index history（关键词指数历史）对象](https://dataxapi.com/zh/docs/objects/keyword_history/)、[Related keyword（关联词）对象](https://dataxapi.com/zh/docs/objects/keyword_related/)、[Keyword audience（关键词人群画像）对象](https://dataxapi.com/zh/docs/objects/keyword_audience/)、[Account recent change（账号近期变化）对象](https://dataxapi.com/zh/docs/objects/account_history/)、[Brand index history（品牌指数历史）对象](https://dataxapi.com/zh/docs/objects/brand_history/)、[Brand index averages（品牌指数均值）对象](https://dataxapi.com/zh/docs/objects/brand_metrics/)、[Creator（达人）对象](https://dataxapi.com/zh/docs/objects/creator/)、[Audience（粉丝画像）对象](https://dataxapi.com/zh/docs/objects/audience/)、[Xingtu creator metrics（星图达人传播数据）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_metrics/)、[Xingtu creator video（星图达人作品）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_post/)、[PGY creator metrics（蒲公英博主数据表现）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_metrics/)、[PGY creator note（蒲公英博主笔记）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_post/)、[PGY note detail（蒲公英笔记详情）对象](https://dataxapi.com/zh/docs/objects/pgy_note/)、[Advertiser（广告主）对象](https://dataxapi.com/zh/docs/objects/advertiser/)、[Douyin trend-index creator metrics（巨量算数达人核心指标）对象](https://dataxapi.com/zh/docs/objects/index_creator_metrics/)、[Xingtu creator content keywords（星图达人内容热词）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_keywords/)、[Xingtu creator scores（星图达人指数）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_scores/)、[Xingtu creator content mix（星图达人内容分布）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_content_mix/)、[Xingtu creator conversion（星图达人转化能力）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_conversion/)、[Xingtu campaign（星图营销活动）对象](https://dataxapi.com/zh/docs/objects/xingtu_campaign/)、[Channels collection（视频号合集）对象](https://dataxapi.com/zh/docs/objects/channels_collection/)、[Channels share link（视频号分享链接）对象](https://dataxapi.com/zh/docs/objects/channels_share_link/)、[Topic（话题）对象](https://dataxapi.com/zh/docs/objects/topic/)、[Account owner（账号主体）对象](https://dataxapi.com/zh/docs/objects/account_owner/)、[Mini program（小程序）对象](https://dataxapi.com/zh/docs/objects/miniprogram/)、[Follower history（粉丝数变化）对象](https://dataxapi.com/zh/docs/objects/follower_history/)、[PGY creator costs and summary（蒲公英博主合作成本和数据概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_costs/)、[PGY creator follower summary（蒲公英博主粉丝概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_followers/)、[PGY creator core figures history（蒲公英博主核心数据趋势）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_cost_history/)

---

最后核对于 2026-11-26 12:17 UTC。目录修订号 0051cce45e9530b9。 [网页版](https://dataxapi.com/zh/docs/objects/ad/)

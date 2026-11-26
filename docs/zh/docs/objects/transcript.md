# Transcript（逐字稿）对象

13 个平台的 13 个接口都返回 Transcript（逐字稿）对象，23 个字段名完全一样，给一个平台写的代码不用改就能读其他平台。每次调用 $0.0020 到 $0.0390。

给机器读：[transcript schema](https://dataxapi.com/openapi.json#/components/schemas/transcript)、[openapi.json](https://dataxapi.com/openapi.json)、[对象表（JSON）](https://api.dataxapi.com/v1/catalog/objects)、[llms.txt](https://dataxapi.com/zh/llms.txt)

逐字稿（Transcript）是一条视频里说的话，转成文字。TikTok、YouTube、Reddit 还按时间分段给 `segments`，每段带开始和结束的秒数 `start`、`end`；其他平台只给一整段文字。

它没有自己的编号：`post_id` 是它所属内容的编号，和取内容的接口用的是同一个。Meta 广告库里的视频属于一条广告，这时 `post_id` 是这条广告的广告库编号。

## 字段

平台给不了的字段不会出现在这条数据里，而是写在 `meta.unavailable` 里。不会用猜的数或 0 顶上。

| 字段 | 类型 | 起始档位 | 说明 |
| --- | --- | --- | --- |
| `post_id` | 文本 | `compact` | 所属内容的编号 |
| `status` | 文本 | `compact` | done 是文字已经在这里；processing 是长视频还在识别，文字还没有：过 retry_after_seconds 秒后带着 job 再调同一个接口取：`done`、`processing` |
| `job` | 文本 | `compact` | 长视频的凭证：带着它再调同一个接口取文字，提交后 24 小时内有效；只在 processing 时有 |
| `retry_after_seconds` | 整数 | `compact` | 建议多少秒后再来取；只在 processing 时有 |
| `lang` | 文本 | `compact` | 语言代码 |
| `text` | 文本 | `compact` | 全文 |
| `segments` | 对象列表 | `standard` | 带时间的分段 |
| `segments[].start` | 数字 | `standard` | 开始时间，秒 |
| `segments[].end` | 数字 | `standard` | 结束时间，秒 |
| `segments[].text` | 文本 | `standard` | 这一段的文字 |
| `segments[].speaker` | 文本 | `standard` | 这一段是谁说的（1、2…，同一个人同一个号）；没要求区分说话人时为 null |
| `segments[].words` | 对象列表 | `full` | 这一段里每个字（词）的时间 |
| `segments[].words[].start` | 数字 | `full` | 开始时间，秒 |
| `segments[].words[].end` | 数字 | `full` | 结束时间，秒 |
| `segments[].words[].text` | 文本 | `full` | 这个字（词） |
| `duration` | 数字 | `standard` | 转写的音视频时长，秒；按分钟计费的接口按它收费 |
| `post` | 对象 | `standard` | 这段话所在的内容：标题、文案、作者、时长、发布时间、点赞和评论数，平台有什么给什么 |
| `post.title` | 文本 | `standard` | 标题；没有标题的平台没有 |
| `post.text` | 文本 | `standard` | 文案或简介 |
| `post.url` | 链接 | `standard` | 内容的链接 |
| `post.published_at` | 时间 | `standard` | 发布时间 |
| `post.duration` | 数字 | `standard` | 平台写的视频时长，秒 |
| `post.author` | 对象 | `standard` | 作者 |
| `post.author.id` | 文本 | `standard` | 作者编号 |
| `post.author.name` | 文本 | `standard` | 作者的名字 |
| `post.metrics` | 对象 | `standard` | 互动数 |
| `post.metrics.likes` | 整数 | `standard` | 点赞数 |
| `post.metrics.comments` | 整数 | `standard` | 评论数 |

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
| `status` | Meta 广告库、Instagram、TikTok、YouTube、LinkedIn、Reddit、X（推特） |
| `job` | Meta 广告库、Instagram、TikTok、YouTube、LinkedIn、Reddit、X（推特） |
| `retry_after_seconds` | Meta 广告库、Instagram、TikTok、YouTube、LinkedIn、Reddit、X（推特） |
| `lang` | B站、抖音、快手、Meta 广告库、Instagram、TikTok、微博、LinkedIn、X（推特）、小红书、微信视频号 |
| `segments[].start` | Meta 广告库、Instagram、LinkedIn、X（推特） |
| `segments[].end` | Meta 广告库、Instagram、LinkedIn、X（推特） |
| `segments[].text` | Meta 广告库、Instagram、LinkedIn、X（推特） |
| `segments[].speaker` | Meta 广告库、Instagram、TikTok、YouTube、LinkedIn、Reddit、X（推特） |
| `segments[].words[].start` | Meta 广告库、Instagram、TikTok、YouTube、LinkedIn、Reddit、X（推特） |
| `segments[].words[].end` | Meta 广告库、Instagram、TikTok、YouTube、LinkedIn、Reddit、X（推特） |
| `segments[].words[].text` | Meta 广告库、Instagram、TikTok、YouTube、LinkedIn、Reddit、X（推特） |
| `duration` | Meta 广告库、Instagram、TikTok、YouTube、LinkedIn、Reddit、X（推特） |
| `post.title` | 快手、Meta 广告库、Instagram、TikTok、微博、YouTube、LinkedIn、Reddit、X（推特）、微信视频号 |
| `post.text` | Meta 广告库、Instagram、TikTok、YouTube、LinkedIn、Reddit、X（推特） |
| `post.url` | Meta 广告库、Instagram、TikTok、YouTube、LinkedIn、Reddit、X（推特）、微信视频号 |
| `post.published_at` | Meta 广告库、Instagram、TikTok、YouTube、LinkedIn、Reddit、X（推特） |
| `post.duration` | Meta 广告库、Instagram、TikTok、YouTube、LinkedIn、Reddit、X（推特） |
| `post.author.id` | Meta 广告库、Instagram、TikTok、YouTube、LinkedIn、Reddit、X（推特） |
| `post.author.name` | Meta 广告库、Instagram、TikTok、YouTube、LinkedIn、Reddit、X（推特） |
| `post.metrics.likes` | Meta 广告库、Instagram、TikTok、YouTube、LinkedIn、Reddit、X（推特） |
| `post.metrics.comments` | Meta 广告库、Instagram、TikTok、YouTube、LinkedIn、Reddit、X（推特） |

同一个平台上，可能一个接口给不了、另一个接口能给：每个接口的页面列着它给不了的字段，每次返回也都写在 `meta.unavailable` 里。

## 返回 Transcript（逐字稿）的接口

### B站

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [B站视频转文字（文案提取、逐字稿）](https://dataxapi.com/zh/apis/bilibili/videos/transcript/get.md) | `GET /v1/bilibili/videos/transcript/get` | 逐字稿 | $0.0040 / 次 |

### 抖音

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [抖音视频转文字（文案提取、逐字稿）](https://dataxapi.com/zh/apis/douyin/videos/transcript/get.md) | `GET /v1/douyin/videos/transcript/get` | 逐字稿 | $0.0020 / 次 |

### 快手

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [快手视频转文字（文案提取、逐字稿）](https://dataxapi.com/zh/apis/kuaishou/videos/transcript/get.md) | `GET /v1/kuaishou/videos/transcript/get` | 逐字稿 | $0.0020 / 次 |

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

### 微博

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [微博视频转文字（文案提取、逐字稿）](https://dataxapi.com/zh/apis/weibo/posts/transcript/get.md) | `GET /v1/weibo/posts/transcript/get` | 逐字稿 | $0.0020 / 次 |

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

### 小红书

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [小红书视频转文字（文案提取、逐字稿）](https://dataxapi.com/zh/apis/xiaohongshu/videos/transcript/get.md) | `GET /v1/xiaohongshu/videos/transcript/get` | 逐字稿 | $0.0200 / 次 |

### 微信视频号

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [视频号视频转文字（逐字稿）](https://dataxapi.com/zh/apis/wechat_channels/videos/transcript/get.md) | `GET /v1/wechat_channels/videos/transcript/get` | 逐字稿 | $0.0200 / 次 |

## 示例

`bilibili.videos.transcript.get` 返回的一条，录制于 2026-11-21 10:04 UTC。名字、正文和编号是示例，链接也是；数字是原样。

```jsonc
{
  "post_id": "BV1ocQZhyYDM",
  "status": "done",
  "text": "大家好，今天带大家看一下我这次周末露营带的东西。先说结论：轻、能装进一个包、不怕摔。下面一件一件说。",
  "segments": [
    {
      "start": 0.59,
      "end": 3.35,
      "text": "大家好，今天带大家看一下我这次周末露营带的东西。",
      "speaker": null
    },
    {
      "start": 3.55,
      "end": 5.15,
      "text": "先说结论：轻、能装进一个包、不怕摔。",
      "speaker": null
    },
    // … 另有 43 条
  ],
  "duration": 142.613,
  "post": {
    "title": "周末露营入门指南：一篇讲清楚",
    "text": "大家好，今天带大家看一下我这次周末露营带的东西。先说结论：轻、能装进一个包、不怕摔。下面一件一件说。",
    "url": "https://www.bilibili.com/video/216745778776",
    "published_at": "2026-09-16T03:30:00.000Z",
    "duration": 143,
    "author": { "id": "370998947", "name": "阿杰爱折腾" },
    "metrics": { "likes": 7530, "comments": 1073 }
  }
}
```

[完整的返回在这个接口的页面上 →](https://dataxapi.com/zh/apis/bilibili/videos/transcript/get.md)

## 相关

- [视频转文字 API](https://dataxapi.com/zh/roles/transcripts-get/): 同一种动作在 13 个平台上的接口，带各平台的字段对照。
- [全部接口](https://dataxapi.com/zh/apis/): 目录里写明每个接口返回什么对象、多少钱。

## 其他对象

[Post（内容）对象](https://dataxapi.com/zh/docs/objects/post/)、[Comment（评论）对象](https://dataxapi.com/zh/docs/objects/comment/)、[Account（账号）对象](https://dataxapi.com/zh/docs/objects/account/)、[Trend（热点）对象](https://dataxapi.com/zh/docs/objects/trend/)、[Media files（视频和图片文件）对象](https://dataxapi.com/zh/docs/objects/media/)、[Music（音乐）对象](https://dataxapi.com/zh/docs/objects/music/)、[Creator rates（达人报价）对象](https://dataxapi.com/zh/docs/objects/creator_rates/)、[Community（社区）对象](https://dataxapi.com/zh/docs/objects/community/)、[Product（商品）对象](https://dataxapi.com/zh/docs/objects/product/)、[Review（评价）对象](https://dataxapi.com/zh/docs/objects/review/)、[Keyword index history（关键词指数历史）对象](https://dataxapi.com/zh/docs/objects/keyword_history/)、[Related keyword（关联词）对象](https://dataxapi.com/zh/docs/objects/keyword_related/)、[Keyword audience（关键词人群画像）对象](https://dataxapi.com/zh/docs/objects/keyword_audience/)、[Account recent change（账号近期变化）对象](https://dataxapi.com/zh/docs/objects/account_history/)、[Brand index history（品牌指数历史）对象](https://dataxapi.com/zh/docs/objects/brand_history/)、[Brand index averages（品牌指数均值）对象](https://dataxapi.com/zh/docs/objects/brand_metrics/)、[Creator（达人）对象](https://dataxapi.com/zh/docs/objects/creator/)、[Audience（粉丝画像）对象](https://dataxapi.com/zh/docs/objects/audience/)、[Xingtu creator metrics（星图达人传播数据）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_metrics/)、[Xingtu creator video（星图达人作品）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_post/)、[PGY creator metrics（蒲公英博主数据表现）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_metrics/)、[PGY creator note（蒲公英博主笔记）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_post/)、[PGY note detail（蒲公英笔记详情）对象](https://dataxapi.com/zh/docs/objects/pgy_note/)、[Ad（广告）对象](https://dataxapi.com/zh/docs/objects/ad/)、[Advertiser（广告主）对象](https://dataxapi.com/zh/docs/objects/advertiser/)、[Douyin trend-index creator metrics（巨量算数达人核心指标）对象](https://dataxapi.com/zh/docs/objects/index_creator_metrics/)、[Xingtu creator content keywords（星图达人内容热词）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_keywords/)、[Xingtu creator scores（星图达人指数）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_scores/)、[Xingtu creator content mix（星图达人内容分布）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_content_mix/)、[Xingtu creator conversion（星图达人转化能力）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_conversion/)、[Xingtu campaign（星图营销活动）对象](https://dataxapi.com/zh/docs/objects/xingtu_campaign/)、[Channels collection（视频号合集）对象](https://dataxapi.com/zh/docs/objects/channels_collection/)、[Channels share link（视频号分享链接）对象](https://dataxapi.com/zh/docs/objects/channels_share_link/)、[Topic（话题）对象](https://dataxapi.com/zh/docs/objects/topic/)、[Account owner（账号主体）对象](https://dataxapi.com/zh/docs/objects/account_owner/)、[Mini program（小程序）对象](https://dataxapi.com/zh/docs/objects/miniprogram/)、[Follower history（粉丝数变化）对象](https://dataxapi.com/zh/docs/objects/follower_history/)、[PGY creator costs and summary（蒲公英博主合作成本和数据概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_costs/)、[PGY creator follower summary（蒲公英博主粉丝概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_followers/)、[PGY creator core figures history（蒲公英博主核心数据趋势）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_cost_history/)

---

最后核对于 2026-11-26 12:17 UTC。目录修订号 0051cce45e9530b9。 [网页版](https://dataxapi.com/zh/docs/objects/transcript/)

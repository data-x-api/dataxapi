# Media files（视频和图片文件）对象

8 个平台的 9 个接口都返回 Media files（视频和图片文件）对象，29 个字段名完全一样，给一个平台写的代码不用改就能读其他平台。每次调用 $0.0020 到 $0.0200。

给机器读：[media schema](https://dataxapi.com/openapi.json#/components/schemas/media)、[openapi.json](https://dataxapi.com/openapi.json)、[对象表（JSON）](https://api.dataxapi.com/v1/catalog/objects)、[llms.txt](https://dataxapi.com/zh/llms.txt)

## 字段

平台给不了的字段不会出现在这条数据里，而是写在 `meta.unavailable` 里。不会用猜的数或 0 顶上。

| 字段 | 类型 | 起始档位 | 说明 |
| --- | --- | --- | --- |
| `post_id` | 文本 | `compact` | 所属内容的编号，和详情接口的 id 是同一个 |
| `type` | 文本 | `compact` | 内容形态：video 视频，image 图文（图集）：`video`、`image` |
| `title` | 文本 | `compact` | 标题；平台没有单独标题的给文案 |
| `author` | 对象 | `compact` | 作者 |
| `author.id` | 文本 | `compact` | 作者的账号编号 |
| `author.name` | 文本 | `compact` | 作者的显示名 |
| `duration` | 数字 | `compact` | 视频时长，秒；图文没有 |
| `files` | 对象列表 | `compact` | 全部文件，每个一项：视频各档、音频、封面、每张图片、字幕 |
| `files[].kind` | 文本 | `compact` | 文件是什么：video 视频，audio 音频（背景音乐，或和画面分开给的音轨），cover 封面，image 图片，subtitle 字幕：`video`、`audio`、`cover`、`image`、`subtitle` |
| `files[].index` | 整数 | `compact` | 图片在帖子里的序号，从 1 起；别的文件为 null |
| `files[].quality` | 文本 | `compact` | 清晰度，平台的叫法或短边像素，如 720p、1080p；没有时为 null |
| `files[].width` | 整数 | `compact` | 宽，像素 |
| `files[].height` | 整数 | `compact` | 高，像素 |
| `files[].codec` | 文本 | `compact` | 编码，如 h264、h265、h266、av1、aac；抖音和 TikTok 自研的 BVC2 写作 bytevc2，不少播放器放不了，要通用格式就挑 h264 或 h265 那档；平台没说时为 null：`h264`、`h265`、`h266`、`av1`、`aac`、`bytevc2` |
| `files[].bitrate` | 整数 | `compact` | 码率，比特每秒 |
| `files[].size` | 整数 | `compact` | 文件大小，字节 |
| `files[].format` | 文本 | `compact` | 文件格式：mp4、m4s（B 站分开的音视频流）、mp3、m4a、jpeg、png、webp、heic、gif、kvif（快手的图片格式）、srt；地址里看不出时为 null：`mp4`、`m4s`、`mp3`、`m4a`、`jpeg`、`png`、`webp`、`heic`、`gif`、`kvif`、`srt` |
| `files[].duration` | 数字 | `compact` | 音频或视频文件的时长，秒 |
| `files[].title` | 文本 | `compact` | 背景音乐的名字；别的文件为 null |
| `files[].lang` | 文本 | `compact` | 字幕的语言代码，如 zh-CN、en-US |
| `files[].watermark` | 是否 | `compact` | 文件上有没有平台水印 |
| `files[].url` | 链接 | `compact` | 文件地址 |
| `files[].backup_urls` | 链接列表 | `standard` | 同一个文件的其他地址，主地址取不到时用 |
| `files[].expires_at` | 时间 | `compact` | 地址什么时候过期（按地址签名里写的时间）；签名里看不出时为 null。过期了再调一次接口拿新地址 |
| `files[].headers` | 对象 | `compact` | 取这个地址要带的请求头，键是小写的请求头名；不用带请求头的平台没有这个字段 |
| `files[].headers.referer` | 文本 | `compact` | 要带的 Referer |
| `files[].stable_url` | 链接 | `compact` | 平台的播放跳转地址：打开后跳到当时的文件地址，比 url 用得久；没有时为 null |
| `files[].live` | 对象 | `compact` | 实况图（Live Photo）的那段视频；不是实况图为 null |
| `files[].live.url` | 链接 | `compact` | 实况视频的地址 |
| `files[].live.duration` | 数字 | `compact` | 实况视频的时长，秒 |
| `decrypt` | 对象 | `compact` | 文件是加密的时候，怎么解密；不用解密时为 null |
| `decrypt.method` | 文本 | `compact` | 解密方法。isaac64_xor_head：用 key 作种子跑 ISAAC64 随机数，每个 64 位数按大端拆成 8 个字节，得到 bytes 个字节的密钥流，和文件开头逐字节异或，其余部分不动：`isaac64_xor_head` |
| `decrypt.key` | 文本 | `compact` | 密钥，只对同一次返回的地址有效 |
| `decrypt.bytes` | 整数 | `compact` | 文件开头加了密的字节数 |

## 哪些平台给不了哪些字段

一个平台的所有接口都给不了某个字段时，它才列在那个字段后面。

| 字段 | 给不了的平台 |
| --- | --- |
| `title` | B站 |
| `author.id` | B站 |
| `author.name` | B站 |
| `files[].index` | 微信视频号、B站 |
| `files[].quality` | Instagram |
| `files[].codec` | 快手、微信视频号、Instagram |
| `files[].bitrate` | 微信视频号、Instagram |
| `files[].size` | Instagram、B站 |
| `files[].duration` | B站 |
| `files[].title` | 小红书、快手、微博、微信视频号、Instagram、B站 |
| `files[].lang` | 抖音、快手、微博、微信视频号、TikTok、Instagram、B站 |
| `files[].watermark` | 快手、微信视频号、Instagram、B站 |
| `files[].backup_urls` | 微博、微信视频号、Instagram |
| `files[].expires_at` | 小红书、快手、微信视频号 |
| `files[].headers.referer` | 抖音、小红书、快手、微博、微信视频号、TikTok、Instagram |
| `files[].stable_url` | 小红书、快手、微博、微信视频号、TikTok、Instagram、B站 |
| `files[].live.url` | 快手、微博、微信视频号、TikTok、Instagram、B站 |
| `files[].live.duration` | 快手、微博、微信视频号、TikTok、Instagram、B站 |
| `decrypt.method` | 抖音、小红书、快手、微博、TikTok、Instagram、B站 |
| `decrypt.key` | 抖音、小红书、快手、微博、TikTok、Instagram、B站 |
| `decrypt.bytes` | 抖音、小红书、快手、微博、TikTok、Instagram、B站 |

同一个平台上，可能一个接口给不了、另一个接口能给：每个接口的页面列着它给不了的字段，每次返回也都写在 `meta.unavailable` 里。

## 返回 Media files（视频和图片文件）的接口

### 抖音

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [抖音无水印视频和图片下载地址](https://dataxapi.com/zh/apis/douyin/videos/media/get.md) | `GET /v1/douyin/videos/media/get` | 视频和图片文件 | $0.0020 / 次 |

### 小红书

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [小红书无水印原图和实况图下载地址](https://dataxapi.com/zh/apis/xiaohongshu/notes/media/get.md) | `GET /v1/xiaohongshu/notes/media/get` | 视频和图片文件 | $0.0200 / 次 |
| [小红书无水印视频下载地址（各档清晰度和字幕）](https://dataxapi.com/zh/apis/xiaohongshu/videos/media/get.md) | `GET /v1/xiaohongshu/videos/media/get` | 视频和图片文件 | $0.0200 / 次 |

### 快手

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [快手视频和图集下载地址](https://dataxapi.com/zh/apis/kuaishou/videos/media/get.md) | `GET /v1/kuaishou/videos/media/get` | 视频和图片文件 | $0.0020 / 次 |

### 微博

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [微博视频和图片下载地址](https://dataxapi.com/zh/apis/weibo/posts/media/get.md) | `GET /v1/weibo/posts/media/get` | 视频和图片文件 | $0.0020 / 次 |

### 微信视频号

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [视频号视频下载（文件地址和解密）](https://dataxapi.com/zh/apis/wechat_channels/videos/media/get.md) | `GET /v1/wechat_channels/videos/media/get` | 视频和图片文件 | $0.0200 / 次 |

### TikTok

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [TikTok 无水印视频下载地址](https://dataxapi.com/zh/apis/tiktok/videos/media/get.md) | `GET /v1/tiktok/videos/media/get` | 视频和图片文件 | $0.0020 / 次 |

### Instagram

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Instagram 视频和图片下载地址](https://dataxapi.com/zh/apis/instagram/posts/media/get.md) | `GET /v1/instagram/posts/media/get` | 视频和图片文件 | $0.0020 / 次 |

### B站

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [B 站视频和音频下载地址](https://dataxapi.com/zh/apis/bilibili/videos/media/get.md) | `GET /v1/bilibili/videos/media/get` | 视频和图片文件 | $0.0020 / 次 |

## 示例

`douyin.videos.media.get` 返回的一条，录制于 2026-10-12 18:41 UTC。名字、正文和编号是示例，链接也是；数字是原样。

```jsonc
{
  "post_id": "7833109286609086520",
  "type": "video",
  "title": "关于周末露营，我踩过的五个坑",
  "author": {
    "id": "MS4wLjABAAAAym-ezULCocGd6O4LOtyemCC70xSavR-Fz9TkEy9fr5y",
    "name": "一颗柠檬糖"
  },
  "duration": 17.62,
  "files": [
    {
      "kind": "video",
      "index": null,
      "quality": "720p",
      "width": 720,
      "height": 1280,
      "codec": "bytevc2",
      "bitrate": 660528,
      "size": 1454980,
      "format": "mp4",
      "duration": 17.62,
      "title": null,
      "watermark": false,
      "url": "https://www.douyin.com/video/7532013836158439430",
      "backup_urls": ["https://www.douyin.com/video/7103843412149753325"],
      "expires_at": "2026-10-12T23:42:12.000Z",
      "stable_url": "https://www.douyin.com/video/7379017266167968009",
      "live": null
    },
    {
      "kind": "video",
      "index": null,
      "quality": "720p",
      "width": 720,
      "height": 1280,
      "codec": "bytevc2",
      "bitrate": 560639,
      "size": 1234949,
      "format": "mp4",
      "duration": 17.62,
      "title": null,
      "watermark": false,
      "url": "https://www.douyin.com/video/7218692493584648804",
      "backup_urls": ["https://www.douyin.com/video/7806649436349130471"],
      "expires_at": "2026-10-12T23:42:12.000Z",
      "stable_url": "https://www.douyin.com/video/7069581524645027774",
      "live": null
    },
    // … 另有 6 条
  ]
}
```

[完整的返回在这个接口的页面上 →](https://dataxapi.com/zh/apis/douyin/videos/media/get.md)

## 相关

- [视频和图片文件 API](https://dataxapi.com/zh/roles/media-get/): 同一种动作在 8 个平台上的接口，带各平台的字段对照。
- [全部接口](https://dataxapi.com/zh/apis/): 目录里写明每个接口返回什么对象、多少钱。

## 其他对象

[Post（内容）对象](https://dataxapi.com/zh/docs/objects/post/)、[Comment（评论）对象](https://dataxapi.com/zh/docs/objects/comment/)、[Account（账号）对象](https://dataxapi.com/zh/docs/objects/account/)、[Trend（热点）对象](https://dataxapi.com/zh/docs/objects/trend/)、[Transcript（逐字稿）对象](https://dataxapi.com/zh/docs/objects/transcript/)、[Music（音乐）对象](https://dataxapi.com/zh/docs/objects/music/)、[Creator rates（达人报价）对象](https://dataxapi.com/zh/docs/objects/creator_rates/)、[Community（社区）对象](https://dataxapi.com/zh/docs/objects/community/)、[Product（商品）对象](https://dataxapi.com/zh/docs/objects/product/)、[Review（评价）对象](https://dataxapi.com/zh/docs/objects/review/)、[Keyword index history（关键词指数历史）对象](https://dataxapi.com/zh/docs/objects/keyword_history/)、[Related keyword（关联词）对象](https://dataxapi.com/zh/docs/objects/keyword_related/)、[Keyword audience（关键词人群画像）对象](https://dataxapi.com/zh/docs/objects/keyword_audience/)、[Account recent change（账号近期变化）对象](https://dataxapi.com/zh/docs/objects/account_history/)、[Brand index history（品牌指数历史）对象](https://dataxapi.com/zh/docs/objects/brand_history/)、[Brand index averages（品牌指数均值）对象](https://dataxapi.com/zh/docs/objects/brand_metrics/)、[Creator（达人）对象](https://dataxapi.com/zh/docs/objects/creator/)、[Audience（粉丝画像）对象](https://dataxapi.com/zh/docs/objects/audience/)、[Xingtu creator metrics（星图达人传播数据）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_metrics/)、[Xingtu creator video（星图达人作品）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_post/)、[PGY creator metrics（蒲公英博主数据表现）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_metrics/)、[PGY creator note（蒲公英博主笔记）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_post/)、[PGY note detail（蒲公英笔记详情）对象](https://dataxapi.com/zh/docs/objects/pgy_note/)、[Ad（广告）对象](https://dataxapi.com/zh/docs/objects/ad/)、[Advertiser（广告主）对象](https://dataxapi.com/zh/docs/objects/advertiser/)、[Douyin trend-index creator metrics（巨量算数达人核心指标）对象](https://dataxapi.com/zh/docs/objects/index_creator_metrics/)、[Xingtu creator content keywords（星图达人内容热词）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_keywords/)、[Xingtu creator scores（星图达人指数）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_scores/)、[Xingtu creator content mix（星图达人内容分布）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_content_mix/)、[Xingtu creator conversion（星图达人转化能力）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_conversion/)、[Xingtu campaign（星图营销活动）对象](https://dataxapi.com/zh/docs/objects/xingtu_campaign/)、[Channels collection（视频号合集）对象](https://dataxapi.com/zh/docs/objects/channels_collection/)、[Channels share link（视频号分享链接）对象](https://dataxapi.com/zh/docs/objects/channels_share_link/)、[Topic（话题）对象](https://dataxapi.com/zh/docs/objects/topic/)、[Account owner（账号主体）对象](https://dataxapi.com/zh/docs/objects/account_owner/)、[Mini program（小程序）对象](https://dataxapi.com/zh/docs/objects/miniprogram/)、[Follower history（粉丝数变化）对象](https://dataxapi.com/zh/docs/objects/follower_history/)、[PGY creator costs and summary（蒲公英博主合作成本和数据概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_costs/)、[PGY creator follower summary（蒲公英博主粉丝概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_followers/)、[PGY creator core figures history（蒲公英博主核心数据趋势）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_cost_history/)

---

最后核对于 2026-11-26 12:17 UTC。目录修订号 0051cce45e9530b9。 [网页版](https://dataxapi.com/zh/docs/objects/media/)

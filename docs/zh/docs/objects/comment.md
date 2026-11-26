# Comment（评论）对象

13 个平台的 24 个接口都返回 Comment（评论）对象，13 个字段名完全一样，给一个平台写的代码不用改就能读其他平台。每次调用 $0.0020 到 $0.0200。

给机器读：[comment schema](https://dataxapi.com/openapi.json#/components/schemas/comment)、[openapi.json](https://dataxapi.com/openapi.json)、[对象表（JSON）](https://api.dataxapi.com/v1/catalog/objects)、[llms.txt](https://dataxapi.com/zh/llms.txt)

评论（Comment）是有人在一条内容下面写的话：正文、评论者、时间、点赞数和回复数。回复评论的也是评论，用各平台的评论回复接口读。

`post_id` 是它所在的那条内容；`parent_id` 是它直接回复的那条评论，`root_id` 是所在回复串的一级评论，一级评论这两个都是 `null`。这几个字段和 `author`、`text`、`metrics` 跟内容对象同名同位，所以 X 的回复虽然按内容返回，当评论读也读得通；买家对商品的评价是另一个对象“评价”，不是评论。

## 字段

平台给不了的字段不会出现在这条数据里，而是写在 `meta.unavailable` 里。不会用猜的数或 0 顶上。

| 字段 | 类型 | 起始档位 | 说明 |
| --- | --- | --- | --- |
| `id` | 文本 | `compact` | 编号 |
| `url` | 链接 | `compact` | 能直接打开的链接 |
| `text` | 文本 | `compact` | 正文 |
| `published_at` | 时间 | `compact` | 发布时间 |
| `author` | 对象 | `compact` | 评论者 |
| `author.id` | 文本 | `compact` | 评论者的账号编号 |
| `author.username` | 文本 | `compact` | 评论者的账号名 |
| `author.name` | 文本 | `compact` | 评论者的显示名 |
| `author.avatar_url` | 链接 | `standard` | 评论者头像 |
| `metrics` | 对象 | `compact` | 互动数 |
| `metrics.likes` | 整数 | `compact` | 点赞数 |
| `metrics.comments` | 整数 | `compact` | 回复数 |
| `post_id` | 文本 | `compact` | 所属内容的编号 |
| `parent_id` | 文本 | `compact` | 它直接回复的那条评论的编号；一级评论为 null |
| `root_id` | 文本 | `compact` | 所在回复串的一级评论编号；一级评论为 null |

## 每个数取的是平台上的哪个数

同一个字段名，在不同平台上对应的动作不完全一样。这张表写明这个字段取的是平台自己的哪个数。

| 字段 | 在那里是什么 | 平台 |
| --- | --- | --- |
| `metrics.likes` | 全部心情（赞、大爱、哈哈等）的总数 | Facebook |
| `metrics.likes` | 点赞数；一千以上平台只显示约数 | YouTube |

## 哪些平台给不了哪些字段

一个平台的所有接口都给不了某个字段时，它才列在那个字段后面。

| 字段 | 给不了的平台 |
| --- | --- |
| `url` | 抖音、B站、快手、Facebook、Instagram、TikTok、微博、小红书、YouTube、微信视频号、微信公众号、知乎 |
| `published_at` | YouTube |
| `author.username` | 快手、Facebook、微博、微信视频号、微信公众号 |
| `author.name` | Instagram、Reddit |
| `metrics.likes` | Reddit |
| `metrics.comments` | 快手、Instagram、微信视频号 |
| `post_id` | 快手、Instagram、YouTube、微信公众号、知乎 |
| `parent_id` | Facebook |
| `root_id` | Facebook |

同一个平台上，可能一个接口给不了、另一个接口能给：每个接口的页面列着它给不了的字段，每次返回也都写在 `meta.unavailable` 里。

## 返回 Comment（评论）的接口

### 抖音

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [抖音评论回复](https://dataxapi.com/zh/apis/douyin/comments/replies/list.md) | `GET /v1/douyin/comments/replies/list` | 评论列表 | $0.0020 / 次 |
| [抖音视频评论](https://dataxapi.com/zh/apis/douyin/videos/comments/list.md) | `GET /v1/douyin/videos/comments/list` | 评论列表 | $0.0020 / 次 |

### B站

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [B站评论回复](https://dataxapi.com/zh/apis/bilibili/comments/replies/list.md) | `GET /v1/bilibili/comments/replies/list` | 评论列表 | $0.0020 / 次 |
| [B站视频评论](https://dataxapi.com/zh/apis/bilibili/videos/comments/list.md) | `GET /v1/bilibili/videos/comments/list` | 评论列表 | $0.0020 / 次 |

### 快手

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [快手评论回复](https://dataxapi.com/zh/apis/kuaishou/comments/replies/list.md) | `GET /v1/kuaishou/comments/replies/list` | 评论列表 | $0.0020 / 次 |
| [快手作品评论](https://dataxapi.com/zh/apis/kuaishou/videos/comments/list.md) | `GET /v1/kuaishou/videos/comments/list` | 评论列表 | $0.0020 / 次 |

### Facebook

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Facebook 帖子评论](https://dataxapi.com/zh/apis/facebook/posts/comments/list.md) | `GET /v1/facebook/posts/comments/list` | 评论列表 | $0.0020 / 次 |

### Instagram

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Instagram 评论回复](https://dataxapi.com/zh/apis/instagram/comments/replies/list.md) | `GET /v1/instagram/comments/replies/list` | 评论列表 | $0.0020 / 次 |
| [Instagram 帖子评论](https://dataxapi.com/zh/apis/instagram/posts/comments/list.md) | `GET /v1/instagram/posts/comments/list` | 评论列表 | $0.0020 / 次 |

### TikTok

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [TikTok 评论回复](https://dataxapi.com/zh/apis/tiktok/comments/replies/list.md) | `GET /v1/tiktok/comments/replies/list` | 评论列表 | $0.0020 / 次 |
| [TikTok 视频评论](https://dataxapi.com/zh/apis/tiktok/videos/comments/list.md) | `GET /v1/tiktok/videos/comments/list` | 评论列表 | $0.0020 / 次 |

### 微博

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [微博评论回复](https://dataxapi.com/zh/apis/weibo/comments/replies/list.md) | `GET /v1/weibo/comments/replies/list` | 评论列表 | $0.0020 / 次 |
| [微博评论](https://dataxapi.com/zh/apis/weibo/posts/comments/list.md) | `GET /v1/weibo/posts/comments/list` | 评论列表 | $0.0020 / 次 |

### 小红书

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [小红书评论回复](https://dataxapi.com/zh/apis/xiaohongshu/comments/replies/list.md) | `GET /v1/xiaohongshu/comments/replies/list` | 评论列表 | $0.0200 / 次 |
| [小红书笔记评论](https://dataxapi.com/zh/apis/xiaohongshu/notes/comments/list.md) | `GET /v1/xiaohongshu/notes/comments/list` | 评论列表 | $0.0200 / 次 |

### YouTube

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [YouTube 评论回复](https://dataxapi.com/zh/apis/youtube/comments/replies/list.md) | `GET /v1/youtube/comments/replies/list` | 评论列表 | $0.0020 / 次 |
| [YouTube 视频评论](https://dataxapi.com/zh/apis/youtube/videos/comments/list.md) | `GET /v1/youtube/videos/comments/list` | 评论列表 | $0.0020 / 次 |

### 微信视频号

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [微信视频号作品评论](https://dataxapi.com/zh/apis/wechat_channels/videos/comments/list.md) | `GET /v1/wechat_channels/videos/comments/list` | 评论列表 | $0.0200 / 次 |
| [微信视频号评论回复](https://dataxapi.com/zh/apis/wechat_channels/comments/replies/list.md) | `GET /v1/wechat_channels/comments/replies/list` | 评论列表 | $0.0150 / 次 |

### 微信公众号

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [微信公众号文章评论](https://dataxapi.com/zh/apis/wechat_mp/articles/comments/list.md) | `GET /v1/wechat_mp/articles/comments/list` | 评论列表 | $0.0200 / 次 |
| [微信公众号评论回复](https://dataxapi.com/zh/apis/wechat_mp/comments/replies/list.md) | `GET /v1/wechat_mp/comments/replies/list` | 评论列表 | $0.0200 / 次 |

### Reddit

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Reddit 帖子评论](https://dataxapi.com/zh/apis/reddit/posts/comments/list.md) | `GET /v1/reddit/posts/comments/list` | 评论列表 | $0.0020 / 次 |

### 知乎

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [知乎回答评论](https://dataxapi.com/zh/apis/zhihu/answers/comments/list.md) | `GET /v1/zhihu/answers/comments/list` | 评论列表 | $0.0020 / 次 |
| [知乎评论回复](https://dataxapi.com/zh/apis/zhihu/comments/replies/list.md) | `GET /v1/zhihu/comments/replies/list` | 评论列表 | $0.0020 / 次 |

## 示例

`douyin.comments.replies.list` 返回的一条，录制于 2026-10-12 18:59 UTC。名字、正文和编号是示例，链接也是；数字是原样。

```jsonc
{
  "id": "7281542808761380598",
  "text": "第三个建议太实用了！",
  "published_at": "2026-06-26T11:50:22.000Z",
  "author": {
    "id": "MS4wLjABAAAA_p_ZcarAlfQSUXheWfou6Urggj6nSw5RWztBuPbTGeE",
    "username": "nanfeng_0721",
    "name": "南边的风",
    "avatar_url": "https://p3-pc.douyinpic.com/aweme/100x100/aweme-avatar/tos-cn-avt-0015_40a6ed26a1d5485803fe.jpeg"
  },
  "metrics": { "likes": 2308 },
  "post_id": "7235042234252823683",
  "parent_id": "7808984148800124107",
  "root_id": "7288185174927937448"
}
```

[完整的返回在这个接口的页面上 →](https://dataxapi.com/zh/apis/douyin/comments/replies/list.md)

## 相关

- [评论 API](https://dataxapi.com/zh/roles/posts-comments-list/): 同一种动作在 13 个平台上的接口，带各平台的字段对照。
- [评论回复 API](https://dataxapi.com/zh/roles/comments-replies-list/): 同一种动作在 10 个平台上的接口，带各平台的字段对照。
- [全部接口](https://dataxapi.com/zh/apis/): 目录里写明每个接口返回什么对象、多少钱。

## 其他对象

[Post（内容）对象](https://dataxapi.com/zh/docs/objects/post/)、[Account（账号）对象](https://dataxapi.com/zh/docs/objects/account/)、[Trend（热点）对象](https://dataxapi.com/zh/docs/objects/trend/)、[Transcript（逐字稿）对象](https://dataxapi.com/zh/docs/objects/transcript/)、[Media files（视频和图片文件）对象](https://dataxapi.com/zh/docs/objects/media/)、[Music（音乐）对象](https://dataxapi.com/zh/docs/objects/music/)、[Creator rates（达人报价）对象](https://dataxapi.com/zh/docs/objects/creator_rates/)、[Community（社区）对象](https://dataxapi.com/zh/docs/objects/community/)、[Product（商品）对象](https://dataxapi.com/zh/docs/objects/product/)、[Review（评价）对象](https://dataxapi.com/zh/docs/objects/review/)、[Keyword index history（关键词指数历史）对象](https://dataxapi.com/zh/docs/objects/keyword_history/)、[Related keyword（关联词）对象](https://dataxapi.com/zh/docs/objects/keyword_related/)、[Keyword audience（关键词人群画像）对象](https://dataxapi.com/zh/docs/objects/keyword_audience/)、[Account recent change（账号近期变化）对象](https://dataxapi.com/zh/docs/objects/account_history/)、[Brand index history（品牌指数历史）对象](https://dataxapi.com/zh/docs/objects/brand_history/)、[Brand index averages（品牌指数均值）对象](https://dataxapi.com/zh/docs/objects/brand_metrics/)、[Creator（达人）对象](https://dataxapi.com/zh/docs/objects/creator/)、[Audience（粉丝画像）对象](https://dataxapi.com/zh/docs/objects/audience/)、[Xingtu creator metrics（星图达人传播数据）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_metrics/)、[Xingtu creator video（星图达人作品）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_post/)、[PGY creator metrics（蒲公英博主数据表现）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_metrics/)、[PGY creator note（蒲公英博主笔记）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_post/)、[PGY note detail（蒲公英笔记详情）对象](https://dataxapi.com/zh/docs/objects/pgy_note/)、[Ad（广告）对象](https://dataxapi.com/zh/docs/objects/ad/)、[Advertiser（广告主）对象](https://dataxapi.com/zh/docs/objects/advertiser/)、[Douyin trend-index creator metrics（巨量算数达人核心指标）对象](https://dataxapi.com/zh/docs/objects/index_creator_metrics/)、[Xingtu creator content keywords（星图达人内容热词）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_keywords/)、[Xingtu creator scores（星图达人指数）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_scores/)、[Xingtu creator content mix（星图达人内容分布）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_content_mix/)、[Xingtu creator conversion（星图达人转化能力）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_conversion/)、[Xingtu campaign（星图营销活动）对象](https://dataxapi.com/zh/docs/objects/xingtu_campaign/)、[Channels collection（视频号合集）对象](https://dataxapi.com/zh/docs/objects/channels_collection/)、[Channels share link（视频号分享链接）对象](https://dataxapi.com/zh/docs/objects/channels_share_link/)、[Topic（话题）对象](https://dataxapi.com/zh/docs/objects/topic/)、[Account owner（账号主体）对象](https://dataxapi.com/zh/docs/objects/account_owner/)、[Mini program（小程序）对象](https://dataxapi.com/zh/docs/objects/miniprogram/)、[Follower history（粉丝数变化）对象](https://dataxapi.com/zh/docs/objects/follower_history/)、[PGY creator costs and summary（蒲公英博主合作成本和数据概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_costs/)、[PGY creator follower summary（蒲公英博主粉丝概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_followers/)、[PGY creator core figures history（蒲公英博主核心数据趋势）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_cost_history/)

---

最后核对于 2026-11-26 12:17 UTC。目录修订号 0051cce45e9530b9。 [网页版](https://dataxapi.com/zh/docs/objects/comment/)

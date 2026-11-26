# Creator（达人）对象

2 个平台的 5 个接口都返回 Creator（达人）对象，9 个字段名完全一样，给一个平台写的代码不用改就能读其他平台。每次调用 $0.0040 到 $0.0400。它是预览结构，之后可能调整。

给机器读：[creator schema](https://dataxapi.com/openapi.json#/components/schemas/creator)、[openapi.json](https://dataxapi.com/openapi.json)、[对象表（JSON）](https://api.dataxapi.com/v1/catalog/objects)、[llms.txt](https://dataxapi.com/zh/llms.txt)

达人（Creator）是平台官方的商业合作平台上列出的一位达人：抖音的星图，或小红书的蒲公英。它带这个平台给达人的编号 `id`、昵称、所在地、内容类目和粉丝数；完整档里，各平台的报价和数据放在 `ext`。

它不是账号：`account_id` 指向达人的平台账号，可以传给同平台的账号接口。它的 `id` 是这个平台其他接口要用的编号，达人报价、粉丝画像，以及星图、蒲公英的各项数据、作品和笔记都用它。

## 字段

平台给不了的字段不会出现在这条数据里，而是写在 `meta.unavailable` 里。不会用猜的数或 0 顶上。

| 字段 | 类型 | 起始档位 | 说明 |
| --- | --- | --- | --- |
| `id` | 文本 | `compact` | 达人在这个营销市场里的编号 |
| `account_id` | 文本 | `compact` | 这位达人的平台账号编号，可传给同平台的账号接口 |
| `username` | 文本 | `compact` | 账号名 |
| `name` | 文本 | `compact` | 显示名 |
| `avatar_url` | 链接 | `standard` | 头像 |
| `location` | 文本 | `standard` | 所在地，平台的原话 |
| `categories` | 文本列表 | `compact` | 内容类目（一级），平台的原话 |
| `subcategories` | 文本列表 | `standard` | 内容类目（二级），平台的原话 |
| `metrics` | 对象 | `compact` | 达人的数字 |
| `metrics.followers` | 整数 | `compact` | 粉丝数 |

## 返回 Creator（达人）的接口

### 抖音

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [抖音星图达人搜索](https://dataxapi.com/zh/apis/douyin/xingtu/creators/search.md) | `GET /v1/douyin/xingtu/creators/search` | 达人列表 | $0.0040 / 次 |
| [抖音星图达人资料](https://dataxapi.com/zh/apis/douyin/xingtu/creators/get.md) | `GET /v1/douyin/xingtu/creators/get` | 达人 | $0.0040 / 次 |

### 小红书

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [小红书蒲公英博主搜索](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/search.md) | `GET /v1/xiaohongshu/pgy/creators/search` | 达人列表 | $0.0400 / 次 |
| [小红书蒲公英博主详情](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/get.md) | `GET /v1/xiaohongshu/pgy/creators/get` | 达人 | $0.0400 / 次 |
| [小红书蒲公英相似博主](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/related.md) | `GET /v1/xiaohongshu/pgy/creators/related` | 达人列表 | $0.0400 / 次 |

## 示例

`douyin.xingtu.creators.search` 返回的一条，录制于 2026-10-12 22:06 UTC。名字、正文和编号是示例，链接也是；数字是原样。

```jsonc
{
  "id": "6811001738597474041",
  "name": "橘子汽水不加冰",
  "avatar_url": "https://p3-pc.douyinpic.com/aweme/100x100/aweme-avatar/tos-cn-avt-0015_49724ca5b7a50c72cbe5.jpeg",
  "location": "北京",
  "categories": ["户外"],
  "subcategories": ["家居好物"],
  "metrics": { "followers": 48169 }
}
```

[完整的返回在这个接口的页面上 →](https://dataxapi.com/zh/apis/douyin/xingtu/creators/search.md)

## 相关

- [达人搜索 API](https://dataxapi.com/zh/roles/creators-search/): 同一种动作在 2 个平台上的接口，带各平台的字段对照。
- [达人资料 API](https://dataxapi.com/zh/roles/creators-get/): 同一种动作在 2 个平台上的接口，带各平台的字段对照。
- [全部接口](https://dataxapi.com/zh/apis/): 目录里写明每个接口返回什么对象、多少钱。

## 其他对象

[Post（内容）对象](https://dataxapi.com/zh/docs/objects/post/)、[Comment（评论）对象](https://dataxapi.com/zh/docs/objects/comment/)、[Account（账号）对象](https://dataxapi.com/zh/docs/objects/account/)、[Trend（热点）对象](https://dataxapi.com/zh/docs/objects/trend/)、[Transcript（逐字稿）对象](https://dataxapi.com/zh/docs/objects/transcript/)、[Media files（视频和图片文件）对象](https://dataxapi.com/zh/docs/objects/media/)、[Music（音乐）对象](https://dataxapi.com/zh/docs/objects/music/)、[Creator rates（达人报价）对象](https://dataxapi.com/zh/docs/objects/creator_rates/)、[Community（社区）对象](https://dataxapi.com/zh/docs/objects/community/)、[Product（商品）对象](https://dataxapi.com/zh/docs/objects/product/)、[Review（评价）对象](https://dataxapi.com/zh/docs/objects/review/)、[Keyword index history（关键词指数历史）对象](https://dataxapi.com/zh/docs/objects/keyword_history/)、[Related keyword（关联词）对象](https://dataxapi.com/zh/docs/objects/keyword_related/)、[Keyword audience（关键词人群画像）对象](https://dataxapi.com/zh/docs/objects/keyword_audience/)、[Account recent change（账号近期变化）对象](https://dataxapi.com/zh/docs/objects/account_history/)、[Brand index history（品牌指数历史）对象](https://dataxapi.com/zh/docs/objects/brand_history/)、[Brand index averages（品牌指数均值）对象](https://dataxapi.com/zh/docs/objects/brand_metrics/)、[Audience（粉丝画像）对象](https://dataxapi.com/zh/docs/objects/audience/)、[Xingtu creator metrics（星图达人传播数据）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_metrics/)、[Xingtu creator video（星图达人作品）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_post/)、[PGY creator metrics（蒲公英博主数据表现）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_metrics/)、[PGY creator note（蒲公英博主笔记）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_post/)、[PGY note detail（蒲公英笔记详情）对象](https://dataxapi.com/zh/docs/objects/pgy_note/)、[Ad（广告）对象](https://dataxapi.com/zh/docs/objects/ad/)、[Advertiser（广告主）对象](https://dataxapi.com/zh/docs/objects/advertiser/)、[Douyin trend-index creator metrics（巨量算数达人核心指标）对象](https://dataxapi.com/zh/docs/objects/index_creator_metrics/)、[Xingtu creator content keywords（星图达人内容热词）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_keywords/)、[Xingtu creator scores（星图达人指数）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_scores/)、[Xingtu creator content mix（星图达人内容分布）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_content_mix/)、[Xingtu creator conversion（星图达人转化能力）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_conversion/)、[Xingtu campaign（星图营销活动）对象](https://dataxapi.com/zh/docs/objects/xingtu_campaign/)、[Channels collection（视频号合集）对象](https://dataxapi.com/zh/docs/objects/channels_collection/)、[Channels share link（视频号分享链接）对象](https://dataxapi.com/zh/docs/objects/channels_share_link/)、[Topic（话题）对象](https://dataxapi.com/zh/docs/objects/topic/)、[Account owner（账号主体）对象](https://dataxapi.com/zh/docs/objects/account_owner/)、[Mini program（小程序）对象](https://dataxapi.com/zh/docs/objects/miniprogram/)、[Follower history（粉丝数变化）对象](https://dataxapi.com/zh/docs/objects/follower_history/)、[PGY creator costs and summary（蒲公英博主合作成本和数据概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_costs/)、[PGY creator follower summary（蒲公英博主粉丝概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_followers/)、[PGY creator core figures history（蒲公英博主核心数据趋势）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_cost_history/)

---

最后核对于 2026-11-26 12:17 UTC。目录修订号 0051cce45e9530b9。 [网页版](https://dataxapi.com/zh/docs/objects/creator/)

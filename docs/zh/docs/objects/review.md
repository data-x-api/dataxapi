# Review（评价）对象

2 个平台的 2 个接口都返回 Review（评价）对象，10 个字段名完全一样，给一个平台写的代码不用改就能读其他平台。每次调用 $0.0020 到 $0.0200。它是预览结构，之后可能调整。

给机器读：[review schema](https://dataxapi.com/openapi.json#/components/schemas/review)、[openapi.json](https://dataxapi.com/openapi.json)、[对象表（JSON）](https://api.dataxapi.com/v1/catalog/objects)、[llms.txt](https://dataxapi.com/zh/llms.txt)

评价（Review）是买家对一件商品写的话和打的分（`rating`，满分 5），带买的是哪个规格和晒的图。只打分没写字的评价，`text` 为 `null`。

它挂在商品下面，不是挂在内容下面：TikTok Shop 的评价用 `product_id` 写明是哪件商品，小红书的评价不带商品编号，自己记住请求时用的那个。它也不是评论：评论挂在内容下面，没有评分。

## 字段

平台给不了的字段不会出现在这条数据里，而是写在 `meta.unavailable` 里。不会用猜的数或 0 顶上。

| 字段 | 类型 | 起始档位 | 说明 |
| --- | --- | --- | --- |
| `id` | 文本 | `compact` | 编号 |
| `product_id` | 文本 | `compact` | 所评商品的编号 |
| `text` | 文本 | `compact` | 评价正文；只打分没写字的评价为 null |
| `rating` | 数字 | `compact` | 买家给商品的评分，满分 5 |
| `published_at` | 时间 | `compact` | 评价时间 |
| `author` | 对象 | `compact` | 评价者 |
| `author.id` | 文本 | `compact` | 评价者的账号编号 |
| `author.name` | 文本 | `compact` | 评价者的显示名，按平台展示的样子（可能已打码） |
| `author.avatar_url` | 链接 | `standard` | 评价者头像 |
| `images` | 链接列表 | `standard` | 买家晒的图片地址 |
| `variant` | 文本 | `standard` | 买的是哪个规格，按平台的原文 |

## 哪些平台给不了哪些字段

一个平台的所有接口都给不了某个字段时，它才列在那个字段后面。

| 字段 | 给不了的平台 |
| --- | --- |
| `product_id` | 小红书 |
| `published_at` | 小红书 |

同一个平台上，可能一个接口给不了、另一个接口能给：每个接口的页面列着它给不了的字段，每次返回也都写在 `meta.unavailable` 里。

## 返回 Review（评价）的接口

### TikTok

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [TikTok Shop 商品评价](https://dataxapi.com/zh/apis/tiktok/shop/products/reviews/list.md) | `GET /v1/tiktok/shop/products/reviews/list` | 评价列表 | $0.0020 / 次 |

### 小红书

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [小红书商品评价](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/reviews/list.md) | `GET /v1/xiaohongshu/shop/products/reviews/list` | 评价列表 | $0.0200 / 次 |

## 示例

`tiktok.shop.products.reviews.list` 返回的一条，录制于 2026-10-12 21:49 UTC。名字、正文和编号是示例，链接也是；数字是原样。

```jsonc
{
  "id": "7241346721132232026",
  "product_id": "1711666895973198690",
  "text": "Better quality than I expected, well packed.",
  "rating": 5,
  "published_at": "2025-11-08T18:07:48.019Z",
  "author": {
    "id": "6532506578034157649",
    "name": "Hannah Weiss",
    "avatar_url": "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/2d964118424ccf033c18~c5_100x100.jpeg"
  },
  "images": [
    "https://p16-sign-va.tiktokcdn.com/tos-maliva-p-0068/3cca00c14d044f99de43~c5_720x720.jpeg"
  ],
  "variant": "Colour: Forest green"
}
```

[完整的返回在这个接口的页面上 →](https://dataxapi.com/zh/apis/tiktok/shop/products/reviews/list.md)

## 相关

- [商品评价 API](https://dataxapi.com/zh/roles/products-reviews-list/): 同一种动作在 2 个平台上的接口，带各平台的字段对照。
- [全部接口](https://dataxapi.com/zh/apis/): 目录里写明每个接口返回什么对象、多少钱。

## 其他对象

[Post（内容）对象](https://dataxapi.com/zh/docs/objects/post/)、[Comment（评论）对象](https://dataxapi.com/zh/docs/objects/comment/)、[Account（账号）对象](https://dataxapi.com/zh/docs/objects/account/)、[Trend（热点）对象](https://dataxapi.com/zh/docs/objects/trend/)、[Transcript（逐字稿）对象](https://dataxapi.com/zh/docs/objects/transcript/)、[Creator rates（达人报价）对象](https://dataxapi.com/zh/docs/objects/creator_rates/)、[Community（社区）对象](https://dataxapi.com/zh/docs/objects/community/)、[Product（商品）对象](https://dataxapi.com/zh/docs/objects/product/)、[Keyword index history（关键词指数历史）对象](https://dataxapi.com/zh/docs/objects/keyword_history/)、[Related keyword（关联词）对象](https://dataxapi.com/zh/docs/objects/keyword_related/)、[Keyword audience（关键词人群画像）对象](https://dataxapi.com/zh/docs/objects/keyword_audience/)、[Account recent change（账号近期变化）对象](https://dataxapi.com/zh/docs/objects/account_history/)、[Brand index history（品牌指数历史）对象](https://dataxapi.com/zh/docs/objects/brand_history/)、[Brand index averages（品牌指数均值）对象](https://dataxapi.com/zh/docs/objects/brand_metrics/)、[Creator（达人）对象](https://dataxapi.com/zh/docs/objects/creator/)、[Audience（粉丝画像）对象](https://dataxapi.com/zh/docs/objects/audience/)、[Xingtu creator metrics（星图达人传播数据）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_metrics/)、[Xingtu creator video（星图达人作品）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_post/)、[PGY creator metrics（蒲公英博主数据表现）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_metrics/)、[PGY creator note（蒲公英博主笔记）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_post/)、[PGY note detail（蒲公英笔记详情）对象](https://dataxapi.com/zh/docs/objects/pgy_note/)、[Ad（广告）对象](https://dataxapi.com/zh/docs/objects/ad/)、[Advertiser（广告主）对象](https://dataxapi.com/zh/docs/objects/advertiser/)、[Douyin trend-index creator metrics（巨量算数达人核心指标）对象](https://dataxapi.com/zh/docs/objects/index_creator_metrics/)、[Xingtu creator content keywords（星图达人内容热词）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_keywords/)、[Xingtu creator scores（星图达人指数）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_scores/)、[Xingtu creator content mix（星图达人内容分布）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_content_mix/)、[Xingtu creator conversion（星图达人转化能力）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_conversion/)、[Xingtu campaign（星图营销活动）对象](https://dataxapi.com/zh/docs/objects/xingtu_campaign/)、[Channels collection（视频号合集）对象](https://dataxapi.com/zh/docs/objects/channels_collection/)、[Channels share link（视频号分享链接）对象](https://dataxapi.com/zh/docs/objects/channels_share_link/)、[Topic（话题）对象](https://dataxapi.com/zh/docs/objects/topic/)、[Account owner（账号主体）对象](https://dataxapi.com/zh/docs/objects/account_owner/)、[Mini program（小程序）对象](https://dataxapi.com/zh/docs/objects/miniprogram/)、[Follower history（粉丝数变化）对象](https://dataxapi.com/zh/docs/objects/follower_history/)、[PGY creator costs and summary（蒲公英博主合作成本和数据概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_costs/)、[PGY creator follower summary（蒲公英博主粉丝概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_followers/)、[PGY creator core figures history（蒲公英博主核心数据趋势）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_cost_history/)

---

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/docs/objects/review/)

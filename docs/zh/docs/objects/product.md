# Product（商品）对象

2 个平台的 5 个接口都返回 Product（商品）对象，13 个字段名完全一样，给一个平台写的代码不用改就能读其他平台。每次调用 $0.0020 到 $0.0200。它是预览结构，之后可能调整。

给机器读：[product schema](https://dataxapi.com/openapi.json#/components/schemas/product)、[openapi.json](https://dataxapi.com/openapi.json)、[对象表（JSON）](https://api.dataxapi.com/v1/catalog/objects)、[llms.txt](https://dataxapi.com/zh/llms.txt)

商品（Product）是平台商城里在卖的一件东西：标题、现价 `price` 和原价 `original_price` 及其货币 `currency`、商品图、买家评分 `rating`（满分 5）和已售件数。现在来自 TikTok Shop 美国站和小红书商城（人民币）。

`shop.id` 和 `shop.name` 是卖它的店铺；在 TikTok Shop 上，用店铺编号还能列出这家店在售的其他商品。`id` 可以原样传给商品详情和商品评价接口，评价按“评价”对象返回。

## 字段

平台给不了的字段不会出现在这条数据里，而是写在 `meta.unavailable` 里。不会用猜的数或 0 顶上。

| 字段 | 类型 | 起始档位 | 说明 |
| --- | --- | --- | --- |
| `id` | 文本 | `compact` | 编号，可原样传给取商品详情和取商品评价的接口 |
| `url` | 链接 | `compact` | 能直接打开的链接 |
| `title` | 文本 | `compact` | 商品标题 |
| `description` | 文本 | `standard` | 商品详情里的文字说明 |
| `price` | 金额 | `compact` | 现价；有多个规格时是最低的那一档 |
| `original_price` | 金额 | `standard` | 打折前的价格；没有折扣时为 null |
| `currency` | 文本 | `compact` | 价格的货币，ISO 4217 代码 |
| `images` | 链接列表 | `standard` | 商品图片地址 |
| `rating` | 数字 | `compact` | 买家评分，满分 5 |
| `metrics` | 对象 | `compact` | 商品的数字 |
| `metrics.sold` | 整数 | `compact` | 已售件数 |
| `metrics.reviews` | 整数 | `compact` | 评价数 |
| `shop` | 对象 | `compact` | 卖这件商品的店铺 |
| `shop.id` | 文本 | `compact` | 店铺编号 |
| `shop.name` | 文本 | `compact` | 店铺名 |

## 每个数取的是平台上的哪个数

同一个字段名，在不同平台上对应的动作不完全一样。这张表写明这个字段取的是平台自己的哪个数。

| 字段 | 在那里是什么 | 平台 |
| --- | --- | --- |
| `title` | 搜索结果卡片上的标题，和商品页上的标题字面上可能不同 | 小红书 |
| `images` | 搜索结果卡片上的那一张图；全部图片用商品详情取 | 小红书 |
| `metrics.sold` | 商品页上显示的已售件数 | 小红书 |
| `metrics.sold` | 搜索结果卡片上显示的已售件数 | 小红书 |

## 哪些平台给不了哪些字段

一个平台的所有接口都给不了某个字段时，它才列在那个字段后面。

| 字段 | 给不了的平台 |
| --- | --- |
| `url` | 小红书 |

同一个平台上，可能一个接口给不了、另一个接口能给：每个接口的页面列着它给不了的字段，每次返回也都写在 `meta.unavailable` 里。

## 返回 Product（商品）的接口

### TikTok

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [TikTok Shop 商品详情](https://dataxapi.com/zh/apis/tiktok/shop/products/get.md) | `GET /v1/tiktok/shop/products/get` | 商品 | $0.0020 / 次 |
| [TikTok Shop 商品搜索](https://dataxapi.com/zh/apis/tiktok/shop/products/search.md) | `GET /v1/tiktok/shop/products/search` | 商品列表 | $0.0020 / 次 |
| [TikTok Shop 店铺商品](https://dataxapi.com/zh/apis/tiktok/shop/sellers/products/list.md) | `GET /v1/tiktok/shop/sellers/products/list` | 商品列表 | $0.0020 / 次 |

### 小红书

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [小红书商品详情](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/get.md) | `GET /v1/xiaohongshu/shop/products/get` | 商品 | $0.0200 / 次 |
| [小红书商品搜索](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/search.md) | `GET /v1/xiaohongshu/shop/products/search` | 商品列表 | $0.0200 / 次 |

## 示例

`tiktok.shop.products.get` 返回的一条，录制于 2026-10-12 21:46 UTC。名字、正文和编号是示例，链接也是；数字是原样。

```jsonc
{
  "id": "1716954397711561377",
  "url": "https://shop.tiktok.com/view/product/1716954397711561377",
  "title": "I tried weekend hiking for 30 days. Here is what happened",
  "description": "My honest take on weekend hiking, a month in.",
  "currency": "USD",
  "images": [
    "https://p16-sign-va.tiktokcdn.com/tos-maliva-p-0068/c864758cf8a90105a3d1~c5_720x720.jpeg",
    "https://p16-sign-va.tiktokcdn.com/tos-maliva-p-0068/2061b170200b03e40ffe~c5_720x720.jpeg",
    // … 另有 1 条
  ],
  "rating": 4.1,
  "metrics": { "sold": 233, "reviews": 18 },
  "shop": { "id": "1748001744684903334", "name": "Lumen Outdoor Store" }
}
```

[完整的返回在这个接口的页面上 →](https://dataxapi.com/zh/apis/tiktok/shop/products/get.md)

## 相关

- [商品详情 API](https://dataxapi.com/zh/roles/products-get/): 同一种动作在 2 个平台上的接口，带各平台的字段对照。
- [商品搜索 API](https://dataxapi.com/zh/roles/products-search/): 同一种动作在 2 个平台上的接口，带各平台的字段对照。
- [全部接口](https://dataxapi.com/zh/apis/): 目录里写明每个接口返回什么对象、多少钱。

## 其他对象

[Post（内容）对象](https://dataxapi.com/zh/docs/objects/post/)、[Comment（评论）对象](https://dataxapi.com/zh/docs/objects/comment/)、[Account（账号）对象](https://dataxapi.com/zh/docs/objects/account/)、[Trend（热点）对象](https://dataxapi.com/zh/docs/objects/trend/)、[Transcript（逐字稿）对象](https://dataxapi.com/zh/docs/objects/transcript/)、[Creator rates（达人报价）对象](https://dataxapi.com/zh/docs/objects/creator_rates/)、[Community（社区）对象](https://dataxapi.com/zh/docs/objects/community/)、[Review（评价）对象](https://dataxapi.com/zh/docs/objects/review/)、[Keyword index history（关键词指数历史）对象](https://dataxapi.com/zh/docs/objects/keyword_history/)、[Related keyword（关联词）对象](https://dataxapi.com/zh/docs/objects/keyword_related/)、[Keyword audience（关键词人群画像）对象](https://dataxapi.com/zh/docs/objects/keyword_audience/)、[Account recent change（账号近期变化）对象](https://dataxapi.com/zh/docs/objects/account_history/)、[Brand index history（品牌指数历史）对象](https://dataxapi.com/zh/docs/objects/brand_history/)、[Brand index averages（品牌指数均值）对象](https://dataxapi.com/zh/docs/objects/brand_metrics/)、[Creator（达人）对象](https://dataxapi.com/zh/docs/objects/creator/)、[Audience（粉丝画像）对象](https://dataxapi.com/zh/docs/objects/audience/)、[Xingtu creator metrics（星图达人传播数据）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_metrics/)、[Xingtu creator video（星图达人作品）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_post/)、[PGY creator metrics（蒲公英博主数据表现）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_metrics/)、[PGY creator note（蒲公英博主笔记）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_post/)、[PGY note detail（蒲公英笔记详情）对象](https://dataxapi.com/zh/docs/objects/pgy_note/)、[Ad（广告）对象](https://dataxapi.com/zh/docs/objects/ad/)、[Advertiser（广告主）对象](https://dataxapi.com/zh/docs/objects/advertiser/)、[Douyin trend-index creator metrics（巨量算数达人核心指标）对象](https://dataxapi.com/zh/docs/objects/index_creator_metrics/)、[Xingtu creator content keywords（星图达人内容热词）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_keywords/)、[Xingtu creator scores（星图达人指数）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_scores/)、[Xingtu creator content mix（星图达人内容分布）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_content_mix/)、[Xingtu creator conversion（星图达人转化能力）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_conversion/)、[Xingtu campaign（星图营销活动）对象](https://dataxapi.com/zh/docs/objects/xingtu_campaign/)、[Channels collection（视频号合集）对象](https://dataxapi.com/zh/docs/objects/channels_collection/)、[Channels share link（视频号分享链接）对象](https://dataxapi.com/zh/docs/objects/channels_share_link/)、[Topic（话题）对象](https://dataxapi.com/zh/docs/objects/topic/)、[Account owner（账号主体）对象](https://dataxapi.com/zh/docs/objects/account_owner/)、[Mini program（小程序）对象](https://dataxapi.com/zh/docs/objects/miniprogram/)、[Follower history（粉丝数变化）对象](https://dataxapi.com/zh/docs/objects/follower_history/)、[PGY creator costs and summary（蒲公英博主合作成本和数据概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_costs/)、[PGY creator follower summary（蒲公英博主粉丝概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_followers/)、[PGY creator core figures history（蒲公英博主核心数据趋势）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_cost_history/)

---

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/docs/objects/product/)

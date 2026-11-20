# TikTok Shop API（TikTok 商城）

4 个接口读 TikTok Shop：商品搜索、商品详情、买家评价、店铺商品。一次 $0.0020。不用登录 TikTok，不用 Cookie；失败不收费。

也叫：TikTok 小店、TikTok 电商

## 这组数据是什么

**TikTok Shop 是 TikTok 里的电商，这组接口读的是它的美国站。**按搜索词找商品，按编号读单件商品，列出一家店在售的商品，读一件商品排在最前的买家评价。

返回的是和小红书商城同样的商品和评价对象，一段代码两边都能读。商品的 `id` 可以原样传给商品详情和商品评价，`shop.id` 能列出这家店的其他商品。

- **价格看列表**：`price` 和 `original_price` 来自商品搜索和店铺商品列表，货币见 `currency`。商品详情不给价格：实测的商品上，详情页的数和列表里的价格对不上。
- **满分 5 分**：`rating` 是买家评分，满分 5。没人评过分的商品是 `null`，不会写成 0。
- **已售和评价数**：`metrics.sold` 是平台显示的已售件数。`metrics.reviews` 在商品详情和店铺商品列表里有，搜索结果里没有。

## 这 4 个接口

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [TikTok Shop 商品搜索](https://dataxapi.com/zh/apis/tiktok/shop/products/search.md) | `GET /v1/tiktok/shop/products/search` | 商品列表 | $0.0020 / 次 |
| [TikTok Shop 商品详情](https://dataxapi.com/zh/apis/tiktok/shop/products/get.md) | `GET /v1/tiktok/shop/products/get` | 商品 | $0.0020 / 次 |
| [TikTok Shop 商品评价](https://dataxapi.com/zh/apis/tiktok/shop/products/reviews/list.md) | `GET /v1/tiktok/shop/products/reviews/list` | 评价列表 | $0.0020 / 次 |
| [TikTok Shop 店铺商品](https://dataxapi.com/zh/apis/tiktok/shop/sellers/products/list.md) | `GET /v1/tiktok/shop/sellers/products/list` | 商品列表 | $0.0020 / 次 |

## 一个典型用法，和它的账单

**研究一个品类。**搜两个关键词，再对值得细看的 10 个商品读详情和第一页评价。

| 调用 | 次数 | 花费 |
| --- | --- | --- |
| TikTok Shop 商品搜索 | 2 × $0.0020 | $0.0040 |
| TikTok Shop 商品详情 | 10 × $0.0020 | $0.0200 |
| TikTok Shop 商品评价 | 10 × $0.0020 | $0.0200 |
| 合计 22 次调用 |  | $0.0440 |

## 在你的 AI 里用它

> 用 DataXAPI 在 TikTok Shop 搜“portable blender”，读前 3 个商品的评价，列出买家抱怨最多的点。

## 常见问题

### 多少钱？

按次收费，没有订阅。4 个接口都是一次 $0.0020。拿到数据才扣费，失败不收。

### 商品详情为什么没有价格？

实测的商品上，详情页的数和搜索、店铺列表里同一件商品的价格对不上，所以详情不给现价、原价和货币，并在 `meta.unavailable` 里写明。价格从商品搜索或店铺商品列表取。

### 能读多少条评价？

排在最前的 10 条，按平台自己的顺序，不能往后翻。完整档里，`ext.verified_purchase` 写明平台是否标为“已购买”，`ext.country` 是评价来自哪个国家或地区。

### 商品编号和店铺编号从哪来？

都是一串数字：商品编号是商品链接的最后一段，店铺编号是店铺链接的最后一段。搜索结果里两个都有，在 `id` 和 `shop.id`。

### 需要 TikTok Shop 或 TikTok 的账号吗？

不需要。你只拿一把 DataXAPI 的 Key：不用登录 TikTok，不用 Cookie，也不用广告主账号。

## 别处的同类数据

- [小红书商城 API](https://dataxapi.com/zh/apis/xiaohongshu/shop.md)：小红书商城返回同样的商品和评价对象。

## 怎么做和常见问题

- [如何搜索 TikTok Shop 商品并获取评价](https://dataxapi.com/zh/guides/tiktok-shop-product-reviews.md)
- [不要卖家授权，怎么用 API 取 TikTok Shop 的商品数据？（2026）](https://dataxapi.com/zh/answers/tiktok-shop-product-data-api.md)

[TikTok API](https://dataxapi.com/zh/apis/tiktok.md)

---

怎么调用、怎么计费、怎么处理报错，所有接口都一样：https://dataxapi.com/zh/llms.txt

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/apis/tiktok/shop/)

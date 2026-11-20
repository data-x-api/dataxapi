# 小红书商城 API（小红书商品）

3 个接口读小红书商城：商品搜索、商品详情、买家评价。一次 $0.0200。不用登录小红书，不用 Cookie；失败不收费。

也叫：Xiaohongshu Shop、小红书电商

## 这组数据是什么

**小红书商城是小红书的电商部分，价格是人民币。**这组接口按搜索词找商品，按编号读单件商品，读一件商品排在最前的一页买家评价。

返回的是和 TikTok Shop 同样的商品和评价对象。商品编号是 24 位十六进制字符，搜索结果里有，可以原样传给商品详情和商品评价。

- **价格是人民币**：`price` 和 `original_price` 是平台自己的人民币价格，`currency` 写明是 CNY；没有折扣时 `original_price` 为 `null`。
- **已售件数，有时是下限**：`metrics.sold` 是平台显示的已售件数。一万件以上平台只显示约数，比如 11.4k+：返回 11400，并在这一条的 `approximate` 里标为下限。
- **搜索卡片和商品页**：搜索结果给的是卡片上的标题和一张图。商品详情给商品页上的标题、全部图片、文字说明、评分和评价数。
- **评价时间按显示的写**：评价的时间只有 App 上显示的写法，在 `ext.date_shown`：一个日期、不带年份的月日，或者“几小时前”。没有 `published_at`。

## 这 3 个接口

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [小红书商品搜索](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/search.md) | `GET /v1/xiaohongshu/shop/products/search` | 商品列表 | $0.0200 / 次 |
| [小红书商品详情](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/get.md) | `GET /v1/xiaohongshu/shop/products/get` | 商品 | $0.0200 / 次 |
| [小红书商品评价](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/reviews/list.md) | `GET /v1/xiaohongshu/shop/products/reviews/list` | 评价列表 | $0.0200 / 次 |

## 一个典型用法，和它的账单

**看买家怎么评价一类商品。**搜一个关键词，再对 5 个商品读详情和第一页评价。

| 调用 | 次数 | 花费 |
| --- | --- | --- |
| 小红书商品搜索 | 1 × $0.0200 | $0.0200 |
| 小红书商品详情 | 5 × $0.0200 | $0.1000 |
| 小红书商品评价 | 5 × $0.0200 | $0.1000 |
| 合计 11 次调用 |  | $0.2200 |

## 在你的 AI 里用它

> 用 DataXAPI 在小红书商城搜“防晒霜”，总结前 5 个商品的买家评价。

## 常见问题

### 多少钱？

按次收费，没有订阅。3 个接口都是一次 $0.0200。拿到数据才扣费，失败不收。

### 能读多少条评价？

排在最前的一页，按平台自己的顺序：实测的那件商品是 12 条，最多 20 条，不能往后翻。每条评价有正文、评分（满分 5）、买的规格、晒图，完整档里还有点赞数。

### 评价里有商品编号吗？

没有。小红书的评价不带商品编号，所以不返回 `product_id`；自己记住请求时用的商品编号。

### 搜索结果里有评分吗？

没有。搜索卡片只有标题、价格、已售件数、一张图和店铺。评分、评价数和文字说明要用商品详情取。

### 需要小红书商城或小红书的账号吗？

不需要。你只拿一把 DataXAPI 的 Key：不用登录小红书，不用 Cookie，也不用广告主账号。

## 别处的同类数据

- [TikTok Shop API](https://dataxapi.com/zh/apis/tiktok/shop.md)：TikTok Shop 返回同样的商品和评价对象，另有店铺的在售商品。

## 怎么做和常见问题

- [小红书选品怎么查：哪些单品卖得好、买家怎么说（2026）](https://dataxapi.com/zh/answers/xiaohongshu-product-research.md)
- [用户口碑怎么批量取？小红书、抖音评论和电商评价（2026）](https://dataxapi.com/zh/answers/product-reviews-chinese-social-media.md)
- [用中国社媒数据做投研（另类数据）：能取哪些信号，怎么取（2026）](https://dataxapi.com/zh/answers/chinese-social-media-alternative-data.md)

[小红书 API](https://dataxapi.com/zh/apis/xiaohongshu.md)

---

怎么调用、怎么计费、怎么处理报错，所有接口都一样：https://dataxapi.com/zh/llms.txt

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/apis/xiaohongshu/shop/)

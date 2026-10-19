# Xiaohongshu Shop API (小红书商城)

3 endpoints read Xiaohongshu Shop (小红书商城): product search, product details, buyer reviews. $0.0200 a call. No Xiaohongshu login and no cookie; a failed call is free.

Also known as: 小红书商品, 小红书电商, xhs shop, rednote shop

## What this data is

**Xiaohongshu's shop is the shop side of Xiaohongshu (RedNote), with prices in yuan.** These endpoints search its products by terms, read one product by its ID and read the first page of a product's buyer reviews.

The answers are the same Product and Review objects as TikTok Shop's. A product's `id` is 24 hexadecimal characters; search results give it, and it goes unchanged to the detail and the reviews.

- **Prices in yuan**: `price` and `original_price` are the platform's own prices in CNY, as `currency` says; `original_price` is `null` when there is no discount.
- **Sold, sometimes a lower bound**: `metrics.sold` is the count shown. From ten thousand up the platform shows a rounded figure such as 11.4k+: it comes back as 11400, and the item's `approximate` marks it a lower bound.
- **Search card or product page**: A search result has the title as its card words it and one picture. The detail has the page's title, every picture, the description, the rating and the number of reviews.
- **Review time as shown**: A review's time comes only as the app shows it, in `ext.date_shown`: a date, a month and a day without the year, or how long ago. There is no `published_at`.

## The 3 endpoints

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Xiaohongshu product search](https://dataxapi.com/apis/xiaohongshu/shop/products/search.md) | `GET /v1/xiaohongshu/shop/products/search` | Product list | $0.0200 / call |
| [Xiaohongshu product detail](https://dataxapi.com/apis/xiaohongshu/shop/products/get.md) | `GET /v1/xiaohongshu/shop/products/get` | Product | $0.0200 / call |
| [Xiaohongshu product reviews](https://dataxapi.com/apis/xiaohongshu/shop/products/reviews/list.md) | `GET /v1/xiaohongshu/shop/products/reviews/list` | Review list | $0.0200 / call |

## A typical use, with its bill

**Read what buyers say about a kind of product.** Search one keyword, then read the details and the first page of reviews of five products.

| Call | Times | Cost |
| --- | --- | --- |
| Xiaohongshu product search | 1 × $0.0200 | $0.0200 |
| Xiaohongshu product detail | 5 × $0.0200 | $0.1000 |
| Xiaohongshu product reviews | 5 × $0.0200 | $0.1000 |
| In all, 11 calls |  | $0.2200 |

## Use it in your AI

> Use DataXAPI to search Xiaohongshu's shop for “防晒霜”, then summarise the buyer reviews of the first five products.

## Questions

### How much does it cost?

Per call, no subscription. All 3 endpoints cost $0.0200 a call. You are charged when data comes back; a failed call costs nothing.

### How many reviews can I read?

The first page, in the platform's own order: 12 on the product recorded, at most 20. There is no next page. Each review has the text, the rating out of 5, the variant bought, the pictures and, in the full view, its likes.

### Does a review say which product it is about?

No. Xiaohongshu's reviews do not name their product, so `product_id` is not given; keep the product ID you asked with.

### Do search results have a rating?

No. A search card carries the title, prices, units sold, one picture and the shop. The rating, the number of reviews and the description come with the product detail.

### Do I need a Xiaohongshu Shop or Xiaohongshu account?

No. You hold one DataXAPI key: no Xiaohongshu login, no cookie, no advertiser account.

## The same kind of data elsewhere

- [TikTok Shop API](https://dataxapi.com/apis/tiktok/shop.md): TikTok Shop returns the same Product and Review objects, plus a seller's catalog.

[Xiaohongshu (RedNote) API](https://dataxapi.com/apis/xiaohongshu.md)

---

How to call, pay and handle errors is the same everywhere: https://dataxapi.com/llms.txt

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/xiaohongshu/shop/)

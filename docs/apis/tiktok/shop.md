# TikTok Shop API (TikTok 商城)

4 endpoints read TikTok Shop (TikTok 商城): product search, product details, buyer reviews, seller catalogs. $0.0020 a call. No TikTok login and no cookie; a failed call is free.

Also known as: TikTok 小店, TikTok 电商

## What this data is

**TikTok Shop is the shop inside TikTok, and these endpoints read its United States market.** Search products by terms, read one product by its ID, list what a seller has on sale, and read the first buyers' reviews of a product.

The answers are the same Product and Review objects as Xiaohongshu's shop, so code that reads one shop reads the other. A product's `id` goes unchanged to its detail and its reviews, and its `shop.id` lists the seller's other products.

- **Price from the lists**: `price` and `original_price` come from the search and a seller's product list, in the `currency` they give. The product detail leaves them out: on the products recorded, its page's figure did not match the lists' price.
- **Rating out of 5**: `rating` is the buyers' rating out of 5. A product nobody has rated has `null`, never 0.
- **Sold and reviewed**: `metrics.sold` is the count the platform shows. `metrics.reviews` comes with the detail and a seller's list, not with search results.

## The 4 endpoints

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [TikTok Shop product search](https://dataxapi.com/apis/tiktok/shop/products/search.md) | `GET /v1/tiktok/shop/products/search` | Product list | $0.0020 / call |
| [TikTok Shop product detail](https://dataxapi.com/apis/tiktok/shop/products/get.md) | `GET /v1/tiktok/shop/products/get` | Product | $0.0020 / call |
| [TikTok Shop product reviews](https://dataxapi.com/apis/tiktok/shop/products/reviews/list.md) | `GET /v1/tiktok/shop/products/reviews/list` | Review list | $0.0020 / call |
| [TikTok Shop seller products](https://dataxapi.com/apis/tiktok/shop/sellers/products/list.md) | `GET /v1/tiktok/shop/sellers/products/list` | Product list | $0.0020 / call |

## A typical use, with its bill

**Research a product category.** Search two keywords, then read the details and the first page of reviews of the ten products worth a closer look.

| Call | Times | Cost |
| --- | --- | --- |
| TikTok Shop product search | 2 × $0.0020 | $0.0040 |
| TikTok Shop product detail | 10 × $0.0020 | $0.0200 |
| TikTok Shop product reviews | 10 × $0.0020 | $0.0200 |
| In all, 22 calls |  | $0.0440 |

## Use it in your AI

> Use DataXAPI to search TikTok Shop for “portable blender”, then read the reviews of the first three products and list what buyers complain about.

## Questions

### How much does it cost?

Per call, no subscription. All 4 endpoints cost $0.0020 a call. You are charged when data comes back; a failed call costs nothing.

### Why does the product detail have no price?

On the products recorded, the detail page's figure did not match the price the search and the seller's list showed for the same item, so the detail leaves price, original price and currency out and names them in `meta.unavailable`. Take the price from the search or the seller's list.

### How many reviews can I read?

The first 10, in the platform's own order; there is no next page. In the full view, `ext.verified_purchase` says whether the platform marks a review a verified purchase and `ext.country` where it is from.

### Where do product and seller IDs come from?

Both are strings of digits: a product's is the last segment of its link, a seller's the last segment of the shop's link. Search results carry both, in `id` and `shop.id`.

### Do I need a TikTok Shop or TikTok account?

No. You hold one DataXAPI key: no TikTok login, no cookie, no advertiser account.

## The same kind of data elsewhere

- [Xiaohongshu Shop API](https://dataxapi.com/apis/xiaohongshu/shop.md): Xiaohongshu's shop returns the same Product and Review objects.

## How-to guides and answers

- [How to search TikTok Shop products and read their reviews](https://dataxapi.com/guides/tiktok-shop-product-reviews.md)

[TikTok API](https://dataxapi.com/apis/tiktok.md)

---

How to call, pay and handle errors is the same everywhere: https://dataxapi.com/llms.txt

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/tiktok/shop/)

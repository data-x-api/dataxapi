# Product object

5 endpoints on 2 platforms return the Product object with the same 13 fields, so code written for one platform reads the others unchanged. A call costs $0.0020 to $0.0200. It is a preview structure and may still change.

For machines: [product schema](https://dataxapi.com/openapi.json#/components/schemas/product), [openapi.json](https://dataxapi.com/openapi.json), [Object table (JSON)](https://api.dataxapi.com/v1/catalog/objects), [llms.txt](https://dataxapi.com/llms.txt)

A Product is something for sale in a platform's shop: its title, its `price` and `original_price` in a `currency`, its pictures, the buyers' `rating` out of 5 and the units sold. It comes from TikTok Shop in the United States and from the shop of Xiaohongshu (RedNote), in yuan.

`shop.id` and `shop.name` say who sells it, and on TikTok Shop the seller's ID lists the rest of what it has on sale. Its `id` goes unchanged to the product detail and to its reviews, which come back as Review.

## Fields

A field the platform cannot give is left out of the item and named in `meta.unavailable`. It is never filled with a guess or a zero.

| Field | Type | From view | Description |
| --- | --- | --- | --- |
| `id` | text | `compact` | ID; pass it unchanged to the endpoints that get the product and list its reviews |
| `url` | link | `compact` | Link that opens the product |
| `title` | text | `compact` | Title of the product |
| `description` | text | `standard` | The text of the product's description |
| `price` | amount | `compact` | Current price; the lowest one when its variants are priced differently |
| `original_price` | amount | `standard` | The price before the discount; null when there is none |
| `currency` | text | `compact` | Currency of the prices, an ISO 4217 code |
| `images` | list of link | `standard` | Addresses of the product's pictures |
| `rating` | number | `compact` | Buyers' rating, out of 5 |
| `metrics` | object | `compact` | Product counts |
| `metrics.sold` | integer | `compact` | Units sold |
| `metrics.reviews` | integer | `compact` | Reviews |
| `shop` | object | `compact` | The shop that sells it |
| `shop.id` | text | `compact` | Shop ID |
| `shop.name` | text | `compact` | Name of the shop |

## Where each number comes from

The same field name does not always mean the same act on every platform. This table says which of the platform's own numbers goes into the field.

| Field | What it holds there | On |
| --- | --- | --- |
| `title` | The title as the result card words it, which may differ from the title on the product's page | Xiaohongshu (RedNote) |
| `images` | The one picture of the result card; the product itself has all of them | Xiaohongshu (RedNote) |
| `metrics.sold` | Units sold as the product's page shows them | Xiaohongshu (RedNote) |
| `metrics.sold` | Units sold as the result card shows them | Xiaohongshu (RedNote) |

## What a platform cannot give

A platform stands against a field when none of its endpoints gives it.

| Field | Not available on |
| --- | --- |
| `url` | Xiaohongshu (RedNote) |

One endpoint may still leave out a field another gives: each endpoint's page lists what it cannot give, and every answer says so in `meta.unavailable`.

## Endpoints that return Product

### TikTok

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [TikTok Shop product detail](https://dataxapi.com/apis/tiktok/shop/products/get.md) | `GET /v1/tiktok/shop/products/get` | Product | $0.0020 / call |
| [TikTok Shop product search](https://dataxapi.com/apis/tiktok/shop/products/search.md) | `GET /v1/tiktok/shop/products/search` | Product list | $0.0020 / call |
| [TikTok Shop seller products](https://dataxapi.com/apis/tiktok/shop/sellers/products/list.md) | `GET /v1/tiktok/shop/sellers/products/list` | Product list | $0.0020 / call |

### Xiaohongshu (RedNote)

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Xiaohongshu product detail](https://dataxapi.com/apis/xiaohongshu/shop/products/get.md) | `GET /v1/xiaohongshu/shop/products/get` | Product | $0.0200 / call |
| [Xiaohongshu product search](https://dataxapi.com/apis/xiaohongshu/shop/products/search.md) | `GET /v1/xiaohongshu/shop/products/search` | Product list | $0.0200 / call |

## Example

One item from `tiktok.shop.products.get`, as recorded 2026-10-12 21:46 UTC. Names, text, IDs and links are examples; the figures are as recorded.

```jsonc
{
  "id": "1716954397711561377",
  "url": "https://shop.tiktok.com/view/product/1716954397711561377",
  "title": "I tried weekend hiking for 30 days. Here is what happened",
  "description": "My honest take on weekend hiking, a month in.",
  "images": [
    "https://p16-sign-va.tiktokcdn.com/tos-maliva-p-0068/c864758cf8a90105a3d1~c5_720x720.jpeg",
    "https://p16-sign-va.tiktokcdn.com/tos-maliva-p-0068/2061b170200b03e40ffe~c5_720x720.jpeg",
    // … 1 more
  ],
  "rating": 4.1,
  "metrics": { "sold": 233, "reviews": 18 },
  "shop": { "id": "1748001744684903334", "name": "Lumen Outdoor Store" }
}
```

[The whole response is on the endpoint's page →](https://dataxapi.com/apis/tiktok/shop/products/get.md)

## Related

- [Product detail API](https://dataxapi.com/roles/products-get/): The same action on 2 platforms, with a per-platform field table.
- [Product search API](https://dataxapi.com/roles/products-search/): The same action on 2 platforms, with a per-platform field table.
- [All endpoints](https://dataxapi.com/apis/): The directory lists what every endpoint returns, with its price.

## Other objects

[Post object](https://dataxapi.com/docs/objects/post/), [Comment object](https://dataxapi.com/docs/objects/comment/), [Account object](https://dataxapi.com/docs/objects/account/), [Trend object](https://dataxapi.com/docs/objects/trend/), [Transcript object](https://dataxapi.com/docs/objects/transcript/), [Creator rates object](https://dataxapi.com/docs/objects/creator_rates/), [Community object](https://dataxapi.com/docs/objects/community/), [Review object](https://dataxapi.com/docs/objects/review/), [Keyword index history object](https://dataxapi.com/docs/objects/keyword_history/), [Related keyword object](https://dataxapi.com/docs/objects/keyword_related/), [Keyword audience object](https://dataxapi.com/docs/objects/keyword_audience/), [Account recent change object](https://dataxapi.com/docs/objects/account_history/), [Brand index history object](https://dataxapi.com/docs/objects/brand_history/), [Brand index averages object](https://dataxapi.com/docs/objects/brand_metrics/), [Creator object](https://dataxapi.com/docs/objects/creator/), [Audience object](https://dataxapi.com/docs/objects/audience/), [Xingtu creator metrics object](https://dataxapi.com/docs/objects/xingtu_creator_metrics/), [Xingtu creator video object](https://dataxapi.com/docs/objects/xingtu_creator_post/), [PGY creator metrics object](https://dataxapi.com/docs/objects/pgy_creator_metrics/), [PGY creator note object](https://dataxapi.com/docs/objects/pgy_creator_post/), [Ad object](https://dataxapi.com/docs/objects/ad/), [Advertiser object](https://dataxapi.com/docs/objects/advertiser/), [Douyin trend-index creator metrics object](https://dataxapi.com/docs/objects/index_creator_metrics/), [Xingtu creator content keywords object](https://dataxapi.com/docs/objects/xingtu_creator_keywords/), [Xingtu creator scores object](https://dataxapi.com/docs/objects/xingtu_creator_scores/), [Xingtu creator content mix object](https://dataxapi.com/docs/objects/xingtu_creator_content_mix/), [Xingtu creator conversion object](https://dataxapi.com/docs/objects/xingtu_creator_conversion/), [Xingtu campaign object](https://dataxapi.com/docs/objects/xingtu_campaign/), [Channels collection object](https://dataxapi.com/docs/objects/channels_collection/), [Topic object](https://dataxapi.com/docs/objects/topic/)

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/docs/objects/product/)

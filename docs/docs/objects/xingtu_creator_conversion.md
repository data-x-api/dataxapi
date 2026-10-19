# Xingtu creator conversion object

The Xingtu creator conversion object has 14 fields and is returned by 1 endpoint on Douyin. A call costs $0.0040. It is a preview structure and may still change.

For machines: [xingtu_creator_conversion schema](https://dataxapi.com/openapi.json#/components/schemas/xingtu_creator_conversion), [openapi.json](https://dataxapi.com/openapi.json), [Object table (JSON)](https://api.dataxapi.com/v1/catalog/objects), [llms.txt](https://dataxapi.com/llms.txt)

Xingtu creator conversion is how well a Douyin creator's videos that carry products sell, as Xingtu (星图) sums it up: videos counted, their median views, products recommended and the categories of goods. Sales, sales per thousand views (GPM), product price, cost per click and clicks come as the platform's bands, in its words, not exact numbers.

`creator_id` is the Xingtu creator ID; a creator with no selling figures is answered `not_found`. `currency` says what the money bands are in.

## Fields

A field the platform cannot give is left out of the item and named in `meta.unavailable`. It is never filled with a guess or a zero.

| Field | Type | From view | Description |
| --- | --- | --- | --- |
| `creator_id` | text | `compact` | Xingtu creator ID |
| `videos` | integer | `compact` | Videos counted: the ones that carry products |
| `median_views` | integer | `compact` | Median views of those videos |
| `products` | integer | `compact` | Products recommended |
| `currency` | text | `compact` | Currency of the money bands below |
| `sales_range` | text | `compact` | Band of the average sales of a video, in the platform's words |
| `gpm_range` | text | `compact` | Band of the sales per thousand views (GPM), in the platform's words |
| `product_price_range` | text | `compact` | Band of the prices of the products recommended, in the platform's words |
| `click_cost_range` | text | `compact` | Band of the cost per click (CPC), in the platform's words |
| `clicks_range` | text | `compact` | Band of the clicks on the product link shown in a video, in the platform's words |
| `click_rate_range` | text | `compact` | Band of the click rate of that product link, in the platform's words |
| `categories` | list of object | `compact` | The categories of goods sold, one entry each |
| `categories[].name` | text | `compact` | Name of the category, in the platform's words |
| `categories[].share` | number | `compact` | The category's share, 0 to 1 |
| `categories[].sales_range` | text | `compact` | Band of the category's sales, in the platform's words |

## Endpoints that return Xingtu creator conversion

### Douyin

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Douyin Xingtu creator conversion](https://dataxapi.com/apis/douyin/xingtu/creators/conversion/get.md) | `GET /v1/douyin/xingtu/creators/conversion/get` | Xingtu creator conversion | $0.0040 / call |

## Example

One item from `douyin.xingtu.creators.conversion.get`, as recorded 2026-10-13 03:26 UTC. Names, text, IDs and links are examples; the figures are as recorded.

```jsonc
{
  "creator_id": "6077931603440616010",
  "videos": 3,
  "median_views": 3276730,
  "products": 2,
  "currency": "CNY",
  "sales_range": "1w-5w",
  "gpm_range": "100-500",
  "product_price_range": "50-100",
  "click_cost_range": "0.5-1",
  "clicks_range": "1k-5k",
  "click_rate_range": "1%-3%",
  "categories": [
    { "name": "美食", "share": 1, "sales_range": "1w-5w" }
  ]
}
```

[The whole response is on the endpoint's page →](https://dataxapi.com/apis/douyin/xingtu/creators/conversion/get.md)

## Related

- [All endpoints](https://dataxapi.com/apis/): The directory lists what every endpoint returns, with its price.

## Other objects

[Post object](https://dataxapi.com/docs/objects/post/), [Comment object](https://dataxapi.com/docs/objects/comment/), [Account object](https://dataxapi.com/docs/objects/account/), [Trend object](https://dataxapi.com/docs/objects/trend/), [Transcript object](https://dataxapi.com/docs/objects/transcript/), [Creator rates object](https://dataxapi.com/docs/objects/creator_rates/), [Community object](https://dataxapi.com/docs/objects/community/), [Product object](https://dataxapi.com/docs/objects/product/), [Review object](https://dataxapi.com/docs/objects/review/), [Keyword index history object](https://dataxapi.com/docs/objects/keyword_history/), [Related keyword object](https://dataxapi.com/docs/objects/keyword_related/), [Keyword audience object](https://dataxapi.com/docs/objects/keyword_audience/), [Account recent change object](https://dataxapi.com/docs/objects/account_history/), [Brand index history object](https://dataxapi.com/docs/objects/brand_history/), [Brand index averages object](https://dataxapi.com/docs/objects/brand_metrics/), [Creator object](https://dataxapi.com/docs/objects/creator/), [Audience object](https://dataxapi.com/docs/objects/audience/), [Xingtu creator metrics object](https://dataxapi.com/docs/objects/xingtu_creator_metrics/), [Xingtu creator video object](https://dataxapi.com/docs/objects/xingtu_creator_post/), [PGY creator metrics object](https://dataxapi.com/docs/objects/pgy_creator_metrics/), [PGY creator note object](https://dataxapi.com/docs/objects/pgy_creator_post/), [Ad object](https://dataxapi.com/docs/objects/ad/), [Advertiser object](https://dataxapi.com/docs/objects/advertiser/), [Douyin trend-index creator metrics object](https://dataxapi.com/docs/objects/index_creator_metrics/), [Xingtu creator content keywords object](https://dataxapi.com/docs/objects/xingtu_creator_keywords/), [Xingtu creator scores object](https://dataxapi.com/docs/objects/xingtu_creator_scores/), [Xingtu creator content mix object](https://dataxapi.com/docs/objects/xingtu_creator_content_mix/), [Xingtu campaign object](https://dataxapi.com/docs/objects/xingtu_campaign/), [Channels collection object](https://dataxapi.com/docs/objects/channels_collection/), [Topic object](https://dataxapi.com/docs/objects/topic/)

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/docs/objects/xingtu_creator_conversion/)

# Review object

2 endpoints on 2 platforms return the Review object with the same 10 fields, so code written for one platform reads the others unchanged. A call costs $0.0020 to $0.0200. It is a preview structure and may still change.

For machines: [review schema](https://dataxapi.com/openapi.json#/components/schemas/review), [openapi.json](https://dataxapi.com/openapi.json), [Object table (JSON)](https://api.dataxapi.com/v1/catalog/objects), [llms.txt](https://dataxapi.com/llms.txt)

A Review is what a buyer wrote about a product and the `rating` they gave it, out of 5, with the variant bought and any pictures attached. A review with a rating and no words has `text` set to `null`.

It hangs under a product, not a post: on TikTok Shop `product_id` names the product, while Xiaohongshu's reviews do not name theirs, so keep the ID you asked with. It is not a Comment: a comment is under a post and carries no rating.

## Fields

A field the platform cannot give is left out of the item and named in `meta.unavailable`. It is never filled with a guess or a zero.

| Field | Type | From view | Description |
| --- | --- | --- | --- |
| `id` | text | `compact` | ID |
| `product_id` | text | `compact` | ID of the product it reviews |
| `text` | text | `compact` | Text of the review; null when the buyer gave a rating and wrote nothing |
| `rating` | number | `compact` | The buyer's rating of the product, out of 5 |
| `published_at` | time | `compact` | When it was written |
| `author` | object | `compact` | Reviewer |
| `author.id` | text | `compact` | Reviewer's account ID |
| `author.name` | text | `compact` | Reviewer's display name, as the platform shows it (it may be masked) |
| `author.avatar_url` | link | `standard` | Reviewer's avatar |
| `images` | list of link | `standard` | Addresses of the pictures the buyer attached |
| `variant` | text | `standard` | Which variant was bought, as the platform words it |

## What a platform cannot give

A platform stands against a field when none of its endpoints gives it.

| Field | Not available on |
| --- | --- |
| `product_id` | Xiaohongshu (RedNote) |
| `published_at` | Xiaohongshu (RedNote) |

One endpoint may still leave out a field another gives: each endpoint's page lists what it cannot give, and every answer says so in `meta.unavailable`.

## Endpoints that return Review

### TikTok

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [TikTok Shop product reviews](https://dataxapi.com/apis/tiktok/shop/products/reviews/list.md) | `GET /v1/tiktok/shop/products/reviews/list` | Review list | $0.0020 / call |

### Xiaohongshu (RedNote)

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Xiaohongshu product reviews](https://dataxapi.com/apis/xiaohongshu/shop/products/reviews/list.md) | `GET /v1/xiaohongshu/shop/products/reviews/list` | Review list | $0.0200 / call |

## Example

One item from `tiktok.shop.products.reviews.list`, as recorded 2026-10-12 21:49 UTC. Names, text, IDs and links are examples; the figures are as recorded.

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

[The whole response is on the endpoint's page →](https://dataxapi.com/apis/tiktok/shop/products/reviews/list.md)

## Related

- [Product reviews API](https://dataxapi.com/roles/products-reviews-list/): The same action on 2 platforms, with a per-platform field table.
- [All endpoints](https://dataxapi.com/apis/): The directory lists what every endpoint returns, with its price.

## Other objects

[Post object](https://dataxapi.com/docs/objects/post/), [Comment object](https://dataxapi.com/docs/objects/comment/), [Account object](https://dataxapi.com/docs/objects/account/), [Trend object](https://dataxapi.com/docs/objects/trend/), [Transcript object](https://dataxapi.com/docs/objects/transcript/), [Creator rates object](https://dataxapi.com/docs/objects/creator_rates/), [Community object](https://dataxapi.com/docs/objects/community/), [Product object](https://dataxapi.com/docs/objects/product/), [Keyword index history object](https://dataxapi.com/docs/objects/keyword_history/), [Related keyword object](https://dataxapi.com/docs/objects/keyword_related/), [Keyword audience object](https://dataxapi.com/docs/objects/keyword_audience/), [Account recent change object](https://dataxapi.com/docs/objects/account_history/), [Brand index history object](https://dataxapi.com/docs/objects/brand_history/), [Brand index averages object](https://dataxapi.com/docs/objects/brand_metrics/), [Creator object](https://dataxapi.com/docs/objects/creator/), [Audience object](https://dataxapi.com/docs/objects/audience/), [Xingtu creator metrics object](https://dataxapi.com/docs/objects/xingtu_creator_metrics/), [Xingtu creator video object](https://dataxapi.com/docs/objects/xingtu_creator_post/), [PGY creator metrics object](https://dataxapi.com/docs/objects/pgy_creator_metrics/), [PGY creator note object](https://dataxapi.com/docs/objects/pgy_creator_post/), [Ad object](https://dataxapi.com/docs/objects/ad/), [Advertiser object](https://dataxapi.com/docs/objects/advertiser/), [Douyin trend-index creator metrics object](https://dataxapi.com/docs/objects/index_creator_metrics/), [Xingtu creator content keywords object](https://dataxapi.com/docs/objects/xingtu_creator_keywords/), [Xingtu creator scores object](https://dataxapi.com/docs/objects/xingtu_creator_scores/), [Xingtu creator content mix object](https://dataxapi.com/docs/objects/xingtu_creator_content_mix/), [Xingtu creator conversion object](https://dataxapi.com/docs/objects/xingtu_creator_conversion/), [Xingtu campaign object](https://dataxapi.com/docs/objects/xingtu_campaign/), [Channels collection object](https://dataxapi.com/docs/objects/channels_collection/), [Topic object](https://dataxapi.com/docs/objects/topic/)

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/docs/objects/review/)

# TikTok Shop product reviews API

Get the first 10 buyers' reviews of a TikTok Shop product in the United States by the product's ID: text, rating, time, variant bought, pictures. Up to 10 items a call; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Endpoint: `GET https://api.dataxapi.com/v1/tiktok/shop/products/reviews/list`
- ID: `tiktok.shop.products.reviews.list`
- Also known as: tiktok shop reviews, tiktok product ratings
- Price: $0.0020 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 10 a page, everything in one answer, no paging
- Returns review, a preview structure that may still change
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=tiktok.shop.products.reviews.list&params=%7B%22id%22%3A%221732488007561286228%22%7D)
- In Chinese: [TikTok Shop 商品评价 API](https://dataxapi.com/zh/apis/tiktok/shop/products/reviews/list/)

## What you get

The first 2 rows of a response recorded 2026-10-12 21:49 UTC.

| Field | Value |
| --- | --- |
| rating | 5 |
| published_at | 2025-11-08 18:07 UTC |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `id` | text | Yes | Product ID, a string of digits (the last segment of the product's link). Example: `1732488007561286228`. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.items` is a list of review objects. Preview: the structure may change, announced beforehand.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `id` | text | ID. | `compact` | Yes |
| `product_id` | text | ID of the product it reviews. | `compact` | Yes |
| `text` | text | Text of the review; null when the buyer gave a rating and wrote nothing. Long text: the compact view keeps the first 500 characters and says so in `warnings`. | `compact` | Yes |
| `rating` | number | The buyer's rating of the product, out of 5. | `compact` | Yes |
| `published_at` | time | When it was written. | `compact` | Yes |
| `author` | object | Reviewer. | `compact` | Yes |
| `author.id` | text | Reviewer's account ID. | `compact` | Yes |
| `author.name` | text | Reviewer's display name, as the platform shows it (it may be masked). | `compact` | Yes |
| `author.avatar_url` | link | Reviewer's avatar. | `standard` | Yes |
| `images` | list of link | Addresses of the pictures the buyer attached. | `standard` | Yes |
| `variant` | text | Which variant was bought, as the platform words it. | `standard` | Yes |
| `ext.verified_purchase` | yes/no | Whether the platform marks it a verified purchase. | `full` | Yes |
| `ext.country` | text | Code of the country or region the review is from. | `full` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 468 B, `standard` 1.0 KB, `full` 1.1 KB (measured on the response recorded 2026-10-12 21:49 UTC).

## Paging

10 items a page. The page size is the platform's; `limit` is not accepted.

Everything comes in one page; no cursor is issued.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0020, once per call |
| An empty result | $0.0020 |
| Invalid parameters, a failure of ours or of the data source, a timeout | not charged |
| The most one call can cost | $0.0020 (send `X-Max-Price` to refuse anything above your own limit) |

Prices as read 2026-10-18 19:59 UTC, under price book 2, in effect since 2026-10-17 11:00 UTC; the Playground reads the price in force before a run.

## If the object does not exist

A product that does not exist cannot be told from a product without reviews: both return an empty result, not a 404, and are charged as an empty result is.

## Errors

Every error has the same structure: `code`, `message`, `charged`, `retry`, `retry_after_seconds`, `param`, `docs_url`.

| HTTP | Code | Meaning | Charged | Retry |
| --- | --- | --- | --- | --- |
| 400 | `invalid_params` | A parameter is invalid | No | After a fix |
| 400 | `request_not_served` | This combination of parameters cannot be served at present | No | After a fix |
| 400 | `max_price_exceeded` | The most this call could cost is above the limit you set | No | After a fix |
| 401 | `unauthorized` | No credential was sent, or it is invalid, disabled or expired | No | No |
| 402 | `insufficient_balance` | The balance is too low | No | After a fix |
| 402 | `key_budget_exceeded` | This key's spending limit does not cover the call | No | After a fix |
| 402 | `run_budget_exceeded` | This run's amount or call limit does not cover the call | No | No |
| 403 | `account_suspended` | The account is suspended | No | No |
| 403 | `forbidden` | This credential may not use that option | No | No |
| 403 | `key_scope_denied` | This key may not call this endpoint | No | No |
| 404 | `run_not_found` | No run under this run ID | No | No |
| 409 | `call_in_progress` | The call under this idempotency key is still running; ask again with the same key shortly | No | With the same idempotency key |
| 409 | `idempotency_conflict` | This idempotency key was used for a different request | No | After a fix |
| 410 | `run_expired` | This run has expired and starts no more calls | No | No |
| 429 | `rate_limited` | Too many requests, or too many calls in progress | No | Yes |
| 429 | `cost_cap_exceeded` | This account's allowance for today is used up | No | Yes |
| 429 | `uncharged_cost_limit` | Too many of this account's calls today returned nothing and were not charged; endpoints of this kind can be called again tomorrow (UTC) | No | Yes |
| 500 | `settlement_unknown` | Whether this call settled is not known; ask again with the same idempotency key, or look it up by request ID | Unknown: look the call up | With the same idempotency key |
| 500 | `internal_error` | The service failed | No | Yes |
| 502 | `upstream_failed` | The data source failed | No | Yes |
| 502 | `upstream_changed` | The data source returned an unexpected structure | No | Yes |
| 502 | `upstream_unclear` | The data source's answer could not be interpreted; retry at most once | No | Once |
| 503 | `upstream_busy` | The data source is busy; retry shortly | No | Yes |
| 503 | `capability_paused` | This endpoint is paused | No | Yes |
| 503 | `overloaded` | The service is busy; retry shortly | No | Yes |
| 504 | `timeout` | The data did not arrive in time; retry with the same idempotency key | No | Yes |

[All error codes](https://dataxapi.com/docs/errors/)

## Request

The key is read from the environment; no key is ever written into a page.

### cURL

```bash
curl -G "https://api.dataxapi.com/v1/tiktok/shop/products/reviews/list" \
  --data-urlencode "id=1732488007561286228" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.tiktok.shop.products.reviews.list(id="1732488007561286228")
print(result["data"]["items"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.tiktok.shop.products.reviews.list({ id: "1732488007561286228" });
console.log(result.data.items);
```

### CLI

```bash
dataxapi call tiktok.shop.products.reviews.list id=1732488007561286228
```

### MCP

```json
{
  "mcpServers": {
    "dataxapi": {
      "type": "http",
      "url": "https://api.dataxapi.com/mcp",
      "headers": {
        "Authorization": "Bearer ${DATAXAPI_API_KEY}"
      }
    }
  }
}
```

Add this to your MCP client, then ask your agent to call `tiktok.shop.products.reviews.list`.

## Responses

### 200

From a response recorded 2026-10-12 21:49 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 10.5 KB in the standard view (5.0 KB compact, 10.9 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "bd6a422d-6eae-4338-9039-dc195ae09455",
  "data": {
    "items": [
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
      },
      // … 9 more
    ]
  },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 10
  },
  "warnings": [],
  "meta": {
    "capability": "tiktok.shop.products.reviews.list",
    "result_status": "complete",
    "fetched_at": "2026-10-12T21:49:35.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {},
    "billing": {
      "amount": "0.002",
      "currency": "USD",
      "balance_after": "9.998"
    }
  }
}
```

### Empty

From a response recorded 2026-10-12 21:49 UTC. The request ID and balance are made up.

Size as sent: 416 B in the standard view (416 B compact, 416 B full).

```jsonc
{
  "code": "ok",
  "request_id": "131ceb71-14f5-4a3b-b667-28e16affb3d1",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "tiktok.shop.products.reviews.list",
    "result_status": "empty",
    "fetched_at": "2026-10-12T21:49:37.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {},
    "billing": {
      "amount": "0.002",
      "currency": "USD",
      "balance_after": "9.998"
    }
  }
}
```

### 400

An example written to the specification, not a recorded response.

```json
{
  "code": "invalid_params",
  "request_id": "c58b5aee-4e36-4d5f-9a1a-4f1d95a18ee1",
  "message": "A parameter is invalid",
  "message_zh": "参数不合法",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "problems": ["id is required"],
  "docs_url": "https://dataxapi.com/docs/errors#invalid_params"
}
```

### 402

An example written to the specification, not a recorded response.

```json
{
  "code": "insufficient_balance",
  "request_id": "ddeaaa0d-00ad-4016-a4ab-5022b67edff3",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.002",
  "available": "0",
  "docs_url": "https://dataxapi.com/docs/errors#insufficient_balance"
}
```

### 502

An example written to the specification, not a recorded response.

```json
{
  "code": "upstream_failed",
  "request_id": "4c4ace97-8e7f-4246-93a6-d8a76fe3a36f",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/tiktok/shop/products/reviews/list.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `tiktok.shop.products.reviews.list`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/tiktok/shop/products/reviews/list.md and help me use the DataXAPI endpoint tiktok.shop.products.reviews.list (TikTok Shop product reviews).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Ftiktok%2Fshop%2Fproducts%2Freviews%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20tiktok.shop.products.reviews.list%20%28TikTok%20Shop%20product%20reviews%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Ftiktok%2Fshop%2Fproducts%2Freviews%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20tiktok.shop.products.reviews.list%20%28TikTok%20Shop%20product%20reviews%29.)

## Related

Part of DataXAPI's E-commerce data. The same key also works for: Social media, Creators, Ads.

The same thing on other platforms: [Xiaohongshu product reviews](https://dataxapi.com/apis/xiaohongshu/shop/products/reviews/list/)

More E-commerce data on other platforms: [Xiaohongshu product detail](https://dataxapi.com/apis/xiaohongshu/shop/products/get/), [Xiaohongshu product search](https://dataxapi.com/apis/xiaohongshu/shop/products/search/)

TikTok Shop endpoints: [TikTok Shop product detail](https://dataxapi.com/apis/tiktok/shop/products/get/), [TikTok Shop product reviews](https://dataxapi.com/apis/tiktok/shop/products/reviews/list/), [TikTok Shop product search](https://dataxapi.com/apis/tiktok/shop/products/search/), [TikTok Shop seller products](https://dataxapi.com/apis/tiktok/shop/sellers/products/list/)

TikTok endpoints: [TikTok Ads Library search](https://dataxapi.com/apis/tiktok/ads/search/), [TikTok Ads Library ad detail](https://dataxapi.com/apis/tiktok/ads/get/), [TikTok comment replies](https://dataxapi.com/apis/tiktok/comments/replies/list/), [TikTok hashtag videos](https://dataxapi.com/apis/tiktok/hashtags/videos/list/), [TikTok user profile](https://dataxapi.com/apis/tiktok/users/get/), [TikTok user search](https://dataxapi.com/apis/tiktok/users/search/), [TikTok user videos](https://dataxapi.com/apis/tiktok/users/videos/list/), [TikTok video comments](https://dataxapi.com/apis/tiktok/videos/comments/list/), [TikTok video detail](https://dataxapi.com/apis/tiktok/videos/get/), [TikTok video search](https://dataxapi.com/apis/tiktok/videos/search/), [TikTok video transcript](https://dataxapi.com/apis/tiktok/videos/transcript/get/), [TikTok user followers](https://dataxapi.com/apis/tiktok/users/followers/list/)

TikTok Creative Center endpoints: [TikTok Creative Center Top Ad detail](https://dataxapi.com/apis/tiktok/creative_center/ads/get/), [TikTok Creative Center Top Ads search](https://dataxapi.com/apis/tiktok/creative_center/ads/search/)

How-to guides and answers: [How to search TikTok Shop products and read their reviews](https://dataxapi.com/guides/tiktok-shop-product-reviews/)

Skills that use this endpoint: [Products and reviews](https://dataxapi.com/skills/products/)

Related: [All TikTok Shop endpoints](https://dataxapi.com/apis/tiktok/shop/), [All TikTok endpoints](https://dataxapi.com/apis/tiktok/), [E-commerce data](https://dataxapi.com/categories/commerce/), [The same thing on 2 platforms, side by side](https://dataxapi.com/roles/products-reviews-list/), [The review object's fields](https://dataxapi.com/docs/objects/review/)

## Questions

### How much does the TikTok Shop product reviews API cost?

$0.0020 per call. The most one call can cost is $0.0020.

### When am I not charged?

Errors and timeouts are not charged; an empty result is charged $0.0020.

### How many items does one call return, and how do I get the next page?

10 items a page. The page size is the platform's; limit is not accepted. Everything comes in one page; no cursor is issued.

### What happens if the object does not exist?

A product that does not exist cannot be told from a product without reviews: both return an empty result, not a 404, and are charged as an empty result is.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/tiktok/shop/products/reviews/list/)

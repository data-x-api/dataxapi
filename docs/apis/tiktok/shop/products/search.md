# TikTok Shop product search API

Search the products of TikTok Shop in the United States by terms: title, current and original price, rating, units sold, shop. About 48 items a call, 60 at most; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Endpoint: `GET https://api.dataxapi.com/v1/tiktok/shop/products/search`
- ID: `tiktok.shop.products.search`
- Also known as: tiktok shop search, search tiktok products
- Price: $0.0020 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: up to 60 a page, everything in one answer, no paging
- Returns product, a preview structure that may still change
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=tiktok.shop.products.search&params=%7B%22query%22%3A%22yoga+mat%22%7D)
- In Chinese: [TikTok Shop 商品搜索 API](https://dataxapi.com/zh/apis/tiktok/shop/products/search/)

## What you get

The first 4 rows of a response recorded 2026-10-12 21:46 UTC.

| Field | Value |
| --- | --- |
| price | 18.99 |
| original_price | 19.99 |
| rating | 4.6 |
| metrics.sold | 1,232 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `query` | text | Yes | Search terms. Example: `yoga mat`. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.items` is a list of product objects. Preview: the structure may change, announced beforehand.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `id` | text | ID; pass it unchanged to the endpoints that get the product and list its reviews. | `compact` | Yes |
| `url` | link | Link that opens the product. | `compact` | Yes |
| `title` | text | Title of the product. | `compact` | Yes |
| `description` | text | The text of the product's description. Long text: the compact view keeps the first 500 characters and says so in `warnings`. | `standard` | Not provided here |
| `price` | amount | Current price; the lowest one when its variants are priced differently. | `compact` | Yes |
| `original_price` | amount | The price before the discount; null when there is none. | `standard` | Yes |
| `currency` | text | Currency of the prices, an ISO 4217 code. | `compact` | Yes |
| `images` | list of link | Addresses of the product's pictures. | `standard` | Yes |
| `rating` | number | Buyers' rating, out of 5. | `compact` | Yes |
| `metrics` | object | Product counts. | `compact` | Yes |
| `metrics.sold` | integer | Units sold. | `compact` | Yes |
| `metrics.reviews` | integer | Reviews. | `compact` | Not provided here |
| `shop` | object | The shop that sells it. | `compact` | Yes |
| `shop.id` | text | Shop ID. | `compact` | Yes |
| `shop.name` | text | Name of the shop. | `compact` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 346 B, `standard` 612 B, `full` 612 B (measured on the response recorded 2026-10-12 21:46 UTC).

## Paging

About 48 items a page, 60 at most. The page size is the platform's; `limit` is not accepted.

Everything comes in one page; no cursor is issued.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0020, once per call |
| An empty result | $0.0020 |
| Invalid parameters, a failure of ours or of the data source, a timeout | not charged |
| The most one call can cost | $0.0020 (send `X-Max-Price` to refuse anything above your own limit) |

Prices as read 2026-10-18 19:59 UTC, under price book 2, in effect since 2026-10-17 11:00 UTC; the Playground reads the price in force before a run.

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
curl -G "https://api.dataxapi.com/v1/tiktok/shop/products/search" \
  --data-urlencode "query=yoga mat" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.tiktok.shop.products.search(query="yoga mat")
print(result["data"]["items"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.tiktok.shop.products.search({ query: "yoga mat" });
console.log(result.data.items);
```

### CLI

```bash
dataxapi call tiktok.shop.products.search 'query=yoga mat'
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

Add this to your MCP client, then ask your agent to call `tiktok.shop.products.search`.

## Responses

### 200

From a response recorded 2026-10-12 21:46 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 14.2 KB in the standard view (8.2 KB compact, 14.2 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "56d10893-6768-479f-b127-a8e6ee077873",
  "data": {
    "items": [
      {
        "id": "1750923004242032614",
        "url": "https://shop.tiktok.com/view/product/1750923004242032614",
        "title": "Yoga mat: a beginner's guide in 8 minutes",
        "price": "18.99",
        "original_price": "19.99",
        "currency": "USD",
        "images": [
          "https://p16-sign-va.tiktokcdn.com/tos-maliva-p-0068/93dde11aaaba8ca57d1f~c5_720x720.jpeg"
        ],
        "rating": 4.6,
        "metrics": { "sold": 1232 },
        "shop": { "id": "1719706733287275062", "name": "Pine & Oak Home" }
      },
      // … 22 more
    ]
  },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 23
  },
  "warnings": [],
  "meta": {
    "capability": "tiktok.shop.products.search",
    "result_status": "complete",
    "fetched_at": "2026-10-12T21:46:03.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "description": "capability",
      "metrics.reviews": "capability"
    },
    "billing": {
      "amount": "0.002",
      "currency": "USD",
      "balance_after": "9.998"
    }
  }
}
```

### Empty

From a response recorded 2026-10-12 21:47 UTC. The request ID and balance are made up.

Size as sent: 467 B in the standard view (467 B compact, 467 B full).

```jsonc
{
  "code": "ok",
  "request_id": "80a6238c-c3ce-4c0d-aa3c-354c5d31e45b",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "tiktok.shop.products.search",
    "result_status": "empty",
    "fetched_at": "2026-10-12T21:47:37.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "description": "capability",
      "metrics.reviews": "capability"
    },
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
  "request_id": "0e8603be-01ff-48e9-a4ac-dfd012279a6c",
  "message": "A parameter is invalid",
  "message_zh": "参数不合法",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "problems": ["query is required"],
  "docs_url": "https://dataxapi.com/docs/errors#invalid_params"
}
```

### 402

An example written to the specification, not a recorded response.

```json
{
  "code": "insufficient_balance",
  "request_id": "8b74ea1e-6d9f-4908-a205-0910b9a14ad4",
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
  "request_id": "31b48db9-b1b0-4d00-a002-b025e55235b4",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/tiktok/shop/products/search.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `tiktok.shop.products.search`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/tiktok/shop/products/search.md and help me use the DataXAPI endpoint tiktok.shop.products.search (TikTok Shop product search).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Ftiktok%2Fshop%2Fproducts%2Fsearch.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20tiktok.shop.products.search%20%28TikTok%20Shop%20product%20search%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Ftiktok%2Fshop%2Fproducts%2Fsearch.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20tiktok.shop.products.search%20%28TikTok%20Shop%20product%20search%29.)

## Related

Part of DataXAPI's E-commerce data. The same key also works for: Social media, Creators, Ads.

The same thing on other platforms: [Xiaohongshu product search](https://dataxapi.com/apis/xiaohongshu/shop/products/search/)

More E-commerce data on other platforms: [Xiaohongshu product detail](https://dataxapi.com/apis/xiaohongshu/shop/products/get/), [Xiaohongshu product reviews](https://dataxapi.com/apis/xiaohongshu/shop/products/reviews/list/)

TikTok Shop endpoints: [TikTok Shop product detail](https://dataxapi.com/apis/tiktok/shop/products/get/), [TikTok Shop product reviews](https://dataxapi.com/apis/tiktok/shop/products/reviews/list/), [TikTok Shop product search](https://dataxapi.com/apis/tiktok/shop/products/search/), [TikTok Shop seller products](https://dataxapi.com/apis/tiktok/shop/sellers/products/list/)

TikTok endpoints: [TikTok Ads Library search](https://dataxapi.com/apis/tiktok/ads/search/), [TikTok Ads Library ad detail](https://dataxapi.com/apis/tiktok/ads/get/), [TikTok comment replies](https://dataxapi.com/apis/tiktok/comments/replies/list/), [TikTok hashtag videos](https://dataxapi.com/apis/tiktok/hashtags/videos/list/), [TikTok user profile](https://dataxapi.com/apis/tiktok/users/get/), [TikTok user search](https://dataxapi.com/apis/tiktok/users/search/), [TikTok user videos](https://dataxapi.com/apis/tiktok/users/videos/list/), [TikTok video comments](https://dataxapi.com/apis/tiktok/videos/comments/list/), [TikTok video detail](https://dataxapi.com/apis/tiktok/videos/get/), [TikTok video search](https://dataxapi.com/apis/tiktok/videos/search/), [TikTok video transcript](https://dataxapi.com/apis/tiktok/videos/transcript/get/), [TikTok user followers](https://dataxapi.com/apis/tiktok/users/followers/list/)

TikTok Creative Center endpoints: [TikTok Creative Center Top Ad detail](https://dataxapi.com/apis/tiktok/creative_center/ads/get/), [TikTok Creative Center Top Ads search](https://dataxapi.com/apis/tiktok/creative_center/ads/search/)

How-to guides and answers: [How to search TikTok Shop products and read their reviews](https://dataxapi.com/guides/tiktok-shop-product-reviews/)

Skills that use this endpoint: [Products and reviews](https://dataxapi.com/skills/products/)

Related: [All TikTok Shop endpoints](https://dataxapi.com/apis/tiktok/shop/), [All TikTok endpoints](https://dataxapi.com/apis/tiktok/), [E-commerce data](https://dataxapi.com/categories/commerce/), [The same thing on 2 platforms, side by side](https://dataxapi.com/roles/products-search/), [The product object's fields](https://dataxapi.com/docs/objects/product/)

## Questions

### How much does the TikTok Shop product search API cost?

$0.0020 per call. The most one call can cost is $0.0020.

### When am I not charged?

Errors and timeouts are not charged; an empty result is charged $0.0020.

### How many items does one call return, and how do I get the next page?

About 48 items a page, 60 at most. The page size is the platform's; limit is not accepted. Everything comes in one page; no cursor is issued.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/tiktok/shop/products/search/)

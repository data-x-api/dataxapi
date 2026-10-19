# Xiaohongshu (RedNote) product search API

Search the products of Xiaohongshu's shop by terms: title, current and original price in yuan, units sold, picture, shop. Up to 20 items a call; $0.0200 per call. Errors and timeouts are not charged; an empty result is charged $0.0200.

- Endpoint: `GET https://api.dataxapi.com/v1/xiaohongshu/shop/products/search`
- ID: `xiaohongshu.shop.products.search`
- Also known as: rednote product search, xhs shop search
- Price: $0.0200 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 20 a page, a page, with a cursor for the next
- Returns product, a preview structure that may still change
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=xiaohongshu.shop.products.search&params=%7B%22query%22%3A%22%E9%98%B2%E6%99%92%E9%9C%9C%22%7D)
- In Chinese: [小红书商品搜索 API](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/search/)

## What you get

The first 2 rows of a response recorded 2026-10-12 21:55 UTC.

| Field | Value |
| --- | --- |
| price | 17.9 |
| metrics.sold | 4,027 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `query` | text | Yes | Search terms. Example: `防晒霜`. |
| `cursor` | text |  | Cursor returned by the previous page. Pass `page.next_cursor` of the page before, unchanged. Each page is charged as a call of its own. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.items` is a list of product objects. Preview: the structure may change, announced beforehand.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `id` | text | ID; pass it unchanged to the endpoints that get the product and list its reviews. | `compact` | Yes |
| `url` | link | Link that opens the product. | `compact` | Not provided here |
| `title` | text | Title of the product. On this platform: The title as the result card words it, which may differ from the title on the product's page. | `compact` | Yes |
| `description` | text | The text of the product's description. Long text: the compact view keeps the first 500 characters and says so in `warnings`. | `standard` | Not provided here |
| `price` | amount | Current price; the lowest one when its variants are priced differently. | `compact` | Yes |
| `original_price` | amount | The price before the discount; null when there is none. | `standard` | Yes |
| `currency` | text | Currency of the prices, an ISO 4217 code. | `compact` | Yes |
| `images` | list of link | Addresses of the product's pictures. On this platform: The one picture of the result card; the product itself has all of them. | `standard` | Yes |
| `rating` | number | Buyers' rating, out of 5. | `compact` | Not provided here |
| `metrics` | object | Product counts. | `compact` | Yes |
| `metrics.sold` | integer | Units sold. On this platform: Units sold as the result card shows them. | `compact` | Yes |
| `metrics.reviews` | integer | Reviews. | `compact` | Not provided here |
| `shop` | object | The shop that sells it. | `compact` | Yes |
| `shop.id` | text | Shop ID. | `compact` | Yes |
| `shop.name` | text | Name of the shop. | `compact` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 264 B, `standard` 438 B, `full` 438 B (measured on the response recorded 2026-10-12 21:55 UTC).

## Paging

20 items a page. The page size is the platform's; `limit` is not accepted.

For the next page pass `page.next_cursor` as `cursor`; a cursor is valid for 1 hour. `page.has_more` is false on the last page.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0200, once per call |
| Each further page | charged as a call of its own |
| An empty result | $0.0200 |
| Invalid parameters, a failure of ours or of the data source, a timeout | not charged |
| The most one call can cost | $0.0200 (send `X-Max-Price` to refuse anything above your own limit) |

Prices as read 2026-10-18 19:59 UTC, under price book 2, in effect since 2026-10-17 11:00 UTC; the Playground reads the price in force before a run.

## Errors

Every error has the same structure: `code`, `message`, `charged`, `retry`, `retry_after_seconds`, `param`, `docs_url`.

| HTTP | Code | Meaning | Charged | Retry |
| --- | --- | --- | --- | --- |
| 400 | `invalid_params` | A parameter is invalid | No | After a fix |
| 400 | `request_not_served` | This combination of parameters cannot be served at present | No | After a fix |
| 400 | `max_price_exceeded` | The most this call could cost is above the limit you set | No | After a fix |
| 400 | `cursor_invalid` | The cursor does not exist | No | No |
| 400 | `cursor_mismatch` | The cursor was issued for another endpoint or other parameters | No | After a fix |
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
| 410 | `cursor_expired` | The cursor expired; start again from the first page | No | No |
| 410 | `run_expired` | This run has expired and starts no more calls | No | No |
| 429 | `rate_limited` | Too many requests, or too many calls in progress | No | Yes |
| 429 | `cost_cap_exceeded` | This account's allowance for today is used up | No | Yes |
| 429 | `uncharged_cost_limit` | Too many of this account's calls today returned nothing and were not charged; endpoints of this kind can be called again tomorrow (UTC) | No | Yes |
| 500 | `settlement_unknown` | Whether this call settled is not known; ask again with the same idempotency key, or look it up by request ID | Unknown: look the call up | With the same idempotency key |
| 500 | `internal_error` | The service failed | No | Yes |
| 502 | `upstream_failed` | The data source failed | No | Yes |
| 502 | `upstream_changed` | The data source returned an unexpected structure | No | Yes |
| 502 | `upstream_unclear` | The data source's answer could not be interpreted; retry at most once | No | Once |
| 502 | `cursor_unavailable` | The data source this cursor belongs to is unavailable; retry later or start again from the first page | No | Yes |
| 503 | `upstream_busy` | The data source is busy; retry shortly | No | Yes |
| 503 | `capability_paused` | This endpoint is paused | No | Yes |
| 503 | `overloaded` | The service is busy; retry shortly | No | Yes |
| 504 | `timeout` | The data did not arrive in time; retry with the same idempotency key | No | Yes |

[All error codes](https://dataxapi.com/docs/errors/)

## Request

The key is read from the environment; no key is ever written into a page.

### cURL

```bash
curl -G "https://api.dataxapi.com/v1/xiaohongshu/shop/products/search" \
  --data-urlencode "query=防晒霜" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.xiaohongshu.shop.products.search(query="防晒霜")
print(result["data"]["items"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.xiaohongshu.shop.products.search({ query: "防晒霜" });
console.log(result.data.items);
```

### CLI

```bash
dataxapi call xiaohongshu.shop.products.search 'query=防晒霜'
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

Add this to your MCP client, then ask your agent to call `xiaohongshu.shop.products.search`.

## Responses

### 200

From a response recorded 2026-10-12 21:55 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 8.7 KB in the standard view (5.4 KB compact, 8.7 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "1057f8a1-fd9b-4c22-8a64-0b39cef3c0ca",
  "data": {
    "items": [
      {
        "id": "607f46a700000000d2ac43b7",
        "title": "防晒霜装备清单，新手照着买就行",
        "price": "17.9",
        "original_price": null,
        "currency": "CNY",
        "images": [
          "https://sns-webpic-qc.xhscdn.com/20261015/d34e2e29ca04742dcce6!nd_dft_wlteh_webp_3"
        ],
        "metrics": { "sold": 4027 },
        "shop": { "id": "61f3eff20000000059f57a3b", "name": "木与光家居店" }
      },
      // … 18 more
    ]
  },
  "page": {
    "next_cursor": "c1.U7GaOWwl4KEr-8bH3IgJ8L9E0bROr0O-MTl8yQHt",
    "cursor_expires_at": "2026-10-12T22:55:07.000Z",
    "has_more": true,
    "returned": 19
  },
  "warnings": [],
  "meta": {
    "capability": "xiaohongshu.shop.products.search",
    "result_status": "complete",
    "fetched_at": "2026-10-12T21:55:07.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "url": "capability",
      "description": "capability",
      "rating": "capability",
      "metrics.reviews": "capability"
    },
    "billing": {
      "amount": "0.02",
      "currency": "USD",
      "balance_after": "9.98"
    }
  }
}
```

### Empty

From a response recorded 2026-10-12 21:56 UTC. The request ID and balance are made up.

Size as sent: 513 B in the standard view (513 B compact, 513 B full).

```jsonc
{
  "code": "ok",
  "request_id": "997f3d31-91cb-4a34-8764-eceba6b97e15",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "xiaohongshu.shop.products.search",
    "result_status": "empty",
    "fetched_at": "2026-10-12T21:56:24.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "url": "capability",
      "description": "capability",
      "rating": "capability",
      "metrics.reviews": "capability"
    },
    "billing": {
      "amount": "0.02",
      "currency": "USD",
      "balance_after": "9.98"
    }
  }
}
```

### 400

An example written to the specification, not a recorded response.

```json
{
  "code": "invalid_params",
  "request_id": "b69aa880-2158-4d1a-93de-69ccdb1addb8",
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
  "request_id": "ced0d235-955c-495d-b5c8-b07195687f41",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.02",
  "available": "0",
  "docs_url": "https://dataxapi.com/docs/errors#insufficient_balance"
}
```

### 502

An example written to the specification, not a recorded response.

```json
{
  "code": "upstream_failed",
  "request_id": "ce17b95f-7f9c-45a2-b7d2-71c1eb07570a",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/xiaohongshu/shop/products/search.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `xiaohongshu.shop.products.search`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/xiaohongshu/shop/products/search.md and help me use the DataXAPI endpoint xiaohongshu.shop.products.search (Xiaohongshu (RedNote) product search).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fxiaohongshu%2Fshop%2Fproducts%2Fsearch.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20xiaohongshu.shop.products.search%20%28Xiaohongshu%20%28RedNote%29%20product%20search%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fxiaohongshu%2Fshop%2Fproducts%2Fsearch.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20xiaohongshu.shop.products.search%20%28Xiaohongshu%20%28RedNote%29%20product%20search%29.)

## Related

Part of DataXAPI's E-commerce data. The same key also works for: Social media, Creators, Ads.

The same thing on other platforms: [TikTok Shop product search](https://dataxapi.com/apis/tiktok/shop/products/search/)

More E-commerce data on other platforms: [TikTok Shop product detail](https://dataxapi.com/apis/tiktok/shop/products/get/), [TikTok Shop seller products](https://dataxapi.com/apis/tiktok/shop/sellers/products/list/), [TikTok Shop product reviews](https://dataxapi.com/apis/tiktok/shop/products/reviews/list/)

Xiaohongshu Shop endpoints: [Xiaohongshu product detail](https://dataxapi.com/apis/xiaohongshu/shop/products/get/), [Xiaohongshu product reviews](https://dataxapi.com/apis/xiaohongshu/shop/products/reviews/list/), [Xiaohongshu product search](https://dataxapi.com/apis/xiaohongshu/shop/products/search/)

Xiaohongshu (RedNote) endpoints: [Xiaohongshu image search](https://dataxapi.com/apis/xiaohongshu/images/search/), [Xiaohongshu note detail](https://dataxapi.com/apis/xiaohongshu/notes/get/), [Xiaohongshu comment replies](https://dataxapi.com/apis/xiaohongshu/comments/replies/list/), [Xiaohongshu note comments](https://dataxapi.com/apis/xiaohongshu/notes/comments/list/), [Xiaohongshu note search](https://dataxapi.com/apis/xiaohongshu/notes/search/), [Xiaohongshu topic notes](https://dataxapi.com/apis/xiaohongshu/topics/notes/list/), [Xiaohongshu topic detail](https://dataxapi.com/apis/xiaohongshu/topics/get/), [Xiaohongshu trends](https://dataxapi.com/apis/xiaohongshu/trends/list/), [Xiaohongshu user profile](https://dataxapi.com/apis/xiaohongshu/users/get/), [Xiaohongshu user notes](https://dataxapi.com/apis/xiaohongshu/users/notes/list/), [Xiaohongshu user search](https://dataxapi.com/apis/xiaohongshu/users/search/)

Xiaohongshu PGY endpoints: [Xiaohongshu PGY keyword search index](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/history/), [Xiaohongshu PGY related keywords](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/related/), [Xiaohongshu PGY creator search](https://dataxapi.com/apis/xiaohongshu/pgy/creators/search/), [Xiaohongshu PGY creator detail](https://dataxapi.com/apis/xiaohongshu/pgy/creators/get/), [Xiaohongshu PGY creator audience profile](https://dataxapi.com/apis/xiaohongshu/pgy/creators/audience/get/), [Xiaohongshu PGY creator metrics](https://dataxapi.com/apis/xiaohongshu/pgy/creators/metrics/), [Xiaohongshu PGY creator notes](https://dataxapi.com/apis/xiaohongshu/pgy/creators/notes/list/)

Skills that use this endpoint: [Products and reviews](https://dataxapi.com/skills/products/)

Related: [All Xiaohongshu Shop endpoints](https://dataxapi.com/apis/xiaohongshu/shop/), [All Xiaohongshu (RedNote) endpoints](https://dataxapi.com/apis/xiaohongshu/), [E-commerce data](https://dataxapi.com/categories/commerce/), [The same thing on 2 platforms, side by side](https://dataxapi.com/roles/products-search/), [The product object's fields](https://dataxapi.com/docs/objects/product/)

## Questions

### How much does the Xiaohongshu (RedNote) product search API cost?

$0.0200 per call. The most one call can cost is $0.0200.

### When am I not charged?

Errors and timeouts are not charged; an empty result is charged $0.0200.

### How many items does one call return, and how do I get the next page?

20 items a page. The page size is the platform's; limit is not accepted. For the next page pass page.next_cursor as cursor; a cursor is valid for 1 hour. page.has_more is false on the last page.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/xiaohongshu/shop/products/search/)

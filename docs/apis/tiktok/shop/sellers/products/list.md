# TikTok Shop seller products API

Get a page of the products a TikTok Shop seller in the United States has on sale by the seller's ID: title, current and original price, rating, reviews, units sold. Up to 20 items a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0020.

- Endpoint: `GET https://api.dataxapi.com/v1/tiktok/shop/sellers/products/list`
- ID: `tiktok.shop.sellers.products.list`
- Also known as: tiktok shop store products, tiktok seller catalog
- Price: $0.0020 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 20 a page, a page, with a cursor for the next
- Returns product, a preview structure that may still change
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=tiktok.shop.sellers.products.list&params=%7B%22id%22%3A%228651645720603103776%22%7D)
- In Chinese: [TikTok Shop 店铺商品 API](https://dataxapi.com/zh/apis/tiktok/shop/sellers/products/list/)

## What you get

The first 5 rows of a response recorded 2026-10-12 21:46 UTC.

| Field | Value |
| --- | --- |
| price | 26 |
| original_price | 29 |
| rating | 4.6 |
| metrics.sold | 3,911 |
| metrics.reviews | 379 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `id` | text | Yes | Seller ID, a string of digits (the last segment of the shop's link). Example: `8651645720603103776`. |
| `cursor` | text |  | Cursor returned by the previous page. Pass `page.next_cursor` of the page before, unchanged. Each page is charged as a call of its own. |
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
| `metrics.reviews` | integer | Reviews. | `compact` | Yes |
| `shop` | object | The shop that sells it. | `compact` | Yes |
| `shop.id` | text | Shop ID. | `compact` | Yes |
| `shop.name` | text | Name of the shop. | `compact` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 379 B, `standard` 647 B, `full` 647 B (measured on the response recorded 2026-10-12 21:46 UTC).

## Paging

20 items a page. The page size is the platform's; `limit` is not accepted.

For the next page pass `page.next_cursor` as `cursor`; a cursor is valid for 1 hour. `page.has_more` is false on the last page.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0020, once per call |
| Each further page | charged as a call of its own |
| An empty result | $0.0020 |
| The object does not exist (404) | not charged |
| Invalid parameters, a failure of ours or of the data source, a timeout | not charged |
| The most one call can cost | $0.0020 (send `X-Max-Price` to refuse anything above your own limit) |

Prices as read 2026-10-18 19:59 UTC, under price book 2, in effect since 2026-10-17 11:00 UTC; the Playground reads the price in force before a run.

## If the object does not exist

The answer is 404 `not_found` and nothing is charged. `reason` says which: `not_found` (it does not exist) or `private_or_deleted`.

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
| 404 | `not_found` | The object does not exist, is private or was deleted | No | No |
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
curl -G "https://api.dataxapi.com/v1/tiktok/shop/sellers/products/list" \
  --data-urlencode "id=8651645720603103776" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.tiktok.shop.sellers.products.list(id="8651645720603103776")
print(result["data"]["items"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.tiktok.shop.sellers.products.list({ id: "8651645720603103776" });
console.log(result.data.items);
```

### CLI

```bash
dataxapi call tiktok.shop.sellers.products.list id=8651645720603103776
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

Add this to your MCP client, then ask your agent to call `tiktok.shop.sellers.products.list`.

## Responses

### 200

From a response recorded 2026-10-12 21:46 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 13.1 KB in the standard view (7.9 KB compact, 13.1 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "c9652b53-450b-4d59-b23d-a45ce6013cd4",
  "data": {
    "items": [
      {
        "id": "1797903468215829234",
        "url": "https://shop.tiktok.com/view/product/1797903468215829234",
        "title": "I tried weekend hiking for 30 days. Here is what happened",
        "price": "26",
        "original_price": "29",
        "currency": "USD",
        "images": [
          "https://p16-sign-va.tiktokcdn.com/tos-maliva-p-0068/09aa2fa0959c3f6ee5bb~c5_720x720.jpeg"
        ],
        "rating": 4.6,
        "metrics": { "sold": 3911, "reviews": 379 },
        "shop": {
          "id": "1729171354647243144",
          "name": "Northside Coffee Shop"
        }
      },
      // … 19 more
    ]
  },
  "page": {
    "next_cursor": "c1.-iufgZ_th2rdpk8b7ViTQhKL9rxqI9vRngIHIg9Q",
    "cursor_expires_at": "2026-10-12T22:46:06.000Z",
    "has_more": true,
    "returned": 20
  },
  "warnings": [],
  "meta": {
    "capability": "tiktok.shop.sellers.products.list",
    "result_status": "complete",
    "fetched_at": "2026-10-12T21:46:06.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": { "description": "capability" },
    "billing": {
      "amount": "0.002",
      "currency": "USD",
      "balance_after": "9.998"
    }
  }
}
```

### Empty

From a recording of 2026-10-12 21:46 UTC, edited by hand to show this case. The request ID and balance are made up.

Size as sent: 442 B in the standard view (442 B compact, 442 B full).

```jsonc
{
  "code": "ok",
  "request_id": "70752200-8b5d-49da-beb4-fcf421ce92ab",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "tiktok.shop.sellers.products.list",
    "result_status": "empty",
    "fetched_at": "2026-10-12T21:46:06.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": { "description": "capability" },
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
  "request_id": "8b3ee7f6-1277-419a-85c4-40df6ef1148a",
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
  "request_id": "baea67cf-5f1d-4adc-ad73-da7467ccd150",
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

### 404

An example written to the specification, not a recorded response.

```json
{
  "code": "not_found",
  "request_id": "a3c7273a-1372-4da7-941d-ddf47aad606e",
  "message": "The object does not exist, is private or was deleted",
  "message_zh": "对象不存在、私密或已删除",
  "charged": false,
  "retry": "no",
  "retry_after_seconds": null,
  "param": null,
  "reason": "not_found",
  "docs_url": "https://dataxapi.com/docs/errors#not_found"
}
```

### 502

An example written to the specification, not a recorded response.

```json
{
  "code": "upstream_failed",
  "request_id": "555016b9-ff89-44bd-a3bf-6dbfd412ae42",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/tiktok/shop/sellers/products/list.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `tiktok.shop.sellers.products.list`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/tiktok/shop/sellers/products/list.md and help me use the DataXAPI endpoint tiktok.shop.sellers.products.list (TikTok Shop seller products).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Ftiktok%2Fshop%2Fsellers%2Fproducts%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20tiktok.shop.sellers.products.list%20%28TikTok%20Shop%20seller%20products%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Ftiktok%2Fshop%2Fsellers%2Fproducts%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20tiktok.shop.sellers.products.list%20%28TikTok%20Shop%20seller%20products%29.)

## Related

Part of DataXAPI's E-commerce data. The same key also works for: Social media, Creators, Ads.

More E-commerce data on other platforms: [Xiaohongshu product detail](https://dataxapi.com/apis/xiaohongshu/shop/products/get/), [Xiaohongshu product search](https://dataxapi.com/apis/xiaohongshu/shop/products/search/), [Xiaohongshu product reviews](https://dataxapi.com/apis/xiaohongshu/shop/products/reviews/list/)

TikTok Shop endpoints: [TikTok Shop product detail](https://dataxapi.com/apis/tiktok/shop/products/get/), [TikTok Shop product reviews](https://dataxapi.com/apis/tiktok/shop/products/reviews/list/), [TikTok Shop product search](https://dataxapi.com/apis/tiktok/shop/products/search/), [TikTok Shop seller products](https://dataxapi.com/apis/tiktok/shop/sellers/products/list/)

TikTok endpoints: [TikTok Ads Library search](https://dataxapi.com/apis/tiktok/ads/search/), [TikTok Ads Library ad detail](https://dataxapi.com/apis/tiktok/ads/get/), [TikTok comment replies](https://dataxapi.com/apis/tiktok/comments/replies/list/), [TikTok hashtag videos](https://dataxapi.com/apis/tiktok/hashtags/videos/list/), [TikTok user profile](https://dataxapi.com/apis/tiktok/users/get/), [TikTok user search](https://dataxapi.com/apis/tiktok/users/search/), [TikTok user videos](https://dataxapi.com/apis/tiktok/users/videos/list/), [TikTok video comments](https://dataxapi.com/apis/tiktok/videos/comments/list/), [TikTok video detail](https://dataxapi.com/apis/tiktok/videos/get/), [TikTok video search](https://dataxapi.com/apis/tiktok/videos/search/), [TikTok video transcript](https://dataxapi.com/apis/tiktok/videos/transcript/get/), [TikTok user followers](https://dataxapi.com/apis/tiktok/users/followers/list/)

TikTok Creative Center endpoints: [TikTok Creative Center Top Ad detail](https://dataxapi.com/apis/tiktok/creative_center/ads/get/), [TikTok Creative Center Top Ads search](https://dataxapi.com/apis/tiktok/creative_center/ads/search/)

Related: [All TikTok Shop endpoints](https://dataxapi.com/apis/tiktok/shop/), [All TikTok endpoints](https://dataxapi.com/apis/tiktok/), [E-commerce data](https://dataxapi.com/categories/commerce/), [The product object's fields](https://dataxapi.com/docs/objects/product/)

## Questions

### How much does the TikTok Shop seller products API cost?

$0.0020 per call. The most one call can cost is $0.0020.

### When am I not charged?

Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0020.

### How many items does one call return, and how do I get the next page?

20 items a page. The page size is the platform's; limit is not accepted. For the next page pass page.next_cursor as cursor; a cursor is valid for 1 hour. page.has_more is false on the last page.

### What happens if the object does not exist?

The answer is 404 not_found and nothing is charged. reason says which: not_found (it does not exist) or private_or_deleted.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/tiktok/shop/sellers/products/list/)

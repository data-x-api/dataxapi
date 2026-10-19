# Meta advertiser search API

Find advertisers (Facebook pages) in the Meta Ad Library by name: ID, name, picture, category, page likes, the linked Instagram account. The ID is what the advertiser's ads are asked for by. Up to 15 items a call; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Endpoint: `GET https://api.dataxapi.com/v1/meta/advertisers/search`
- ID: `meta.advertisers.search`
- Also known as: search facebook advertisers, find a brand's page id for ads, meta ad library companies
- Price: $0.0020 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 15 a page, everything in one answer, no paging
- Returns advertiser, a preview structure that may still change
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=meta.advertisers.search&params=%7B%22query%22%3A%22puma%22%7D)
- In Chinese: [Meta 广告主搜索 API](https://dataxapi.com/zh/apis/meta/advertisers/search/)

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `query` | text | Yes | Name of the advertiser or brand. Example: `puma`. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.items` is a list of advertiser objects. Preview: the structure may change, announced beforehand.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `id` | text | ID; pass it unchanged to the advertiser's ads endpoint. | `compact` | Yes |
| `name` | text | Name. | `compact` | Yes |
| `avatar_url` | link | Picture or logo. | `standard` | Yes |
| `region` | text | Code of the country or region the advertiser is registered in. | `compact` | Not provided here |
| `ext.username` | text | Handle of the Facebook page. | `full` | Yes |
| `ext.verified` | yes/no | Whether the page carries the blue verified badge. | `full` | Yes |
| `ext.category` | text | The page's category, as the platform words it. | `full` | Yes |
| `ext.likes` | integer | People who like the page. | `full` | Yes |
| `ext.instagram_username` | text | Handle of the linked Instagram account; null when none is linked. | `full` | Yes |
| `ext.instagram_followers` | integer | Followers of the linked Instagram account. | `full` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 46 B, `standard` 476 B, `full` 631 B (measured on the response recorded 2026-10-12 21:44 UTC).

## Paging

15 items a page. The page size is the platform's; `limit` is not accepted.

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
curl -G "https://api.dataxapi.com/v1/meta/advertisers/search" \
  --data-urlencode "query=puma" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.meta.advertisers.search(query="puma")
print(result["data"]["items"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.meta.advertisers.search({ query: "puma" });
console.log(result.data.items);
```

### CLI

```bash
dataxapi call meta.advertisers.search query=puma
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

Add this to your MCP client, then ask your agent to call `meta.advertisers.search`.

## Responses

### 200

From a response recorded 2026-10-12 21:44 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 7.4 KB in the standard view (1.1 KB compact, 9.7 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "f0edf122-e137-45dc-a006-e92f5a4e8d1a",
  "data": {
    "items": [
      {
        "id": "109302004765630",
        "name": "Lumen Outdoor",
        "avatar_url": "https://scontent.xx.fbcdn.net/v/t39.30808-1/487718865_122396809446085_n.jpg"
      },
      // … 14 more
    ]
  },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 15
  },
  "warnings": [],
  "meta": {
    "capability": "meta.advertisers.search",
    "result_status": "complete",
    "fetched_at": "2026-10-12T21:44:03.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": { "region": "capability" },
    "billing": {
      "amount": "0.002",
      "currency": "USD",
      "balance_after": "9.998"
    }
  }
}
```

### Empty

From a response recorded 2026-10-12 21:44 UTC. The request ID and balance are made up.

Size as sent: 427 B in the standard view (427 B compact, 427 B full).

```jsonc
{
  "code": "ok",
  "request_id": "6ae43f3b-7c31-46c9-a3b4-a0ef7bfadfc4",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "meta.advertisers.search",
    "result_status": "empty",
    "fetched_at": "2026-10-12T21:44:17.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": { "region": "capability" },
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
  "request_id": "b4cb82e4-85e9-46b6-a461-887b6a5a6a6c",
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
  "request_id": "0a2bb60f-173b-4919-beaa-a34c56c1f632",
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
  "request_id": "65c26815-e673-4106-a5e6-b1bfb766381e",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/meta/advertisers/search.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `meta.advertisers.search`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/meta/advertisers/search.md and help me use the DataXAPI endpoint meta.advertisers.search (Meta advertiser search).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fmeta%2Fadvertisers%2Fsearch.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20meta.advertisers.search%20%28Meta%20advertiser%20search%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fmeta%2Fadvertisers%2Fsearch.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20meta.advertisers.search%20%28Meta%20advertiser%20search%29.)

## Related

Part of DataXAPI's Ads data. The same key also works for: Social media, Creators, E-commerce.

The same thing on other platforms: [Google advertiser search](https://dataxapi.com/apis/google/advertisers/search/)

More Ads data on other platforms: [Google ad detail](https://dataxapi.com/apis/google/ads/get/), [Google advertiser's ads](https://dataxapi.com/apis/google/advertisers/ads/list/), [LinkedIn ad detail](https://dataxapi.com/apis/linkedin/ads/get/), [LinkedIn Ad Library search](https://dataxapi.com/apis/linkedin/ads/search/), [TikTok Ads Library search](https://dataxapi.com/apis/tiktok/ads/search/), [TikTok Ads Library ad detail](https://dataxapi.com/apis/tiktok/ads/get/), [TikTok Creative Center Top Ad detail](https://dataxapi.com/apis/tiktok/creative_center/ads/get/), [TikTok Creative Center Top Ads search](https://dataxapi.com/apis/tiktok/creative_center/ads/search/)

Meta Ad Library endpoints: [Meta ad detail](https://dataxapi.com/apis/meta/ads/get/), [Meta Ad Library search](https://dataxapi.com/apis/meta/ads/search/), [Meta ad video transcript](https://dataxapi.com/apis/meta/ads/transcript/get/), [Meta advertiser's ads](https://dataxapi.com/apis/meta/advertisers/ads/list/), [Meta advertiser search](https://dataxapi.com/apis/meta/advertisers/search/)

Related: [All Meta Ad Library endpoints](https://dataxapi.com/apis/meta/), [Ads data](https://dataxapi.com/categories/ads/), [The same thing on 2 platforms, side by side](https://dataxapi.com/roles/advertisers-search/), [The advertiser object's fields](https://dataxapi.com/docs/objects/advertiser/)

## Questions

### How much does the Meta advertiser search API cost?

$0.0020 per call. The most one call can cost is $0.0020.

### When am I not charged?

Errors and timeouts are not charged; an empty result is charged $0.0020.

### How many items does one call return, and how do I get the next page?

15 items a page. The page size is the platform's; limit is not accepted. Everything comes in one page; no cursor is issued.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/meta/advertisers/search/)

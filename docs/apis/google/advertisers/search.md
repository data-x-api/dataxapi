# Google advertiser search API

Find advertisers in the Google Ads Transparency Center by name: ID, name, the country or region they are registered in, and the center's estimate of how many ads they have. The ID is what the advertiser's ads are asked for by. Up to 10 items a call; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Endpoint: `GET https://api.dataxapi.com/v1/google/advertisers/search`
- ID: `google.advertisers.search`
- Also known as: search google advertisers, find a brand's google advertiser id, google ads transparency advertisers
- Price: $0.0020 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 10 a page, everything in one answer, no paging
- Returns advertiser, a preview structure that may still change
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=google.advertisers.search&params=%7B%22query%22%3A%22nike%22%7D)
- In Chinese: [Google 广告主搜索 API](https://dataxapi.com/zh/apis/google/advertisers/search/)

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `query` | text | Yes | Name of the advertiser or brand. Example: `nike`. |
| `region` | text |  | The country or region to search in, by its two-letter code; the United States when left out. Example: `US`. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.items` is a list of advertiser objects. Preview: the structure may change, announced beforehand.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `id` | text | ID; pass it unchanged to the advertiser's ads endpoint. | `compact` | Yes |
| `name` | text | Name. | `compact` | Yes |
| `avatar_url` | link | Picture or logo. | `standard` | The platform has none |
| `region` | text | Code of the country or region the advertiser is registered in. | `compact` | Yes |
| `ext.ads_estimate` | integer | The platform's estimate of how many ads it has. | `full` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 74 B, `standard` 74 B, `full` 101 B (measured on the response recorded 2026-10-12 21:58 UTC).

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
curl -G "https://api.dataxapi.com/v1/google/advertisers/search" \
  --data-urlencode "query=nike" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.google.advertisers.search(query="nike")
print(result["data"]["items"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.google.advertisers.search({ query: "nike" });
console.log(result.data.items);
```

### CLI

```bash
dataxapi call google.advertisers.search query=nike
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

Add this to your MCP client, then ask your agent to call `google.advertisers.search`.

## Responses

### 200

From a response recorded 2026-10-12 21:58 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 1.1 KB in the standard view (1.1 KB compact, 1.4 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "def7c0e4-77fe-4a4c-b62e-917955a4a58c",
  "data": {
    "items": [
      {
        "id": "AR13721943418898185271",
        "name": "Brightline Studio",
        "region": "US"
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
    "capability": "google.advertisers.search",
    "result_status": "complete",
    "fetched_at": "2026-10-12T21:58:56.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": { "avatar_url": "platform" },
    "billing": {
      "amount": "0.002",
      "currency": "USD",
      "balance_after": "9.998"
    }
  }
}
```

### Empty

From a response recorded 2026-10-12 21:58 UTC. The request ID and balance are made up.

Size as sent: 431 B in the standard view (431 B compact, 431 B full).

```jsonc
{
  "code": "ok",
  "request_id": "c8e1efa4-637b-4355-b34f-d5d1193b2bd9",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "google.advertisers.search",
    "result_status": "empty",
    "fetched_at": "2026-10-12T21:58:29.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": { "avatar_url": "platform" },
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
  "request_id": "dd168812-fd2f-4a3c-ad82-f46107fd0089",
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
  "request_id": "8b92b332-1020-4193-a26b-edeca440430f",
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
  "request_id": "4b9397a9-df4f-4a11-85ab-865b715541ca",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/google/advertisers/search.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `google.advertisers.search`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/google/advertisers/search.md and help me use the DataXAPI endpoint google.advertisers.search (Google advertiser search).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fgoogle%2Fadvertisers%2Fsearch.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20google.advertisers.search%20%28Google%20advertiser%20search%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fgoogle%2Fadvertisers%2Fsearch.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20google.advertisers.search%20%28Google%20advertiser%20search%29.)

## Related

Part of DataXAPI's Ads data. The same key also works for: Social media, Creators, E-commerce.

The same thing on other platforms: [Meta advertiser search](https://dataxapi.com/apis/meta/advertisers/search/)

More Ads data on other platforms: [LinkedIn ad detail](https://dataxapi.com/apis/linkedin/ads/get/), [LinkedIn Ad Library search](https://dataxapi.com/apis/linkedin/ads/search/), [Meta ad detail](https://dataxapi.com/apis/meta/ads/get/), [Meta Ad Library search](https://dataxapi.com/apis/meta/ads/search/), [Meta advertiser's ads](https://dataxapi.com/apis/meta/advertisers/ads/list/), [TikTok Ads Library search](https://dataxapi.com/apis/tiktok/ads/search/), [TikTok Ads Library ad detail](https://dataxapi.com/apis/tiktok/ads/get/), [TikTok Creative Center Top Ad detail](https://dataxapi.com/apis/tiktok/creative_center/ads/get/), [TikTok Creative Center Top Ads search](https://dataxapi.com/apis/tiktok/creative_center/ads/search/)

Google Ads endpoints: [Google ad detail](https://dataxapi.com/apis/google/ads/get/), [Google advertiser's ads](https://dataxapi.com/apis/google/advertisers/ads/list/), [Google advertiser search](https://dataxapi.com/apis/google/advertisers/search/)

Related: [All Google Ads endpoints](https://dataxapi.com/apis/google/), [Ads data](https://dataxapi.com/categories/ads/), [The same thing on 2 platforms, side by side](https://dataxapi.com/roles/advertisers-search/), [The advertiser object's fields](https://dataxapi.com/docs/objects/advertiser/)

## Questions

### How much does the Google advertiser search API cost?

$0.0020 per call. The most one call can cost is $0.0020.

### When am I not charged?

Errors and timeouts are not charged; an empty result is charged $0.0020.

### How many items does one call return, and how do I get the next page?

10 items a page. The page size is the platform's; limit is not accepted. Everything comes in one page; no cursor is issued.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/google/advertisers/search/)

# Xiaohongshu (RedNote) PGY related keywords API

Get what people search on Xiaohongshu before and after a keyword, from the platform's creator marketplace, each with its place by relevance, its search index, the notes about it and their reads: for expanding a seed keyword. The search index is the platform's index, not a count of searches; for a word the platform gives no figures for, these are null. About 98 items a call, 120 at most; $0.0400 per call. Errors and timeouts are not charged; an empty result is charged $0.0400.

- Endpoint: `GET https://api.dataxapi.com/v1/xiaohongshu/pgy/keywords/related`
- ID: `xiaohongshu.pgy.keywords.related`
- Also known as: xiaohongshu related searches, rednote keyword expansion, xhs upstream downstream keywords
- Price: $0.0400 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: up to 120 a page, everything in one answer, no paging
- Returns related keyword, a preview structure that may still change
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=xiaohongshu.pgy.keywords.related&params=%7B%22keyword%22%3A%22%E9%9D%A2%E8%86%9C%22%7D)
- In Chinese: [小红书蒲公英关联词 API](https://dataxapi.com/zh/apis/xiaohongshu/pgy/keywords/related/)

## What you get

The first 5 rows of a response recorded 2026-10-12 21:42 UTC for 烧烤.

| Field | Value |
| --- | --- |
| keyword | 烧烤 |
| related_to | 露营 |
| relation | prior |
| rank | 1 |
| search_index | 2,638,774 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `keyword` | text | Yes | One keyword. Example: `面膜`. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.items` is a list of related keyword objects. Preview: the structure may change, announced beforehand.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `keyword` | text | The related keyword. | `compact` | Yes |
| `related_to` | text | The keyword it is related to: the one asked about. | `compact` | Yes |
| `relation` | text | How it is related: query (searched together with the keyword asked about), posts (appears together with it in content), prior (searched before it), after (searched after it). Values: `query`, `posts`, `prior`, `after`. | `compact` | Yes |
| `rank` | integer | Position by relevance among the keywords of the same relation, from 1. | `compact` | Yes |
| `relevance` | number | How closely it is related to the keyword asked about, 0 to 1. | `compact` | The platform has none |
| `search_index` | integer | Search index of the related keyword: the platform's index, not a count of searches; null where the platform gives no figure for the word. | `compact` | Yes |
| `composite_index` | integer | Composite index of the related keyword: the platform's index of how much attention content about it drew, not a count. | `compact` | The platform has none |
| `ext.notes` | integer | Notes about the related keyword; null where the platform gives no figure for the word. | `full` | Yes |
| `ext.views` | integer | Reads of those notes in all; null where the platform gives no figure for the word. | `full` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 98 B, `standard` 98 B, `full` 137 B (measured on the response recorded 2026-10-12 21:42 UTC).

## Paging

About 98 items a page, 120 at most. The page size is the platform's; `limit` is not accepted.

Everything comes in one page; no cursor is issued.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0400, once per call |
| An empty result | $0.0400 |
| Invalid parameters, a failure of ours or of the data source, a timeout | not charged |
| The most one call can cost | $0.0400 (send `X-Max-Price` to refuse anything above your own limit) |

Prices as read 2026-10-18 19:59 UTC, under price book 2, in effect since 2026-10-17 11:00 UTC; the Playground reads the price in force before a run.

## If the object does not exist

A keyword the platform has no data for reads like one with no related keywords: an empty result, never a not-found error.

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
curl -G "https://api.dataxapi.com/v1/xiaohongshu/pgy/keywords/related" \
  --data-urlencode "keyword=面膜" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.xiaohongshu.pgy.keywords.related(keyword="面膜")
print(result["data"]["items"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.xiaohongshu.pgy.keywords.related({ keyword: "面膜" });
console.log(result.data.items);
```

### CLI

```bash
dataxapi call xiaohongshu.pgy.keywords.related 'keyword=面膜'
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

Add this to your MCP client, then ask your agent to call `xiaohongshu.pgy.keywords.related`.

## Responses

### 200

From a response recorded 2026-10-12 21:42 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 9.8 KB in the standard view (9.8 KB compact, 13.6 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "14b8ced1-2b33-47f6-90f7-86463f68684e",
  "data": {
    "items": [
      {
        "keyword": "烧烤",
        "related_to": "露营",
        "relation": "prior",
        "rank": 1,
        "search_index": 2638774
      },
      // … 97 more
    ]
  },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 98
  },
  "warnings": [],
  "meta": {
    "capability": "xiaohongshu.pgy.keywords.related",
    "result_status": "complete",
    "fetched_at": "2026-10-12T21:42:15.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "relevance": "platform",
      "composite_index": "platform"
    },
    "billing": {
      "amount": "0.04",
      "currency": "USD",
      "balance_after": "9.96"
    }
  }
}
```

### Empty

From a response recorded 2026-10-12 21:59 UTC. The request ID and balance are made up.

Size as sent: 466 B in the standard view (466 B compact, 466 B full).

```jsonc
{
  "code": "ok",
  "request_id": "be0abe47-fa2e-4d8d-81ca-6c0b66d1346b",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "xiaohongshu.pgy.keywords.related",
    "result_status": "empty",
    "fetched_at": "2026-10-12T21:59:51.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "relevance": "platform",
      "composite_index": "platform"
    },
    "billing": {
      "amount": "0.04",
      "currency": "USD",
      "balance_after": "9.96"
    }
  }
}
```

### 400

An example written to the specification, not a recorded response.

```json
{
  "code": "invalid_params",
  "request_id": "395ace91-6b06-49d4-b65d-b6114d94aa7c",
  "message": "A parameter is invalid",
  "message_zh": "参数不合法",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "problems": ["keyword is required"],
  "docs_url": "https://dataxapi.com/docs/errors#invalid_params"
}
```

### 402

An example written to the specification, not a recorded response.

```json
{
  "code": "insufficient_balance",
  "request_id": "88216a3e-ac71-49a0-8271-d6d5a4e46236",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.04",
  "available": "0",
  "docs_url": "https://dataxapi.com/docs/errors#insufficient_balance"
}
```

### 502

An example written to the specification, not a recorded response.

```json
{
  "code": "upstream_failed",
  "request_id": "8203b5e1-da06-4f7a-990c-b092153fc56d",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/related.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `xiaohongshu.pgy.keywords.related`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/xiaohongshu/pgy/keywords/related.md and help me use the DataXAPI endpoint xiaohongshu.pgy.keywords.related (Xiaohongshu (RedNote) PGY related keywords).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fxiaohongshu%2Fpgy%2Fkeywords%2Frelated.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20xiaohongshu.pgy.keywords.related%20%28Xiaohongshu%20%28RedNote%29%20PGY%20related%20keywords%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fxiaohongshu%2Fpgy%2Fkeywords%2Frelated.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20xiaohongshu.pgy.keywords.related%20%28Xiaohongshu%20%28RedNote%29%20PGY%20related%20keywords%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

More Social media data on other platforms: [Douyin trend-index related keywords](https://dataxapi.com/apis/douyin/index/keywords/related/), [Douyin comment replies](https://dataxapi.com/apis/douyin/comments/replies/list/), [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/), [Bilibili comment replies](https://dataxapi.com/apis/bilibili/comments/replies/list/), [Bilibili hot searches](https://dataxapi.com/apis/bilibili/trends/list/), [Bilibili user profile](https://dataxapi.com/apis/bilibili/users/get/), [Bilibili user videos](https://dataxapi.com/apis/bilibili/users/videos/list/), [Bilibili video comments](https://dataxapi.com/apis/bilibili/videos/comments/list/), [Bilibili video detail](https://dataxapi.com/apis/bilibili/videos/get/), [Bilibili video search](https://dataxapi.com/apis/bilibili/videos/search/)

Xiaohongshu PGY endpoints: [Xiaohongshu PGY keyword search index](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/history/), [Xiaohongshu PGY related keywords](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/related/), [Xiaohongshu PGY creator search](https://dataxapi.com/apis/xiaohongshu/pgy/creators/search/), [Xiaohongshu PGY creator detail](https://dataxapi.com/apis/xiaohongshu/pgy/creators/get/), [Xiaohongshu PGY creator audience profile](https://dataxapi.com/apis/xiaohongshu/pgy/creators/audience/get/), [Xiaohongshu PGY creator metrics](https://dataxapi.com/apis/xiaohongshu/pgy/creators/metrics/), [Xiaohongshu PGY creator notes](https://dataxapi.com/apis/xiaohongshu/pgy/creators/notes/list/)

Xiaohongshu (RedNote) endpoints: [Xiaohongshu image search](https://dataxapi.com/apis/xiaohongshu/images/search/), [Xiaohongshu note detail](https://dataxapi.com/apis/xiaohongshu/notes/get/), [Xiaohongshu comment replies](https://dataxapi.com/apis/xiaohongshu/comments/replies/list/), [Xiaohongshu note comments](https://dataxapi.com/apis/xiaohongshu/notes/comments/list/), [Xiaohongshu note search](https://dataxapi.com/apis/xiaohongshu/notes/search/), [Xiaohongshu topic notes](https://dataxapi.com/apis/xiaohongshu/topics/notes/list/), [Xiaohongshu topic detail](https://dataxapi.com/apis/xiaohongshu/topics/get/), [Xiaohongshu trends](https://dataxapi.com/apis/xiaohongshu/trends/list/), [Xiaohongshu user profile](https://dataxapi.com/apis/xiaohongshu/users/get/), [Xiaohongshu user notes](https://dataxapi.com/apis/xiaohongshu/users/notes/list/), [Xiaohongshu user search](https://dataxapi.com/apis/xiaohongshu/users/search/)

Xiaohongshu Shop endpoints: [Xiaohongshu product detail](https://dataxapi.com/apis/xiaohongshu/shop/products/get/), [Xiaohongshu product reviews](https://dataxapi.com/apis/xiaohongshu/shop/products/reviews/list/), [Xiaohongshu product search](https://dataxapi.com/apis/xiaohongshu/shop/products/search/)

Related: [All Xiaohongshu PGY endpoints](https://dataxapi.com/apis/xiaohongshu/pgy/), [All Xiaohongshu (RedNote) endpoints](https://dataxapi.com/apis/xiaohongshu/), [Social media data](https://dataxapi.com/categories/social/), [The related keyword object's fields](https://dataxapi.com/docs/objects/keyword_related/)

## Questions

### How much does the Xiaohongshu (RedNote) PGY related keywords API cost?

$0.0400 per call. The most one call can cost is $0.0400.

### When am I not charged?

Errors and timeouts are not charged; an empty result is charged $0.0400.

### How many items does one call return, and how do I get the next page?

About 98 items a page, 120 at most. The page size is the platform's; limit is not accepted. Everything comes in one page; no cursor is issued.

### What happens if the object does not exist?

A keyword the platform has no data for reads like one with no related keywords: an empty result, never a not-found error.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/related/)

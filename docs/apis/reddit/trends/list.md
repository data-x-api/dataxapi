# Reddit trending searches API

Get the searches trending on Reddit today, ranked in the order the platform lists them. About 6 items a call, 20 at most; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Endpoint: `GET https://api.dataxapi.com/v1/reddit/trends/list`
- ID: `reddit.trends.list`
- Also known as: reddit trending today, reddit hot searches
- Price: $0.0020 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: up to 20 a page, everything in one answer, no paging
- Returns the standard trend object, the same on every platform
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=reddit.trends.list)
- In Chinese: [Reddit 趋势搜索词 API](https://dataxapi.com/zh/apis/reddit/trends/list/)

## What you get

The first row of a response recorded 2026-10-12 18:46 UTC.

| Field | Value |
| --- | --- |
| rank | 1 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `board` | text |  | Which list: trending searches. Values: `searches` (default). Example: `searches`. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.items` is a list of trend objects. Stable: fields are only ever added.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `id` | text | The platform's ID for the entry. | `compact` | The platform has none |
| `name` | text | Name of the entry. | `compact` | Yes |
| `rank` | integer | Position on the board, from 1; a pinned entry has none. | `compact` | Yes |
| `heat` | integer | The platform's heat score. | `compact` | The platform has none |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 45 B, `standard` 45 B, `full` 45 B (measured on the response recorded 2026-10-12 18:46 UTC).

## Paging

About 6 items a page, 20 at most. The page size is the platform's; `limit` is not accepted.

Everything comes in one page; no cursor is issued.

Answers come from a shared snapshot refreshed every 10 minutes; `meta.cached` says so and `meta.fetched_at` is when it was taken.

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
curl "https://api.dataxapi.com/v1/reddit/trends/list" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.reddit.trends.list()
print(result["data"]["items"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.reddit.trends.list();
console.log(result.data.items);
```

### CLI

```bash
dataxapi call reddit.trends.list
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

Add this to your MCP client, then ask your agent to call `reddit.trends.list`.

## Responses

### 200

From a response recorded 2026-10-12 18:46 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 707 B in the standard view (707 B compact, 707 B full).

```jsonc
{
  "code": "ok",
  "request_id": "fe9be99c-9b6a-45ee-b508-ff9d8be5eb37",
  "data": {
    "items": [
      { "name": "#Weekend hikingSeason", "rank": 1 },
      // … 5 more
    ]
  },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 6
  },
  "warnings": [],
  "meta": {
    "capability": "reddit.trends.list",
    "result_status": "complete",
    "fetched_at": "2026-10-12T18:46:24.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": { "id": "platform", "heat": "platform" },
    "billing": {
      "amount": "0.002",
      "currency": "USD",
      "balance_after": "9.998"
    }
  }
}
```

### Empty

From a recording of 2026-10-12 18:46 UTC, edited by hand to show this case. The request ID and balance are made up.

Size as sent: 434 B in the standard view (434 B compact, 434 B full).

```jsonc
{
  "code": "ok",
  "request_id": "47ae97a1-4e6b-41eb-8858-f64a1e2fad86",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "reddit.trends.list",
    "result_status": "empty",
    "fetched_at": "2026-10-12T18:46:24.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": { "id": "platform", "heat": "platform" },
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
  "request_id": "744d7804-fb26-42f5-9975-26c7be4c1fcd",
  "message": "A parameter is invalid",
  "message_zh": "参数不合法",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "problems": ["board must be one of searches"],
  "docs_url": "https://dataxapi.com/docs/errors#invalid_params"
}
```

### 402

An example written to the specification, not a recorded response.

```json
{
  "code": "insufficient_balance",
  "request_id": "f9b83824-f605-40a3-933f-d3b2b0c9bf1a",
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
  "request_id": "054cbb25-6b8e-4f11-b63d-ae663c38d613",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/reddit/trends/list.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `reddit.trends.list`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/reddit/trends/list.md and help me use the DataXAPI endpoint reddit.trends.list (Reddit trending searches).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Freddit%2Ftrends%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20reddit.trends.list%20%28Reddit%20trending%20searches%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Freddit%2Ftrends%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20reddit.trends.list%20%28Reddit%20trending%20searches%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

The same thing on other platforms: [Bilibili hot searches](https://dataxapi.com/apis/bilibili/trends/list/), [Douyin hot search board](https://dataxapi.com/apis/douyin/trends/list/), [Kuaishou hot list](https://dataxapi.com/apis/kuaishou/trends/list/), [Weibo hot search board](https://dataxapi.com/apis/weibo/trends/list/), [X trends](https://dataxapi.com/apis/x/trends/list/), [Xiaohongshu trends](https://dataxapi.com/apis/xiaohongshu/trends/list/), [Zhihu hot list](https://dataxapi.com/apis/zhihu/trends/list/)

More Social media data on other platforms: [Douyin trend-index live hot topics](https://dataxapi.com/apis/douyin/index/trends/list/), [Douyin comment replies](https://dataxapi.com/apis/douyin/comments/replies/list/), [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/), [Bilibili comment replies](https://dataxapi.com/apis/bilibili/comments/replies/list/), [Bilibili user profile](https://dataxapi.com/apis/bilibili/users/get/), [Bilibili user videos](https://dataxapi.com/apis/bilibili/users/videos/list/), [Bilibili video comments](https://dataxapi.com/apis/bilibili/videos/comments/list/), [Bilibili video detail](https://dataxapi.com/apis/bilibili/videos/get/), [Bilibili video search](https://dataxapi.com/apis/bilibili/videos/search/), [Bilibili popular videos](https://dataxapi.com/apis/bilibili/videos/trending/), [Douyin trend-index brand trends](https://dataxapi.com/apis/douyin/index/brands/history/), [Douyin trend-index brand comparison](https://dataxapi.com/apis/douyin/index/brands/metrics/), [Douyin trend-index creator top videos](https://dataxapi.com/apis/douyin/index/creators/videos/list/)

Reddit endpoints: [Reddit post comments](https://dataxapi.com/apis/reddit/posts/comments/list/), [Reddit post detail](https://dataxapi.com/apis/reddit/posts/get/), [Reddit post search](https://dataxapi.com/apis/reddit/posts/search/), [Reddit popular posts](https://dataxapi.com/apis/reddit/posts/trending/), [Reddit community posts](https://dataxapi.com/apis/reddit/subreddits/posts/list/), [Reddit trending searches](https://dataxapi.com/apis/reddit/trends/list/), [Reddit user profile](https://dataxapi.com/apis/reddit/users/get/), [Reddit user posts](https://dataxapi.com/apis/reddit/users/posts/list/), [Reddit community profile](https://dataxapi.com/apis/reddit/subreddits/get/), [Reddit user active communities](https://dataxapi.com/apis/reddit/users/subreddits/list/), [Reddit video transcript](https://dataxapi.com/apis/reddit/posts/transcript/get/)

Skills that use this endpoint: [Trends and topics](https://dataxapi.com/skills/trends/)

Tools built on this endpoint: [Reddit trending searches](https://dataxapi.com/tools/hot-search/reddit/)

Related: [All Reddit endpoints](https://dataxapi.com/apis/reddit/), [Social media data](https://dataxapi.com/categories/social/), [The same thing on 8 platforms, side by side](https://dataxapi.com/roles/trends-list/), [The trend object's fields](https://dataxapi.com/docs/objects/trend/)

## Questions

### How much does the Reddit trending searches API cost?

$0.0020 per call. The most one call can cost is $0.0020.

### When am I not charged?

Errors and timeouts are not charged; an empty result is charged $0.0020.

### How many items does one call return, and how do I get the next page?

About 6 items a page, 20 at most. The page size is the platform's; limit is not accepted. Everything comes in one page; no cursor is issued.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/reddit/trends/list/)

# Zhihu hot list API

Get Zhihu's hot list: the questions on it, their rank, heat (approximate) and answer count; an entry's ID is its question's. About 30 items a call, 50 at most; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Endpoint: `GET https://api.dataxapi.com/v1/zhihu/trends/list`
- ID: `zhihu.trends.list`
- Also known as: zhihu trending, zhihu hot questions
- Price: $0.0020 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: up to 50 a page, everything in one answer, no paging
- Returns the standard trend object, the same on every platform
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=zhihu.trends.list)
- In Chinese: [知乎热榜 API](https://dataxapi.com/zh/apis/zhihu/trends/list/)

## What you get

The first 2 rows of a response recorded 2026-10-12 18:53 UTC.

| Field | Value |
| --- | --- |
| rank | 1 |
| heat | 6,030,000 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `board` | text |  | Which list: the hot list. Values: `hot` (default). Example: `hot`. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.items` is a list of trend objects. Stable: fields are only ever added.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `id` | text | The platform's ID for the entry. | `compact` | Yes |
| `name` | text | Name of the entry. | `compact` | Yes |
| `rank` | integer | Position on the board, from 1; a pinned entry has none. | `compact` | Yes |
| `heat` | integer | The platform's heat score. | `compact` | Yes |
| `ext.answers` | integer | Answers the listed question has. | `full` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 206 B, `standard` 206 B, `full` 228 B (measured on the response recorded 2026-10-12 18:53 UTC).

## Paging

About 30 items a page, 50 at most. The page size is the platform's; `limit` is not accepted.

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
curl "https://api.dataxapi.com/v1/zhihu/trends/list" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.zhihu.trends.list()
print(result["data"]["items"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.zhihu.trends.list();
console.log(result.data.items);
```

### CLI

```bash
dataxapi call zhihu.trends.list
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

Add this to your MCP client, then ask your agent to call `zhihu.trends.list`.

## Responses

### 200

From a response recorded 2026-10-12 18:53 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 6.4 KB in the standard view (6.4 KB compact, 7.1 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "1d302908-ce47-449f-bf93-d107f03ef650",
  "data": {
    "items": [
      {
        "id": "3975139299",
        "name": "周末露营装备推荐",
        "rank": 1,
        "heat": 6030000,
        "approximate": [
          { "field": "heat", "kind": "approximate" }
        ]
      },
      // … 29 more
    ]
  },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 30
  },
  "warnings": [],
  "meta": {
    "capability": "zhihu.trends.list",
    "result_status": "complete",
    "fetched_at": "2026-10-12T18:53:48.000Z",
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

From a recording of 2026-10-12 18:53 UTC, edited by hand to show this case. The request ID and balance are made up.

Size as sent: 400 B in the standard view (400 B compact, 400 B full).

```jsonc
{
  "code": "ok",
  "request_id": "b9f5ef12-74d3-424a-b753-b1d388b50f0c",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "zhihu.trends.list",
    "result_status": "empty",
    "fetched_at": "2026-10-12T18:53:48.000Z",
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
  "request_id": "486fcd97-0faa-4b39-93e0-5134b6bd0f81",
  "message": "A parameter is invalid",
  "message_zh": "参数不合法",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "problems": ["board must be one of hot"],
  "docs_url": "https://dataxapi.com/docs/errors#invalid_params"
}
```

### 402

An example written to the specification, not a recorded response.

```json
{
  "code": "insufficient_balance",
  "request_id": "7c39c550-3661-4a4f-888e-7d5b5fce7457",
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
  "request_id": "89ba6f7b-9cae-4605-b78c-408065388441",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/zhihu/trends/list.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `zhihu.trends.list`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/zhihu/trends/list.md and help me use the DataXAPI endpoint zhihu.trends.list (Zhihu hot list).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fzhihu%2Ftrends%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20zhihu.trends.list%20%28Zhihu%20hot%20list%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fzhihu%2Ftrends%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20zhihu.trends.list%20%28Zhihu%20hot%20list%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

The same thing on other platforms: [Bilibili hot searches](https://dataxapi.com/apis/bilibili/trends/list/), [Douyin hot search board](https://dataxapi.com/apis/douyin/trends/list/), [Kuaishou hot list](https://dataxapi.com/apis/kuaishou/trends/list/), [Weibo hot search board](https://dataxapi.com/apis/weibo/trends/list/), [X trends](https://dataxapi.com/apis/x/trends/list/), [Xiaohongshu trends](https://dataxapi.com/apis/xiaohongshu/trends/list/), [Reddit trending searches](https://dataxapi.com/apis/reddit/trends/list/)

More Social media data on other platforms: [Douyin trend-index live hot topics](https://dataxapi.com/apis/douyin/index/trends/list/), [Douyin comment replies](https://dataxapi.com/apis/douyin/comments/replies/list/), [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/), [Bilibili comment replies](https://dataxapi.com/apis/bilibili/comments/replies/list/), [Bilibili user profile](https://dataxapi.com/apis/bilibili/users/get/), [Bilibili user videos](https://dataxapi.com/apis/bilibili/users/videos/list/), [Bilibili video comments](https://dataxapi.com/apis/bilibili/videos/comments/list/), [Bilibili video detail](https://dataxapi.com/apis/bilibili/videos/get/)

Zhihu endpoints: [Zhihu answer comments](https://dataxapi.com/apis/zhihu/answers/comments/list/), [Zhihu answer detail](https://dataxapi.com/apis/zhihu/answers/get/), [Zhihu article detail](https://dataxapi.com/apis/zhihu/articles/get/), [Zhihu column articles](https://dataxapi.com/apis/zhihu/columns/articles/list/), [Zhihu comment replies](https://dataxapi.com/apis/zhihu/comments/replies/list/), [Zhihu pin detail](https://dataxapi.com/apis/zhihu/pins/get/), [Zhihu content search](https://dataxapi.com/apis/zhihu/posts/search/), [Zhihu question answers](https://dataxapi.com/apis/zhihu/questions/answers/list/), [Zhihu question detail](https://dataxapi.com/apis/zhihu/questions/get/), [Zhihu hot list](https://dataxapi.com/apis/zhihu/trends/list/), [Zhihu user answers](https://dataxapi.com/apis/zhihu/users/answers/list/), [Zhihu user articles](https://dataxapi.com/apis/zhihu/users/articles/list/), [Zhihu user followers](https://dataxapi.com/apis/zhihu/users/followers/list/), [Zhihu user profile](https://dataxapi.com/apis/zhihu/users/get/), [Zhihu user pins](https://dataxapi.com/apis/zhihu/users/pins/list/), [Zhihu user search](https://dataxapi.com/apis/zhihu/users/search/)

Skills that use this endpoint: [Trends and topics](https://dataxapi.com/skills/trends/)

Tools built on this endpoint: [Zhihu hot list](https://dataxapi.com/tools/hot-search/zhihu/)

Related: [All Zhihu endpoints](https://dataxapi.com/apis/zhihu/), [Social media data](https://dataxapi.com/categories/social/), [The same thing on 8 platforms, side by side](https://dataxapi.com/roles/trends-list/), [The trend object's fields](https://dataxapi.com/docs/objects/trend/)

## Questions

### How much does the Zhihu hot list API cost?

$0.0020 per call. The most one call can cost is $0.0020.

### When am I not charged?

Errors and timeouts are not charged; an empty result is charged $0.0020.

### How many items does one call return, and how do I get the next page?

About 30 items a page, 50 at most. The page size is the platform's; limit is not accepted. Everything comes in one page; no cursor is issued.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/zhihu/trends/list/)

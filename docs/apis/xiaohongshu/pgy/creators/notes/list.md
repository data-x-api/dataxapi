# Xiaohongshu (RedNote) PGY creator notes API

Get a page of a Xiaohongshu creator's notes by PGY creator ID, newest first, with the figures PGY gives for each: reads, likes, saves, whether it was sponsored and for which brand. Up to 8 items a call; $0.0400 per call. Errors and timeouts are not charged; an empty result is charged $0.0400.

- Endpoint: `GET https://api.dataxapi.com/v1/xiaohongshu/pgy/creators/notes/list`
- ID: `xiaohongshu.pgy.creators.notes.list`
- Also known as: rednote creator posts, xiaohongshu sponsored notes
- Price: $0.0400 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 8 a page, a page, with a cursor for the next
- Returns pgy creator note, a preview structure that may still change
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=xiaohongshu.pgy.creators.notes.list&params=%7B%22id%22%3A%225c0017ef6b58b740c92463fb%22%7D)
- In Chinese: [小红书蒲公英博主笔记 API](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/notes/list/)

## What you get

The first 6 rows of a response recorded 2026-10-12 21:53 UTC.

| Field | Value |
| --- | --- |
| type | video |
| published_at | 2026-10-09 16:00 UTC |
| is_sponsored | false |
| metrics.views | 75 |
| metrics.likes | 5 |
| metrics.favorites | 1 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `id` | text | Yes | PGY creator ID, 24 hexadecimal characters; take it from the PGY creator search. Example: `5c0017ef6b58b740c92463fb`. |
| `cursor` | text |  | Cursor returned by the previous page. Pass `page.next_cursor` of the page before, unchanged. Each page is charged as a call of its own. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.items` is a list of pgy creator note objects. Preview: the structure may change, announced beforehand.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `id` | text | Note ID. | `compact` | Yes |
| `title` | text | The note's title. | `compact` | Yes |
| `type` | text | An image note or a video note. Values: `image`, `video`. | `compact` | Yes |
| `published_at` | time | The day it was published; the platform gives the day only, given as the start of that day in China time. | `compact` | Yes |
| `cover_url` | link | Address of the cover image. | `standard` | Yes |
| `is_sponsored` | yes/no | Whether it is a sponsored note. | `compact` | Yes |
| `brand` | text | The brand it was made for, in the platform's words; null when it is not sponsored. | `compact` | Yes |
| `metrics` | object | The note's figures. | `compact` | Yes |
| `metrics.views` | integer | Reads. | `compact` | Yes |
| `metrics.likes` | integer | Likes. | `compact` | Yes |
| `metrics.favorites` | integer | Saves. | `compact` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 237 B, `standard` 355 B, `full` 355 B (measured on the response recorded 2026-10-12 21:53 UTC).

## Paging

8 items a page. The page size is the platform's; `limit` is not accepted.

For the next page pass `page.next_cursor` as `cursor`; a cursor is valid for 1 hour. `page.has_more` is false on the last page.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0400, once per call |
| Each further page | charged as a call of its own |
| An empty result | $0.0400 |
| Invalid parameters, a failure of ours or of the data source, a timeout | not charged |
| The most one call can cost | $0.0400 (send `X-Max-Price` to refuse anything above your own limit) |

Prices as read 2026-10-18 19:59 UTC, under price book 2, in effect since 2026-10-17 11:00 UTC; the Playground reads the price in force before a run.

## If the object does not exist

A creator that does not exist cannot be told from a creator without notes: both return an empty result, not a 404, and are charged as an empty result is.

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
curl -G "https://api.dataxapi.com/v1/xiaohongshu/pgy/creators/notes/list" \
  --data-urlencode "id=5c0017ef6b58b740c92463fb" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.xiaohongshu.pgy.creators.notes.list(id="5c0017ef6b58b740c92463fb")
print(result["data"]["items"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.xiaohongshu.pgy.creators.notes.list({ id: "5c0017ef6b58b740c92463fb" });
console.log(result.data.items);
```

### CLI

```bash
dataxapi call xiaohongshu.pgy.creators.notes.list id=5c0017ef6b58b740c92463fb
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

Add this to your MCP client, then ask your agent to call `xiaohongshu.pgy.creators.notes.list`.

## Responses

### 200

From a response recorded 2026-10-12 21:53 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 3.2 KB in the standard view (2.3 KB compact, 3.2 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "bdb3a41f-7fe2-4640-adb7-0452e71839a0",
  "data": {
    "items": [
      {
        "id": "61ee962b00000000afb45a20",
        "title": "周末露营入门指南：一篇讲清楚",
        "type": "video",
        "published_at": "2026-10-09T16:00:00.000Z",
        "cover_url": "https://sns-webpic-qc.xhscdn.com/20261012/f8dcf3e698e1b1893a9f!nd_dft_wlteh_webp_3",
        "is_sponsored": false,
        "brand": null,
        "metrics": { "views": 75, "likes": 5, "favorites": 1 }
      },
      // … 7 more
    ]
  },
  "page": {
    "next_cursor": "c1.91LZucGby4XD8ETXsFWH_WXrXeIvfgCrZJxxMuwx",
    "cursor_expires_at": "2026-10-12T22:53:52.000Z",
    "has_more": true,
    "returned": 8
  },
  "warnings": [],
  "meta": {
    "capability": "xiaohongshu.pgy.creators.notes.list",
    "result_status": "complete",
    "fetched_at": "2026-10-12T21:53:52.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {},
    "billing": {
      "amount": "0.04",
      "currency": "USD",
      "balance_after": "9.96"
    }
  }
}
```

### Empty

From a response recorded 2026-10-12 21:53 UTC. The request ID and balance are made up.

Size as sent: 418 B in the standard view (418 B compact, 418 B full).

```jsonc
{
  "code": "ok",
  "request_id": "158c1a13-e8b8-40cd-ad0d-c12632ee04c4",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "xiaohongshu.pgy.creators.notes.list",
    "result_status": "empty",
    "fetched_at": "2026-10-12T21:53:54.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {},
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
  "request_id": "6bb04556-2c98-4672-b7dc-b7500c95d4c9",
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
  "request_id": "a20237a4-3252-4660-8fb0-19cdc4bbf148",
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
  "request_id": "b758171d-01f2-4d08-9c93-b5c72dae326b",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/xiaohongshu/pgy/creators/notes/list.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `xiaohongshu.pgy.creators.notes.list`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/xiaohongshu/pgy/creators/notes/list.md and help me use the DataXAPI endpoint xiaohongshu.pgy.creators.notes.list (Xiaohongshu (RedNote) PGY creator notes).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fxiaohongshu%2Fpgy%2Fcreators%2Fnotes%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20xiaohongshu.pgy.creators.notes.list%20%28Xiaohongshu%20%28RedNote%29%20PGY%20creator%20notes%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fxiaohongshu%2Fpgy%2Fcreators%2Fnotes%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20xiaohongshu.pgy.creators.notes.list%20%28Xiaohongshu%20%28RedNote%29%20PGY%20creator%20notes%29.)

## Related

Part of DataXAPI's Creators data. The same key also works for: Social media, Ads, E-commerce.

The same thing on other platforms: [Douyin Xingtu creator video performance](https://dataxapi.com/apis/douyin/xingtu/creators/videos/list/)

More Creators data on other platforms: [Douyin trend-index creator follower profile](https://dataxapi.com/apis/douyin/index/creators/audience/get/), [Douyin trend-index creator core metrics](https://dataxapi.com/apis/douyin/index/creators/metrics/), [Douyin Xingtu creator rate card](https://dataxapi.com/apis/douyin/xingtu/creators/rates/get/), [Douyin Xingtu creator search](https://dataxapi.com/apis/douyin/xingtu/creators/search/), [Douyin Xingtu creator profile](https://dataxapi.com/apis/douyin/xingtu/creators/get/), [Douyin Xingtu creator audience](https://dataxapi.com/apis/douyin/xingtu/creators/audience/get/), [Douyin Xingtu creator metrics](https://dataxapi.com/apis/douyin/xingtu/creators/metrics/), [Douyin Xingtu creator content keywords](https://dataxapi.com/apis/douyin/xingtu/creators/keywords/get/), [Douyin Xingtu creator index scores](https://dataxapi.com/apis/douyin/xingtu/creators/scores/get/)

Xiaohongshu PGY endpoints: [Xiaohongshu PGY keyword search index](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/history/), [Xiaohongshu PGY related keywords](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/related/), [Xiaohongshu PGY creator search](https://dataxapi.com/apis/xiaohongshu/pgy/creators/search/), [Xiaohongshu PGY creator detail](https://dataxapi.com/apis/xiaohongshu/pgy/creators/get/), [Xiaohongshu PGY creator audience profile](https://dataxapi.com/apis/xiaohongshu/pgy/creators/audience/get/), [Xiaohongshu PGY creator metrics](https://dataxapi.com/apis/xiaohongshu/pgy/creators/metrics/), [Xiaohongshu PGY creator notes](https://dataxapi.com/apis/xiaohongshu/pgy/creators/notes/list/)

Xiaohongshu (RedNote) endpoints: [Xiaohongshu image search](https://dataxapi.com/apis/xiaohongshu/images/search/), [Xiaohongshu note detail](https://dataxapi.com/apis/xiaohongshu/notes/get/), [Xiaohongshu comment replies](https://dataxapi.com/apis/xiaohongshu/comments/replies/list/), [Xiaohongshu note comments](https://dataxapi.com/apis/xiaohongshu/notes/comments/list/), [Xiaohongshu note search](https://dataxapi.com/apis/xiaohongshu/notes/search/), [Xiaohongshu topic notes](https://dataxapi.com/apis/xiaohongshu/topics/notes/list/), [Xiaohongshu topic detail](https://dataxapi.com/apis/xiaohongshu/topics/get/), [Xiaohongshu trends](https://dataxapi.com/apis/xiaohongshu/trends/list/), [Xiaohongshu user profile](https://dataxapi.com/apis/xiaohongshu/users/get/), [Xiaohongshu user notes](https://dataxapi.com/apis/xiaohongshu/users/notes/list/), [Xiaohongshu user search](https://dataxapi.com/apis/xiaohongshu/users/search/)

Xiaohongshu Shop endpoints: [Xiaohongshu product detail](https://dataxapi.com/apis/xiaohongshu/shop/products/get/), [Xiaohongshu product reviews](https://dataxapi.com/apis/xiaohongshu/shop/products/reviews/list/), [Xiaohongshu product search](https://dataxapi.com/apis/xiaohongshu/shop/products/search/)

Related: [All Xiaohongshu PGY endpoints](https://dataxapi.com/apis/xiaohongshu/pgy/), [All Xiaohongshu (RedNote) endpoints](https://dataxapi.com/apis/xiaohongshu/), [Creators data](https://dataxapi.com/categories/creator/), [The same thing on 2 platforms, side by side](https://dataxapi.com/roles/creators-posts-list/), [The pgy creator note object's fields](https://dataxapi.com/docs/objects/pgy_creator_post/)

## Questions

### How much does the Xiaohongshu (RedNote) PGY creator notes API cost?

$0.0400 per call. The most one call can cost is $0.0400.

### When am I not charged?

Errors and timeouts are not charged; an empty result is charged $0.0400.

### How many items does one call return, and how do I get the next page?

8 items a page. The page size is the platform's; limit is not accepted. For the next page pass page.next_cursor as cursor; a cursor is valid for 1 hour. page.has_more is false on the last page.

### What happens if the object does not exist?

A creator that does not exist cannot be told from a creator without notes: both return an empty result, not a 404, and are charged as an empty result is.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/xiaohongshu/pgy/creators/notes/list/)

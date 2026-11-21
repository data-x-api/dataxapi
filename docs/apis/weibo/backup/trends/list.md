# Weibo hot search board (backup) API

The backup of the Weibo hot search board, to call when the original cannot serve: the same parameters and result, at a higher price. About 50 items a call, 51 at most; $0.0300 per call. Errors and timeouts are not charged.

- Endpoint: `GET https://api.dataxapi.com/v1/weibo/backup/trends/list`
- ID: `weibo.backup.trends.list`
- Also known as: weibo hot search backup
- Price: $0.0300 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: up to 51 a page, everything in one answer, no paging
- Returns the standard trend object, the same on every platform
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=weibo.backup.trends.list)
- In Chinese: [微博热搜榜（备用版）API](https://dataxapi.com/zh/apis/weibo/backup/trends/list/)

## What you get

The first 2 rows of a response recorded 2026-10-29 09:44 UTC.

| Field | Value |
| --- | --- |
| rank | 1 |
| heat | 1,179,776 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `board` | text |  | Which list: hot searches is the only one. Values: `hot_search` (default). Example: `hot_search`. |
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
| `heat` | integer | The platform's heat score. | `compact` | Yes |
| `ext.label` | text | The label beside the term, the platform's own character (新 new, 热 hot, 沸 boiling, say); null where it has none. | `full` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 70 B, `standard` 70 B, `full` 92 B (measured on the response recorded 2026-10-29 09:44 UTC).

## Paging

About 50 items a page, 51 at most. The page size is the platform's; `limit` is not accepted.

Everything comes in one page; no cursor is issued.

Answers come from a shared snapshot refreshed every 10 minutes; `meta.cached` says so and `meta.fetched_at` is when it was taken.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0300, once per call |
| Invalid parameters, a failure or a timeout | not charged |
| The most one call can cost | $0.0300 (send `X-Max-Price` to refuse anything above your own limit) |

Prices as read 2026-11-21 08:32 UTC, under price book 19, in effect since 2026-11-17 18:04 UTC; the Playground reads the price in force before a run.

## Errors

Every error has the same structure: `code`, `message`, `charged`, `retry`, `retry_after_seconds`, `param`, `docs_url`.

This is a backup version: the same parameters and fields as the original, at its own price. The original is the one to call first: [Weibo hot search board API](https://dataxapi.com/apis/weibo/trends/list/)

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
| 502 | `upstream_failed` | No result came back this time and nothing was charged; retry shortly | No | Yes |
| 503 | `upstream_busy` | Busy just now; retry shortly | No | Yes |
| 503 | `capability_paused` | This endpoint is paused | No | Yes |
| 503 | `overloaded` | The service is busy; retry shortly | No | Yes |
| 504 | `timeout` | The data did not arrive in time; retry with the same idempotency key | No | Yes |

[All error codes](https://dataxapi.com/docs/errors/)

## Request

The key is read from the environment; no key is ever written into a page.

### cURL

```bash
curl "https://api.dataxapi.com/v1/weibo/backup/trends/list" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.weibo.backup.trends.list()
print(result["data"]["items"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.weibo.backup.trends.list();
console.log(result.data.items);
```

### CLI

```bash
dataxapi call weibo.backup.trends.list
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

Add this to your MCP client, then ask your agent to call `weibo.backup.trends.list`.

## Responses

### 200

From a response recorded 2026-10-29 09:44 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 3.8 KB in the standard view (3.8 KB compact, 4.9 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "5e45539d-5b83-44a8-8294-d30c058b98a9",
  "data": {
    "items": [
      { "name": "周末露营怎么玩", "rank": 1, "heat": 1179776 },
      // … 49 more
    ]
  },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 50
  },
  "warnings": [],
  "meta": {
    "capability": "weibo.backup.trends.list",
    "result_status": "complete",
    "fetched_at": "2026-10-29T09:44:31.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": { "id": "platform" },
    "billing": {
      "amount": "0.03",
      "currency": "USD",
      "balance_after": "9.97"
    }
  }
}
```

### Empty

From a recording of 2026-10-29 09:44 UTC, edited by hand to show this case. The request ID and balance are made up.

Size as sent: 422 B in the standard view (422 B compact, 422 B full).

```jsonc
{
  "code": "ok",
  "request_id": "617f947f-ae5d-4fd8-a2ee-b7ab803bcf96",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "weibo.backup.trends.list",
    "result_status": "empty",
    "fetched_at": "2026-10-29T09:44:31.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": { "id": "platform" },
    "billing": {
      "amount": "0.03",
      "currency": "USD",
      "balance_after": "9.97"
    }
  }
}
```

### 400

An example written to the specification, not a recorded response.

```json
{
  "code": "invalid_params",
  "request_id": "fc706583-c133-44d0-bd0a-26f49d9876d2",
  "message": "A parameter is invalid",
  "message_zh": "参数不合法",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "problems": ["board must be one of hot_search"],
  "docs_url": "https://dataxapi.com/docs/errors#invalid_params"
}
```

### 402

An example written to the specification, not a recorded response.

```json
{
  "code": "insufficient_balance",
  "request_id": "f6e35b8f-a147-4796-be40-7da9418cdf5a",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.03",
  "available": "0",
  "top_up_url": "https://dataxapi.com/console/billing/?amount=10",
  "next_step": "The balance does not cover this call ($0.03). Top up at top_up_url: $10 at least, about 333 calls at this price; Alipay or a card, and the balance never expires. Then send the same request again, unchanged. Nothing was charged for this one.",
  "next_step_zh": "余额不够这次调用（$0.03）。到 top_up_url 充值：最低 $10，按这次的价格约够 333 次；支付宝、银行卡都能付，余额不过期。到账后把同一个请求原样再发一次。这次没有扣钱。",
  "docs_url": "https://dataxapi.com/docs/errors#insufficient_balance"
}
```

### 502

An example written to the specification, not a recorded response.

```json
{
  "code": "upstream_failed",
  "request_id": "d9090039-5d89-4796-aab5-7989ad01bee7",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

This recorded response is 7,162 tokens as the platform's own JSON, 1,259 as DataXAPI's JSON, and 1,238 as an AI reads it through DataXAPI's MCP server: 83% fewer (counted 2026-11-06).

[This example as a JSON file](https://dataxapi.com/apis/weibo/backup/trends/list.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `weibo.backup.trends.list`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/weibo/backup/trends/list.md and help me use the DataXAPI endpoint weibo.backup.trends.list (Weibo hot search board (backup)).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fweibo%2Fbackup%2Ftrends%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20weibo.backup.trends.list%20%28Weibo%20hot%20search%20board%20%28backup%29%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fweibo%2Fbackup%2Ftrends%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20weibo.backup.trends.list%20%28Weibo%20hot%20search%20board%20%28backup%29%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

The same thing on other platforms: [Bilibili hot searches](https://dataxapi.com/apis/bilibili/trends/list/), [Douyin hot search board](https://dataxapi.com/apis/douyin/trends/list/), [Kuaishou hot list](https://dataxapi.com/apis/kuaishou/trends/list/), [Weibo hot search board](https://dataxapi.com/apis/weibo/trends/list/), [X trends](https://dataxapi.com/apis/x/trends/list/), [Xiaohongshu trends](https://dataxapi.com/apis/xiaohongshu/trends/list/), [Reddit trending searches](https://dataxapi.com/apis/reddit/trends/list/), [Zhihu hot list](https://dataxapi.com/apis/zhihu/trends/list/)

More Social media data on other platforms: [Douyin trend-index live hot topics](https://dataxapi.com/apis/douyin/index/trends/list/), [Douyin comment replies](https://dataxapi.com/apis/douyin/comments/replies/list/), [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/), [Bilibili comment replies](https://dataxapi.com/apis/bilibili/comments/replies/list/), [Bilibili user profile](https://dataxapi.com/apis/bilibili/users/get/), [Bilibili user videos](https://dataxapi.com/apis/bilibili/users/videos/list/), [Bilibili video comments](https://dataxapi.com/apis/bilibili/videos/comments/list/), [Bilibili video detail](https://dataxapi.com/apis/bilibili/videos/get/), [Bilibili video search](https://dataxapi.com/apis/bilibili/videos/search/), [Bilibili popular videos](https://dataxapi.com/apis/bilibili/videos/trending/), [Douyin trend-index brand trends](https://dataxapi.com/apis/douyin/index/brands/history/), [Douyin trend-index brand comparison](https://dataxapi.com/apis/douyin/index/brands/metrics/), [Douyin trend-index creator top videos](https://dataxapi.com/apis/douyin/index/creators/videos/list/)

Weibo endpoints: [Weibo comment replies](https://dataxapi.com/apis/weibo/comments/replies/list/), [Weibo post comments](https://dataxapi.com/apis/weibo/posts/comments/list/), [Weibo post detail](https://dataxapi.com/apis/weibo/posts/get/), [Weibo post likers](https://dataxapi.com/apis/weibo/posts/likers/list/), [Weibo realtime search](https://dataxapi.com/apis/weibo/posts/search/), [Weibo hot search board](https://dataxapi.com/apis/weibo/trends/list/), [Weibo user followers](https://dataxapi.com/apis/weibo/users/followers/list/), [Weibo user profile](https://dataxapi.com/apis/weibo/users/get/), [Weibo user posts](https://dataxapi.com/apis/weibo/users/posts/list/), [Weibo user search](https://dataxapi.com/apis/weibo/users/search/), [Weibo hot search board (backup)](https://dataxapi.com/apis/weibo/backup/trends/list/)

Related: [All Weibo endpoints](https://dataxapi.com/apis/weibo/), [Social media data](https://dataxapi.com/categories/social/), [The same thing on 8 platforms, side by side](https://dataxapi.com/roles/trends-list/), [The trend object's fields](https://dataxapi.com/docs/objects/trend/)

## Questions

### How much does the Weibo hot search board (backup) API cost?

$0.0300 per call. The most one call can cost is $0.0300.

### When am I not charged?

Errors and timeouts are not charged.

### How many items does one call return, and how do I get the next page?

About 50 items a page, 51 at most. The page size is the platform's; limit is not accepted. Everything comes in one page; no cursor is issued.

---

Last checked 2026-11-21 08:32 UTC. Catalog revision 720fc3ea8dadb865. [HTML version](https://dataxapi.com/apis/weibo/backup/trends/list/)

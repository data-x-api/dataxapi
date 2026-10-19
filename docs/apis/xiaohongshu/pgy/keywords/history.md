# Xiaohongshu (RedNote) PGY keyword search index API

Get a keyword's day-by-day search index on Xiaohongshu over about the last three months, from the platform's creator marketplace, with each day's notes about the keyword and how often they were shown, read and engaged with. The platform sets the period; it cannot be chosen. The search index is the platform's index, not a count of searches; days are calendar days in China time (UTC+8). One object a call; $0.0400 per call. Errors, timeouts and objects that do not exist are not charged.

- Endpoint: `GET https://api.dataxapi.com/v1/xiaohongshu/pgy/keywords/history`
- ID: `xiaohongshu.pgy.keywords.history`
- Also known as: xiaohongshu keyword trend, rednote search index, xhs keyword history, keyword popularity on xiaohongshu
- Price: $0.0400 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 1 object, one keyword index history object
- Returns keyword index history, a preview structure that may still change
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=xiaohongshu.pgy.keywords.history&params=%7B%22keyword%22%3A%22%E9%9D%A2%E8%86%9C%22%7D)
- In Chinese: [小红书蒲公英关键词逐日搜索指数 API](https://dataxapi.com/zh/apis/xiaohongshu/pgy/keywords/history/)

## What you get

The first 7 rows of a response recorded 2026-10-12 21:42 UTC for 露营.

| date | search_index | notes | impressions | views | engagements |
| --- | --- | --- | --- | --- | --- |
| 2026-07-13 | 8,876 | 33,361 | 25,229,649 | 4,523,846 | 188,216 |
| 2026-07-14 | 8,762 | 33,750 | 24,457,001 | 4,743,520 | 197,829 |
| 2026-07-15 | 9,077 | 33,603 | 24,578,646 | 4,554,487 | 210,434 |
| 2026-07-16 | 9,328 | 34,232 | 28,302,245 | 4,819,305 | 220,431 |
| 2026-07-17 | 11,233 | 34,532 | 32,434,694 | 5,831,644 | 278,646 |
| 2026-07-18 | 12,636 | 34,772 | 35,466,179 | 6,122,704 | 279,193 |
| 2026-07-19 | 11,490 | 35,368 | 37,495,492 | 8,187,198 | 302,141 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `keyword` | text | Yes | One keyword. Example: `面膜`. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.item` is one keyword index history object. Preview: the structure may change, announced beforehand.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `keyword` | text | The keyword. | `compact` | Yes |
| `points` | list of object | The figures day by day, one entry a day, oldest first. | `compact` | Yes |
| `points[].date` | time | The day: a calendar day in China time (UTC+8), written as midnight UTC of its date (8 a.m. that day in China); passed back as since or until it asks for that same day. | `compact` | Yes |
| `points[].search_index` | integer | Search index of the day: the platform's index of how much the keyword was searched, not a count of searches. | `compact` | Yes |
| `points[].composite_index` | integer | Composite index of the day: the platform's index of how much attention content about the keyword drew, not a count. | `compact` | The platform has none |
| `points[].notes` | integer | Posts about the keyword that day. | `standard` | Yes |
| `points[].impressions` | integer | Times those posts were shown that day. | `standard` | Yes |
| `points[].views` | integer | Times those posts were read that day. | `standard` | Yes |
| `points[].engagements` | integer | Engagements with those posts that day. | `standard` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 4.8 KB, `standard` 11.4 KB, `full` 11.4 KB (measured on the response recorded 2026-10-12 21:42 UTC).

## Paging

One object per call: there is nothing to page.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0400, once per call |
| The object does not exist (404) | not charged |
| Invalid parameters, a failure of ours or of the data source, a timeout | not charged |
| The most one call can cost | $0.0400 (send `X-Max-Price` to refuse anything above your own limit) |

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
curl -G "https://api.dataxapi.com/v1/xiaohongshu/pgy/keywords/history" \
  --data-urlencode "keyword=面膜" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.xiaohongshu.pgy.keywords.history(keyword="面膜")
print(result["data"]["item"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.xiaohongshu.pgy.keywords.history({ keyword: "面膜" });
console.log(result.data.item);
```

### CLI

```bash
dataxapi call xiaohongshu.pgy.keywords.history 'keyword=面膜'
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

Add this to your MCP client, then ask your agent to call `xiaohongshu.pgy.keywords.history`.

## Responses

### 200

From a response recorded 2026-10-12 21:42 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 11.8 KB in the standard view (5.1 KB compact, 11.8 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "5303d79c-7963-4548-a038-ec91bd3cae60",
  "data": {
    "item": {
      "keyword": "露营",
      "points": [
        {
          "date": "2026-07-13T00:00:00Z",
          "search_index": 8876,
          "notes": 33361,
          "impressions": 25229649,
          "views": 4523846,
          "engagements": 188216
        },
        {
          "date": "2026-07-14T00:00:00Z",
          "search_index": 8762,
          "notes": 33750,
          "impressions": 24457001,
          "views": 4743520,
          "engagements": 197829
        },
        {
          "date": "2026-07-15T00:00:00Z",
          "search_index": 9077,
          "notes": 33603,
          "impressions": 24578646,
          "views": 4554487,
          "engagements": 210434
        },
        {
          "date": "2026-07-16T00:00:00Z",
          "search_index": 9328,
          "notes": 34232,
          "impressions": 28302245,
          "views": 4819305,
          "engagements": 220431
        },
        {
          "date": "2026-07-17T00:00:00Z",
          "search_index": 11233,
          "notes": 34532,
          "impressions": 32434694,
          "views": 5831644,
          "engagements": 278646
        },
        {
          "date": "2026-07-18T00:00:00Z",
          "search_index": 12636,
          "notes": 34772,
          "impressions": 35466179,
          "views": 6122704,
          "engagements": 279193
        },
        {
          "date": "2026-07-19T00:00:00Z",
          "search_index": 11490,
          "notes": 35368,
          "impressions": 37495492,
          "views": 8187198,
          "engagements": 302141
        },
        // … 85 more
      ]
    }
  },
  "warnings": [],
  "meta": {
    "capability": "xiaohongshu.pgy.keywords.history",
    "result_status": "complete",
    "fetched_at": "2026-10-12T21:42:12.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": { "points.composite_index": "platform" },
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
  "request_id": "05447f33-5c1e-4e26-a3f2-0e3fe95cd56a",
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
  "request_id": "f34e784f-5648-4640-8569-b371231bde51",
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

### 404

An example written to the specification, not a recorded response.

```json
{
  "code": "not_found",
  "request_id": "d251cb91-d202-489a-9b3f-c4efc56c5c2d",
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
  "request_id": "9e81ec0e-db4c-450b-ae69-6ff0901d76a2",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/history.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `xiaohongshu.pgy.keywords.history`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/xiaohongshu/pgy/keywords/history.md and help me use the DataXAPI endpoint xiaohongshu.pgy.keywords.history (Xiaohongshu (RedNote) PGY keyword search index).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fxiaohongshu%2Fpgy%2Fkeywords%2Fhistory.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20xiaohongshu.pgy.keywords.history%20%28Xiaohongshu%20%28RedNote%29%20PGY%20keyword%20search%20index%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fxiaohongshu%2Fpgy%2Fkeywords%2Fhistory.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20xiaohongshu.pgy.keywords.history%20%28Xiaohongshu%20%28RedNote%29%20PGY%20keyword%20search%20index%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

More Social media data on other platforms: [Douyin trend-index keyword trends](https://dataxapi.com/apis/douyin/index/keywords/history/), [Douyin comment replies](https://dataxapi.com/apis/douyin/comments/replies/list/), [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/), [Bilibili comment replies](https://dataxapi.com/apis/bilibili/comments/replies/list/), [Bilibili hot searches](https://dataxapi.com/apis/bilibili/trends/list/), [Bilibili user profile](https://dataxapi.com/apis/bilibili/users/get/), [Bilibili user videos](https://dataxapi.com/apis/bilibili/users/videos/list/), [Bilibili video comments](https://dataxapi.com/apis/bilibili/videos/comments/list/), [Bilibili video detail](https://dataxapi.com/apis/bilibili/videos/get/), [Bilibili video search](https://dataxapi.com/apis/bilibili/videos/search/)

Xiaohongshu PGY endpoints: [Xiaohongshu PGY keyword search index](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/history/), [Xiaohongshu PGY related keywords](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/related/), [Xiaohongshu PGY creator search](https://dataxapi.com/apis/xiaohongshu/pgy/creators/search/), [Xiaohongshu PGY creator detail](https://dataxapi.com/apis/xiaohongshu/pgy/creators/get/), [Xiaohongshu PGY creator audience profile](https://dataxapi.com/apis/xiaohongshu/pgy/creators/audience/get/), [Xiaohongshu PGY creator metrics](https://dataxapi.com/apis/xiaohongshu/pgy/creators/metrics/), [Xiaohongshu PGY creator notes](https://dataxapi.com/apis/xiaohongshu/pgy/creators/notes/list/)

Xiaohongshu (RedNote) endpoints: [Xiaohongshu image search](https://dataxapi.com/apis/xiaohongshu/images/search/), [Xiaohongshu note detail](https://dataxapi.com/apis/xiaohongshu/notes/get/), [Xiaohongshu comment replies](https://dataxapi.com/apis/xiaohongshu/comments/replies/list/), [Xiaohongshu note comments](https://dataxapi.com/apis/xiaohongshu/notes/comments/list/), [Xiaohongshu note search](https://dataxapi.com/apis/xiaohongshu/notes/search/), [Xiaohongshu topic notes](https://dataxapi.com/apis/xiaohongshu/topics/notes/list/), [Xiaohongshu topic detail](https://dataxapi.com/apis/xiaohongshu/topics/get/), [Xiaohongshu trends](https://dataxapi.com/apis/xiaohongshu/trends/list/), [Xiaohongshu user profile](https://dataxapi.com/apis/xiaohongshu/users/get/), [Xiaohongshu user notes](https://dataxapi.com/apis/xiaohongshu/users/notes/list/), [Xiaohongshu user search](https://dataxapi.com/apis/xiaohongshu/users/search/)

Xiaohongshu Shop endpoints: [Xiaohongshu product detail](https://dataxapi.com/apis/xiaohongshu/shop/products/get/), [Xiaohongshu product reviews](https://dataxapi.com/apis/xiaohongshu/shop/products/reviews/list/), [Xiaohongshu product search](https://dataxapi.com/apis/xiaohongshu/shop/products/search/)

Related: [All Xiaohongshu PGY endpoints](https://dataxapi.com/apis/xiaohongshu/pgy/), [All Xiaohongshu (RedNote) endpoints](https://dataxapi.com/apis/xiaohongshu/), [Social media data](https://dataxapi.com/categories/social/), [The keyword index history object's fields](https://dataxapi.com/docs/objects/keyword_history/)

## Questions

### How much does the Xiaohongshu (RedNote) PGY keyword search index API cost?

$0.0400 per call. The most one call can cost is $0.0400.

### When am I not charged?

Errors, timeouts and objects that do not exist are not charged.

### What happens if the object does not exist?

The answer is 404 not_found and nothing is charged. reason says which: not_found (it does not exist) or private_or_deleted.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/history/)

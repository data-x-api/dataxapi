# Douyin trend-index related keywords API

Get the keywords related to a keyword on Douyin in one week, from the platform's own keyword tool: those searched together with it and those that appear with it in content, each with its relevance, its place by relevance, its search index and its composite index. An index is the platform's score of volume, not a count of searches. About 170 items a call, 250 at most; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Endpoint: `GET https://api.dataxapi.com/v1/douyin/index/keywords/related`
- ID: `douyin.index.keywords.related`
- Also known as: douyin related searches, douyin keyword relations, douyin keyword expansion
- Price: $0.0020 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: up to 250 a page, everything in one answer, no paging
- Returns related keyword, a preview structure that may still change
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=douyin.index.keywords.related&params=%7B%22keyword%22%3A%22%E9%9C%B2%E8%90%A5%22%2C%22until%22%3A%222026-10-04T00%3A00%3A00Z%22%7D)
- In Chinese: [抖音巨量算数关联词 API](https://dataxapi.com/zh/apis/douyin/index/keywords/related/)

## What you get

The first 7 rows of a response recorded 2026-10-12 21:52 UTC for 露营车.

| Field | Value |
| --- | --- |
| keyword | 露营车 |
| related_to | 露营 |
| relation | query |
| rank | 2 |
| relevance | 0.08 |
| search_index | 669,384 |
| composite_index | 190,809 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `keyword` | text | Yes | One keyword; letter case does not matter. Example: `露营`. |
| `until` | time | Yes | Which week: relations are computed by the week (Monday to Sunday, China time), and the week returned is the last whole one ending on or before this day. The latest week is published early in the next; before that the result is empty. Example: `2026-10-04T00:00:00Z`. |
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
| `rank` | integer | Position by relevance among the keywords of the same relation, from 1. On this platform: The platform's own place by relevance; places may have gaps between them. | `compact` | Yes |
| `relevance` | number | How closely it is related to the keyword asked about, 0 to 1. | `compact` | Yes |
| `search_index` | integer | Search index of the related keyword: the platform's index, not a count of searches; null where the platform gives no figure for the word. | `compact` | Yes |
| `composite_index` | integer | Composite index of the related keyword: the platform's index of how much attention content about it drew, not a count. | `compact` | Yes |
| `ext.relevance_change` | number | Change in relevance against the week before, as a ratio: 0.1 is 10% up; null for a keyword newly related this week. | `full` | Yes |
| `ext.is_new` | yes/no | Whether the keyword is newly related this week. | `full` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 155 B, `standard` 155 B, `full` 204 B (measured on the response recorded 2026-10-12 21:52 UTC).

## Paging

About 170 items a page, 250 at most. The page size is the platform's; `limit` is not accepted.

Everything comes in one page; no cursor is issued.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0020, once per call |
| An empty result | $0.0020 |
| Invalid parameters, a failure of ours or of the data source, a timeout | not charged |
| The most one call can cost | $0.0020 (send `X-Max-Price` to refuse anything above your own limit) |

Prices as read 2026-10-18 19:59 UTC, under price book 2, in effect since 2026-10-17 11:00 UTC; the Playground reads the price in force before a run.

## If the object does not exist

A keyword the index does not cover reads like one with no related keywords that week, or a week not published yet: an empty result, never a not-found error.

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
curl -G "https://api.dataxapi.com/v1/douyin/index/keywords/related" \
  --data-urlencode "keyword=露营" \
  --data-urlencode "until=2026-10-04T00:00:00Z" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.douyin.index.keywords.related(keyword="露营", until="2026-10-04T00:00:00Z")
print(result["data"]["items"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.douyin.index.keywords.related({ keyword: "露营", until: "2026-10-04T00:00:00Z" });
console.log(result.data.items);
```

### CLI

```bash
dataxapi call douyin.index.keywords.related 'keyword=露营' until=2026-10-04T00:00:00Z
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

Add this to your MCP client, then ask your agent to call `douyin.index.keywords.related`.

## Responses

### 200

From a response recorded 2026-10-12 21:52 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 26.6 KB in the standard view (26.6 KB compact, 34.9 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "c0ec3319-99cf-4ec1-8441-1e77af9db440",
  "data": {
    "items": [
      {
        "keyword": "露营车",
        "related_to": "露营",
        "relation": "query",
        "rank": 2,
        "relevance": 0.07604021617112115,
        "search_index": 669384,
        "composite_index": 190809
      },
      // … 172 more
    ]
  },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 173
  },
  "warnings": [],
  "meta": {
    "capability": "douyin.index.keywords.related",
    "result_status": "complete",
    "fetched_at": "2026-10-12T21:52:26.000Z",
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

From a response recorded 2026-10-12 21:52 UTC. The request ID and balance are made up.

Size as sent: 412 B in the standard view (412 B compact, 412 B full).

```jsonc
{
  "code": "ok",
  "request_id": "6effcad3-d2c9-41ac-8941-5e1c6e798e10",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "douyin.index.keywords.related",
    "result_status": "empty",
    "fetched_at": "2026-10-12T21:52:28.000Z",
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
  "request_id": "a860bf7f-51fc-4b67-8674-2a2b3f2b6592",
  "message": "A parameter is invalid",
  "message_zh": "参数不合法",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "problems": ["keyword is required", "until is required"],
  "docs_url": "https://dataxapi.com/docs/errors#invalid_params"
}
```

### 402

An example written to the specification, not a recorded response.

```json
{
  "code": "insufficient_balance",
  "request_id": "7222da1a-163b-4a1f-91f5-781a4ef64442",
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
  "request_id": "e2784f4e-cc60-414f-b718-96a7b08b667d",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/douyin/index/keywords/related.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `douyin.index.keywords.related`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/douyin/index/keywords/related.md and help me use the DataXAPI endpoint douyin.index.keywords.related (Douyin trend-index related keywords).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fdouyin%2Findex%2Fkeywords%2Frelated.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20douyin.index.keywords.related%20%28Douyin%20trend-index%20related%20keywords%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fdouyin%2Findex%2Fkeywords%2Frelated.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20douyin.index.keywords.related%20%28Douyin%20trend-index%20related%20keywords%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

Douyin trend-index endpoints: [Douyin trend-index brand trends](https://dataxapi.com/apis/douyin/index/brands/history/), [Douyin trend-index brand comparison](https://dataxapi.com/apis/douyin/index/brands/metrics/), [Douyin trend-index creator top videos](https://dataxapi.com/apis/douyin/index/creators/videos/list/), [Douyin trend-index creator follower profile](https://dataxapi.com/apis/douyin/index/creators/audience/get/), [Douyin trend-index creator core metrics](https://dataxapi.com/apis/douyin/index/creators/metrics/), [Douyin trend-index keyword audience](https://dataxapi.com/apis/douyin/index/keywords/audience/get/), [Douyin trend-index keyword trends](https://dataxapi.com/apis/douyin/index/keywords/history/), [Douyin trend-index related keywords](https://dataxapi.com/apis/douyin/index/keywords/related/), [Douyin trend-index live hot topics](https://dataxapi.com/apis/douyin/index/trends/list/), [Douyin trend-index keyword hot videos](https://dataxapi.com/apis/douyin/index/videos/search/)

Douyin endpoints: [Douyin comment replies](https://dataxapi.com/apis/douyin/comments/replies/list/), [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/), [Douyin hot search board](https://dataxapi.com/apis/douyin/trends/list/), [Douyin user profile](https://dataxapi.com/apis/douyin/users/get/), [Douyin creator engagement and follower trends](https://dataxapi.com/apis/douyin/users/history/), [Douyin user search](https://dataxapi.com/apis/douyin/users/search/), [Douyin user videos](https://dataxapi.com/apis/douyin/users/videos/list/), [Douyin video comments](https://dataxapi.com/apis/douyin/videos/comments/list/), [Douyin video detail](https://dataxapi.com/apis/douyin/videos/get/), [Douyin video play count](https://dataxapi.com/apis/douyin/videos/metrics/), [Douyin related videos](https://dataxapi.com/apis/douyin/videos/related/), [Douyin video search](https://dataxapi.com/apis/douyin/videos/search/), [Douyin trending videos](https://dataxapi.com/apis/douyin/videos/trending/)

Douyin Xingtu endpoints: [Douyin Xingtu creator rate card](https://dataxapi.com/apis/douyin/xingtu/creators/rates/get/), [Douyin Xingtu creator search](https://dataxapi.com/apis/douyin/xingtu/creators/search/), [Douyin Xingtu creator profile](https://dataxapi.com/apis/douyin/xingtu/creators/get/), [Douyin Xingtu creator audience](https://dataxapi.com/apis/douyin/xingtu/creators/audience/get/), [Douyin Xingtu creator metrics](https://dataxapi.com/apis/douyin/xingtu/creators/metrics/), [Douyin Xingtu creator video performance](https://dataxapi.com/apis/douyin/xingtu/creators/videos/list/), [Douyin Xingtu creator content keywords](https://dataxapi.com/apis/douyin/xingtu/creators/keywords/get/), [Douyin Xingtu creator index scores](https://dataxapi.com/apis/douyin/xingtu/creators/scores/get/), [Douyin Xingtu creator content mix](https://dataxapi.com/apis/douyin/xingtu/creators/content_mix/get/), [Douyin Xingtu creator conversion](https://dataxapi.com/apis/douyin/xingtu/creators/conversion/get/), [Douyin Xingtu marketing calendar](https://dataxapi.com/apis/douyin/xingtu/campaigns/list/)

How-to guides and answers: [How to get Douyin keyword trends in bulk](https://dataxapi.com/guides/douyin-keyword-trends/)

Related: [All Douyin trend-index endpoints](https://dataxapi.com/apis/douyin/index/), [All Douyin endpoints](https://dataxapi.com/apis/douyin/), [Social media data](https://dataxapi.com/categories/social/), [The related keyword object's fields](https://dataxapi.com/docs/objects/keyword_related/)

## Questions

### How much does the Douyin trend-index related keywords API cost?

$0.0020 per call. The most one call can cost is $0.0020.

### When am I not charged?

Errors and timeouts are not charged; an empty result is charged $0.0020.

### How many items does one call return, and how do I get the next page?

About 170 items a page, 250 at most. The page size is the platform's; limit is not accepted. Everything comes in one page; no cursor is issued.

### What happens if the object does not exist?

A keyword the index does not cover reads like one with no related keywords that week, or a week not published yet: an empty result, never a not-found error.

### Where do the related keywords come from?

From 巨量算数 (Juliang Suanshu, the Douyin index), which works them out by the week, Monday to Sunday in China time. until picks the latest whole week that ended on or before that day; the newest week usually appears early the next week.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/douyin/index/keywords/related/)

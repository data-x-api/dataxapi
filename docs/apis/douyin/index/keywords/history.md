# Douyin trend-index keyword trends API

Get the day-by-day search index and composite index of a keyword, or of one to five keywords at once, on Douyin over a date range, from 巨量算数 (the Douyin index), with the daily averages of the period, of the one before and of a year earlier. An index is the platform's score of volume, not a count of searches; days are calendar days in China time (UTC+8). About 1 item a call, 5 at most; $0.0060 per call. Errors and timeouts are not charged; an empty result is charged $0.0060.

- Endpoint: `GET / POST https://api.dataxapi.com/v1/douyin/index/keywords/history`
- ID: `douyin.index.keywords.history`
- Also known as: Douyin keyword index API, Ocean Engine index, Juliang Suanshu keyword index, douyin keyword trend, douyin search index, douyin index history, keyword popularity on douyin, Douyin trend-index keyword interpretation
- Price: $0.0060 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: up to 5 a page, everything in one answer, no paging
- Returns keyword index history, a preview structure that may still change
- [No code: try the Douyin keyword index lookup (巨量算数) →](https://dataxapi.com/tools/douyin-index/)
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=douyin.index.keywords.history&params=%7B%22since%22%3A%222026-09-01T00%3A00%3A00Z%22%2C%22until%22%3A%222026-09-30T00%3A00%3A00Z%22%2C%22keywords%22%3A%5B%22%E5%92%96%E5%95%A1%22%2C%22CityWalk%22%5D%7D)
- In Chinese: [抖音巨量算数关键词热度趋势 API](https://dataxapi.com/zh/apis/douyin/index/keywords/history/)

## What you get

The first 7 rows of a response recorded 2026-10-12 21:47 UTC for 咖啡.

| date | search_index | composite_index |
| --- | --- | --- |
| 2026-09-01 | 4,542,097 | 1,627,826 |
| 2026-09-02 | 4,430,237 | 1,603,543 |
| 2026-09-03 | 4,439,049 | 1,606,224 |
| 2026-09-04 | 4,590,172 | 1,648,872 |
| 2026-09-05 | 5,608,382 | 1,966,637 |
| 2026-09-06 | 5,341,970 | 1,888,380 |
| 2026-09-07 | 5,098,808 | 1,808,789 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `keyword` | text | give exactly one of `keywords`, `keyword` | One keyword, at most 50 characters and without a comma; letter case does not matter. Example: `咖啡`. |
| `keywords` | list of text | give exactly one of `keywords`, `keyword` | One to five keywords, each at most 50 characters and without a comma; letter case does not matter. One item comes back per keyword that has figures; a keyword the index does not cover is not in the answer. Example: `["咖啡","CityWalk"]`. |
| `since` | time | Yes | The first day wanted: the China-time (UTC+8) calendar day this moment falls on; 2026-09-01 means 1 September. Example: `2026-09-01T00:00:00Z`. |
| `until` | time | Yes | The last day wanted, read the same way. The platform publishes a day or two late: a day it has no figure for yet has a null index. Example: `2026-09-30T00:00:00Z`. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

A request with `keywords` is a POST with a JSON body; every other request is a GET.

## Returned fields

`data.items` is a list of keyword index history objects. Preview: the structure may change, announced beforehand.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `keyword` | text | The keyword. On this platform: As the platform writes it: Latin letters in lower case. | `compact` | Yes |
| `points` | list of object | The figures day by day, one entry a day, oldest first. | `compact` | Yes |
| `points[].date` | time | The day: a calendar day in China time (UTC+8), written as midnight UTC of its date (8 a.m. that day in China); passed back as since or until it asks for that same day. | `compact` | Yes |
| `points[].search_index` | integer | Search index of the day: the platform's index of how much the keyword was searched, not a count of searches. | `compact` | Yes |
| `points[].composite_index` | integer | Composite index of the day: the platform's index of how much attention content about the keyword drew, not a count. | `compact` | Yes |
| `points[].notes` | integer | Posts about the keyword that day. | `standard` | The platform has none |
| `points[].impressions` | integer | Times those posts were shown that day. | `standard` | The platform has none |
| `points[].views` | integer | Times those posts were read that day. | `standard` | The platform has none |
| `points[].engagements` | integer | Engagements with those posts that day. | `standard` | The platform has none |
| `ext.composite_average` | integer | Daily average of the composite index over the period asked for. | `full` | Yes |
| `ext.search_average` | integer | Daily average of the search index over the period asked for. | `full` | Yes |
| `ext.previous_composite_average` | integer | Daily average of the composite index over the period of the same length before it. | `full` | Yes |
| `ext.previous_search_average` | integer | Daily average of the search index over the period of the same length before it. | `full` | Yes |
| `ext.year_ago_composite_average` | integer | Daily average of the composite index over the same period a year earlier. | `full` | Yes |
| `ext.year_ago_search_average` | integer | Daily average of the search index over the same period a year earlier. | `full` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 2.3 KB, `standard` 2.3 KB, `full` 2.5 KB (measured on the response recorded 2026-10-12 21:47 UTC).

## Paging

About 1 item a page, 5 at most. The page size is the platform's; `limit` is not accepted.

Everything comes in one page; no cursor is issued.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0060, once per call |
| An empty result | $0.0060 |
| Invalid parameters, a failure of ours or of the data source, a timeout | not charged |
| The most one call can cost | $0.0060 (send `X-Max-Price` to refuse anything above your own limit) |

Prices as read 2026-10-18 19:59 UTC, under price book 2, in effect since 2026-10-17 11:00 UTC; the Playground reads the price in force before a run.

## If the object does not exist

A keyword the index does not cover is not in the answer; when none of the keywords asked for has figures the result is empty, never a not-found error. Asking only for days the platform has not published yet is an empty result too.

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
curl "https://api.dataxapi.com/v1/douyin/index/keywords/history" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"since":"2026-09-01T00:00:00Z","until":"2026-09-30T00:00:00Z","keywords":["咖啡","CityWalk"]}'
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.douyin.index.keywords.history(since="2026-09-01T00:00:00Z", until="2026-09-30T00:00:00Z", keywords=["咖啡", "CityWalk"])
print(result["data"]["items"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.douyin.index.keywords.history({ since: "2026-09-01T00:00:00Z", until: "2026-09-30T00:00:00Z", keywords: ["咖啡", "CityWalk"] });
console.log(result.data.items);
```

### CLI

```bash
dataxapi call douyin.index.keywords.history since=2026-09-01T00:00:00Z until=2026-09-30T00:00:00Z 'keywords=咖啡,CityWalk'
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

Add this to your MCP client, then ask your agent to call `douyin.index.keywords.history`.

## Responses

### 200

From a response recorded 2026-10-12 21:47 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 5.2 KB in the standard view (5.2 KB compact, 5.6 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "53564b2f-0976-4ff1-bacd-8f35e1e89865",
  "data": {
    "items": [
      {
        "keyword": "咖啡",
        "points": [
          {
            "date": "2026-09-01T00:00:00Z",
            "search_index": 4542097,
            "composite_index": 1627826
          },
          {
            "date": "2026-09-02T00:00:00Z",
            "search_index": 4430237,
            "composite_index": 1603543
          },
          {
            "date": "2026-09-03T00:00:00Z",
            "search_index": 4439049,
            "composite_index": 1606224
          },
          {
            "date": "2026-09-04T00:00:00Z",
            "search_index": 4590172,
            "composite_index": 1648872
          },
          {
            "date": "2026-09-05T00:00:00Z",
            "search_index": 5608382,
            "composite_index": 1966637
          },
          {
            "date": "2026-09-06T00:00:00Z",
            "search_index": 5341970,
            "composite_index": 1888380
          },
          {
            "date": "2026-09-07T00:00:00Z",
            "search_index": 5098808,
            "composite_index": 1808789
          },
          // … 23 more
        ]
      },
      // … 1 more
    ]
  },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 2
  },
  "warnings": [],
  "meta": {
    "capability": "douyin.index.keywords.history",
    "result_status": "complete",
    "fetched_at": "2026-10-12T21:47:47.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "points.notes": "platform",
      "points.impressions": "platform",
      "points.views": "platform",
      "points.engagements": "platform"
    },
    "billing": {
      "amount": "0.006",
      "currency": "USD",
      "balance_after": "9.994"
    }
  }
}
```

### Empty

From a response recorded 2026-10-12 21:47 UTC. The request ID and balance are made up.

Size as sent: 527 B in the standard view (527 B compact, 527 B full).

```jsonc
{
  "code": "ok",
  "request_id": "2f84dceb-a3e5-448e-906d-070c3e66e29d",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "douyin.index.keywords.history",
    "result_status": "empty",
    "fetched_at": "2026-10-12T21:47:49.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "points.notes": "platform",
      "points.impressions": "platform",
      "points.views": "platform",
      "points.engagements": "platform"
    },
    "billing": {
      "amount": "0.006",
      "currency": "USD",
      "balance_after": "9.994"
    }
  }
}
```

### 400

An example written to the specification, not a recorded response.

```json
{
  "code": "invalid_params",
  "request_id": "7aa5e633-6853-4495-bdd5-ee8237f29858",
  "message": "A parameter is invalid",
  "message_zh": "参数不合法",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "problems": [
    "since is required",
    "until is required",
    "give exactly one of keywords, keyword"
  ],
  "docs_url": "https://dataxapi.com/docs/errors#invalid_params"
}
```

### 402

An example written to the specification, not a recorded response.

```json
{
  "code": "insufficient_balance",
  "request_id": "8109c4b5-bc65-4098-b3b9-b3b798b91b4b",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.006",
  "available": "0",
  "docs_url": "https://dataxapi.com/docs/errors#insufficient_balance"
}
```

### 502

An example written to the specification, not a recorded response.

```json
{
  "code": "upstream_failed",
  "request_id": "ec0fdfc5-5746-4982-a84c-473e3b02679a",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/douyin/index/keywords/history.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `douyin.index.keywords.history`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/douyin/index/keywords/history.md and help me use the DataXAPI endpoint douyin.index.keywords.history (Douyin trend-index keyword trends).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fdouyin%2Findex%2Fkeywords%2Fhistory.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20douyin.index.keywords.history%20%28Douyin%20trend-index%20keyword%20trends%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fdouyin%2Findex%2Fkeywords%2Fhistory.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20douyin.index.keywords.history%20%28Douyin%20trend-index%20keyword%20trends%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

Douyin trend-index endpoints: [Douyin trend-index brand trends](https://dataxapi.com/apis/douyin/index/brands/history/), [Douyin trend-index brand comparison](https://dataxapi.com/apis/douyin/index/brands/metrics/), [Douyin trend-index creator top videos](https://dataxapi.com/apis/douyin/index/creators/videos/list/), [Douyin trend-index creator follower profile](https://dataxapi.com/apis/douyin/index/creators/audience/get/), [Douyin trend-index creator core metrics](https://dataxapi.com/apis/douyin/index/creators/metrics/), [Douyin trend-index keyword audience](https://dataxapi.com/apis/douyin/index/keywords/audience/get/), [Douyin trend-index keyword trends](https://dataxapi.com/apis/douyin/index/keywords/history/), [Douyin trend-index related keywords](https://dataxapi.com/apis/douyin/index/keywords/related/), [Douyin trend-index live hot topics](https://dataxapi.com/apis/douyin/index/trends/list/), [Douyin trend-index keyword hot videos](https://dataxapi.com/apis/douyin/index/videos/search/)

Douyin endpoints: [Douyin comment replies](https://dataxapi.com/apis/douyin/comments/replies/list/), [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/), [Douyin hot search board](https://dataxapi.com/apis/douyin/trends/list/), [Douyin user profile](https://dataxapi.com/apis/douyin/users/get/), [Douyin creator engagement and follower trends](https://dataxapi.com/apis/douyin/users/history/), [Douyin user search](https://dataxapi.com/apis/douyin/users/search/), [Douyin user videos](https://dataxapi.com/apis/douyin/users/videos/list/), [Douyin video comments](https://dataxapi.com/apis/douyin/videos/comments/list/), [Douyin video detail](https://dataxapi.com/apis/douyin/videos/get/), [Douyin video play count](https://dataxapi.com/apis/douyin/videos/metrics/), [Douyin related videos](https://dataxapi.com/apis/douyin/videos/related/), [Douyin video search](https://dataxapi.com/apis/douyin/videos/search/), [Douyin trending videos](https://dataxapi.com/apis/douyin/videos/trending/)

Douyin Xingtu endpoints: [Douyin Xingtu creator rate card](https://dataxapi.com/apis/douyin/xingtu/creators/rates/get/), [Douyin Xingtu creator search](https://dataxapi.com/apis/douyin/xingtu/creators/search/), [Douyin Xingtu creator profile](https://dataxapi.com/apis/douyin/xingtu/creators/get/), [Douyin Xingtu creator audience](https://dataxapi.com/apis/douyin/xingtu/creators/audience/get/), [Douyin Xingtu creator metrics](https://dataxapi.com/apis/douyin/xingtu/creators/metrics/), [Douyin Xingtu creator video performance](https://dataxapi.com/apis/douyin/xingtu/creators/videos/list/), [Douyin Xingtu creator content keywords](https://dataxapi.com/apis/douyin/xingtu/creators/keywords/get/), [Douyin Xingtu creator index scores](https://dataxapi.com/apis/douyin/xingtu/creators/scores/get/), [Douyin Xingtu creator content mix](https://dataxapi.com/apis/douyin/xingtu/creators/content_mix/get/), [Douyin Xingtu creator conversion](https://dataxapi.com/apis/douyin/xingtu/creators/conversion/get/), [Douyin Xingtu marketing calendar](https://dataxapi.com/apis/douyin/xingtu/campaigns/list/)

How-to guides and answers: [How to get Douyin keyword trends in bulk](https://dataxapi.com/guides/douyin-keyword-trends/), [How do I export Douyin data?](https://dataxapi.com/answers/export-douyin-data/)

Tools built on this endpoint: [Douyin keyword index lookup (巨量算数): look it up (sign-in)](https://dataxapi.com/tools/douyin-index/)

Related: [All Douyin trend-index endpoints](https://dataxapi.com/apis/douyin/index/), [All Douyin endpoints](https://dataxapi.com/apis/douyin/), [Social media data](https://dataxapi.com/categories/social/), [The keyword index history object's fields](https://dataxapi.com/docs/objects/keyword_history/)

## Questions

### How much does the Douyin trend-index keyword trends API cost?

$0.0060 per call. The most one call can cost is $0.0060.

### When am I not charged?

Errors and timeouts are not charged; an empty result is charged $0.0060.

### How many items does one call return, and how do I get the next page?

About 1 item a page, 5 at most. The page size is the platform's; limit is not accepted. Everything comes in one page; no cursor is issued.

### What happens if the object does not exist?

A keyword the index does not cover is not in the answer; when none of the keywords asked for has figures the result is empty, never a not-found error. Asking only for days the platform has not published yet is an empty result too.

### Where do the figures come from?

From 巨量算数 (Juliang Suanshu, also called the Douyin index), Douyin's own keyword index tool: the search index and the composite index it shows for the keyword, day by day. No Douyin or advertiser account is needed.

### How often is it updated?

One figure per calendar day in China time (UTC+8). The platform publishes a day or two late: a day it has no figure for yet comes back with a null index.

### How long a range can I ask for?

Any run of whole days from since to until, both included; one call costs the same whatever the range. The example asks for September 2026. Each keyword also comes with the daily averages of the period, of the period before and of the same period a year earlier.

### How many keywords can one call take?

One with keyword, or one to five with keywords (a POST). The price is per call, $0.0060, so five keywords cost the same as one. A keyword the index does not cover is left out of the answer.

### How do I use it in ChatGPT or Claude?

Connect DataXAPI once (one prompt with your key, on the agents page), then ask in plain words: "Get the Douyin index of 咖啡 for September 2026 with DataXAPI." The agent calls douyin.index.keywords.history and each call is charged $0.0060.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/douyin/index/keywords/history/)

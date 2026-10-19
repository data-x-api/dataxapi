# Douyin Xingtu creator video performance API

Get a page of a Douyin creator's videos by Xingtu creator ID, newest first, with the figures Xingtu gives for each: views, likes, completion and engagement ratios, length. Up to 20 items a call; $0.0040 per call. Errors and timeouts are not charged; an empty result is charged $0.0040.

- Endpoint: `GET https://api.dataxapi.com/v1/douyin/xingtu/creators/videos/list`
- ID: `douyin.xingtu.creators.videos.list`
- Also known as: xingtu kol videos, creator video performance
- Price: $0.0040 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 20 a page, a page, with a cursor for the next
- Returns xingtu creator video, a preview structure that may still change
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=douyin.xingtu.creators.videos.list&params=%7B%22id%22%3A%226763236383382306828%22%7D)
- In Chinese: [抖音星图达人作品表现 API](https://dataxapi.com/zh/apis/douyin/xingtu/creators/videos/list/)

## What you get

The first 7 rows of a response recorded 2026-10-12 22:08 UTC.

| Field | Value |
| --- | --- |
| published_at | 2026-10-09 09:00 UTC |
| duration | 222.21 |
| metrics.views | 96,840 |
| metrics.likes | 1,370 |
| metrics.comments | 91 |
| metrics.completion_rate | 2.0% |
| metrics.engagement_rate | 2.0% |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `id` | text | Yes | Xingtu creator ID, a string of digits; not the Douyin account ID: take it from the Xingtu creator search. Example: `6763236383382306828`. |
| `cursor` | text |  | Cursor returned by the previous page. Pass `page.next_cursor` of the page before, unchanged. Each page is charged as a call of its own. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.items` is a list of xingtu creator video objects. Preview: the structure may change, announced beforehand.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `id` | text | Video ID, the one the Douyin video endpoints take. | `compact` | Yes |
| `url` | link | Link to the video. | `compact` | Yes |
| `title` | text | The video's caption. Long text: the compact view keeps the first 500 characters and says so in `warnings`. | `compact` | Yes |
| `published_at` | time | When it was published. | `compact` | Yes |
| `duration` | number | Length of the video, in seconds. | `standard` | Yes |
| `metrics` | object | The video's figures. | `compact` | Yes |
| `metrics.views` | integer | Views. | `compact` | Yes |
| `metrics.likes` | integer | Likes. | `compact` | Yes |
| `metrics.comments` | integer | Comments. | `compact` | Yes |
| `metrics.completion_rate` | number | Completion rate, 0 to 1. | `compact` | Yes |
| `metrics.engagement_rate` | number | Engagement rate, 0 to 1. | `compact` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 360 B, `standard` 379 B, `full` 379 B (measured on the response recorded 2026-10-12 22:08 UTC).

## Paging

20 items a page. The page size is the platform's; `limit` is not accepted.

For the next page pass `page.next_cursor` as `cursor`; a cursor is valid for 1 hour. `page.has_more` is false on the last page.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0040, once per call |
| Each further page | charged as a call of its own |
| An empty result | $0.0040 |
| Invalid parameters, a failure of ours or of the data source, a timeout | not charged |
| The most one call can cost | $0.0040 (send `X-Max-Price` to refuse anything above your own limit) |

Prices as read 2026-10-18 19:59 UTC, under price book 2, in effect since 2026-10-17 11:00 UTC; the Playground reads the price in force before a run.

## If the object does not exist

A creator that does not exist cannot be told from a creator without videos: both return an empty result, not a 404, and are charged as an empty result is.

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
curl -G "https://api.dataxapi.com/v1/douyin/xingtu/creators/videos/list" \
  --data-urlencode "id=6763236383382306828" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.douyin.xingtu.creators.videos.list(id="6763236383382306828")
print(result["data"]["items"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.douyin.xingtu.creators.videos.list({ id: "6763236383382306828" });
console.log(result.data.items);
```

### CLI

```bash
dataxapi call douyin.xingtu.creators.videos.list id=6763236383382306828
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

Add this to your MCP client, then ask your agent to call `douyin.xingtu.creators.videos.list`.

## Responses

### 200

From a response recorded 2026-10-12 22:08 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 7.8 KB in the standard view (7.5 KB compact, 7.8 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "e9732015-daef-4fa7-93e6-b8570dff4424",
  "data": {
    "items": [
      {
        "id": "7202901412163322322",
        "url": "https://www.douyin.com/video/7202901412163322322",
        "title": "周末露营装备清单，新手照着买就行",
        "published_at": "2026-10-09T09:00:01.000Z",
        "duration": 222.207,
        "metrics": {
          "views": 96840,
          "likes": 1370,
          "comments": 91,
          "completion_rate": 0.020132,
          "engagement_rate": 0.02032
        }
      },
      // … 19 more
    ]
  },
  "page": {
    "next_cursor": "c1.laqeNX_b4jUj2zbq9DnWP0drMtzkw18WgbNUG0yh",
    "cursor_expires_at": "2026-10-12T23:08:13.000Z",
    "has_more": true,
    "returned": 20
  },
  "warnings": [],
  "meta": {
    "capability": "douyin.xingtu.creators.videos.list",
    "result_status": "complete",
    "fetched_at": "2026-10-12T22:08:13.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {},
    "billing": {
      "amount": "0.004",
      "currency": "USD",
      "balance_after": "9.996"
    }
  }
}
```

### Empty

From a response recorded 2026-10-12 21:49 UTC. The request ID and balance are made up.

Size as sent: 417 B in the standard view (417 B compact, 417 B full).

```jsonc
{
  "code": "ok",
  "request_id": "68f158ed-15e8-43e5-b19e-9498480a04ac",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "douyin.xingtu.creators.videos.list",
    "result_status": "empty",
    "fetched_at": "2026-10-12T21:49:45.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {},
    "billing": {
      "amount": "0.004",
      "currency": "USD",
      "balance_after": "9.996"
    }
  }
}
```

### 400

An example written to the specification, not a recorded response.

```json
{
  "code": "invalid_params",
  "request_id": "3064fdc8-1855-43cf-b3c9-0ba9524ef23e",
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
  "request_id": "dd4aaa4c-c896-40e2-bd85-6f986a4e0b3b",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.004",
  "available": "0",
  "docs_url": "https://dataxapi.com/docs/errors#insufficient_balance"
}
```

### 502

An example written to the specification, not a recorded response.

```json
{
  "code": "upstream_failed",
  "request_id": "456dd6dd-7bde-41bf-9601-27bd84147d4d",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/douyin/xingtu/creators/videos/list.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `douyin.xingtu.creators.videos.list`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/douyin/xingtu/creators/videos/list.md and help me use the DataXAPI endpoint douyin.xingtu.creators.videos.list (Douyin Xingtu creator video performance).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fdouyin%2Fxingtu%2Fcreators%2Fvideos%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20douyin.xingtu.creators.videos.list%20%28Douyin%20Xingtu%20creator%20video%20performance%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fdouyin%2Fxingtu%2Fcreators%2Fvideos%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20douyin.xingtu.creators.videos.list%20%28Douyin%20Xingtu%20creator%20video%20performance%29.)

## Related

Part of DataXAPI's Creators data. The same key also works for: Social media, Ads, E-commerce.

The same thing on other platforms: [Xiaohongshu PGY creator notes](https://dataxapi.com/apis/xiaohongshu/pgy/creators/notes/list/)

Douyin Xingtu endpoints: [Douyin Xingtu creator rate card](https://dataxapi.com/apis/douyin/xingtu/creators/rates/get/), [Douyin Xingtu creator search](https://dataxapi.com/apis/douyin/xingtu/creators/search/), [Douyin Xingtu creator profile](https://dataxapi.com/apis/douyin/xingtu/creators/get/), [Douyin Xingtu creator audience](https://dataxapi.com/apis/douyin/xingtu/creators/audience/get/), [Douyin Xingtu creator metrics](https://dataxapi.com/apis/douyin/xingtu/creators/metrics/), [Douyin Xingtu creator video performance](https://dataxapi.com/apis/douyin/xingtu/creators/videos/list/), [Douyin Xingtu creator content keywords](https://dataxapi.com/apis/douyin/xingtu/creators/keywords/get/), [Douyin Xingtu creator index scores](https://dataxapi.com/apis/douyin/xingtu/creators/scores/get/), [Douyin Xingtu creator content mix](https://dataxapi.com/apis/douyin/xingtu/creators/content_mix/get/), [Douyin Xingtu creator conversion](https://dataxapi.com/apis/douyin/xingtu/creators/conversion/get/), [Douyin Xingtu marketing calendar](https://dataxapi.com/apis/douyin/xingtu/campaigns/list/)

Douyin endpoints: [Douyin comment replies](https://dataxapi.com/apis/douyin/comments/replies/list/), [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/), [Douyin hot search board](https://dataxapi.com/apis/douyin/trends/list/), [Douyin user profile](https://dataxapi.com/apis/douyin/users/get/), [Douyin creator engagement and follower trends](https://dataxapi.com/apis/douyin/users/history/), [Douyin user search](https://dataxapi.com/apis/douyin/users/search/), [Douyin user videos](https://dataxapi.com/apis/douyin/users/videos/list/), [Douyin video comments](https://dataxapi.com/apis/douyin/videos/comments/list/), [Douyin video detail](https://dataxapi.com/apis/douyin/videos/get/), [Douyin video play count](https://dataxapi.com/apis/douyin/videos/metrics/), [Douyin related videos](https://dataxapi.com/apis/douyin/videos/related/), [Douyin video search](https://dataxapi.com/apis/douyin/videos/search/), [Douyin trending videos](https://dataxapi.com/apis/douyin/videos/trending/)

Douyin trend-index endpoints: [Douyin trend-index brand trends](https://dataxapi.com/apis/douyin/index/brands/history/), [Douyin trend-index brand comparison](https://dataxapi.com/apis/douyin/index/brands/metrics/), [Douyin trend-index creator top videos](https://dataxapi.com/apis/douyin/index/creators/videos/list/), [Douyin trend-index creator follower profile](https://dataxapi.com/apis/douyin/index/creators/audience/get/), [Douyin trend-index creator core metrics](https://dataxapi.com/apis/douyin/index/creators/metrics/), [Douyin trend-index keyword audience](https://dataxapi.com/apis/douyin/index/keywords/audience/get/), [Douyin trend-index keyword trends](https://dataxapi.com/apis/douyin/index/keywords/history/), [Douyin trend-index related keywords](https://dataxapi.com/apis/douyin/index/keywords/related/), [Douyin trend-index live hot topics](https://dataxapi.com/apis/douyin/index/trends/list/), [Douyin trend-index keyword hot videos](https://dataxapi.com/apis/douyin/index/videos/search/)

Related: [All Douyin Xingtu endpoints](https://dataxapi.com/apis/douyin/xingtu/), [All Douyin endpoints](https://dataxapi.com/apis/douyin/), [Creators data](https://dataxapi.com/categories/creator/), [The same thing on 2 platforms, side by side](https://dataxapi.com/roles/creators-posts-list/), [The xingtu creator video object's fields](https://dataxapi.com/docs/objects/xingtu_creator_post/)

## Questions

### How much does the Douyin Xingtu creator video performance API cost?

$0.0040 per call. The most one call can cost is $0.0040.

### When am I not charged?

Errors and timeouts are not charged; an empty result is charged $0.0040.

### How many items does one call return, and how do I get the next page?

20 items a page. The page size is the platform's; limit is not accepted. For the next page pass page.next_cursor as cursor; a cursor is valid for 1 hour. page.has_more is false on the last page.

### What happens if the object does not exist?

A creator that does not exist cannot be told from a creator without videos: both return an empty result, not a 404, and are charged as an empty result is.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/douyin/xingtu/creators/videos/list/)

# Douyin Xingtu marketing calendar API

Get the campaigns on Xingtu's marketing calendar over a span of time: platform events, e-commerce and seasonal moments, creative and industry campaigns, each with its name, description, kind, stage, sign-up period and running period. All at once, no paging. About 40 items a call, 200 at most; $0.0040 per call. Errors and timeouts are not charged; an empty result is charged $0.0040.

- Endpoint: `GET https://api.dataxapi.com/v1/douyin/xingtu/campaigns/list`
- ID: `douyin.xingtu.campaigns.list`
- Also known as: xingtu campaigns, xingtu ip calendar, douyin marketing events
- Price: $0.0040 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: up to 200 a page, everything in one answer, no paging
- Returns xingtu campaign, a preview structure that may still change
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=douyin.xingtu.campaigns.list&params=%7B%22since%22%3A%222026-10-01T00%3A00%3A00Z%22%2C%22until%22%3A%222026-12-31T23%3A59%3A59Z%22%7D)
- In Chinese: [抖音星图营销活动日历 API](https://dataxapi.com/zh/apis/douyin/xingtu/campaigns/list/)

## What you get

The first 6 rows of a response recorded 2026-10-13 03:26 UTC.

| Field | Value |
| --- | --- |
| category | ecommerce |
| stage | open |
| signup_starts_at | 2026-09-29 02:29 UTC |
| signup_ends_at | 2026-10-31 02:29 UTC |
| starts_at | 2026-10-10 02:29 UTC |
| ends_at | 2026-11-20 02:29 UTC |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `since` | time | Yes | Start of the span: campaigns that overlap the span are returned. Example: `2026-10-01T00:00:00Z`. |
| `until` | time | Yes | End of the span. Example: `2026-12-31T23:59:59Z`. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.items` is a list of xingtu campaign objects. Preview: the structure may change, announced beforehand.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `id` | text | Campaign ID. | `compact` | Yes |
| `name` | text | Name of the campaign. | `compact` | Yes |
| `description` | text | What the campaign is. Long text: the compact view keeps the first 500 characters and says so in `warnings`. | `compact` | Yes |
| `category` | text | Kind of campaign: a platform event, an e-commerce moment, a seasonal or mood moment, creative marketing, an industry campaign. Values: `platform_event`, `ecommerce`, `seasonal`, `creative`, `industry`. | `compact` | Yes |
| `stage` | text | How far along the campaign is: being prepared, open for sign-up, live, ended. Values: `preparing`, `open`, `live`, `ended`. | `compact` | Yes |
| `signup_starts_at` | time | When sign-up opens. | `compact` | Yes |
| `signup_ends_at` | time | When sign-up closes. | `compact` | Yes |
| `starts_at` | time | When the campaign starts. | `compact` | Yes |
| `ends_at` | time | When the campaign ends. | `compact` | Yes |
| `image_url` | link | The campaign's main image. | `standard` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 644 B, `standard` 837 B, `full` 837 B (measured on the response recorded 2026-10-13 03:26 UTC).

## Paging

About 40 items a page, 200 at most. The page size is the platform's; `limit` is not accepted.

Everything comes in one page; no cursor is issued.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0040, once per call |
| An empty result | $0.0040 |
| Invalid parameters, a failure of ours or of the data source, a timeout | not charged |
| The most one call can cost | $0.0040 (send `X-Max-Price` to refuse anything above your own limit) |

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
curl -G "https://api.dataxapi.com/v1/douyin/xingtu/campaigns/list" \
  --data-urlencode "since=2026-10-01T00:00:00Z" \
  --data-urlencode "until=2026-12-31T23:59:59Z" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.douyin.xingtu.campaigns.list(since="2026-10-01T00:00:00Z", until="2026-12-31T23:59:59Z")
print(result["data"]["items"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.douyin.xingtu.campaigns.list({ since: "2026-10-01T00:00:00Z", until: "2026-12-31T23:59:59Z" });
console.log(result.data.items);
```

### CLI

```bash
dataxapi call douyin.xingtu.campaigns.list since=2026-10-01T00:00:00Z until=2026-12-31T23:59:59Z
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

Add this to your MCP client, then ask your agent to call `douyin.xingtu.campaigns.list`.

## Responses

### 200

From a response recorded 2026-10-13 03:26 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 35.5 KB in the standard view (27.5 KB compact, 35.5 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "a1e04e00-2aab-4d90-bfb5-bf13d16b46ad",
  "data": {
    "items": [
      {
        "id": "7632957782936535670",
        "name": "周末露营季节限定合作",
        "description": "周末的周末露营日常，随手记录一下",
        "category": "ecommerce",
        "stage": "open",
        "signup_starts_at": "2026-09-29T02:29:20.000Z",
        "signup_ends_at": "2026-10-31T02:29:20.000Z",
        "starts_at": "2026-10-10T02:29:04.000Z",
        "ends_at": "2026-11-20T02:29:04.000Z",
        "image_url": "https://p3-pc-sign.douyinpic.com/tos-cn-i-0813/a5ac1ffb2df94f6c3a16~tplv-dy-resize.jpeg"
      },
      // … 42 more
    ]
  },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 43
  },
  "warnings": [],
  "meta": {
    "capability": "douyin.xingtu.campaigns.list",
    "result_status": "complete",
    "fetched_at": "2026-10-13T03:26:46.000Z",
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

From a response recorded 2026-10-13 03:27 UTC. The request ID and balance are made up.

Size as sent: 411 B in the standard view (411 B compact, 411 B full).

```jsonc
{
  "code": "ok",
  "request_id": "56e8c23c-aa50-4f11-8034-f6a460e29d4c",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "douyin.xingtu.campaigns.list",
    "result_status": "empty",
    "fetched_at": "2026-10-13T03:27:38.000Z",
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
  "request_id": "723b2548-e822-4a1b-9acf-21112f61fdf1",
  "message": "A parameter is invalid",
  "message_zh": "参数不合法",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "problems": ["since is required", "until is required"],
  "docs_url": "https://dataxapi.com/docs/errors#invalid_params"
}
```

### 402

An example written to the specification, not a recorded response.

```json
{
  "code": "insufficient_balance",
  "request_id": "1866dca5-e383-4f91-a8b5-3471e6e7d750",
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
  "request_id": "1da2addf-a14c-41c4-bbf6-7c9987ac36e2",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/douyin/xingtu/campaigns/list.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `douyin.xingtu.campaigns.list`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/douyin/xingtu/campaigns/list.md and help me use the DataXAPI endpoint douyin.xingtu.campaigns.list (Douyin Xingtu marketing calendar).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fdouyin%2Fxingtu%2Fcampaigns%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20douyin.xingtu.campaigns.list%20%28Douyin%20Xingtu%20marketing%20calendar%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fdouyin%2Fxingtu%2Fcampaigns%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20douyin.xingtu.campaigns.list%20%28Douyin%20Xingtu%20marketing%20calendar%29.)

## Related

Part of DataXAPI's Creators data. The same key also works for: Social media, Ads, E-commerce.

Douyin Xingtu endpoints: [Douyin Xingtu creator rate card](https://dataxapi.com/apis/douyin/xingtu/creators/rates/get/), [Douyin Xingtu creator search](https://dataxapi.com/apis/douyin/xingtu/creators/search/), [Douyin Xingtu creator profile](https://dataxapi.com/apis/douyin/xingtu/creators/get/), [Douyin Xingtu creator audience](https://dataxapi.com/apis/douyin/xingtu/creators/audience/get/), [Douyin Xingtu creator metrics](https://dataxapi.com/apis/douyin/xingtu/creators/metrics/), [Douyin Xingtu creator video performance](https://dataxapi.com/apis/douyin/xingtu/creators/videos/list/), [Douyin Xingtu creator content keywords](https://dataxapi.com/apis/douyin/xingtu/creators/keywords/get/), [Douyin Xingtu creator index scores](https://dataxapi.com/apis/douyin/xingtu/creators/scores/get/), [Douyin Xingtu creator content mix](https://dataxapi.com/apis/douyin/xingtu/creators/content_mix/get/), [Douyin Xingtu creator conversion](https://dataxapi.com/apis/douyin/xingtu/creators/conversion/get/), [Douyin Xingtu marketing calendar](https://dataxapi.com/apis/douyin/xingtu/campaigns/list/)

Douyin endpoints: [Douyin comment replies](https://dataxapi.com/apis/douyin/comments/replies/list/), [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/), [Douyin hot search board](https://dataxapi.com/apis/douyin/trends/list/), [Douyin user profile](https://dataxapi.com/apis/douyin/users/get/), [Douyin creator engagement and follower trends](https://dataxapi.com/apis/douyin/users/history/), [Douyin user search](https://dataxapi.com/apis/douyin/users/search/), [Douyin user videos](https://dataxapi.com/apis/douyin/users/videos/list/), [Douyin video comments](https://dataxapi.com/apis/douyin/videos/comments/list/), [Douyin video detail](https://dataxapi.com/apis/douyin/videos/get/), [Douyin video play count](https://dataxapi.com/apis/douyin/videos/metrics/), [Douyin related videos](https://dataxapi.com/apis/douyin/videos/related/), [Douyin video search](https://dataxapi.com/apis/douyin/videos/search/), [Douyin trending videos](https://dataxapi.com/apis/douyin/videos/trending/)

Douyin trend-index endpoints: [Douyin trend-index brand trends](https://dataxapi.com/apis/douyin/index/brands/history/), [Douyin trend-index brand comparison](https://dataxapi.com/apis/douyin/index/brands/metrics/), [Douyin trend-index creator top videos](https://dataxapi.com/apis/douyin/index/creators/videos/list/), [Douyin trend-index creator follower profile](https://dataxapi.com/apis/douyin/index/creators/audience/get/), [Douyin trend-index creator core metrics](https://dataxapi.com/apis/douyin/index/creators/metrics/), [Douyin trend-index keyword audience](https://dataxapi.com/apis/douyin/index/keywords/audience/get/), [Douyin trend-index keyword trends](https://dataxapi.com/apis/douyin/index/keywords/history/), [Douyin trend-index related keywords](https://dataxapi.com/apis/douyin/index/keywords/related/), [Douyin trend-index live hot topics](https://dataxapi.com/apis/douyin/index/trends/list/), [Douyin trend-index keyword hot videos](https://dataxapi.com/apis/douyin/index/videos/search/)

Related: [All Douyin Xingtu endpoints](https://dataxapi.com/apis/douyin/xingtu/), [All Douyin endpoints](https://dataxapi.com/apis/douyin/), [Creators data](https://dataxapi.com/categories/creator/), [The xingtu campaign object's fields](https://dataxapi.com/docs/objects/xingtu_campaign/)

## Questions

### How much does the Douyin Xingtu marketing calendar API cost?

$0.0040 per call. The most one call can cost is $0.0040.

### When am I not charged?

Errors and timeouts are not charged; an empty result is charged $0.0040.

### How many items does one call return, and how do I get the next page?

About 40 items a page, 200 at most. The page size is the platform's; limit is not accepted. Everything comes in one page; no cursor is issued.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/douyin/xingtu/campaigns/list/)

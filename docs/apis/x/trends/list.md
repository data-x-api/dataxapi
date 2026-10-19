# X trends API

Get the top 30 of what is trending on X now, with rank: worldwide, or in one country. Up to 30 items a call; $0.0090 per call. Errors and timeouts are not charged; an empty result is free.

- Endpoint: `GET https://api.dataxapi.com/v1/x/trends/list`
- ID: `x.trends.list`
- Also known as: twitter trends, twitter trending topics, x trending
- Price: $0.0090 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 30 a page, everything in one answer, no paging
- Returns the standard trend object, the same on every platform
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=x.trends.list)
- In Chinese: [X 趋势榜 API](https://dataxapi.com/zh/apis/x/trends/list/)

## What you get

The first row of a response recorded 2026-10-13 03:29 UTC.

| Field | Value |
| --- | --- |
| rank | 1 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `board` | text |  | Which list: trends is the only one. Values: `trends` (default). Example: `trends`. |
| `region` | text |  | Which country's trends, by its two-letter code: US, GB, CA, AU, IN, JP, DE, FR, BR or MX; worldwide when left out. Example: `US`. |
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
| `heat` | integer | The platform's heat score. | `compact` | Not provided here |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 36 B, `standard` 36 B, `full` 36 B (measured on the response recorded 2026-10-13 03:29 UTC).

## Paging

30 items a page. The page size is the platform's; `limit` is not accepted.

Everything comes in one page; no cursor is issued.

Answers come from a shared snapshot refreshed every 5 minutes; `meta.cached` says so and `meta.fetched_at` is when it was taken.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0090, once per call |
| An empty result | not charged |
| Invalid parameters, a failure of ours or of the data source, a timeout | not charged |
| The most one call can cost | $0.0090 (send `X-Max-Price` to refuse anything above your own limit) |

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
curl "https://api.dataxapi.com/v1/x/trends/list" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.x.trends.list()
print(result["data"]["items"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.x.trends.list();
console.log(result.data.items);
```

### CLI

```bash
dataxapi call x.trends.list
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

Add this to your MCP client, then ask your agent to call `x.trends.list`.

## Responses

### 200

From a response recorded 2026-10-13 03:29 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 1.5 KB in the standard view (1.5 KB compact, 1.5 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "86caa2be-f053-4926-a0ef-f572a73d938b",
  "data": {
    "items": [
      { "name": "Weekend hiking", "rank": 1 },
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
    "capability": "x.trends.list",
    "result_status": "complete",
    "fetched_at": "2026-10-13T03:29:53.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": { "id": "platform", "heat": "capability" },
    "billing": {
      "amount": "0.009",
      "currency": "USD",
      "balance_after": "9.991"
    }
  }
}
```

### Empty

From a recording of 2026-10-13 03:29 UTC, edited by hand to show this case. The request ID and balance are made up.

Size as sent: 431 B in the standard view (431 B compact, 431 B full).

```jsonc
{
  "code": "ok",
  "request_id": "100d1b17-e9a9-4b88-8c1f-b741a6affbf3",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "x.trends.list",
    "result_status": "empty",
    "fetched_at": "2026-10-13T03:29:53.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": { "id": "platform", "heat": "capability" },
    "billing": { "amount": "0", "currency": "USD", "balance_after": "10" }
  }
}
```

### 400

An example written to the specification, not a recorded response.

```json
{
  "code": "invalid_params",
  "request_id": "a4d39566-ac90-42da-a36c-6f5a7c621c45",
  "message": "A parameter is invalid",
  "message_zh": "参数不合法",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "problems": ["board must be one of trends"],
  "docs_url": "https://dataxapi.com/docs/errors#invalid_params"
}
```

### 402

An example written to the specification, not a recorded response.

```json
{
  "code": "insufficient_balance",
  "request_id": "91948995-aaf5-4927-aaca-982ef4f79980",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.009",
  "available": "0",
  "docs_url": "https://dataxapi.com/docs/errors#insufficient_balance"
}
```

### 502

An example written to the specification, not a recorded response.

```json
{
  "code": "upstream_failed",
  "request_id": "07ce42ae-4f09-42ea-ac4b-806118ac8027",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/x/trends/list.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `x.trends.list`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/x/trends/list.md and help me use the DataXAPI endpoint x.trends.list (X trends).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fx%2Ftrends%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20x.trends.list%20%28X%20trends%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fx%2Ftrends%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20x.trends.list%20%28X%20trends%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

The same thing on other platforms: [Bilibili hot searches](https://dataxapi.com/apis/bilibili/trends/list/), [Douyin hot search board](https://dataxapi.com/apis/douyin/trends/list/), [Kuaishou hot list](https://dataxapi.com/apis/kuaishou/trends/list/), [Weibo hot search board](https://dataxapi.com/apis/weibo/trends/list/), [Xiaohongshu trends](https://dataxapi.com/apis/xiaohongshu/trends/list/), [Reddit trending searches](https://dataxapi.com/apis/reddit/trends/list/), [Zhihu hot list](https://dataxapi.com/apis/zhihu/trends/list/)

More Social media data on other platforms: [Douyin trend-index live hot topics](https://dataxapi.com/apis/douyin/index/trends/list/), [Douyin comment replies](https://dataxapi.com/apis/douyin/comments/replies/list/), [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/)

X (Twitter) endpoints: [X article detail](https://dataxapi.com/apis/x/posts/article/get/), [X post detail](https://dataxapi.com/apis/x/posts/get/), [X post quotes](https://dataxapi.com/apis/x/posts/quotes/list/), [X post replies](https://dataxapi.com/apis/x/posts/replies/list/), [X post retweeters](https://dataxapi.com/apis/x/posts/retweeters/list/), [X post search](https://dataxapi.com/apis/x/posts/search/), [X thread context](https://dataxapi.com/apis/x/threads/posts/list/), [X trends](https://dataxapi.com/apis/x/trends/list/), [X user followers](https://dataxapi.com/apis/x/users/followers/list/), [X user following](https://dataxapi.com/apis/x/users/following/list/), [X user profile](https://dataxapi.com/apis/x/users/get/), [X user mentions](https://dataxapi.com/apis/x/users/mentions/list/), [X user posts](https://dataxapi.com/apis/x/users/posts/list/), [X user search](https://dataxapi.com/apis/x/users/search/), [X video transcript](https://dataxapi.com/apis/x/posts/transcript/get/)

X Communities endpoints: [X community posts](https://dataxapi.com/apis/x/communities/posts/list/), [X community profile](https://dataxapi.com/apis/x/communities/get/), [X community members](https://dataxapi.com/apis/x/communities/members/list/)

X Lists endpoints: [X list posts](https://dataxapi.com/apis/x/lists/posts/list/), [X list followers](https://dataxapi.com/apis/x/lists/followers/list/), [X list members](https://dataxapi.com/apis/x/lists/members/list/)

How-to guides and answers: [How to get X (Twitter) trending topics by country](https://dataxapi.com/guides/x-trends-by-country/), [How do I get X (Twitter) trends for a country?](https://dataxapi.com/answers/how-to-get-x-trends-for-a-country/)

Skills that use this endpoint: [Trends and topics](https://dataxapi.com/skills/trends/)

Tools built on this endpoint: [X (Twitter) trending topics worldwide](https://dataxapi.com/tools/hot-search/x/worldwide/), [X (Twitter) trending topics in the US](https://dataxapi.com/tools/hot-search/x/), [X (Twitter) trending topics in the UK](https://dataxapi.com/tools/hot-search/x/gb/), [X (Twitter) trending topics in Canada](https://dataxapi.com/tools/hot-search/x/ca/), [X (Twitter) trending topics in Australia](https://dataxapi.com/tools/hot-search/x/au/), [X (Twitter) trending topics in India](https://dataxapi.com/tools/hot-search/x/in/), [X (Twitter) trending topics in Japan](https://dataxapi.com/tools/hot-search/x/jp/), [X (Twitter) trending topics in Germany](https://dataxapi.com/tools/hot-search/x/de/), [X (Twitter) trending topics in France](https://dataxapi.com/tools/hot-search/x/fr/), [X (Twitter) trending topics in Brazil](https://dataxapi.com/tools/hot-search/x/br/), [X (Twitter) trending topics in Mexico](https://dataxapi.com/tools/hot-search/x/mx/)

Related: [All X (Twitter) endpoints](https://dataxapi.com/apis/x/), [Social media data](https://dataxapi.com/categories/social/), [The same thing on 8 platforms, side by side](https://dataxapi.com/roles/trends-list/), [The trend object's fields](https://dataxapi.com/docs/objects/trend/)

## Questions

### How much does the X trends API cost?

$0.0090 per call. The most one call can cost is $0.0090.

### When am I not charged?

Errors and timeouts are not charged; an empty result is free.

### How many items does one call return, and how do I get the next page?

30 items a page. The page size is the platform's; limit is not accepted. Everything comes in one page; no cursor is issued.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/x/trends/list/)

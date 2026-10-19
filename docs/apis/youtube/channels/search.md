# YouTube channel search API

Find YouTube channels by search terms: name, handle, description, subscriber count, verification. About 20 items a call, 40 at most; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Endpoint: `GET https://api.dataxapi.com/v1/youtube/channels/search`
- ID: `youtube.channels.search`
- Also known as: find youtube channels, channel finder
- Price: $0.0020 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: up to 40 a page, a page, with a cursor for the next
- Returns the standard account object, the same on every platform
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=youtube.channels.search&params=%7B%22query%22%3A%22nasa%22%7D)
- In Chinese: [YouTube 频道搜索 API](https://dataxapi.com/zh/apis/youtube/channels/search/)

## What you get

The first 2 rows of a response recorded 2026-10-12 18:50 UTC.

| Field | Value |
| --- | --- |
| verified | true |
| metrics.followers | 15,100,000 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `query` | text | Yes | Search terms. Example: `nasa`. |
| `cursor` | text |  | Cursor returned by the previous page. Pass `page.next_cursor` of the page before, unchanged. Each page is charged as a call of its own. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.items` is a list of account objects. Stable: fields are only ever added.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `id` | text | ID. | `compact` | Yes |
| `username` | text | Handle. | `compact` | Yes |
| `name` | text | Display name. | `compact` | Yes |
| `url` | link | Link to the profile. | `compact` | Yes |
| `bio` | text | Bio. Long text: the compact view keeps the first 500 characters and says so in `warnings`. | `compact` | Yes |
| `avatar_url` | link | Avatar. | `standard` | Yes |
| `verified` | yes/no | Whether the account is verified. | `standard` | Yes |
| `created_at` | time | When the account was created. | `standard` | Not provided here |
| `metrics` | object | Account counts. | `compact` | Yes |
| `metrics.followers` | integer | Followers. On this platform: Subscribers, which the platform shows to three significant figures. | `compact` | Yes |
| `metrics.following` | integer | Following. | `compact` | The platform has none |
| `metrics.posts` | integer | Posts published. | `compact` | Not provided here |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 338 B, `standard` 493 B, `full` 493 B (measured on the response recorded 2026-10-12 18:50 UTC).

## Paging

About 20 items a page, 40 at most. The page size is the platform's; `limit` is not accepted.

For the next page pass `page.next_cursor` as `cursor`; a cursor is valid for 1 hour. `page.has_more` is false on the last page.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0020, once per call |
| Each further page | charged as a call of its own |
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
curl -G "https://api.dataxapi.com/v1/youtube/channels/search" \
  --data-urlencode "query=nasa" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.youtube.channels.search(query="nasa")
print(result["data"]["items"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.youtube.channels.search({ query: "nasa" });
console.log(result.data.items);
```

### CLI

```bash
dataxapi call youtube.channels.search query=nasa
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

Add this to your MCP client, then ask your agent to call `youtube.channels.search`.

## Responses

### 200

From a response recorded 2026-10-12 18:50 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 10.1 KB in the standard view (7.1 KB compact, 10.1 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "89bc1d97-d91b-4098-9722-850e1c4aeb82",
  "data": {
    "items": [
      {
        "id": "UCRHP_yvxzpixTrs0CJdPbtq",
        "username": "maya.makes",
        "name": "Northside Coffee",
        "url": "https://www.youtube.com/channel/UCRHP_yvxzpixTrs0CJdPbtq",
        "bio": "Photos, trails and too much coffee.",
        "avatar_url": "https://yt3.ggpht.com/pYIyE-n2_T2DkZRNE0GWf1ZdM_n7ethbv5UAjTMB=s88-c-k-c0x00ffffff-no-rj",
        "verified": true,
        "metrics": { "followers": 15100000 },
        "approximate": [
          { "field": "metrics.followers", "kind": "approximate" }
        ]
      },
      // … 19 more
    ]
  },
  "page": {
    "next_cursor": "c1.K728sT3lELOqpH9uSEd0aQrXFGO5V-ywdswL9nIX",
    "cursor_expires_at": "2026-10-12T19:50:40.000Z",
    "has_more": true,
    "returned": 20
  },
  "warnings": [],
  "meta": {
    "capability": "youtube.channels.search",
    "result_status": "complete",
    "fetched_at": "2026-10-12T18:50:40.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "created_at": "capability",
      "metrics.following": "platform",
      "metrics.posts": "capability"
    },
    "billing": {
      "amount": "0.002",
      "currency": "USD",
      "balance_after": "9.998"
    }
  }
}
```

### Empty

From a response recorded 2026-10-12 18:50 UTC. The request ID and balance are made up.

Size as sent: 491 B in the standard view (491 B compact, 491 B full).

```jsonc
{
  "code": "ok",
  "request_id": "5fa03eba-da5e-4635-8e4e-afa2a6935633",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "youtube.channels.search",
    "result_status": "empty",
    "fetched_at": "2026-10-12T18:50:43.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "created_at": "capability",
      "metrics.following": "platform",
      "metrics.posts": "capability"
    },
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
  "request_id": "bd14353c-3f22-4b7e-9f0a-d5642eacc675",
  "message": "A parameter is invalid",
  "message_zh": "参数不合法",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "problems": ["query is required"],
  "docs_url": "https://dataxapi.com/docs/errors#invalid_params"
}
```

### 402

An example written to the specification, not a recorded response.

```json
{
  "code": "insufficient_balance",
  "request_id": "9737f181-2744-4a3e-905a-2f8bffeba0f2",
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
  "request_id": "2fd7a669-4fbc-4734-9676-771a970553eb",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/youtube/channels/search.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `youtube.channels.search`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/youtube/channels/search.md and help me use the DataXAPI endpoint youtube.channels.search (YouTube channel search).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fyoutube%2Fchannels%2Fsearch.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20youtube.channels.search%20%28YouTube%20channel%20search%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fyoutube%2Fchannels%2Fsearch.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20youtube.channels.search%20%28YouTube%20channel%20search%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

The same thing on other platforms: [Douyin user search](https://dataxapi.com/apis/douyin/users/search/), [Kuaishou user search](https://dataxapi.com/apis/kuaishou/users/search/), [Instagram user search](https://dataxapi.com/apis/instagram/users/search/), [TikTok user search](https://dataxapi.com/apis/tiktok/users/search/), [Weibo user search](https://dataxapi.com/apis/weibo/users/search/), [X user search](https://dataxapi.com/apis/x/users/search/), [Xiaohongshu user search](https://dataxapi.com/apis/xiaohongshu/users/search/), [Zhihu user search](https://dataxapi.com/apis/zhihu/users/search/)

More Social media data on other platforms: [Bilibili user profile](https://dataxapi.com/apis/bilibili/users/get/), [Douyin user profile](https://dataxapi.com/apis/douyin/users/get/), [Kuaishou user profile](https://dataxapi.com/apis/kuaishou/users/get/), [Telegram channel profile](https://dataxapi.com/apis/telegram/channels/get/), [Facebook page profile](https://dataxapi.com/apis/facebook/pages/get/), [LinkedIn company page](https://dataxapi.com/apis/linkedin/companies/get/), [Threads user profile](https://dataxapi.com/apis/threads/users/get/), [Instagram user profile](https://dataxapi.com/apis/instagram/users/get/), [TikTok user profile](https://dataxapi.com/apis/tiktok/users/get/), [Weibo post likers](https://dataxapi.com/apis/weibo/posts/likers/list/), [Weibo user followers](https://dataxapi.com/apis/weibo/users/followers/list/), [Weibo user profile](https://dataxapi.com/apis/weibo/users/get/), [X post retweeters](https://dataxapi.com/apis/x/posts/retweeters/list/)

YouTube endpoints: [YouTube channel profile](https://dataxapi.com/apis/youtube/channels/get/), [YouTube channel search](https://dataxapi.com/apis/youtube/channels/search/), [YouTube channel videos](https://dataxapi.com/apis/youtube/channels/videos/list/), [YouTube comment replies](https://dataxapi.com/apis/youtube/comments/replies/list/), [YouTube video comments](https://dataxapi.com/apis/youtube/videos/comments/list/), [YouTube video detail](https://dataxapi.com/apis/youtube/videos/get/), [YouTube video search](https://dataxapi.com/apis/youtube/videos/search/), [YouTube video transcript](https://dataxapi.com/apis/youtube/videos/transcript/get/), [YouTube channel posts](https://dataxapi.com/apis/youtube/channels/posts/list/), [YouTube post detail](https://dataxapi.com/apis/youtube/posts/get/)

Skills that use this endpoint: [Finding accounts and creators](https://dataxapi.com/skills/creators/)

Related: [All YouTube endpoints](https://dataxapi.com/apis/youtube/), [Social media data](https://dataxapi.com/categories/social/), [The same thing on 9 platforms, side by side](https://dataxapi.com/roles/accounts-search/), [The account object's fields](https://dataxapi.com/docs/objects/account/)

## Questions

### How much does the YouTube channel search API cost?

$0.0020 per call. The most one call can cost is $0.0020.

### When am I not charged?

Errors and timeouts are not charged; an empty result is charged $0.0020.

### How many items does one call return, and how do I get the next page?

About 20 items a page, 40 at most. The page size is the platform's; limit is not accepted. For the next page pass page.next_cursor as cursor; a cursor is valid for 1 hour. page.has_more is false on the last page.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/youtube/channels/search/)

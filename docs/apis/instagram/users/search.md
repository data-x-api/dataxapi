# Instagram user search API

Search Instagram accounts by keyword, about 50 in one answer and no further pages: handle, name, avatar, verification, whether it is private. Up to 50 items a call; $0.0040 per call. Errors and timeouts are not charged; an empty result is charged $0.0040.

- Endpoint: `GET https://api.dataxapi.com/v1/instagram/users/search`
- ID: `instagram.users.search`
- Also known as: search instagram accounts, find instagram users
- Price: $0.0040 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 50 a page, everything in one answer, no paging
- Returns the standard account object, the same on every platform
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=instagram.users.search&params=%7B%22query%22%3A%22nike%22%7D)
- In Chinese: [Instagram 用户搜索 API](https://dataxapi.com/zh/apis/instagram/users/search/)

## What you get

The first row of a response recorded 2026-10-12 18:58 UTC.

| Field | Value |
| --- | --- |
| verified | true |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `query` | text | Yes | Search terms. Example: `nike`. |
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
| `bio` | text | Bio. Long text: the compact view keeps the first 500 characters and says so in `warnings`. | `compact` | Not provided here |
| `avatar_url` | link | Avatar. | `standard` | Yes |
| `verified` | yes/no | Whether the account is verified. | `standard` | Yes |
| `created_at` | time | When the account was created. | `standard` | The platform has none |
| `metrics` | object | Account counts. | `compact` | Not provided here |
| `metrics.followers` | integer | Followers. | `compact` | Not provided here |
| `metrics.following` | integer | Following. | `compact` | Not provided here |
| `metrics.posts` | integer | Posts published. | `compact` | Not provided here |
| `ext.is_private` | yes/no | Whether the account is private. | `full` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 134 B, `standard` 730 B, `full` 757 B (measured on the response recorded 2026-10-12 18:58 UTC).

## Paging

50 items a page. The page size is the platform's; `limit` is not accepted.

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
curl -G "https://api.dataxapi.com/v1/instagram/users/search" \
  --data-urlencode "query=nike" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.instagram.users.search(query="nike")
print(result["data"]["items"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.instagram.users.search({ query: "nike" });
console.log(result.data.items);
```

### CLI

```bash
dataxapi call instagram.users.search query=nike
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

Add this to your MCP client, then ask your agent to call `instagram.users.search`.

## Responses

### 200

From a response recorded 2026-10-12 18:58 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 33.3 KB in the standard view (6.5 KB compact, 34.5 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "91a45b71-fb1a-4e67-871d-fff79b0d7d05",
  "data": {
    "items": [
      {
        "id": "56443746591",
        "username": "leopark_films",
        "name": "Trail & Lens",
        "url": "https://www.instagram.com/leopark_films/",
        "avatar_url": "https://scontent.cdninstagram.com/v/t51.2885-19/419936045_15048019002671703_n.jpg",
        "verified": true
      },
      // … 45 more
    ]
  },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 46
  },
  "warnings": [],
  "meta": {
    "capability": "instagram.users.search",
    "result_status": "complete",
    "fetched_at": "2026-10-12T18:58:15.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "bio": "capability",
      "created_at": "platform",
      "metrics": "capability"
    },
    "billing": {
      "amount": "0.004",
      "currency": "USD",
      "balance_after": "9.996"
    }
  }
}
```

### Empty

From a response recorded 2026-10-12 18:58 UTC. The request ID and balance are made up.

Size as sent: 470 B in the standard view (470 B compact, 470 B full).

```jsonc
{
  "code": "ok",
  "request_id": "57058256-a370-4080-8fc4-9a16f294664b",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "instagram.users.search",
    "result_status": "empty",
    "fetched_at": "2026-10-12T18:58:19.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "bio": "capability",
      "created_at": "platform",
      "metrics": "capability"
    },
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
  "request_id": "ee03e2f6-e508-43f1-95b4-8a9b5fbdc535",
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
  "request_id": "b77202ae-fb2d-436f-ac23-2560ad8a6de7",
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
  "request_id": "35ecdacf-b83a-4c7b-8e01-139d86b3ac86",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/instagram/users/search.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `instagram.users.search`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/instagram/users/search.md and help me use the DataXAPI endpoint instagram.users.search (Instagram user search).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Finstagram%2Fusers%2Fsearch.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20instagram.users.search%20%28Instagram%20user%20search%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Finstagram%2Fusers%2Fsearch.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20instagram.users.search%20%28Instagram%20user%20search%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

The same thing on other platforms: [Douyin user search](https://dataxapi.com/apis/douyin/users/search/), [Kuaishou user search](https://dataxapi.com/apis/kuaishou/users/search/), [TikTok user search](https://dataxapi.com/apis/tiktok/users/search/), [Weibo user search](https://dataxapi.com/apis/weibo/users/search/), [X user search](https://dataxapi.com/apis/x/users/search/), [Xiaohongshu user search](https://dataxapi.com/apis/xiaohongshu/users/search/), [YouTube channel search](https://dataxapi.com/apis/youtube/channels/search/), [Zhihu user search](https://dataxapi.com/apis/zhihu/users/search/)

More Social media data on other platforms: [Bilibili user profile](https://dataxapi.com/apis/bilibili/users/get/), [Douyin user profile](https://dataxapi.com/apis/douyin/users/get/), [Kuaishou user profile](https://dataxapi.com/apis/kuaishou/users/get/), [Telegram channel profile](https://dataxapi.com/apis/telegram/channels/get/), [Facebook page profile](https://dataxapi.com/apis/facebook/pages/get/), [LinkedIn company page](https://dataxapi.com/apis/linkedin/companies/get/), [Threads user profile](https://dataxapi.com/apis/threads/users/get/), [TikTok user profile](https://dataxapi.com/apis/tiktok/users/get/), [Weibo post likers](https://dataxapi.com/apis/weibo/posts/likers/list/), [Weibo user followers](https://dataxapi.com/apis/weibo/users/followers/list/), [Weibo user profile](https://dataxapi.com/apis/weibo/users/get/), [X post retweeters](https://dataxapi.com/apis/x/posts/retweeters/list/), [X user followers](https://dataxapi.com/apis/x/users/followers/list/), [X user following](https://dataxapi.com/apis/x/users/following/list/), [X user profile](https://dataxapi.com/apis/x/users/get/)

Instagram endpoints: [Instagram comment replies](https://dataxapi.com/apis/instagram/comments/replies/list/), [Instagram hashtag posts](https://dataxapi.com/apis/instagram/hashtags/posts/list/), [Instagram post comments](https://dataxapi.com/apis/instagram/posts/comments/list/), [Instagram post detail](https://dataxapi.com/apis/instagram/posts/get/), [Instagram video transcript](https://dataxapi.com/apis/instagram/posts/transcript/get/), [Instagram user profile](https://dataxapi.com/apis/instagram/users/get/), [Instagram user posts](https://dataxapi.com/apis/instagram/users/posts/list/), [Instagram user search](https://dataxapi.com/apis/instagram/users/search/)

Skills that use this endpoint: [Finding accounts and creators](https://dataxapi.com/skills/creators/)

Related: [All Instagram endpoints](https://dataxapi.com/apis/instagram/), [Social media data](https://dataxapi.com/categories/social/), [The same thing on 9 platforms, side by side](https://dataxapi.com/roles/accounts-search/), [The account object's fields](https://dataxapi.com/docs/objects/account/)

## Questions

### How much does the Instagram user search API cost?

$0.0040 per call. The most one call can cost is $0.0040.

### When am I not charged?

Errors and timeouts are not charged; an empty result is charged $0.0040.

### How many items does one call return, and how do I get the next page?

50 items a page. The page size is the platform's; limit is not accepted. Everything comes in one page; no cursor is issued.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/instagram/users/search/)

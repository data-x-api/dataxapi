# Zhihu user search API

Get a page of Zhihu users matching a search: name, headline, follower count, answer and article counts. Up to 20 items a call; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Endpoint: `GET https://api.dataxapi.com/v1/zhihu/users/search`
- ID: `zhihu.users.search`
- Also known as: search zhihu users, find zhihu people
- Price: $0.0020 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 20 a page, a page, with a cursor for the next
- Returns the standard account object, the same on every platform
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=zhihu.users.search&params=%7B%22query%22%3A%22%E4%BA%BA%E6%B0%91%E6%97%A5%E6%8A%A5%22%7D)
- In Chinese: [知乎用户搜索 API](https://dataxapi.com/zh/apis/zhihu/users/search/)

## What you get

The first row of a response recorded 2026-10-12 19:18 UTC.

| Field | Value |
| --- | --- |
| metrics.followers | 237,921 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `query` | text | Yes | Search terms. Example: `人民日报`. |
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
| `verified` | yes/no | Whether the account is verified. | `standard` | Not provided here |
| `created_at` | time | When the account was created. | `standard` | The platform has none |
| `metrics` | object | Account counts. | `compact` | Yes |
| `metrics.followers` | integer | Followers. | `compact` | Yes |
| `metrics.following` | integer | Following. | `compact` | Not provided here |
| `metrics.posts` | integer | Posts published. | `compact` | Not provided here |
| `ext.answers` | integer | Answers written. | `full` | Yes |
| `ext.articles` | integer | Articles written. | `full` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 193 B, `standard` 292 B, `full` 325 B (measured on the response recorded 2026-10-12 19:18 UTC).

## Paging

20 items a page. The page size is the platform's; `limit` is not accepted.

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
curl -G "https://api.dataxapi.com/v1/zhihu/users/search" \
  --data-urlencode "query=人民日报" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.zhihu.users.search(query="人民日报")
print(result["data"]["items"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.zhihu.users.search({ query: "人民日报" });
console.log(result.data.items);
```

### CLI

```bash
dataxapi call zhihu.users.search 'query=人民日报'
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

Add this to your MCP client, then ask your agent to call `zhihu.users.search`.

## Responses

### 200

From a response recorded 2026-10-12 19:18 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 6.2 KB in the standard view (4.3 KB compact, 6.9 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "48507bc1-e88e-44c3-9df6-5833f83e3b01",
  "data": {
    "items": [
      {
        "id": "35ba6fdb17b50dd643020e7a75b74992",
        "username": "laozhou_gear",
        "name": "老周说装备",
        "url": "https://www.zhihu.com/people/laozhou-gear",
        "bio": null,
        "avatar_url": "https://picx.zhimg.com/v2-d774ac4f8ccd887740ab_l.jpg",
        "metrics": { "followers": 237921 }
      },
      // … 19 more
    ]
  },
  "page": {
    "next_cursor": "c1.NL_BYTniPymmcy7YikNXXPSKUsUkyynYrQUg23mm",
    "cursor_expires_at": "2026-10-12T20:18:22.000Z",
    "has_more": true,
    "returned": 20
  },
  "warnings": [],
  "meta": {
    "capability": "zhihu.users.search",
    "result_status": "complete",
    "fetched_at": "2026-10-12T19:18:22.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "verified": "capability",
      "created_at": "platform",
      "metrics.following": "capability",
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

From a response recorded 2026-10-12 18:56 UTC. The request ID and balance are made up.

Size as sent: 510 B in the standard view (510 B compact, 510 B full).

```jsonc
{
  "code": "ok",
  "request_id": "37e79ead-ea72-4d22-b6c6-e2a084a3ff2f",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "zhihu.users.search",
    "result_status": "empty",
    "fetched_at": "2026-10-12T18:56:18.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "verified": "capability",
      "created_at": "platform",
      "metrics.following": "capability",
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
  "request_id": "d7d0c2bb-df61-4e45-bccb-91be9dce28f9",
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
  "request_id": "1c3ac7f7-851b-40b2-9e47-f95546510157",
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
  "request_id": "ff82c2eb-c384-4618-be53-61df98b159f8",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/zhihu/users/search.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `zhihu.users.search`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/zhihu/users/search.md and help me use the DataXAPI endpoint zhihu.users.search (Zhihu user search).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fzhihu%2Fusers%2Fsearch.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20zhihu.users.search%20%28Zhihu%20user%20search%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fzhihu%2Fusers%2Fsearch.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20zhihu.users.search%20%28Zhihu%20user%20search%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

The same thing on other platforms: [Douyin user search](https://dataxapi.com/apis/douyin/users/search/), [Kuaishou user search](https://dataxapi.com/apis/kuaishou/users/search/), [Instagram user search](https://dataxapi.com/apis/instagram/users/search/), [TikTok user search](https://dataxapi.com/apis/tiktok/users/search/), [Weibo user search](https://dataxapi.com/apis/weibo/users/search/), [X user search](https://dataxapi.com/apis/x/users/search/), [Xiaohongshu user search](https://dataxapi.com/apis/xiaohongshu/users/search/), [YouTube channel search](https://dataxapi.com/apis/youtube/channels/search/)

More Social media data on other platforms: [Bilibili user profile](https://dataxapi.com/apis/bilibili/users/get/), [Douyin user profile](https://dataxapi.com/apis/douyin/users/get/), [Kuaishou user profile](https://dataxapi.com/apis/kuaishou/users/get/), [Telegram channel profile](https://dataxapi.com/apis/telegram/channels/get/), [Facebook page profile](https://dataxapi.com/apis/facebook/pages/get/), [LinkedIn company page](https://dataxapi.com/apis/linkedin/companies/get/), [Threads user profile](https://dataxapi.com/apis/threads/users/get/)

Zhihu endpoints: [Zhihu answer comments](https://dataxapi.com/apis/zhihu/answers/comments/list/), [Zhihu answer detail](https://dataxapi.com/apis/zhihu/answers/get/), [Zhihu article detail](https://dataxapi.com/apis/zhihu/articles/get/), [Zhihu column articles](https://dataxapi.com/apis/zhihu/columns/articles/list/), [Zhihu comment replies](https://dataxapi.com/apis/zhihu/comments/replies/list/), [Zhihu pin detail](https://dataxapi.com/apis/zhihu/pins/get/), [Zhihu content search](https://dataxapi.com/apis/zhihu/posts/search/), [Zhihu question answers](https://dataxapi.com/apis/zhihu/questions/answers/list/), [Zhihu question detail](https://dataxapi.com/apis/zhihu/questions/get/), [Zhihu hot list](https://dataxapi.com/apis/zhihu/trends/list/), [Zhihu user answers](https://dataxapi.com/apis/zhihu/users/answers/list/), [Zhihu user articles](https://dataxapi.com/apis/zhihu/users/articles/list/), [Zhihu user followers](https://dataxapi.com/apis/zhihu/users/followers/list/), [Zhihu user profile](https://dataxapi.com/apis/zhihu/users/get/), [Zhihu user pins](https://dataxapi.com/apis/zhihu/users/pins/list/), [Zhihu user search](https://dataxapi.com/apis/zhihu/users/search/)

Skills that use this endpoint: [Finding accounts and creators](https://dataxapi.com/skills/creators/)

Related: [All Zhihu endpoints](https://dataxapi.com/apis/zhihu/), [Social media data](https://dataxapi.com/categories/social/), [The same thing on 9 platforms, side by side](https://dataxapi.com/roles/accounts-search/), [The account object's fields](https://dataxapi.com/docs/objects/account/)

## Questions

### How much does the Zhihu user search API cost?

$0.0020 per call. The most one call can cost is $0.0020.

### When am I not charged?

Errors and timeouts are not charged; an empty result is charged $0.0020.

### How many items does one call return, and how do I get the next page?

20 items a page. The page size is the platform's; limit is not accepted. For the next page pass page.next_cursor as cursor; a cursor is valid for 1 hour. page.has_more is false on the last page.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/zhihu/users/search/)

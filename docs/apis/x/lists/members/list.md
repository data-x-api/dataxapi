# X list members API

Get a page of the accounts an X list is made of, by the list's ID, 20 a page: handle, name, bio, follower count, verification. Up to 20 items a call; $0.0004 per item returned, at least $0.0004 and at most $0.0080 a call. Errors and timeouts are not charged; an empty result is charged $0.0004.

- Endpoint: `GET https://api.dataxapi.com/v1/x/lists/members/list`
- ID: `x.lists.members.list`
- Also known as: twitter list members, accounts in a list
- Price: $0.0004 / item
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 20 a page, a page, with a cursor for the next
- Returns the standard account object, the same on every platform
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=x.lists.members.list&params=%7B%22id%22%3A%2284839422%22%7D)
- In Chinese: [X 列表成员 API](https://dataxapi.com/zh/apis/x/lists/members/list/)

## What you get

The first 5 rows of a response recorded 2026-10-12 22:16 UTC.

| Field | Value |
| --- | --- |
| verified | true |
| created_at | 2026-02-19 16:19 UTC |
| metrics.followers | 743,231 |
| metrics.following | 2 |
| metrics.posts | 512 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `id` | text | Yes | List ID, a string of digits. Example: `84839422`. |
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
| `created_at` | time | When the account was created. | `standard` | Yes |
| `metrics` | object | Account counts. | `compact` | Yes |
| `metrics.followers` | integer | Followers. | `compact` | Yes |
| `metrics.following` | integer | Following. | `compact` | Yes |
| `metrics.posts` | integer | Posts published. | `compact` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 266 B, `standard` 414 B, `full` 414 B (measured on the response recorded 2026-10-12 22:16 UTC).

## Paging

20 items a page. The page size is the platform's; `limit` is not accepted.

For the next page pass `page.next_cursor` as `cursor`; a cursor is valid for 1 hour. `page.has_more` is false on the last page.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0004 for each valid item returned, at least $0.0004 a call |
| Each further page | charged as a call of its own |
| An empty result | $0.0004 |
| Invalid parameters, a failure of ours or of the data source, a timeout | not charged |
| The most one call can cost | $0.0080 (send `X-Max-Price` to refuse anything above your own limit) |

Prices as read 2026-10-18 19:59 UTC, under price book 2, in effect since 2026-10-17 11:00 UTC; the Playground reads the price in force before a run.

## If the object does not exist

A list that does not exist cannot be told from a list without members: both return an empty result, not a 404, and are charged as an empty result is.

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
curl -G "https://api.dataxapi.com/v1/x/lists/members/list" \
  --data-urlencode "id=84839422" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.x.lists.members.list(id="84839422")
print(result["data"]["items"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.x.lists.members.list({ id: "84839422" });
console.log(result.data.items);
```

### CLI

```bash
dataxapi call x.lists.members.list id=84839422
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

Add this to your MCP client, then ask your agent to call `x.lists.members.list`.

## Responses

### 200

From a response recorded 2026-10-12 22:16 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 8.5 KB in the standard view (5.6 KB compact, 8.5 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "dd902e6b-1147-47dd-a4b4-d76c0349af8c",
  "data": {
    "items": [
      {
        "id": "130893946283481834",
        "username": "leopark_films",
        "name": "Trail & Lens",
        "url": "https://x.com/leopark_films",
        "bio": "Gear reviews, no sponsors. New video every Friday.",
        "avatar_url": "https://pbs.twimg.com/profile_images/1861196243296798184/Y7sTNK9F_normal.jpg",
        "verified": true,
        "created_at": "2026-02-19T16:19:46.000Z",
        "metrics": { "followers": 743231, "following": 2, "posts": 512 }
      },
      // … 19 more
    ]
  },
  "page": {
    "next_cursor": "c1.YEFDjS2j_jVyooswlDwmNnEG5d-A_uyP3_F8Q94A",
    "cursor_expires_at": "2026-10-12T23:16:23.000Z",
    "has_more": true,
    "returned": 20
  },
  "warnings": [],
  "meta": {
    "capability": "x.lists.members.list",
    "result_status": "complete",
    "fetched_at": "2026-10-12T22:16:23.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {},
    "billing": {
      "amount": "0.008",
      "currency": "USD",
      "balance_after": "9.992"
    }
  }
}
```

### Empty

From a response recorded 2026-10-12 21:37 UTC. The request ID and balance are made up.

Size as sent: 403 B in the standard view (403 B compact, 403 B full).

```jsonc
{
  "code": "ok",
  "request_id": "31cfb58b-c51c-467b-ad0f-4413c5cda679",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "x.lists.members.list",
    "result_status": "empty",
    "fetched_at": "2026-10-12T21:37:49.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {},
    "billing": {
      "amount": "0.0004",
      "currency": "USD",
      "balance_after": "9.9996"
    }
  }
}
```

### 400

An example written to the specification, not a recorded response.

```json
{
  "code": "invalid_params",
  "request_id": "47302ff0-af73-4868-95cd-2b3233c7c62d",
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
  "request_id": "1112660e-7cb5-4733-b5ef-30c43854bfc4",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.008",
  "available": "0",
  "docs_url": "https://dataxapi.com/docs/errors#insufficient_balance"
}
```

### 502

An example written to the specification, not a recorded response.

```json
{
  "code": "upstream_failed",
  "request_id": "589a2062-d531-4c05-9900-ced6b3f9d455",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/x/lists/members/list.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `x.lists.members.list`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/x/lists/members/list.md and help me use the DataXAPI endpoint x.lists.members.list (X list members).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fx%2Flists%2Fmembers%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20x.lists.members.list%20%28X%20list%20members%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fx%2Flists%2Fmembers%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20x.lists.members.list%20%28X%20list%20members%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

More Social media data on other platforms: [Bilibili user profile](https://dataxapi.com/apis/bilibili/users/get/), [Douyin user profile](https://dataxapi.com/apis/douyin/users/get/), [Douyin user search](https://dataxapi.com/apis/douyin/users/search/), [Kuaishou user profile](https://dataxapi.com/apis/kuaishou/users/get/), [Kuaishou user search](https://dataxapi.com/apis/kuaishou/users/search/), [Telegram channel profile](https://dataxapi.com/apis/telegram/channels/get/), [Facebook page profile](https://dataxapi.com/apis/facebook/pages/get/), [LinkedIn company page](https://dataxapi.com/apis/linkedin/companies/get/), [Threads user profile](https://dataxapi.com/apis/threads/users/get/), [Instagram user profile](https://dataxapi.com/apis/instagram/users/get/)

X Lists endpoints: [X list posts](https://dataxapi.com/apis/x/lists/posts/list/), [X list followers](https://dataxapi.com/apis/x/lists/followers/list/), [X list members](https://dataxapi.com/apis/x/lists/members/list/)

X Communities endpoints: [X community posts](https://dataxapi.com/apis/x/communities/posts/list/), [X community profile](https://dataxapi.com/apis/x/communities/get/), [X community members](https://dataxapi.com/apis/x/communities/members/list/)

X (Twitter) endpoints: [X article detail](https://dataxapi.com/apis/x/posts/article/get/), [X post detail](https://dataxapi.com/apis/x/posts/get/), [X post quotes](https://dataxapi.com/apis/x/posts/quotes/list/), [X post replies](https://dataxapi.com/apis/x/posts/replies/list/), [X post retweeters](https://dataxapi.com/apis/x/posts/retweeters/list/), [X post search](https://dataxapi.com/apis/x/posts/search/), [X thread context](https://dataxapi.com/apis/x/threads/posts/list/), [X trends](https://dataxapi.com/apis/x/trends/list/), [X user followers](https://dataxapi.com/apis/x/users/followers/list/), [X user following](https://dataxapi.com/apis/x/users/following/list/), [X user profile](https://dataxapi.com/apis/x/users/get/), [X user mentions](https://dataxapi.com/apis/x/users/mentions/list/), [X user posts](https://dataxapi.com/apis/x/users/posts/list/), [X user search](https://dataxapi.com/apis/x/users/search/), [X video transcript](https://dataxapi.com/apis/x/posts/transcript/get/)

Related: [All X Lists endpoints](https://dataxapi.com/apis/x/lists/), [All X (Twitter) endpoints](https://dataxapi.com/apis/x/), [Social media data](https://dataxapi.com/categories/social/), [The account object's fields](https://dataxapi.com/docs/objects/account/)

## Questions

### How much does the X list members API cost?

$0.0004 per item returned, at least $0.0004 and at most $0.0080 a call. The most one call can cost is $0.0080.

### When am I not charged?

Errors and timeouts are not charged; an empty result is charged $0.0004.

### How many items does one call return, and how do I get the next page?

20 items a page. The page size is the platform's; limit is not accepted. For the next page pass page.next_cursor as cursor; a cursor is valid for 1 hour. page.has_more is false on the last page.

### What happens if the object does not exist?

A list that does not exist cannot be told from a list without members: both return an empty result, not a 404, and are charged as an empty result is.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/x/lists/members/list/)
